<script lang="ts">
import { defineAsyncComponent } from "vue";
import { ref } from "vue";
const Element = defineAsyncComponent(() => import("./Element.vue"));
export default {
  components: {
    Element,
  },
  props: {
    list: Array,
    level: {
      type: Number,
      default: 2,
    },
  },
  setup() {
    const isClicked = ref(false);
    return {
      isClicked,
    };
  },
};
</script>

<template>
  <ul class="navbar__list">
    <Element
      v-for="page in list"
      :key="page.type + page.name"
      :page="page"
      :level="level"
    />
  </ul>
</template>
