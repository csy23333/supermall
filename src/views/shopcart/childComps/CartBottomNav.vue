<template>
  <div class="cart-bottom-nav">
    <div class="cart-bottom">
      <check-button
        class="check-button"
        :is-check="isSelectAll"
        @click.native="checkClick"
      ></check-button>
      <span>全选</span>
    </div>
    <div class="total">合计:{{ totalPrice }}</div>
    <div class="calculate">去结算({{ checkLength }})</div>
  </div>
</template>

<script>
import CheckButton from "../../../components/content/checkButton/CheckButton.vue";
export default {
  name: "CartBottomNav",
  components: {
    CheckButton
  },
  computed: {
    totalPrice() {
      return this.$store.state.cartlist
        .filter(item => {
          return item.checked;
        })
        .reduce((preValue, item) => {
          return preValue + item.price * item.count;
        }, 0)
        .toFixed(2);
    },
    checkLength() {
      return this.$store.state.cartlist.filter(item => item.checked).length;
    },
    isSelectAll() {
      if (this.$store.state.cartlist.length === 0) return false;
      return !this.$store.state.cartlist.find(item => !item.checked);
    }
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        this.$store.state.cartlist.forEach(item => (item.checked = false));
      } else {
        this.$store.state.cartlist.forEach(item => (item.checked = true));
      }
    }
  }
};
</script>

<style scoped>
.cart-bottom-nav {
  display: flex;
  z-index: 5;
  position: absolute;
  /* top: 76.5vh; */
  bottom: 56px;
  left: 0;
  right: 0;
  height: 40px;
  background-color: #ffe;
  align-items: center;
  line-height: 40px;
  font-size: 14px;
  /* box-shadow: 0 2px 4px 2px rgba(0, 0, 0, 0.1); */
  /* justify-content: center; */
  /* margin-left: 10px; */
}
.cart-bottom {
  display: flex;
  align-items: center;
  width: 90px;
}
.check-button {
  width: 20px;
  height: 20px;
  margin-left: 10px;
  margin-right: 5px;
}
.total {
  flex: 1;
}
.calculate {
  width: 90px;
  background-color: cyan;
  text-align: center;
}
</style>
