import axios from "axios";
import swal from "sweetalert";
import { settings } from "../../Commons/Settings";


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
                        type: 'DELETE_PRODUCT_CART',
                        id: id
                    };
                    dispatch(action);
                } else {
                    swal("Giỏ hàng của bạn không thay đổi!");
                }
            });

    }
}

export const AddProductCartAction = (productClicked) => {

    return dispatch => {

        axios({
            url: settings.domain + `/products/${productClicked._id}`,
            method: 'GET',

        }).then(result => {


            // find product in local


            if (localStorage.getItem("UserCart") !== null) {


                let index = JSON.parse(localStorage.getItem('UserCart'))
                    .findIndex(ele => ele.id === productClicked._id);

                if (index > 0) // da ton tai
                {
                    let productLocalCart = JSON.parse(localStorage.getItem('UserCart'))[index].quantity

                    console.log("data :", result.data.quantity, "local : ", productLocalCart)

                    if (result.data.quantity <= productLocalCart) {
                        swal({
                            icon: "warning",
                            title: "Thông báo",
                            text: "Thêm thất bại!",
                            buttons: false,
                            timer: 1200,
                        });
                        return
                    }

                }



            }

            const newProduct = {
                id: productClicked._id,
                name: productClicked.name,
                image: productClicked.image,
                price: productClicked.price,
                quantity: 1,
            }
            //dùng hàm dispatch của connect đưa dữ liệu lên redux (gioHangReducer)
            const action = {
                type: 'ADD_TO_CART', //type là thuộc tính bắt buộc của redux,
                newProduct,
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



        }).catch(error => {
            console.log(error.response)

        })




    }
}

export const InDecreaseProductCartAction = (id, isDown) => {


    return dispatch => {
        axios({
            url: settings.domain + `/products/${id}`,
            method: 'GET',

        }).then(result => {

            let index = JSON.parse(localStorage.getItem('UserCart'))
                .findIndex(ele => ele.id === id);

            if (index >= 0) // da ton tai
            {
                let productLocalCart = JSON.parse(localStorage.getItem('UserCart'))[index].quantity

                console.log("data :", result.data.quantity, "local : ", productLocalCart)

                if (isDown) {
                    if (result.data.quantity <= productLocalCart) {
                        swal({
                            icon: "warning",
                            title: "Thông báo",
                            text: "Thêm thất bại!",
                            buttons: false,
                            timer: 1200,
                        });
                        return
                    }
                }

            }

            const action = {
                type: 'IN_DECREASE_QUANTITY',
                id,
                isDown
            };
            dispatch(action);


        }).catch(error => {
            console.log(error.response)
        })

    }
}



export const DeleteALLProductCartAction = () => {

    return dispatch => {
        const action = {
            type: 'DELETE_ALL_PRODUCT_CART',
        };
        dispatch(action);

    }
}
