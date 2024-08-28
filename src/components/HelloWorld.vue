<script setup>
import { ref } from "vue";

defineProps({
	msg: String,
});

const count = ref(0);
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button
      type="button"
      @click="count++"
    >
      count is {{ count }}
    </button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>
	<div class="text-8xl p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
		<div class="shrink-0">
			<img class="size-12" src="" alt="ChitChat Logo">
		</div>
		<div>
			<div class="text-xl font-medium text-black">ChitChat</div>
			<p class="text-slate-500">You have a new message!</p>
		</div>
	</div>
  <p>
    Check out
    <a
      href="https://vuejs.org/guide/quick-start.html#local"
      target="_blank"
    >create-vue</a>, the official Vue + Vite starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
    >Vue Docs Scaling up Guide</a>.
  </p>
  <p class="read-the-docs">
    Click on the Vite and Vue logos to learn more
  </p>
</template>

<style scoped>
.read-the-docs {
	color: #888;
}
</style>
