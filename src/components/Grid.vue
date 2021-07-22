<template>
  <div class="grid">
    <img
      class="grid__img"
      v-for="file in files"
      :srcset="file.path + ' 1x'"
      :src="file.path"
      :key="file.alt"
      height="320"
      width="240"
      :alt="file.alt"
    />
  </div>
</template>

<script lang="ts">
export default {
  props: {
    files: Array,
  },
};
</script>

<style scoped lang="sass">
.grid
  display: flex
  flex-direction: row
  align-items: center
  justify-content: center
  margin: 20px 0 20px 0

  &__img
    max-width: 100%
    object-fit: contain
    margin: 0 20px 0 0
</style>
