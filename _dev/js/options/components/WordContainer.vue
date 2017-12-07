<template>
  <section id="word-list" class="c-sec">
    <HeadingLv2>検索ワード</HeadingLv2>
    <WordList :words="words" v-show="words.length" />
    <AddWord />
  </section>
</template>

<script>
import { mapState } from 'vuex';
import HeadingLv2 from './HeadingLv2.vue';
import WordList from './WordList.vue';
import AddWord from './AddWord.vue';
import RemoveProject from './RemoveProject.vue';

export default {
  components: { HeadingLv2, WordList, AddWord, RemoveProject },
  computed: {
    words() {
      return this.$store.getters.words;
    }
  }
};
</script>
