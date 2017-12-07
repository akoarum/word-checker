<template>
  <section class="c-sec">
    <HeadingLv2>共通設定</HeadingLv2>
    <ul class="c-list-setting">
      <li class="c-list-setting__item">
        <span class="c-list-setting__label">meta要素、title要素を対象に含める</span>
        <RadioSwitch name="meta" :value="meta" @change="metaHandler" />
      </li>
      <li class="c-list-setting__item">
        <span class="c-list-setting__label">alt属性、title属性も対象に含める</span>
        <RadioSwitch name="alt" :value="alt" @change="altHandler" />
      </li>
    </ul>
  </section>
</template>

<script>
import * as types from '../store/types';
import { mapState } from 'vuex';
import HeadingLv2 from './HeadingLv2.vue';
import RadioSwitch from './RadioSwitch.vue';
import Checkbox from './Checkbox.vue';

export default {
  components: { HeadingLv2, RadioSwitch, Checkbox },
  computed: {
    ...mapState({
      meta: (state) => {
        return state.meta;
      },
      alt: (state) => {
        return state.alt;
      }
    })
  },
  methods: {
    metaHandler(value) {
      this.$store.dispatch(types.SET_SETTING_META, value);
    },
    altHandler(value) {
      this.$store.dispatch(types.SET_SETTING_ALT, value);
    }
  }
};
</script>
