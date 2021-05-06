import { actionTypes } from "../Contants/ManageCart.Constant";

const initialState = { //state mặc định ban đầu của Reducer giỏ hàng
  cart: [],

}


export const ManageCartReducer = (state = initialState, action) => {

  switch (action.type) {

    case actionTypes.ADD_PRODUCT_CART: {
      //Xử lý khi gặp action.type = 'THEM_GIO_HANG' được dispatch lên
      // let gioHangCapNhat = [...state.gioHang];
      // state.product = action.product
      // let index = state.cart.findIndex(ele => ele.id === action.newProduct.id);
      let index = action.index;

      if (index === -1) { // chưa có sản phẩm trong giỏ hàng
        state.cart.push(action.newProduct);
      } else {
        if (action.isDeCrease) {
          state.cart[index].quantity -= 1;
        } else {
          state.cart[index].quantity += 1;
        }
      }
      state.cart = [...state.cart];

      localStorage.setItem('UserCart', JSON.stringify(state.cart));
      return { ...state }
    }

    case actionTypes.DELETE_PRODUCT_CART: {
      let cartTemp = [...state.cart.filter(ele => ele.id !== action.id)];
      state.cart = cartTemp;
      localStorage.setItem('UserCart', JSON.stringify(state.cart));
      return { ...state };

    }
    // case 'IN_DECREASE_QUANTITY': {
    //   let cartTemp = [...state.cart];
    //   let index = cartTemp.findIndex(ele => ele.id === action.id);
    //   //Dựa vào action.tangGiam => Xử lý tăng giảm số lượng
    //   if (action.isDown) {
    //     cartTemp[index].quantity += 1;
    //   } else {
    //     if (cartTemp[index].quantity > 1) {
    //       cartTemp[index].quantity -= 1;
    //     }
    //   }
    //   //Cập nhật lại state.gioHang
    //   state.cart = cartTemp;
    //   localStorage.setItem('UserCart', JSON.stringify(state.cart));
    //   return { ...state };

    // }
    case actionTypes.LOAD_CART: {
      state.cart = action.cart;
      return { ...state }
    }
    // case "DELETE-ALL-PRODUCT-CART": {
    //   localStorage.clear("UserCart");
    //   return { ...state }
    // }
    // case "INSERT_CART": {
    //   state.gioHang = action.arrayProduct;
    //   localStorage.setItem('UserCart', JSON.stringify(state.gioHang));
    //   return { ...state }
    // }
    case actionTypes.DELETE_ALL_PRODUCT_CART: {
      // let cartTemp = [...state.cart.filter(ele => ele.id !== action.id)];
      state.cart = [];
      localStorage.setItem('UserCart', JSON.stringify(state.cart));
      return { ...state };
    }
    default: {
      return { ...state }
    }
  }
}
