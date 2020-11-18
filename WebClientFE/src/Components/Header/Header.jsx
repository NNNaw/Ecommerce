import React, { Component } from 'react';

import { settings } from './../../Commons/Settings'
import { connect } from 'react-redux';

import { NavLink } from 'react-router-dom';
import Logo from "./../../Assets/Images/LogoAmazon.png"
import Cart from '../Cart/Cart';
import { isEqual } from 'lodash';
import { GetDetailUserAction } from '../../Redux/Actions/ManageUsers.Action';


class Header extends Component {


    constructor(props) {
        super(props);
        this.state = {

            infoUser: {
                image: "",
                displayName: "",
                account: "",
                //     account: JSON.parse(localStorage.getItem('infoUser')).account === null ? ""
                //     : JSON.parse(localStorage.getItem('infoUser')).account,
                // account: JSON.parse(localStorage.getItem('infoUser')).account === null ? ""
                //     : JSON.parse(localStorage.getItem('infoUser')).account,
                // image: "" ,
                // displayName: "nameeeee",
                // account: "customer3",

            },
            keySearch: "",

        }

    }

    handleChange = (event) => {
        let { value } = event.target;
        this.setState({
            keySearch: value
        }, () => {
            console.log(this.state.keySearch)
        })
    }



    handleSubmit = (e) => {
        e.preventDefault();//chặn submit của browser

    }
    renderButton = () => {

        if (this.props.user === null) { // true
            return (
                <div className='btn-group_Sign'>
                    <NavLink className='btn btn_Sign' to='/dangnhap'>Đăng nhập</NavLink>
                    <NavLink className='btn btn_Sign' to='/dangky'>Đăng ký</NavLink>
                </div>
            )

        } else { // false
            return (
                <div className="dropdown">
                    <NavLink className='personal-div' to={`/QuanLyTaiKhoan/${this.props.user.account}`}>
                        <p className="text-hello">Xin chào, {this.state.infoUser.displayName !== "" ?
                            <span>{this.state.infoUser.displayName}</span> :
                            <span>{this.props.DetailUser.displayName}</span>
                        }

                        </p>
                        <img className="btn-secondary dropdown-toggle" type="button"
                            src={this.state.infoUser.image !== "" ?
                                settings.domain + '/' + this.state.infoUser.image :

                                settings.domain + '/' + this.props.DetailUser.image
                            }

                            id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                            aria-expanded="false" alt="Error" />

                    </NavLink>



                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <NavLink to={`/QuanLyTaiKhoan/${this.props.user.account}`} className="dropdown-item" >Quản lý tài khoản</NavLink>
                        <NavLink to={`/QuanLyDonHang/${this.props.user.account}`} className="dropdown-item" >Quản lý đơn hàng</NavLink>

                        <div className="dropdown-divider"></div>

                        <button className="dropdown-item" type='button'
                            onClick={() => { this.LogOut() }}>
                            <NavLink id='btn-logout' to='/'></NavLink>
                            Đăng xuất
                        </button>
                    </div>

                </div>


            )
        }

    }
    LogOut = () => {
        localStorage.clear();

        document.getElementById("btn-logout").click();

        this.props.GetInfoUser();
    }

    handleKeyUp = (event) => { // enter to search

        if (event.key === "Enter") {

            document.getElementById('nav-search').click();
        }

    }
    render() {
        return (
            <div className="header container-fluid">
                <div className="header-left">
                    <img src={Logo} alt="Error" />
                    <ul className="header-list-item">
                        <NavLink className="item-list" to={`/`} >Trang Chủ</NavLink>
                        <NavLink className="item-list" to={`/ThongTin`}>Thông tin</NavLink>
                        <NavLink className="item-list" to={`/TuyenDung`}>Tuyển dụng</NavLink>
                        <NavLink className="item-list" to={`/LienHe`}>Liên hệ</NavLink>
                    </ul>
                </div>

                <nav className="header-right navbar navbar-expand-lg">

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    {/* Form search */}
                    <div className="collapse navbar-collapse nav-item" id="navbarSupportedContent">

                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control input-search" type="search" placeholder="Tìm sản phẩm" aria-label="Search" id="keySearch"
                                name="keySearch" value={this.state.keySearch} onChange={this.handleChange} onKeyDown={this.handleKeyUp} />
                            <NavLink id='nav-search' to={`/DanhSachSanPhamTimKiem/${this.state.keySearch === "" ? "getAll" : this.state.keySearch}`} className="btn btn-search my-2 my-sm-0">
                                <i className="fa fa-search" aria-hidden="true"></i>
                            </NavLink>
                        </form>
                    </div>



                    {/* Giỏ hàng */}
                    <Cart ListProductsCart={this.props.ListProductsCart} />
                    {/* button login logout */}
                    <div>
                        {this.renderButton()}
                    </div>


                </nav>

            </div >
        );
    }


    componentDidMount() {


        if (localStorage.getItem('infoUser')) {
            
            this.props.GetInfoUser();
            let account = JSON.parse(localStorage.getItem('infoUser')).account
            this.props.GetDetailUser(account)

        }

        if (localStorage.getItem('UserCart')) {
            let cart = JSON.parse(localStorage.getItem('UserCart'))
            this.props.loadCart(cart);
        }
    }

    componentDidUpdate(prevProps) {

        if (!isEqual(prevProps.DetailUser, this.props.DetailUser)) {

            console.log("DidUpdate")
            this.setState({
                infoUser: {
                    image: this.props.DetailUser.image,
                    account: this.props.DetailUser.account,
                    displayName: this.props.DetailUser.displayName
                }
            });
        }
    }


}
const mapStateToProps = (state) => {
    return {
        ListProductsCart: state.ManageCartReducer.cart,
        isLogOut: state.ManageUserReducer.isLogOut,
        DetailUser: state.ManageUserReducer.DetailUser,
        user: state.ManageUserReducer.user,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        loadCart: (cart) => {
            let action = {
                type: 'Load_Cart',
                cart
            }
            dispatch(action)
        },

        LogOut: () => {
            dispatch({
                type: "LOGOUT"
            });
        },
        GetInfoUser: () => {
            dispatch({
                type: "GETINFOUSER"
            });
        },
        GetDetailUser: (id) => {
            dispatch(GetDetailUserAction(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
