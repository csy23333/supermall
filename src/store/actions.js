import { ADD_COUNT, ADD_TO_CART } from "./mutation-type";

export default {
  addCart(context, payLoad) {
    return new Promise((resolve, reject) => {
      //1.判断原数组中是否含有相同 iid 的数组,如果有,则返回这个 item
      let oldProduct = context.state.cartlist.find(
        item => item.iid === payLoad.iid
      );
      if (oldProduct) {
        // oldProduct.count += 1;
        context.commit(ADD_COUNT, oldProduct);
        resolve("您当前商品数量加1");
      } else {
        // payLoad.count = 1;
        // state.cartlist.push(payLoad);
        context.commit(ADD_TO_CART, payLoad);
        resolve("您添加了新的商品");
      }
    });
  }
};
