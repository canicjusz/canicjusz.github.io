<template>
  <select v-model="selected">
    <option
      v-for="translation in translations"
      :key="translation.lang"
      :value="translation.link"
    >
      {{ translation.lang }}
    </option>
  </select>
</template>

<script lang="ts">
import { useSiteData, useRouter } from "vitepress";
import { ref, watch } from "vue";
export default {
  setup() {
    const site = useSiteData();
    const { links } = site.value.customData;
    const router = useRouter();
    const path = router.route.data.relativePath;
    const pathWoExtension = path.slice(0, -3);
    const selected = ref("/" + pathWoExtension);
    const key = pathWoExtension.split("/").pop();
    const translations = links[key];
    const translationsAsObjects = translations.map((link) => ({
      lang: link.split("/")[2],
      link,
    }));
    watch(selected, (selected) => {
      router.go(selected);
    });
    return {
      translations: translationsAsObjects,
      selected,
    };
  },
};
</script>

<style></style>
