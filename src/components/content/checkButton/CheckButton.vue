<template>
  <div
    class="checkbutton"
    :class="{ active: isCheck }"
    @click="childCheckClick"
  >
    <img src="@/assets/img/cart/tick.svg" alt="" />
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isCheck: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    childCheckClick() {
      this.$emit("checkBlick");
    }
  }
};
</script>

<style scoped>
.checkbutton {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 2px solid #aaa;
}

.active {
  background-color: red;
  border-color: red;
}
</style>
