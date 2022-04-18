<script lang="ts">
import Navbar from "./Navbar.vue";
import Hamburger from "./Hamburger.vue";
import hideNavbars from "./helpers/hideNavbars.js";
import { useSiteData } from "vitepress";
import { ref } from "vue";
export default {
  components: {
    Navbar,
    Hamburger,
  },
  setup() {
    const site = useSiteData();
    const { pages } = site.value.customData;
    const isClicked = ref(false);
    return {
      pages,
      isClicked,
      hideNavbars,
    };
  },
};
</script>
<template>
  <nav>
    <div class="navbar-container">
      <Hamburger
        :class="{ 'hamburger--clicked': isClicked }"
        @click="isClicked = !isClicked"
      />
      <div class="navbar navbar-first" :class="{ 'navbar--show': isClicked }">
        <Navbar :list="pages" />
      </div>
    </div>
  </nav>
  <main @click="hideNavbars">
    <div class="content-container">
      <Content />
    </div>
  </main>
</template>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Lora&family=Roboto&display=swap')

$gray: #ECECEC
$dark-gray: #DBDBDB
$black: #222831
$blue: #476b8f
$border-shit: 1px solid $black

html, body
  overflow-x: hidden
  background: $gray
  margin: 0
  padding: 0
  width: 100%
  height: 100%

#app
  display: grid
  grid-template-columns: 60px auto

.hamburger
  z-index: 2
  display: flex
  cursor: pointer
  padding: 10px
  position: fixed
  width: 40px
  box-sizing: content-box
  height: 40px
  justify-content: space-around
  flex-direction: column

  &__cheese, &__meat, &__bun
    pointer-events: none
    height: 5px
    width: 40px
    background: $black
    transition: transform 0.3s ease-in-out

  &--clicked .hamburger__cheese
    transform: translateY(14px) rotate(45deg)

  &--clicked .hamburger__meat
    transform: rotate(-45deg)

  &--clicked .hamburger__bun
    transform: translateX(-50px)

.navbar
  z-index: 1
  border-right: $border-shit
  font: normal 1.4rem 'Roboto', serif
  display: flex
  flex-direction: column
  box-sizing: border-box
  width: 240px
  height: 100vh
  position: fixed
  transition: transform 0.6s ease-in-out
  background: $gray
  left: -240px

  &-first
    left: -180px

    &.navbar--show
      transform: translateX(180px)

  &__list
    padding: 60px 0 0 0
    margin: 0

  &__element
    cursor: pointer
    user-select: none
    text-transform: capitalize
    border-top: $border-shit
    box-sizing: border-box
    min-height: 50px

    &:last-child
      border-bottom: $border-shit

  &__file, &__folder
    box-sizing: border-box
    padding: 10px
    width: 100%
    height: 100%
    display: flex
    align-items: center

  &__triangle
    display: inline-block
    background: $black
    margin: 0
    height: 12px
    width: 12px
    clip-path: polygon(100% 0, 0 0, 50% 100%)
    transition: .4s transform ease-in-out
    &--opened
      transform: rotate(-90deg)

  &--show
    transform: translateX(240px)

.content-container
  width: 100%
  max-width: 960px

.index
  &__title
    margin: 10px
    padding-bottom: 10px
    border-bottom: $border-shit

a
  color: $blue
  &:visited
    color: purple

main
  box-sizing: border-box
  display: flex
  justify-content: center
  min-height: 100vh
  font: 400 1.4rem 'Roboto', sans-serif
  padding: 20px

  h1

    font: 300 3rem 'Lora', serif

  h2
    font: 300 2rem 'Lora', serif

  li, p
    margin: 10px 0 10px 0

  ul
    margin: 0

  h1, h2
    margin: 20px 0 20px 0

.center
  width: 100%
  display: grid
  justify-content: center
  text-align: center

  img
    max-width: 100%

table
  min-width: 700px
  border-collapse: collapse
  border: $border-shit
  border-bottom: none
  td, th
    border-left: $border-shit
    padding: 5px
    &:first-child
      border-left: none
  tr
    border-bottom: $border-shit
  img
    width: 100%
.table-container
  width: 100%
  overflow: auto

@media only screen and (max-width: 1000px)
  main
    width: calc(100vw - 61px)
    padding: 10px
    .grid
      flex-direction: column
      &__img
        margin: 20px 0 0 0
        &:first-child
          margin: 0

@media only screen and (max-width: 500px)
  main
    font: 400 1.2rem 'Roboto', sans-serif

    h1
      font: 300 2.5rem 'Lora', serif

    h2
      font: 300 1.8rem 'Lora', serif

@media only screen and (max-width: 280px)
  main
    p, a, li
      word-break: break-all
</style>
