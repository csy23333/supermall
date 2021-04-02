<template>
  <div class="cartlist">
    <scroll class="content" ref="scroll">
      <cart-list-item
        v-for="(item, index) in cartLists"
        :product="item"
        :key="index"
        >{{ item }}</cart-list-item
      >
    </scroll>
  </div>
</template>

<script>
import Scroll from "../../../components/common/scroll/Scroll.vue";
import { mapGetters } from "vuex";
import CartListItem from "./CartListItem.vue";
export default {
  components: { Scroll, CartListItem },
  name: "CartList",
  computed: {
    ...mapGetters(["cartLists"])
  },
  activated() {
    // console.log("----");
    this.$refs.scroll.refresh();
  }
};
</script>

<style scoped>
.content {
  position: absolute;
  /* top: 44px; */
  overflow: hidden;
  top: 44px;
  bottom: 96px;
  left: 0;
  right: 0;
}
</style>
