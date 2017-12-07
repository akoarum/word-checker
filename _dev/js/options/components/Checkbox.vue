<template>
  <label class="c-form-checkbox"><input type="checkbox" :name="name" /><span><slot></slot></span></label>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: [ 'name', 'metaValue' ],
};
</script>
