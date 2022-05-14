<template>
  <div>
    <div class="news_catalog">
      <SubHeaderTitle :text="$t('news.title')" />

      <div class="news__cards grid">
        <NewsCard
          v-for="news in setNews"
          :key="news.id_news"
          :image="news.cover"
          :title="news.title"
          :content="news.description"
          :date="news.published_date"
          :id="news.id_news"
          @click.native="getNewsId"
        />
      </div>
    </div>
    
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SubHeaderTitle from "@/components/SubHeaderTitle.vue";
import NewsCard from "@/components/NewsCard.vue";


export default {
  components: {
    SubHeaderTitle,
    NewsCard
  },
  created() {
    console.log(this.getNews);
  },
  computed: {
    ...mapGetters(["getNews", "getNewsById", "getSelectedNewsId"]),
    setNews() {
      return this.getNews;
    }
  },
  methods: {
    getNewsId() {
      let newsId = this.getSelectedNewsId;

      if (newsId != null) {
        this.getSelectedNews(newsId);
      }
    },
    getSelectedNews(id) {
      let news = this.getNewsById(id);

      this.newsSelectedTitle = news.title;
      this.newsSelectedContent = news.content;
      this.author = news.author;
    }
  }
};
</script>
