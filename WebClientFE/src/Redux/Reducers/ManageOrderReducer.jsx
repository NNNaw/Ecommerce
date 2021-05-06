import { actionTypes } from '../Contants/ManageOrder.Constant'

const intialState = {
    Orders: [],
    ListOrderByIdCumstomer: [],
    listOrder: {
        arrayOrderConfirmed: [],
        arrayOrderunConfirmed: []
    },
    listMethodPayment: [],
    listMethodShipping: [],
}

export const ManageOrderReducer = (state = intialState, action) => {

    switch (action.type) {


        case actionTypes.GET_ALL_ORDER: {
            state.Orders = action.Orders;
            return { ...state }
        }

        case actionTypes.GET_ALL_ORDER_BY_IDCUSTOMER: {

            // console.log(action.listOrder)

            state.listOrder.arrayOrderConfirmed = action.listOrder.arrayOrderConfirmed;
            state.listOrder.arrayOrderunConfirmed = action.listOrder.arrayOrderunConfirmed

            return { ...state }
        }

        case actionTypes.GET_ALL_METHOD_PAYMENT: {
            
            state.listMethodPayment = action.listMethodPayment;
            return { ...state }
        }

        case actionTypes.GET_ALL_METHOD_SHIPPING: {
            state.listMethodShipping = action.listMethodShipping;
            return { ...state }
        }
        default:
            return { ...state }
    }
}


