import { actionTypes } from '../Contants/MagageUsers.Constant'

const intialState = {
    user: JSON.parse(localStorage.getItem('inforUser')) || null,
    // isLogOut: JSON.parse(localStorage.getItem('inforUser')) !== null ? true : false,
    DetailUser: {}
}

export const ManageUserReducer = (state = intialState, action) => {

    switch (action.type) {
        case actionTypes.LOGIN: {
            state.user = action.account;
            state.isLogOut = false; // set false cho isLogin
            return { ...state }
        }

    
        case actionTypes.GETINFOUSER: {
            console.log("GETINFOUSER")
            state.user = JSON.parse(localStorage.getItem('infoUser')) ;
            return { ...state }
        }
        case actionTypes.GET_DETAIL_USER: {

            state.DetailUser = action.DetailUser;
            return { ...state }
        }
        default:
            return { ...state }
    }
}


