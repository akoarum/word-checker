<template>
  <div :class="classHandle" class="c-box-add">
    <input type="text" placeholder="プロジェクト名" v-model="name" @keyup.13.shift="addProject" />
    <button type="button" @click="addProject" :disabled="btnDisabled">追加する</button>
    <p class="c-txt-desc">シフト＋エンターキーでも追加できます。</p>
    <p v-if="errorText">{{ errorText }}</p>
  </div>
</template>

<script>
import * as types from '../store/types';

export default {
  data() {
    return {
      name: '',
      errorText: ''
    }
  },
  computed: {
    projectNames() {
      return this.$store.getters.projectNames;
    },
    classHandle() {
      return {
        'is-error': (this.errorText) ? true : false
      };
    },
    btnDisabled() {
      return (this.name === '') ? true : false;
    }
  },
  methods: {
    addProject() {
      if (this.isDepulicated(this.name)) {
        this.errorText = 'そのプロジェクトはすでに存在します。';
        return;
      }

      this.$store.dispatch(types.ADD_PROJECT, this.name)
        .then(() => {
          this.$store.dispatch(types.UPDATE_SELECTED_PROJECT, this.name);
        });
    },
    isDepulicated(name) {
      for (let i = 0, len = this.projectNames.length; i < len; i++) {
        if (this.projectNames[i] === name) {
          return true;
        }
      }
      return false;
    }
  }
};
</script>
