<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-nav"
      @titleClick="titleClick"
      ref="detailNav"
    />
    <scroll class="content" ref="scroll" @scroll="detailScroll" :probe-type="3">
      <!-- <div>{{ $store.state.cartlist }}</div> -->
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info :param-info="paramInfo" ref="params" />
      <detail-comment-info :comment-info="commentInfo" ref="comments" />
      <goods-list :goods="recommends" ref="recommends" />
    </scroll>
    <back-top
      @click.native="backClick"
      v-show="isShowBackTop"
      class="zindex"
    ></back-top>

    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <!-- <toast :message="message" :show="isShow" class="detailToast"></toast> -->
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import {
  getDetail,
  Goods,
  Shop,
  GoodsParams,
  getRecommend
} from "@/network/detail.js";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import Scroll from "../../components/common/scroll/Scroll.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import GoodsList from "../../components/content/goods/GoodsList.vue";
import { debounce } from "@/common/utils";
import DetailBottomBar from "./childComps/DetailBottomBar.vue";
import BackTop from "../../components/content/backTop/BackTop.vue";
import { mapActions } from "vuex";
// import Toast from "../../components/common/toast/Toast.vue";
export default {
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    Scroll,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop
    // Toast
  },
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopYs: null,
      currentIndex: 0,
      isShowBackTop: "false",
      message: "",
      isShow: false
    };
  },
  created() {
    // 1.保存传入的 iid
    this.iid = this.$route.params.iid;

    // 2.根据 iid 请求详情数据
    getDetail(this.iid).then(res => {
      // 2.1.获取顶部轮播图数据
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      console.log(res);

      //2.2获取商品详情信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      //2.3获取店家信息
      this.shop = new Shop(data.shopInfo);

      //2.4保存商品的详情数据
      this.detailInfo = data.detailInfo;

      //2.5商品参数
      this.paramInfo = new GoodsParams(
        data.itemParams.info,
        data.itemParams.rule
      );

      //2.6评论信息
      if (data.rate.list.length !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });

    //3.获取详情页推荐数据
    getRecommend().then(res => {
      // console.log(res);
      this.recommends = res.data.list;
    });

    //4.给 themeTopYs 赋值
    this.getThemeTopYs = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comments.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
    }, 200);
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 200);
    this.$bus.$on("detailItemImageLoad", () => {
      refresh();
    });
  },

  methods: {
    ...mapActions(["addCart"]),
    imageLoad() {
      this.$refs.scroll.refresh();
      this.getThemeTopYs();
    },
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index]);
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 1000);
    },
    detailScroll(position) {
      this.isShowBackTop = -position.y > 1000;
      const positionY = -position.y;
      const length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          this.themeTopYs[i] <= positionY &&
          this.themeTopYs[i + 1] > positionY
        ) {
          // console.log(i);
          this.currentIndex = i;
          this.$refs.detailNav.currentIndex = this.currentIndex;
        }
      }
    },
    addToCart() {
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.lowNowPrice;
      product.iid = this.iid;
      // console.log("add success");
      // 传到 store 下的 actions 不使用 commit,而使用 dispatch
      this.addCart(product).then(res => {
        // this.message = res;
        // this.isShow = true;
        // setTimeout(() => {
        //   this.isShow = false;
        //   // this.message = "";
        // }, 400);
        this.$toast.show(res, 500);
      });
    }
  }
};
</script>

<style scoped>
.detail-nav {
  background-color: #fff;
}
.content {
  position: absolute;
  overflow: hidden;
  top: 44px;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  background-color: #fff;
}
.zindex {
  z-index: 2;
  right: 14px;
}
</style>
