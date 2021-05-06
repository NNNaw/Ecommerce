import axios from "axios";
import swal from "sweetalert";
import { settings } from "../../Commons/Settings";
import { actionTypes } from "../Contants/ManageCart.Constant";


export const loadCartAction = () => {
    return dispatch => {
        const action = {
            type: actionTypes.LOAD_CART,
            cart: JSON.parse(localStorage.getItem('UserCart'))
        };
        dispatch(action);

    }
}


export const DeleteProductCartAction = (id) => {

    return dispatch => {

        swal({
            title: "Thông báo!!!?",
            text: "Bạn chắc muốn xóa sản phẩm này ra khỏi giỏ hàng của bạn chứ ???",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Poof! Sản phẩm đã được xóa !", {
                        icon: "success",
                    });
                    const action = {
                        type: actionTypes.DELETE_PRODUCT_CART,
                        id: id
                    };
                    dispatch(action);
                } else {
                    swal("Giỏ hàng của bạn không thay đổi!");
                }
            });

    }
}


export const AddProductCartAction = (id, isDeCrease, isAdd) => {


    return dispatch => {
        axios({
            url: settings.domain + `/products/${id}`,
            method: 'GET',
        }).then(result => {

            let productClicked = result.data;
            // find product in local
            if (localStorage.getItem("UserCart") !== null) { // local storeage not null => pass


                let index = JSON.parse(localStorage.getItem('UserCart'))
                    .findIndex(ele => ele.id === productClicked._id);
                console.log(index);
                if (index >= 0) // da ton tai san pham trong local storeage
                {
                    let quantityProduct = JSON.parse(localStorage.getItem('UserCart'))[index].quantity;// get quantity product local

                    console.log("data :", result.data.quantity, "local : ", quantityProduct)

                    if (!isDeCrease) { // increase quantity
                        if (result.data.quantity <= quantityProduct) {
                            swal({
                                icon: "warning",
                                title: "Thông báo",
                                text: "Số lượng tồn không đủ!",
                                buttons: false,
                                timer: 1200,
                            });
                            return
                        }

                    } else { // decrease quantity
                        console.log(quantityProduct)
                        if (quantityProduct <= 1) {
                            swal({
                                icon: "warning",
                                title: "Thông báo",
                                text: "Giảm thất bại!",
                                buttons: false,
                                timer: 1200,
                            });
                            return
                        }
                    }
                    const action = {
                        type: actionTypes.ADD_PRODUCT_CART, //type là thuộc tính bắt buộc của redux,
                        index,
                        isDeCrease
                    }
                    if (isAdd) { // nếu là click vào nút thêm vào giỏ hàng
                        swal({
                            icon: "success",
                            title: "Thông báo",
                            text: "Thêm thành công!",
                            buttons: false,
                            timer: 1200,
                        });

                    }
                    dispatch(action);

                } else { // chua ton tai trong gio hang
                    dispatch(HandleAddProductCart(productClicked));
                }
            } else { // local storeage chua khoi tao
                dispatch(HandleAddProductCart(productClicked));
            }
        }).catch(error => {
            console.log(error.response)

        })

    }
}


const HandleAddProductCart = (productClicked) => {

    return dispatch => {
        const newProduct = {
            id: productClicked._id,
            name: productClicked.name,
            alias: productClicked.alias,
            nameCategory: productClicked.category_Product.nameCategory,
            nameBrand: productClicked.brand_Product.nameBrand,
            image: productClicked.images[0].url,
            price: productClicked.price,
            quantity: 1,
        }
        //dùng hàm dispatch của connect đưa dữ liệu lên redux (gioHangReducer)
        const action = {
            type: actionTypes.ADD_PRODUCT_CART, //type là thuộc tính bắt buộc của redux,
            newProduct,
            index: -1
            // product: result.data
        }
        swal({
            icon: "success",
            title: "Thông báo",
            text: "Thêm thành công!",
            buttons: false,
            timer: 1200,
        });
        //Gọi phương thức dispatch khi người dùng click vào nút thêm sản phẩm đưa giá trị lên reducer 
        dispatch(action);
    }
}



export const DeleteALLProductCartAction = () => {

    return dispatch => {
        const action = {
            type: actionTypes.DELETE_ALL_PRODUCT_CART,
        };
        dispatch(action);

    }
}
