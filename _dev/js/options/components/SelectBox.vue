<template>
  <div class="c-form-select">
    <select v-model="project">
      <option value="">選択してください</option>
      <option v-for="data in datas" :key="data" :value="data">{{ data }}</option>
    </select>
  </div>
</template>

<script>
import { UPDATE_SELECTED_PROJECT } from '../store/types';

export default {
  props: [ 'datas' ],
  updated() {
    if (!this.projectNames.length) {
      this.$store.dispatch(UPDATE_SELECTED_PROJECT, '新しく追加');
    }
  },
  computed: {
    project: {
      get() {
        return this.$store.state.selectedProject;
      },
      set(value) {
        this.$store.dispatch(UPDATE_SELECTED_PROJECT, value);
      }
    },
    projectNames() {
      return this.$store.getters.projectNames;
    }
  }
};
</script>
