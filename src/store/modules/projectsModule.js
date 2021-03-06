import { projectsConfig } from "../../config/api/projects";
// import { entityModule } from "./entityModule";

export const projectsModule = {
  state: {
    projects: [],
    projectsStatus: null,
    selectedId: null,
    dataBody: {
      selectedLang: ""
    }
  },
  mutations: {
    SET_PROJECTS(state, payload) {
      state.projects = payload.projects;
      state.projectsStatus = payload.status;

      localStorage.setItem("projects", JSON.stringify(state.projects));
    },
    SET_SELECTED_PROJECT_ID(state, payload) {
      state.selectedId = payload.id;

      console.log(state.selectedId);
    },
    SET_SELECTED_PROJECTS_LANG(state, payload) {
      state.dataBody.selectedLang = payload.lang;
    }
  },
  actions: {
    async setProjects({ commit, state }) {
      commit(
        "SET_PROJECTS",
        await projectsConfig.getProjects(
          state.dataBody.selectedLang,
          JSON.parse(localStorage.getItem("vuex")).entityModule.entityId
        )
      );
    }
  },
  getters: {
    getProjects: state => (state.projects != "" ? state.projects : []),
    getProjectsLength: state => state.projects.length,
    getProjectsStatus: state => state.projectsStatus,
    getProjectByName: state => initials =>
      state.projects.find(p => p.initials === initials),
    getSelectedProjectByID: state => state.selectedId,
    getProjectByID: state => id => state.projects.find(n => n.id_project == id)
  }
};
