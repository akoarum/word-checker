<template>
  <transition-group name="wordList" tag="ul" class="c-list-word">
    <li class="c-list-word__item" v-for="word in words" :key="word">{{ word }}<button type="button" class="c-list-word__delete" @click="removeWord(word)">削除</button></li>
  </transition-group>
</template>

<script>
import { mapState } from 'vuex';
import { REMOVE_WORD } from '../store/types';

export default {
  props: [ 'words' ],
  computed: {
    ...mapState({
      selectedProject(state) {
        return state.selectedProject;
      }
    })
  },
  methods: {
    removeWord(word) {
      this.$store.dispatch(REMOVE_WORD, { name: this.selectedProject, word });
    }
  }
};
</script>
