<template>
  <div class="shopcart">
    <!-- 1.顶部 nav  -->
    <nav-bar class="shopcart-nav">
      <template v-slot:center>购物车({{ length }})</template>
    </nav-bar>

    <!-- 2.商品详情 -->
    <cart-list></cart-list>

    <!-- 3.底部汇总 -->
    <cart-bottom-nav></cart-bottom-nav>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar.vue";
import { mapGetters } from "vuex";
import CartList from "./childComps/CartList.vue";
import CartBottomNav from "./childComps/CartBottomNav.vue";

export default {
  name: "Shopcart",
  components: { NavBar, CartList, CartBottomNav },
  computed: {
    //1.数组写法
    // ...mapGetters(["cartLength"])

    //2.对象写法
    ...mapGetters({
      length: "cartLength"
    })
  }
};
</script>

<style scoped>
.shopcart-nav {
  position: relative;
  z-index: 2;
  background-color: var(--color-tint);
  color: #fff;
}
</style>
