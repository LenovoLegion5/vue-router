<template>
  <div :class="{ blue: message === 'success', brown: message === 'error' }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ["message"],
};
</script>

<style scoped>
.blue {
  color: blue;
}
.brown {
  color: brown;
}
</style>
