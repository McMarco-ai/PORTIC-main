import { mediasConfig } from "../../config/api/medias";

export const mediaModule = {
  state: {
    medias: [],
    selectedId: null,
    dataBody: {
      selectedLang: ""
    }
  },
  mutations: {
    SET_SELECTED_MEDIA_ID(state, payload) {
      state.selectedId = payload.id;
    },
    SET_MEDIAS(state, payload) {
      state.medias = payload.medias;
      state.dataStatus = payload.status;

      console.log(state.medias);
    },
    SET_SELECTED_MEDIAS_LANG(state, payload) {
      state.dataBody.selectedLang = payload.lang;
    }
  },
  actions: {
    async setMedias({ commit, state }) {
      commit(
        "SET_MEDIAS",
        await mediasConfig.getMedias(
          state.dataBody.selectedLang,
          JSON.parse(localStorage.getItem("vuex")).entityModule.entityId
        )
      );
    }
  },
  getters: {
    getMedias: state => {
      return state.medias != "" ? state.medias : [];
    },
    getMediasLength: state => {
      return state.medias != ""
        ? state.medias.length != undefined
          ? state.medias.length
          : 0
        : 0;
    },
    getNMedias: state => state.medias.length,
    getSelectedMediaByID: state => state.selectedId,
    getMediaByID: state => id => state.medias.find(n => n.id_media == id)
  }
};
