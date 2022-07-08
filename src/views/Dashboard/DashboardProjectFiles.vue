<template>
  <div class="admin_tn flex">
    <DashboardHeader />
    <div class="admin_tn__panel">
      <div class="admin_tn__panel__overlay" @click="closePopup"></div>

      <DashboardTopHeader />

      <div class="dashboard_tools flex flex-ai-c flex-jc-sb">
        <div class="flex flex-ai-c">
          <input
            v-model="filesTxt"
            type="text"
            placeholder="fichas de projeto..."
          />
        </div>
      </div>

      <div
        style="width: 80%; margin: 0 auto;"
        v-for="project in projects"
        :key="project.id_project"
      >
        <Card :title="project.title" :pdf="project.pdf_path" />

        <button
          class="admin_unities__panel__grid__card__edit"
          @click="editProject"
        >
          Editar
        </button>

        <button
          class="admin_unities__panel__grid__card__remove"
          @click="showPopup(project.id_project)"
        >
          Remover
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "../../components/ProjectFileCard.vue";
import DashboardHeader from "@/components/Dashboard/DashboardHeader.vue";
import DashboardTopHeader from "@/components/Dashboard/DashboardTopHeader.vue";

export default {
  components: {
    Card,
    DashboardHeader,
    DashboardTopHeader
  },
  data: () => {
    return {
      filesTxt: "",
      projects: JSON.parse(localStorage.getItem("projects"))
    };
  }
};
</script>
