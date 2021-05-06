import { actionTypes } from '../Contants/MagageUsers.Constant'
import { settings } from '../../Commons/Settings'
import axios from 'axios'
import swal from 'sweetalert'
import { GetAllOrderByIdCustomerAction } from './ManageOrder.Action'
import { Roles } from '../../Commons/variable.common'




export const RegisterAction = (user) => {
    return dispatch => {
        axios({
            url: settings.domain + '/accounts/registerCustomer',
            method: 'POST',
            data: user
        }).then(result => {
            console.log(result.data);
            swal("Thông báo đăng ký!", "Đăng ký thành công!", "success");
        }).catch(error => {
            console.log(error.response)
            swal("Thông báo đăng ký!", error.response.data, "error");
        })
    }
}

export const LoginUserAction = (user, checkRemeber, handleLogin) => {

    return dispatch => {
        axios({
            url: settings.domain + `/accounts/login`,
            method: 'POST',
            data: user
        }).then(result => {

            localStorage.setItem(settings.infoUser, JSON.stringify(result.data));
            localStorage.setItem(settings.token, result.data.token) // set token to localstore

            console.log(result.data)
            dispatch({
                type: actionTypes.GET_DETAIL_USER,
                DetailUser: result.data
            })
            switch (result.data.AccountType.name_AccountType) {
                case Roles.Management:

                    handleLogin("/quanly", Roles.Management)

                    break;
                case Roles.Employee:
                    handleLogin("/nhanvien/TabQuanLySanPham", Roles.Employee);
                    break;
                default:
                    handleLogin("/", Roles.Customer)
                    break;
            }
            return
        }).catch(error => {
            console.log(error.response)
            swal("Thông báo đăng nhập!", error.response, "error");
        })
    }
}


export const onLoadUserAction = (token) => {


    if (!token) {
        return dispatch => { }
    }
    console.log("onload1")
    return dispatch => {
        axios({
            url: settings.domain + `/customers/onload`,
            method: "GET",
            headers: {
                "auth-token": `${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(result => {
            console.log("onload")
            console.log(result.data)
            dispatch({
                type: actionTypes.GET_DETAIL_USER,
                DetailUser: result.data
            })
        })
            .catch(error => {
                console.log(error.response)
            })
    }
}

export const GetDetailUserAction = (id) => {


    let token = localStorage.getItem(settings.token);

    if (!token) return

    return dispatch => {
        axios({
            url: settings.domain + `/customers/${id}`,
            method: "GET",
            headers: {
                "auth-token": `${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(result => {
            console.log(result.data)

            dispatch({
                type: actionTypes.GET_DETAIL_USER,
                DetailUser: result.data
            })
        })
            .catch(error => {
                console.log(error.response)
                // < Redirect to="/dangnhap" />
            })
    }
}


export const UpdateCustomerAction = (user) => {


    return dispatch => {
        axios({
            url: settings.domain + `/accounts/UpdateCustomer/${user.account}`,
            method: "PATCH",
            data: user
        }).then(result => {
            console.log(result.data)

            // dispatch(GetDetailUserAction(user.account));  // cần xem lại

            swal({
                icon: "success",
                title: "Thông báo",
                text: "Thay đổi thành công!",
                buttons: false,
                timer: 1200,
            });
            dispatch(GetDetailUserAction(user.account));
        }).catch(error => {
            console.log(error.response.data)
        })
    }

}

export const ChangePasswordCustomerAction = (username, account) => {


    return dispatch => {
        axios({
            url: settings.domain + `/accounts/ChangePassword/${username}`,
            method: "PATCH",
            data: account
        }).then(result => {
            console.log(result.data)

            // dispatch(GetDetailUserAction(user.account));  // cần xem lại


            swal({
                icon: "success",
                title: "Thông báo",
                text: "Thay đổi thành công!",
                buttons: false,
                timer: 1200,
            });
            dispatch(GetDetailUserAction(account));
        }).catch(error => {
            console.log(error.response)

            swal({
                icon: "warning",
                title: "Thông báo",
                text: error.response.data,
                buttons: false,
                timer: 1200,
            });
        })
    }
}

export const BuyProductAction = (account, data, handleResetCart) => {


    return dispatch => {
        axios({
            url: settings.domain + `/order/CreateOrder/${account}`,
            method: 'POST',
            data: data
        }).then(result => {
            console.log(result.data)
            swal({
                icon: "success",
                title: "Thông báo",
                text: "Đặt hàng thành công!",
                buttons: false,
                timer: 1200,
            });

            dispatch(GetAllOrderByIdCustomerAction(account))
            handleResetCart()
        }).catch(errors => {
            console.log(errors.response)
        })
    }
}


export const CancelOrderAction = (account, IdOrder) => {

    console.log(IdOrder)
    return dispatch => {
        axios({
            url: settings.domain + `/order/CancelOrder/${IdOrder}`,
            method: 'delete',
        }).then(result => {
            console.log(result.data)

            dispatch(GetAllOrderByIdCustomerAction(account))
        }).catch(errors => {
            console.log(errors.response)
        })
    }
}



export const ConfirmOrderAction = (data) => {

    console.log(data)
    let account = JSON.parse(localStorage.getItem("infoUser")).account

    return dispatch => {
        axios({
            url: settings.domain + `/order/ComfirmOrder/${account}`,
            method: 'patch',
            data: data
        }).then(result => {
            console.log(result.data)
            swal({
                icon: "success",
                title: "Thông báo",
                text: "Duyệt đơn hàng thành công!",
                buttons: false,
                timer: 1200,
            });
            dispatch(GetAllOrderByIdCustomerAction(account))
        }).catch(errors => {
            console.log(errors.response)
        })
    }
}




export const UpdateFileAction = (fileSelected, account, Id_AccountType, inform) => {


    const fd = new FormData();
    fd.append('image', fileSelected, fileSelected.name)
    fd.append('Id_AccountType', Id_AccountType);

    // axios.post(settings.domain + "/productTest", fd)
    //     .then(res =>
    //         console.log(res)

    //     );

    return dispatch => {
        axios({
            url: settings.domain + `/accounts/uploadimage/${account}`,
            method: "PATCH",
            data: fd
        }).then(result => {
            console.log(result.data)
            swal({
                icon: "success",
                title: "Thông báo",
                text: "Thay đổi thành công!",
                buttons: false,
                timer: 1200,
            });
            dispatch(GetDetailUserAction(account));  // cần xem lại
            inform();
        }).catch(error => {
            console.log(error.response)

            swal("Thông báo!", error.response.data, "error");
            inform();
        })
    }
}
