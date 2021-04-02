import { ADD_COUNT, ADD_TO_CART } from "./mutation-type";

export default {
  // mutations 的唯一目的就是修改 state 中的状态
  // mutations 中的每个方法尽可能完成的事件比较单一
  [ADD_COUNT](state, payload) {
    payload.count++;
  },
  [ADD_TO_CART](state, payload) {
    payload.count = 1;
    payload.checked = true;
    state.cartlist.push(payload);
  }
};
