<template>
  <article>
    <PageHeader />
    <main class="l-main" role="main">
      <div class="l-main__inner">
        <RemoveProject v-show="selectedProject !== '' && selectedProject !== '新しく追加'" />
        <SelectProject />
        <WordContainer v-show="selectedProject !== '' && selectedProject !== '新しく追加'" />
        <RemoveProject v-show="selectedProject !== '' && selectedProject !== '新しく追加'" />
        <GlobalSetting />
      </div>
    </main>
    <PageFooter />
  </article>
</template>

<script>
import { mapState } from 'vuex';
import * as types from './store/types';
import PageHeader from './components/PageHeader.vue';
import PageFooter from './components/PageFooter.vue';
import SelectProject from './components/SelectProject.vue';
import RemoveProject from './components/RemoveProject.vue';
import WordContainer from './components/WordContainer.vue';
import GlobalSetting from './components/GlobalSetting.vue';

export default {
  components: { PageHeader, PageFooter, SelectProject, RemoveProject, WordContainer, GlobalSetting },
  created() {
    this.$store.dispatch(types.GET_PROJECTS);
    this.$store.dispatch(types.GET_SELECTED_PROJECT);
    this.$store.dispatch(types.GET_SETTING_META);
    this.$store.dispatch(types.GET_SETTING_ALT);
  },
  computed: {
    ...mapState({
      selectedProject: (state) => {
        return state.selectedProject;
      }
    })
  }
};
</script>
