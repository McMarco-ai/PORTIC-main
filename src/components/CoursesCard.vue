<template>
  <div
    class="courses__grid__card"
    :id="card_id"
    @click="expand(index)"
    v-on:click="show = !show"
  >
    <div class="flex flex-ai-c flex-jc-sb">
      <h2 class="courses__grid__card__title">{{ courseName }}</h2>
      <button class="courses__grid__card__button" :id="button_id">
        <div class="courses__grid__card__button__lines"></div>
        <div class="courses__grid__card__button__lines"></div>
      </button>
    </div>
    <div class="courses__grid__card__toggle collapse">
      <div class="courses__grid__card__content">
        <p
          class="courses__grid__card__content__paragraph"
          v-html="courseDesc"
        ></p>
        <div class="connections__info">
          <div v-if="projects.length > 0">
            <u>{{ $t("projects.title") }}:</u>
            <ul>
              <li
                v-for="project in projects"
                :key="project.id_project"
                @click="openProjectPage(project.title, project.id_project)"
              >
                {{ project.title }}
              </li>
            </ul>
          </div>
          <div v-if="unities.length > 0">
            <u>{{ $t("unities.title") }}:</u>
            <ul>
              <li
                v-for="unity in unities"
                :key="unity.id_unity"
                @click="openSlide(unity.id_unity, unity.designation)"
              >
                {{ unity.designation }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- <div class="courses__grid__card__buttons flex flex-ai-c flex-jc-sb">
        <div class="grid">
          <KnowMoreBtn type="know__more light" text="Application" />
          <KnowMoreBtn type="know__more light" text="Notice" />
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import KnowMoreBtn from "@/components/KnowMoreBtn.vue";
export default {
  name: "CoursesCard",
  props: {
    courseName: {
      type: String,
      required: true,
    },
    button_id: {
      type: String,
      required: true,
    },
    courseDesc: {
      type: String,
      required: true,
    },
    card_id: {
      type: String,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    areas: {
      type: Array,
      required: false,
    },
    careers: {
      type: Array,
      required: false,
    },
    units: {
      type: Array,
      required: false,
    },
  },
  components: {
    // KnowMoreBtn
  },
  data: () => {
    return {
      show: false,
      unities: null,
    };
  },
  computed: {
    ...mapGetters(["getProjects", "getUnities"]),
    projects() {
      return this.getProjects;
    },
    getUnitiesArr() {
      return this.getUnities;
    },
  },

  methods: {
    openSlide(id, title) {
      this.$store.commit("SET_SELECTED_UNITY_ID", { id: id });

      this.$router.push({
        name: "UnitiesPage",
        params: { name: title },
      });
    },
    openProjectPage(name, id) {
      this.$store.commit("SET_SELECTED_PROJECT_ID", {
        id: id,
      });

      this.$router.push({
        name: "Project",
        params: { name: name },
      });
    },
    formatRouterPath(title) {
      return title.replace(/\s/g, "%20");
    },
    getUnityId(id, title) {
      console.log(id, title);
      this.$store.commit("SET_SELECTED_UNITY_ID", { id: id });

      let formatedTitle = this.formatRouterPath(title);

      if (this.$route.path != `/unities/${formatedTitle}`) {
        this.$router.push({
          name: "UnitiesPage",
          params: { name: title },
        });
      }
    },
    expand(index) {
      this.selectedItem = index;

      //   let card = document.querySelector(`#card_${index}`);

      let lines = document.querySelectorAll(
        `#card_${index} .courses__grid__card__button__lines`
      );

      lines.forEach((line) => {
        line.classList.toggle("minus");
      });

      let card = document.querySelector(`#card_${index}`);

      let card__toggle = document.querySelector(
        `#card_${index} .courses__grid__card__toggle`
      );

      card.classList.toggle("open");

      if (card.classList.contains("open")) {
        card__toggle.style.display = "block";

        console.log(card__toggle);

        let height = card__toggle.clientHeight;

        console.log(height);

        setTimeout(() => {
          card__toggle.style.height = `${height + 32}px`;
          card__toggle.style.paddingTop = `32px`;
          card__toggle.style.display = "";
        }, 1);

        card__toggle.classList = "courses__grid__card__toggle collapsing";

        setTimeout(() => {
          card__toggle.classList = "courses__grid__card__toggle open";
        }, 300);
      } else {
        card__toggle.classList = "courses__grid__card__toggle collapsing";

        setTimeout(() => {
          card__toggle.style.height = "0px";
          card__toggle.style.paddingTop = `0px`;
        }, 1);

        setTimeout(() => {
          card__toggle.classList = "courses__grid__card__toggle collapse";
          card__toggle.style.height = "";
          card__toggle.style.paddingTop = "";
        }, 300);
      }
    },
  },
  async created() {
    this.unities = this.getUnities;
    this.$store.commit("SET_SELECTED_UNITIES_LANG", {
      lang: this.$i18n.locale == "en" ? "en" : "pt",
    });
    try {
      // await this.$store.dispatch("setEntityId");
      await this.$store.dispatch("setUnities");
    } catch (error) {
      return error;
    }
  },
};
</script>
