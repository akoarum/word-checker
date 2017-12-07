<template>
  <div class="c-btn-remove"><button type="button" @click="removeProject">プロジェクトを削除する</button></div>
</template>

<script>
import { mapState } from 'vuex';
import { UPDATE_SELECTED_PROJECT, REMOVE_PROJECT } from '../store/types';

export default {
  computed: {
    projectNames() {
      return this.$store.getters.projectNames;
    },
    ...mapState({
      selectedProject(state) {
        return state.selectedProject;
      },
    })
  },
  methods: {
    removeProject() {
      if (window.confirm(`${this.selectedProject}を削除します。よろしいですか？`)) {
        this.$store.dispatch(REMOVE_PROJECT, this.selectedProject)
          .then(() => {
            if (!this.projectNames.length) {
              this.$store.dispatch(UPDATE_SELECTED_PROJECT, '新しく追加');
              return;
            }
            this.$store.dispatch(UPDATE_SELECTED_PROJECT, '');
          });
      }
    }
  }
};
</script>
