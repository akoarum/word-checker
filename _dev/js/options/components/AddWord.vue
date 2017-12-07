<template>
  <div class="c-box-add" :class="classHandler">
    <input type="text" placeholder="ワード" v-model="word" @keyup.shift.13="addWord" />
    <button type="button" @click="addWord" :disabled="btnDisabled">追加する</button>
    <p class="c-txt-desc">シフト＋エンターキーでも追加できます。</p>
    <p class="c-form-error" v-if="errorText">{{ errorText }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { ADD_WORD } from '../store/types';

export default {
  data() {
    return {
      word: '',
      errorText: ''
    };
  },
  computed: {
    words() {
      return this.$store.getters.words;
    },
    classHandler() {
      return {
        'is-error': (this.errorText) ? true : false
      };
    },
    btnDisabled() {
      return (this.word === '') ? true : false;
    },
    ...mapState({
      selectedProject(state) {
        return state.selectedProject;
      }
    })
  },
  methods: {
    addWord() {
      if (this.selectedProject === '' || this.selectedProject === '新しく追加') {
        this.errorText = '存在しないプロジェクトです。';
        return;
      }

      if (this.isDepulicated(this.word)) {
        this.errorText = 'すでに存在するワードです。';
        return;
      }

      this.$store.dispatch(ADD_WORD, { name: this.selectedProject, word: this.word })
        .then(() => {
          this.word = '';
          this.errorText = '';
        });
    },
    isDepulicated(word) {
      for (let i = 0, len = this.words.length; i < len; i++) {
        if (this.words[i] === word) {
          return true;
        }
      }
      return false;
    }
  }
};
</script>
