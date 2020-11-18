import React, { Component } from 'react';
import './Register.css'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { RegisterAction} from '../../Redux/Actions/ManageUsers.Action'
import swal from 'sweetalert'

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: { // state tạm để lưu dữ liệu nhập
                account: "",
                password: "",
                confirmPassword : "",
                // address:"",
                displayName:"",
            },
             userSubmit: { // state để submit về sever
                account: "",
                password: "",
                address:"",
                displayName:"",
            },
            errors: {
                account: "",
                password: "",
                passwordValid : "",
                address:"",
                displayName:"",
            },
            validate: {
                passwordValid : ""
            }
        }
    }
    handleClear = () => {
        this.setState({
            user: {
                account: "",
                password: "",
                passwordValid : "",
              
                displayName:"",
            },
            // temp: { matKhauTam: '' },
        })

     
    }
    handleChange = (event) => {
        let { name, value } = event.target;

        this.setState({
            user: { ...this.state.user, [name]: value },
            validate: { ...this.state.temp, [name]: value },
        }, () => { console.log(this.state.user) })
    }
    // handleError = (event) => {

    //     let { name, value } = event.target;

    //     let Errors = ''; // nội dung error
    //     let nameInput = ''; //ten7 của tag input
    //     switch (name) {
    //         case "taiKhoan":
    //             nameInput = "Tài khoản"
    //             break;
    //         case "matKhauTam":
    //             nameInput = "Mật khẩu"
    //             break;
    //         case "matKhau":
    //             nameInput = "Xác nhận mật khẩu"
    //             break;
    //         case "soDT":
    //             nameInput = "Số điện thoại"
    //             break;
    //         case "email":
    //             nameInput = "Email"
    //             break;
    //         case "hoTen":
    //             nameInput = "Họ tên"
    //             break;
    //         default:
    //             break;
    //     }
    //     //xử lý trống
    //     Errors = value === '' ? '(*)' + nameInput + ' không được bỏ trống!' : '';

    //     //xử lý định dạng email
    //     if (name === 'email' && Errors === '') {
    //         let regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    //         if (!regex.test(value)) {
    //             Errors = 'Email này không đúng định dạng!'
    //         }
    //     }
    //     //xử lý định dạng số điện thoại
    //     if (name === 'soDT' && Errors === '') {
    //         let regex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s/0-9]*$/;
    //         if (!regex.test(value)) {
    //             Errors = 'Số điện thoại không đúng định dạng!'
    //         }
    //     }
    //     this.setState({
    //         errors: { ...this.state.errors, [name]: Errors }
    //     })

    // }

    handleSubmit = (event) => {
        event.preventDefault();//chặn submit của browser
        //Xử lý mật khẩu

        // let { name, value } = event.target;
         let {password, confirmPassword} = this.state.user;
         if (password.localeCompare(confirmPassword)) {
            swal("Thông báo đăng nhập!",'Xác nhận mật khẩu không đúng!', "error");
            return;
         }
        this.props.RegisterUser(this.state.user)
    }
    



    render() {
        return (
            <div className='SignUp'>
                <div className="test"></div>
                <div className="container">
                    <div className="d-flex justify-content-center h-100">
                        <div className="card card-content-register">
                            <div className="card-header">
                                <h3>Đăng Ký</h3>
                                <div className="d-flex justify-content-end social_icon">
                                    <span><i className="fab fa-facebook-square" /></span>
                                    <span><i className="fab fa-google-plus-square" /></span>
                                    <span><i className="fab fa-twitter-square" /></span>
                                </div>
                            </div>
                            <div className="card-body">
                                <form method="post" onSubmit={this.handleSubmit}>
                                    <div className="input-group form-group d-flex">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-user" /></span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="Nhập tài khoản" id="account" name='account' value={this.state.user.account} onChange={this.handleChange} onBlur={this.handleError} />
                                        {/* {this.state.errors.taiKhoan !== '' ? <div className='text-danger '>{this.state.errors.taiKhoan}</div> : <div className='text-danger'></div>} */}
                                    </div>

                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-key" /></span>
                                        </div>
                                        <input autoComplete="on" type="password" className="form-control" placeholder="Nhập mật khẩu" id="password" name='password' value={this.state.user.password} onChange={this.handleChange} onBlur={this.handleError} />
                                        {/* {this.state.errors.matKhauTam !== '' ? <div className='text-danger '>{this.state.errors.matKhauTam}</div> : <div className='text-danger'></div>} */}
                                    </div>

                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-key" /></span>
                                        </div>
                                        <input autoComplete="on" type="password" className="form-control" placeholder="Nhập lại mật khẩu" id="confirmPassword" name='confirmPassword' value={this.state.user.confirmPassword} onChange={this.handleChange} onBlur={this.handleError} />
                                        {/* {this.state.errors.matKhau !== '' ? <div className='text-danger '>{this.state.errors.matKhau}</div> : <div className='text-danger'></div>} */}
                                    </div>
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-key" /></span>
                                        </div>
                                        <input autoComplete="on" type="text" className="form-control" placeholder="Nhập tên hiển thị" id="displayName" name='displayName' value={this.state.user.displayName} onChange={this.handleChange} onBlur={this.handleError} />
                                        {/* {this.state.errors.matKhauTam !== '' ? <div className='text-danger '>{this.state.errors.matKhauTam}</div> : <div className='text-danger'></div>} */}
                                    </div>
                                  
                                    <div className="form-group">
                                        <div className="float-right pt-2">
                                            <NavLink to="/dangnhap">Đăng nhập <i className="fas fa-arrow-right"></i></NavLink>
                                        </div>
                                        <button className="btn float-left login_btn">
                                            Đăng ký</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProp = state => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        RegisterUser: (user) => {
            dispatch(RegisterAction(user));
        }
    }
}

export default connect(mapStateToProp, mapDispatchToProps)(Register);