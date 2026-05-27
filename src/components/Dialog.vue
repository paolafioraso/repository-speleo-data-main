<script setup>
import { useGlobal } from '../composables/global.js'

const global = useGlobal()

async function handleOk() {
  try {
    if (typeof global.dialog?.onOk === 'function') {
      await global.dialog.onOk()
    }
  } finally {
    global.dialog = null
  }
}

async function handleCancel() {
  try {
    if (typeof global.dialog?.onCancel === 'function') {
      await global.dialog.onCancel()
    }
  } finally {
    global.dialog = null
  }
}
</script>

<template>
  <div
    v-if="global.dialog?.content != null"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4"
  >
    <div class="w-full max-w-[90vw] sm:max-w-[50vw] rounded-lg bg-white p-6 shadow-xl">
      <h2
        v-if="global.dialog?.title"
        class="mb-2 text-xl font-semibold"
        style="color: #343434;"
      >
        {{ global.dialog.title }}
      </h2>

      <p class="whitespace-pre-line" style="color: #666666;">
        {{ global.dialog.content }}
      </p>

      <div class="mt-6 flex justify-end gap-3">
        <button
          type="button"
          class="rounded-md border px-4 py-2 transition"
          style="border-color: #343434; background-color: transparent; color: #343434;"
          @mouseenter="$event.target.style.backgroundColor = '#343434'; $event.target.style.color = '#afafaf'"
          @mouseleave="$event.target.style.backgroundColor = 'transparent'; $event.target.style.color = '#343434'"
          @click="handleCancel"
        >
          Cancel
        </button>
        <button
          type="button"
          class="rounded-md px-4 py-2 transition"
          style="background-color: #343434; color: #afafaf;"
          @mouseenter="$event.target.style.backgroundColor = '#afafaf'; $event.target.style.color = '#343434'"
          @mouseleave="$event.target.style.backgroundColor = '#343434'; $event.target.style.color = '#afafaf'"
          @click="handleOk"
        >
          Ok
        </button>
      </div>
    </div>
  </div>
</template>