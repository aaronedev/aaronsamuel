<template>
  <div class="json-data">
    <h2>JSON Data</h2>
    <div class="json-container">
      <pre>{{ formattedData }}</pre>
    </div>
  </div>
</template>

<script>
import JsonFormatter from 'json-formatter-js';

export default {
  props: {
    data: {
      name: "Aaron-Samuel Hauck",
      description: "I'm a Web Developer and System Administrator working extensively with DevOps practices, building fast, secure, and scalable web applications.",
      address: {
        country: "Germany",
        city: "Cologne"
      },
      contact: {
        email: "work@aaronsamuel.de"
      },
      profiles: [
      ],
      type: Object,
      required: true,
    },
  },
  computed: {
  formattedData() {
    const formatter = new JsonFormatter(this.data);
    return formatter.render();
  }
}
}
</script>


<style scoped>
.json-data {
  @apply bg-white p-4 border border-gray-300 rounded-lg shadow-md mb-4;
}
.json-data h2 {
  @apply text-lg font-bold mb-2;
}
.json-container {
  @apply overflow-x-auto;
}
</style>