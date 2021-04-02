<template>
  <nav-bar>
    <div slot="left" class="leftArrow" @click="back"></div>
    <div slot="center" class="title">
      <div
        v-for="(item, index) in title"
        class="title-item"
        :class="{ active: index === currentIndex }"
        @click="titleClick(index)"
      >
        {{ item }}
      </div>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from "../../../components/common/navbar/NavBar.vue";

export default {
  components: { NavBar },
  name: "DetailNavBar",
  data() {
    return {
      title: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
      this.$emit('titleClick',index)
    },
    back() {
      this.$router.back();
    }
  }
};
</script>

<style scoped>
.title {
  display: flex;
  font-size: 14px;
  /* background-color: #fff; */
}
.title-item {
  flex: 1;
}
.active {
  color: deeppink;
}
.leftArrow {
  width: 16px;
  height: 16px;
  margin: 14px auto;

  /* border: 1px solid #ccc; */
  border-left: 2px solid rgb(155, 153, 153);
  border-top: 2px solid rgb(155, 153, 153);
  transform: rotate(-45deg);
}
</style>
