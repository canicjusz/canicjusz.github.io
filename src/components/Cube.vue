<script setup lang="ts">
import { ref } from "vue";
const show = ref([true, false, false]);
function* generator() {
  let index = 1;
  while (index < show.value.length) {
    const previousIndex = index - 1 >= 0 ? index - 1 : show.value.length - 1;
    show.value[previousIndex] = false;
    show.value[index] = true;
    if (index === show.value.length - 1) {
      yield (index = 0);
    } else {
      yield index++;
    }
  }
}
const gen = generator();
setInterval(() => gen.next().value, 2000);
</script>
<template>
  <div class="scene">
    <div
      class="cube"
      :class="{
        'show-top': show[2],
        'show-left': show[1],
        'show-right': show[0],
      }"
    >
      <div class="cube__face cube__face--right">Welcome</div>
      <div class="cube__face cube__face--left">Witam</div>
      <div class="cube__face cube__face--top">Bonvenon</div>
    </div>
  </div>
</template>
<style scoped lang="sass">
$gray: #ECECEC
$black: #222831

.scene
  width: 100%
  perspective: 375px
  display: flex
  justify-content: center
  align-items: center
  width: 100%
  height: 400px

.cube
  width: 300px
  height: 300px
  position: relative
  transform-style: preserve-3d
  transform: translateZ(-150px)
  transition: transform 1s

  &.show-right
    transform: translateZ(-150px) rotateY(0deg)

  &.show-left
    transform: translateZ(-150px) rotateY(90deg)

  &.show-top
    transform: translateZ(-150px) rotateX(-90deg)

  &__face
    display: flex
    justify-content: center
    align-items: center
    position: absolute
    width: 310px
    height: 310px
    box-sizing: border-box
    border: 5px solid $gray
    font-size: 3.5rem
    font-weight: bold
    color: $gray
    background: $black
    text-align: center

    &--right
      transform: rotateY(0deg) translateZ(150px)

    &--left
      transform: rotateY(-90deg) translateZ(150px)

    &--top
      transform: rotateX(90deg) translateZ(150px)

@media only screen and (max-width: 500px)
  .scene
    height: 275px
    perspective: 250px

  .cube
    width: 200px
    height: 200px
    transform: translateZ(-100px)

    &.show-right
      transform: translateZ(-100px) rotateY(0deg)

    &.show-left
      transform: translateZ(-100px) rotateY(90deg)

    &.show-top
      transform: translateZ(-100px) rotateX(-90deg)

    &__face
      width: 206px
      height: 206px
      border: 3px solid $gray
      font-size: 2.5rem

      &--right
        transform: rotateY(0deg) translateZ(100px)

      &--left
        transform: rotateY(-90deg) translateZ(100px)

      &--top
        transform: rotateX(90deg) translateZ(100px)
</style>
