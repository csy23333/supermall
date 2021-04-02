<template>
  <transition name="fade">
    <div id="toast" v-show="isShow">
      <div>
        {{ message }}
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Toast",
  props: {
    // message: {
    //   type: String,
    //   default: ""
    // },
    // show: {
    //   type: Boolean,
    //   default: false
    // }
  },
  data() {
    return {
      message: "",
      isShow: false
    };
  },
  methods: {
    show(message, duration) {
      this.message = message;
      this.isShow = true;
      setTimeout(() => {
        this.isShow = false;
      }, duration);
    }
  }
};
</script>

<style scoped>
#toast {
  position: fixed;
  z-index: 9;
  color: #fff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.75);
  padding: 8px 10px;
  border-radius: 7px;
  /* transition: all 5s; */
}
/* .fade-enter-to {
  transition: all 0.5s ease-out;
} */
.fade-leave-to {
  transition: all 1s ease-in;
  opacity: 0.5;
}
</style>
