const initialState = { //state mặc định ban đầu của Reducer giỏ hàng
  cart: [],

}


export const ManageCartReducer = (state = initialState, action) => {

  switch (action.type) {

    case 'ADD_TO_CART': {
      //Xử lý khi gặp action.type = 'THEM_GIO_HANG' được dispatch lên
      // let gioHangCapNhat = [...state.gioHang];
      state.product = action.product
      let index = state.cart.findIndex(ele => ele.id === action.newProduct.id);
      if (index === -1) {

        state.cart.push(action.newProduct);
      } else {

        state.cart[index].quantity += 1;
      }
      state.cart = [...state.cart];

      localStorage.setItem('UserCart', JSON.stringify(state.cart));
      return { ...state }
    }

    case 'DELETE_PRODUCT_CART': {
      let cartTemp = [...state.cart.filter(ele => ele.id !== action.id)];
      state.cart = cartTemp;
      localStorage.setItem('UserCart', JSON.stringify(state.cart));
      return { ...state };

    }
    case 'IN_DECREASE_QUANTITY': {
      let cartTemp = [...state.cart];
      let index = cartTemp.findIndex(ele => ele.id === action.id);
      //Dựa vào action.tangGiam => Xử lý tăng giảm số lượng
      if (action.isDown) {
        cartTemp[index].quantity += 1;
      } else {
        if (cartTemp[index].quantity > 1) {
          cartTemp[index].quantity -= 1;
        }
      }
      //Cập nhật lại state.gioHang
      state.cart = cartTemp;
      localStorage.setItem('UserCart', JSON.stringify(state.cart));
      return { ...state };

    }
    case 'Load_Cart': {
      state.cart = action.cart;
      return { ...state }
    }
    case "DELETE-ALL-PRODUCT-CART": {
      localStorage.clear("UserCart");
      return { ...state }
    }
    case "INSERT_CART": {
      state.gioHang = action.arrayProduct;
      localStorage.setItem('UserCart', JSON.stringify(state.gioHang));
      return { ...state }
    }
    case 'DELETE_ALL_PRODUCT_CART': {

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
