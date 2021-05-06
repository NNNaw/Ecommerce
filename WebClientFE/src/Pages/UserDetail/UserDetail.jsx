import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    GetDetailUserAction, UpdateFileAction, UpdateCustomerAction,
    ChangePasswordCustomerAction
} from './../../Redux/Actions/ManageUsers.Action';

import { isEqual } from 'lodash';
import { Fragment } from 'react';
import { formatPage, getParam } from './../../Commons/functionCommon';
import { settings } from '../../Commons/Settings';
var dateFormat = require('dateformat');

// import { NavLink } from 'react-router-dom'
class UserDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customer: this.props.DetailUser || {
                account: "",
                displayName: "",
                fullName: "",
                image: "",
                phoneNumber: "",
                identitycard: "",
                gender: "",
                birthDay: "",
                address: "",
                Id_AccountType: "",
                dateCreated: "",
            },
            account: {
                // username: "",
                password: "",
                newPassword: "",
                reNewPassword: ""
            },
            error: {
                // username: "",
                password_error: "",
                newPassword_error: "",
                reNewPassword_error: ""
            },
            fileSelected: null
        }
    }

    renderButtonSubmit = (account, idType) => {
        return (
            <div className="btn-submitImage">
                <button className='btn btn-success' onClick={() => this.props.UpdateFile(this.state.fileSelected, account, idType, this.inform)}>Lưu</button>
                <button className='btn btn-danger'>Thoát</button>
            </div>
        )
    }
    renderButtonChoose = () => {
        return (
            <Fragment>


            </Fragment>
        )
    }
    handleChange = (event) => {
        let { name, value } = event.target;
        // if (name === 'image') {
        //     // value = value.split(/(\\|\/)/g).pop()
        //     // let file = 

        //     this.setState({
        //         fileSelected: event.target.files[0],

        //     }, () => {
        //         console.log(this.state.fileSelected)

        //     });
        // }
        // else {
        //     this.setState({
        //         customer: { ...this.state.customer, [name]: value },

        //     }, () => {
        //         console.log(this.state.customer)

        //     });
        // }
        this.setState({
            customer: { ...this.state.customer, [name]: value },
            account: { ...this.state.account, [name]: value }
        }, () => {
            console.log(this.state.account)

        });

    }
    handleChangeImage = (event) => {
        this.setState({
            fileSelected: event.target.files[0],

        }, () => {
            console.log(this.state.fileSelected)

        });
    }




    inform = () => {

        this.setState({
            fileSelected: null
        })

    }

    renderGender = (gender) => {
        return (

            <div className="renderGender">
                <div className="form-check form-check-inline">
                    <label className="form-check-label active">
                        <input className="form-check-input" type="radio" name="gender"
                            value="Nam"
                            checked={gender === "Nam"}
                            onChange={this.handleChange}
                        />Nam
                    </label>
                    <label className="form-check-label">
                        <input className="form-check-input" type="radio" name="gender"
                            value="Nữ"
                            checked={gender === "Nữ"}
                            onChange={this.handleChange}
                        />Nữ
                    </label>
                    <label className="form-check-label">
                        <input className="form-check-input" type="radio" name="gender"
                            value="Khác"
                            checked={gender === "Khác"}
                            onChange={this.handleChange}
                        />Khác
                    </label>
                </div>

            </div>


        )
    }
    handleSubmit = (event) => {
        event.preventDefault();//chặn submit của browser

        this.props.UpdateCustomer(this.state.customer)
        // let { name, value } = event.target;

    }


    validate = () => {



        let password_error = "", reNewPassword_error = "", newPassword_error = ""


        // valid Empty
        let { password, reNewPassword, newPassword } = this.state.account;
        if (password === "") {
            password_error = "Không bỏ trống mật khẩu!!"
        }
        if (newPassword === "") {
            newPassword_error = "Không bỏ trống mật khẩu mới!!"
        }
        if (reNewPassword === "") {
            reNewPassword_error = "Không bỏ trống mật khẩu mới!!"
        }


        if (reNewPassword.localeCompare(newPassword)) {
            reNewPassword_error = "Xác nhận mật khẩu không đúng!!"
        }

        if (reNewPassword.length < 6) {

            reNewPassword_error = "Mật khẩu phải lớn hơn 6 ký tự!!"

        }

        // if (reNewPassword_error.indexOf(' ') !== -1) {
        //     reNewPassword_error = "Mật khẩu không chứa ký tự space !!"
        // }


        if (password_error || newPassword_error || reNewPassword_error) {
            this.setState({
                error: {
                    password_error: password_error,
                    newPassword_error: newPassword_error,
                    reNewPassword_error: reNewPassword_error,
                }
            });

            return false;
        }


        return true;


    }

    handleSubmitModal = (event) => {
        event.preventDefault();//chặn submit của browser
        //Xử lý mật khẩu

        // let { Errorpassword, reNewPassword, newPassword } = this.state.error;

        let validate = this.validate()
        if (validate) {
            this.props.ChangePasswordCustomer(this.state.customer.account, this.state.account)


            this.setState({
                error: {
                    // username: "",
                    password_error: "",
                    newPassword_error: "",
                    reNewPassword_error: ""
                },
                account: {
                    // username: "",
                    password_error: "",
                    newPassword_error: "",
                    reNewPassword_error: ""
                },
            });
        }


    }


    render() {

        console.log('render')


        let {
            account,
            dateCreated,
            Id_AccountType,
            displayName,
            fullName,
            image,
            phoneNumber,
            identitycard,
            gender,
            birthDay,
            address, } = this.state.customer
        return (

            <div className="DetailUser">
                <div className="DetailUser-content container">
                    <div className="row DetailUser-content-info">
                        <div className="col-6 DetailUser-left">
                            <div className="DetailUser-img">
                                <img src={image} alt="error"
                                    data-toggle="modal" data-target="#modalAvatar" />

                                <div className="button-updateing">

                                    <input type="file" id="image" name="image" onChange={this.handleChangeImage} />


                                    <p className='text-requiment'>
                                        Dụng lượng file tối đa 1 MB Định dạng: *.JPG, *.PNG
                                    </p>
                                    {this.state.fileSelected != null ?
                                        this.renderButtonSubmit(account, Id_AccountType) :
                                        <button className='btn btn-updateImage'>
                                            <i className="fa fa-wrench" aria-hidden="true"></i>
                                            <span>  Chỉnh Sửa</span>

                                        </button>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-6 DetailUser-right">
                            <div className="text-header-title">
                                <h3 className='text-title'>Hồ sơ cá nhân</h3>
                                <p className='text-advice'>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
                            </div>
                            <form method="post" onSubmit={this.handleSubmit} className='DetailUser-list'>
                                <div className='DetailUser-item' >
                                    <p>Tên Đăng Nhập :</p>
                                    <p>{account}</p>
                                </div>

                                <div className='DetailUser-item'>
                                    <p>Mật khẩu : </p>
                                    <p className="text-danger text-changePassword"
                                        data-toggle="modal" data-target="#modalAvatar" >
                                        <span className='text'>Thay đổi mật khẩu</span>
                                    </p>
                                </div>
                                <div className='DetailUser-item'>
                                    <p>Ngày tạo : </p>
                                    <p>{dateFormat(dateCreated, 'dd/mm/yyyy')}</p>
                                </div>
                                <div className='DetailUser-item'>
                                    <label htmlFor="displayName">Tên hiển thị : </label>
                                    <input onChange={this.handleChange} type="text" name="displayName" id="displayName" value={displayName} />
                                </div>
                                <div className='DetailUser-item'>
                                    <label htmlFor="fullname">Họ tên : </label>
                                    <input onChange={this.handleChange} type="text" name="fullName" id=" fullName" value={fullName} />
                                </div>
                                <div className='DetailUser-item'>
                                    <label htmlFor="phoneNumber">Số điện thoại : </label>
                                    <input onChange={this.handleChange} type="text" name="phoneNumber" value={phoneNumber} />
                                </div>

                                <div className='DetailUser-item'>
                                    <label htmlFor="identitycard">Chứng minh nhân dân : </label>
                                    <input onChange={this.handleChange} type="text" name="identitycard" id="identitycard" value={identitycard} />
                                </div>
                                <div className='DetailUser-item'>
                                    <label htmlFor="address">Địa chỉ : </label>
                                    <input onChange={this.handleChange} type="text" name="address" id="address" value={address} />
                                </div>
                                <div className='DetailUser-item'>
                                    <p>Ngày sinh : </p>
                                    <p>

                                        {dateFormat(birthDay, 'dd/mm/yyyy')}</p>
                                </div>
                                <div className='DetailUser-item'>
                                    <label >Giới tính : </label>
                                    {this.renderGender(gender)}

                                </div>
                                <button className="btn btn-success btn-saveinfo" type='submit'>Lưu</button>
                            </form>
                        </div>
                    </div>
                </div>





                {/* Modal */}
                <div className="modal fade" id="modalAvatar" tabIndex={-1} role="dialog"
                    aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "700px" }} role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3 className="modal-title" id="exampleModalLongTitle"> Thông tin tài khoản</h3>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body container">
                                <div className="row">
                                    <div className="col-6">
                                        <img src={image} alt="error" />
                                    </div>
                                    <div className="col-6">

                                        <form method="post" onSubmit={this.handleSubmitModal}>

                                            <div className="input-group form-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="fas fa-key" /></span>
                                                </div>
                                                <input type="password" className="form-control" placeholder="Nhập mật khẩu cũ" autoComplete="password"
                                                    id="password" name='password' value={this.state.account.password} onChange={this.handleChange}
                                                />
                                                {this.state.error.password_error !== '' ?
                                                    <div className='text-danger '> <span>{this.state.error.password_error}</span> </div>
                                                    : <div className='text-danger'></div>}
                                            </div>

                                            <div className="input-group form-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="fas fa-key" /></span>
                                                </div>
                                                <input type="password" className="form-control" placeholder="Nhập mật khẩu mới" autoComplete="newPassword"
                                                    id="newPassword" name='newPassword' value={this.state.account.newPassword} onChange={this.handleChange}
                                                />
                                                {this.state.error.newPassword_error !== '' ?
                                                    <div className='text-danger '> <span>{this.state.error.newPassword_error}</span> </div>
                                                    : <div className='text-danger'></div>}
                                            </div>

                                            <div className="input-group form-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="fas fa-key" /></span>
                                                </div>
                                                <input type="password" className="form-control" placeholder="Nhập lại mật khẩu mới" autoComplete="reNewPassword"
                                                    id="reNewPassword" name='reNewPassword' value={this.state.account.reNewPassword} onChange={this.handleChange}
                                                />
                                                {this.state.error.reNewPassword_error !== '' ?
                                                    <div className='text-danger '> <span>{this.state.error.reNewPassword_error}</span> </div>
                                                    : <div className='text-danger'></div>}
                                            </div>

                                            {/* <div className="form-group">
                                                <div className="float-right pt-2">
                                                    <NavLink to="/dangnhap">Đăng nhập <i className="fas fa-arrow-right"></i></NavLink>
                                                </div>
                                                <button className="btn float-left login_btn">
                                                    Đăng ký</button>
                                            </div> */}
                                            <div className="btn-save-change-password text-center">
                                                <button className="btn btn-success btn-saveinfo" type='submit'>Lưu</button>
                                            </div>

                                        </form>

                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        )
    }

    componentDidMount() {



        const infoUser = JSON.parse(localStorage.getItem(settings.infoUser))

        if (infoUser._id !== getParam(this.props.location.search, "id")) {
            this.props.history.push('/privatePage')
        }

        if (this.props.DetailUser === null) {
            const id = getParam(this.props.location.search)
            this.props.GetDetailUser(id);
        }

        formatPage()
        // console.log('componentDidMount')
    }

    componentDidUpdate(prevProps, prevState) {

        console.log('componentDidUpdate')
        // if (isEqual(this.props.DetailUser, null)) {
        //     let { account } = this.props.match.params;
        //     this.props.GetDetailUser(account);
        // }

        if (isEqual(this.state.customer.account, "")) {

            let {
                account,
                displayName,
                fullName,
                image,
                phoneNumber,
                identitycard,
                gender,
                birthDay,
                address,
                Id_AccountType,
                dateCreated,

            } = this.props.DetailUser
            console.log("didUpdate")
            this.setState({
                customer: {
                    account: account,
                    Id_AccountType: Id_AccountType,
                    displayName: displayName,
                    fullName: fullName,
                    image: image,
                    phoneNumber: phoneNumber,
                    identitycard: identitycard,
                    gender: gender,
                    birthDay: birthDay,
                    address: address,
                    dateCreated: dateCreated
                }
            })

        }


        // if (!isEqual(this.props.DetailUser.image, prevProps.DetailUser.image)) {
        //     console.log("didUpdate")
        //     this.setState({
        //         customer: { ...this.state.customer, image: this.props.DetailUser.image }
        //     })
        // }



    }
}

const mapStateToProps = state => {
    return {
        DetailUser: state.ManageUserReducer.DetailUser,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        GetDetailUser: (id) => {
            dispatch(GetDetailUserAction(id))
        },

        UpdateFile: (fileSelected, account, Id_AccountType, inform) => {
            dispatch(UpdateFileAction(fileSelected, account, Id_AccountType, inform))
        },
        UpdateCustomer: (id) => {
            dispatch(UpdateCustomerAction(id))
        },

        ChangePasswordCustomer: (username, infoAccount) => {
            dispatch(ChangePasswordCustomerAction(username, infoAccount))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);