<template>
  <div>
    <div style="margin-top: 200px;"></div>
    <Card v-for="project in projects"
  :key="project.id_project"
  :title="project.title"
  :pdf="project.pdf_path"/>
  </div>
</template>





<script>
import Card from '../components/ProjectFileCard.vue'

export default {
  components: {
    Card
  },
  data() {
    return {
      projects: []
    }
  },
  mounted() {
    this.projects = JSON.parse(localStorage.getItem('projects'))
    console.log("AQUI");
    console.log(this.projects)
    console.log("AQUI");
  },
}

</script>
