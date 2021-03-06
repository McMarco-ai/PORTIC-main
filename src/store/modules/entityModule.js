import { entityConfig } from "../../config/api/entity";

export const entityModule = {
    state: {
        lang: "en",
        data: [],
        dataStatus: "",
        dataBody: {
            selectedLang: ""
        },
        entityId: null,
        focuses: [],
        menus: [],
        menuStatus: null,
        selectedMenuId: null,
        secEntities: [],
        selectedSecEntityId: null
    },
    mutations: {
        SET_DATA(state, payload) {
            state.data = payload.data;
            state.dataStatus = payload.status;
        },
        SET_ENTITY_ID(state, payload) {
            state.entityId = payload.entity_id;
        },
        SET_SELECTED_LANG(state, payload) {
            state.dataBody.selectedLang = payload.lang;
        },
        SET_ENTITY_FOCUSES(state, payload) {
            state.focuses = payload.focuses;
        },
        SET_MENUS(state, payload) {
            state.menus = payload.menus;
            state.menuStatus = payload.status;

            // localStorage.setItem("menus", JSON.stringify(state.menus));
            console.log(state.menus);
        },
        SET_SELECTED_MENU(state, payload) {
            state.selectedMenuId = payload.id;
        },
        SET_SEC_ENTITIES(state, payload) {
            state.secEntities = payload.secEntities;
        },
        SET_SELECTED_SEC_ENTITY(state, payload) {
            state.selectedSecEntityId = payload.id;
        }
    },
    actions: {
        async setEntityId({ commit }) {
            commit("SET_ENTITY_ID", await entityConfig.getEntityId());
        },
        async setData({ commit, state }) {
            commit(
                "SET_DATA",
                await entityConfig.getEntityData(
                    JSON.parse(localStorage.getItem("vuex")).langModule.lang,
                    state.entityId
                )
            );
        },
        async setMenus({ commit, state }) {
            commit(
                "SET_MENUS",
                await entityConfig.getEntitiesMenus(
                    JSON.parse(localStorage.getItem("vuex")).langModule.lang,
                    state.entityId
                )
            );
        },
        async setSecEntities({ commit }) {
            commit("SET_SEC_ENTITIES", await entityConfig.getSecEntities());
        }
    },
    getters: {
        getSelectedLang: state => state.dataBody.selectedLang,
        getEntityId: state => {
            return state.entityId;
        },
        getEntityStatus: state => state.dataStatus,
        getEntityData: state => {
            console.log("dsadsad");
            console.log(state.data.menus[7])
            return state.data != "" ? state.data : [];
        },
        getEntityDataSliced: state => {
            return state.data != "" ?
                state.data.social_medias.slice(
                    0,
                    state.data.social_medias.length / 2 + 1
                ) : [];
        },
        getEntityDataSliced2: state => {
            return state.data != "" ?
                state.data.social_medias.slice(
                    state.data.social_medias.length / 2 + 1,
                    state.data.length
                ) : [];
        },
        getEntityImage: state => {
            return state.data != "" ? state.data.img.data : "";
        },
        getEntityPhoneNumber: state => {
            return state.data != "" ? state.data.contacts[0].number : "";
        },
        getEntityPhoneNumberLink: state => {
            let number = state.data != "" ? state.data.contacts[0].number : "";

            return number;
        },
        getEntityEmail: state => {
            return state.data != "" ? state.data.emails[0].email : "";
        },
        getEntitySocials: state => {
            return state.data.social_medias != "" ? state.data.social_medias : [];
        },
        getEntityMenus: state => {
            return state.data.menus != "" ? state.data.menus : []
        },
        getEntitySlogan: state => {
            return state.data != "" ? state.data.designation : "Carregar...";
        },
        getEntityHighlights: state =>
            state.data != "" ? state.data.highlights : "Carregar...",
        getEntityFocuses: state => (state.focuses != "" ? state.focuses : []),
        getMenus: state => (state.menus != "" ? state.menus : []),
        getMenuDescByMenuID: state => id =>
            state.menus.find(menu => menu.id_menu === id),
        getSelectedMenuID: state => state.selectedMenuId,

        // Secondary entities
        getSecondaryEntities: state =>
            state.secEntities !== "" ? state.secEntities : [],
        getMenuStatus: state => state.menuStatus,
        getCurrentMenuInfo: state =>
            state.menus
            .filter(menu => menu.id_menu === state.selectedMenuId)
            .find(m => m.id_menu === state.selectedMenuId)
    }
};