<template>
  <div class="c-form-radio">
    <label><input type="radio" :name="name" value="true" :checked="value" @click="checkHandler(true)" /><span>はい</span></label>
    <label><input type="radio" :name="name" value="false" :checked="!value" @click="checkHandler(false)" /><span>いいえ</span></label>
  </div>
</template>

<script>
export default {
  props: [ 'name', 'value' ],
  methods: {
    checkHandler(value) {
      this.$emit('change', value);
    }
  }
}
</script>
