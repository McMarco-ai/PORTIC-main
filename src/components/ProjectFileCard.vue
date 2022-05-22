<template>
  <div>
      <h2>{{this.title}}</h2>
      <a v-if="this.pdf == null" href="#"><h4>Não disponível</h4></a>
      <a target="_blank" :href="this.pdf" v-else><h4>Ver ficha</h4></a>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    pdf: String,
  },
};
</script>

<style lang="scss" scoped>
</style>