<template>
  <div class="favorite-items">
    <h2>Featured Projects</h2>
    <ul>
      <li>
        <strong>Violet Void Theme 🟣</strong>: A dark, elegant theme that unifies your digital workspace across code editors, Windows Terminal, Windows 11, and more. It features a rich violet palette, subtle glowing effects, and custom icons.
      </li>
      <!-- Add more featured projects if any -->
    </ul>
  </div>
</template>

<script>
export default {
  name: "FavoriteItems",
};
</script>

<style scoped>
.favorite-items {
  background-color: #292d3e;
  color: #ffffff;
  padding: 20px;
  border-radius: 8px;
}

h2 {
  color: #c792ea;
}
</style>
