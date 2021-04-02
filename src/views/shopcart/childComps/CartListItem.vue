<template>
  <div id="shop-item">
    <div class="check-button">
      <check-button
        :is-check="product.checked"
        @checkBlick="checkClick"
      ></check-button>
    </div>
    <div class="item-img">
      <img :src="product.image" alt="" />
    </div>
    <div class="item-info">
      <div class="item-title">{{ product.title }}</div>
      <div class="item-desc">{{ product.desc }}</div>
      <div class="info-bottom">
        <div class="item-price left">￥{{ product.price }}</div>
        <div class="item-count right">x{{ product.count }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "../../../components/content/checkButton/CheckButton.vue";
export default {
  name: "CartListItem",
  components: {
    CheckButton
  },
  props: {
    product: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    checkClick() {
      this.product.checked = !this.product.checked;
    }
  }
};
</script>

<style scoped>
#shop-item {
  display: flex;
  width: 100%;
  padding: 5px;
  /* font-size: 0; */
  border-bottom: 1px solid #ccc;
}
.item-img {
  padding: 5px;
}
.item-img img {
  width: 80px;
  border: 2px solid red;
}
.item-info {
  overflow: hidden;
  font-size: 16px;
  color: #333;
  padding: 5px 10px;
  position: relative;
}
.item-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/* desc 两行显示 */
.item-desc {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.item-info .item-desc {
  font-size: 14px;
  color: #666;
  margin-top: 15px;
}
.info-bottom {
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
}
.item-price {
  color: orangered;
}
.check-button {
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
