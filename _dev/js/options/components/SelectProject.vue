<template>
  <section id="project" class="c-sec">
    <HeadingLv2>プロジェクト</HeadingLv2>
    <SelectBox :datas="projects" />
    <AddProject v-if="selectedProject === '新しく追加'" />
  </section>
</template>

<script>
import { mapState } from 'vuex';
import HeadingLv2 from './HeadingLv2.vue';
import SelectBox from './SelectBox.vue';
import AddProject from './AddProject.vue';
import RemoveProject from './RemoveProject.vue';

export default {
  components: { HeadingLv2, SelectBox, AddProject, RemoveProject },
  computed: {
    projects() {
      const names = this.$store.getters.projectNames;
      return names.concat(['新しく追加']);
    },
    ...mapState({
      selectedProject: (state) => {
        return state.selectedProject;
      }
    })
  }
}
</script>
