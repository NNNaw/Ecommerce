import { actionTypes } from '../Contants/MagageUsers.Constant'

const intialState = {
    // user: JSON.parse(localStorage.getItem('inforUser')) || null,
    // isLogOut: JSON.parse(localStorage.getItem('inforUser')) !== null ? true : false,
    DetailUser: null,
    isAuthenticated: false
}

export const ManageUserReducer = (state = intialState, action) => {

    switch (action.type) {
        case actionTypes.LOGIN: {

            // state.isLogOut = false; // set false cho isLogin
            return {
                ...state,
                DetailUser: action.DataAccount,
                isAuthenticated: true
            }
        }


        // case actionTypes.GETINFOUSER: {
        //     state.user = JSON.parse(localStorage.getItem('infoUser'));
        //     return { ...state }
        // }

        case actionTypes.GET_DETAIL_USER: {

            state.DetailUser = action.DetailUser;
            return { ...state }
        }
        case actionTypes.LOG_OUT: {
            return {
                ...state,
                DetailUser: null,
                isAuthenticated: false
            }
        }
        default:
            return { ...state }
    }
}


