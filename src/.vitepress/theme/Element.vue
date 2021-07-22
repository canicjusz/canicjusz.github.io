<script lang="ts">
import { defineAsyncComponent } from "vue";
import hideNavbars from "./helpers/hideNavbars.js";
import Hamburger from "./Hamburger.vue";
const Navbar = defineAsyncComponent(() => import("./Navbar.vue"));
import { ref } from "vue";
export default {
  props: {
    page: Object,
    level: Number,
  },
  components: {
    Navbar,
    Hamburger,
  },
  setup() {
    const isClicked = ref(false);
    return {
      isClicked,
      hideNavbars,
    };
  },
};
</script>

<template>
  <li class="navbar__element">
    <a
      v-if="page.type === 'file'"
      :href="page.href"
      class="navbar__link navbar__file"
      @click="hideNavbars"
      >{{ page.name }}</a
    >
    <div v-else class="navbar__folder" @click="isClicked = !isClicked">
      <div>
        {{ page.name }}
        <span
          class="navbar__triangle"
          :class="{ 'navbar__triangle--opened': isClicked }"
        ></span>
      </div>
      <ClientOnly>
        <teleport to="nav">
          <div class="navbar-container" :style="{ zIndex: level }">
            <div
              class="navbar"
              :class="{ 'navbar--show': isClicked }"
              :style="{ zIndex: level }"
            >
              <Hamburger
                :class="{ 'hamburger--clicked': isClicked }"
                @click="isClicked = !isClicked"
              />
              <Navbar :list="page.content" :level="level + 1" />
            </div>
          </div>
        </teleport>
      </ClientOnly>
    </div>
  </li>
</template>

<style></style>
