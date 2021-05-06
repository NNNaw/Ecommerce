import { actionTypes } from '../Contants/ManageOrder.Constant'
import { settings } from '../../Commons/Settings'
import axios from 'axios'
// import swal from 'sweetalert'


export const GetAllOrderAction = () => {

    return dispatch => {
        axios({
            url: settings.domain + '/order',
            method: 'GET',

        }).then(result => {
            console.log(result.data)
            dispatch({
                type: actionTypes.GET_ALL_ORDER,
                Orders: result.data
            });

        }).catch(error => {
            console.log(error.response)

        })
    }
}

export const GetAllOrderByIdCustomerAction = (account) => {

    return (dispatch) => {
        axios({
            url: settings.domain + `/order/${account}`,
            method: 'GET',

        }).then(result => {
            console.log("order :", result.data)


            let listOrder = {
                arrayOrderConfirmed: [],
                arrayOrderunConfirmed: []
            }


            result.data.forEach(element => {
                if (element.status) {
                    listOrder.arrayOrderConfirmed.push(element)
                } else {
                    listOrder.arrayOrderunConfirmed.push(element)
                }
            });



            dispatch({
                type: actionTypes.GET_ALL_ORDER_BY_IDCUSTOMER, // get by  account
                listOrder: listOrder
            });

        }).catch(error => {
            console.log(error.response)

        })
    }
}

// export const BuyProductAction = (account, data) => {

   
//     return dispatch => {
//         axios({
//             url: settings.domain + `/order/BuyProduct/${account}`,
//             method: 'POST',
//             data: data
//         }).then(result => {
//             console.log(result.data)
//         }).catch(errors => {
//             console.log(errors.response)
//         })
//     }
// }

export const GetAllMethodShippingAction = () => {

    return dispatch => {
        axios({
            url: settings.domain + "/shippingMethod",
            method: 'GET',

        }).then(result => {
            console.log(result.data)
            dispatch({
                type: actionTypes.GET_ALL_METHOD_SHIPPING,
                listMethodShipping: result.data
            })
        }).catch(errors => {
            console.log(errors.response)
        })
    }
}
export const GetAllMethodPaymentAction = () => {

    return dispatch => {
        axios({
            url: settings.domain + "/paymentMethod",
            method: 'GET',

        }).then(result => {
            console.log(result.data)
            dispatch({
                type: actionTypes.GET_ALL_METHOD_PAYMENT,
                listMethodPayment: result.data
            })
        }).catch(errors => {
            console.log(errors.response)
        })
    }
}