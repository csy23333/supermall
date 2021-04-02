export default {
  cartLength(state) {
    let clength = 0;
    for (let item of state.cartlist) {
      //不能使用 item[count]
      clength += item.count;
    }
    return clength;
  },
  cartLists(state) {
    return state.cartlist;
  }
};
