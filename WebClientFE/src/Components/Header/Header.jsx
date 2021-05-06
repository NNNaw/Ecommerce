import React, { Component } from 'react';

import { settings } from './../../Commons/Settings'
import { connect } from 'react-redux';

import { NavLink } from 'react-router-dom';
import Logo from "./../../Assets/Images/LogoAmazon.png"
import Cart from '../Cart/Cart';
import { isEqual } from 'lodash';
import { onLoadUserAction } from '../../Redux/Actions/ManageUsers.Action';
import { UrlInfoUser } from '../../Commons/functionCommon';
import { loadCartAction } from '../../Redux/Actions/cartAction';
import NavHeader from './NavHeader';


class Header extends Component {


    constructor(props) {
        super(props);
        this.state = {

            infoUser: {
                image: "",
                displayName: "x",
                account: "",
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

        if (this.props.DetailUser === null) { // true
            return (
                <div className='btn-group_Sign'>
                    <NavLink className='btn btn_Sign' to='/dangnhap'>Đăng nhập</NavLink>
                    <NavLink className='btn btn_Sign' to='/dangky'>Đăng ký</NavLink>
                </div>
            )

        } else { // false
            return (
                <div className="dropdown">
                    <NavLink className='personal-div' to={`/QuanLyTaiKhoan/${this.props.DetailUser.account}`}>
                        <p className="text-hello">Xin chào,
                        {/* {
                        this.state.infoUser.displayName !== "" ?
                            <span>{this.state.infoUser.displayName}</span> :
                            <span>{this.props.DetailUser.displayName}</span>
                        } */}
                            {this.props.DetailUser.displayName}
                        </p>
                        <img className=" btn-secondary dropdown-toggle" type="button"
                            // src={this.state.infoUser.image !== "" ?
                            //     this.state.infoUser.image :
                            //     this.props.user.image
                            // }
                            src={this.props.DetailUser.image}



                            id="dropdownMenuButton" data-toggle="dropdown" alt="Error" />
                    </NavLink>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">

                        <NavLink to={`/QuanLyTaiKhoan/user?id=${this.props.DetailUser._id}`} className="dropdown-item">
                            Quản lý tài khoản</NavLink>
                        <NavLink to={`/QuanLyDonHang/${this.props.DetailUser._id}`} className="dropdown-item" >Quản lý đơn hàng</NavLink>

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
        document.getElementById("btn-logout").click(); // move to home page
        this.props.LogoutAction();
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
                            <NavLink id='nav-search' to={`/tim-kiem/    ${this.state.keySearch === ""

                             ? "getAll" : this.state.keySearch}`} className="btn btn-search my-2 my-sm-0">
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
        if (this.props.DetailUser === null) {
            console.log("header")
            let token = localStorage.getItem(settings.token);
            this.props.onLoadUser(token);
        }

        if (localStorage.getItem('UserCart')) {
            this.props.loadCart();
        }
    }

    componentDidUpdate(prevProps) {

        // if (!isEqual(prevProps.DetailUser, this.props.DetailUser)) {
        //     this.setState({
        //         infoUser: {
        //             image: this.props.DetailUser.image,
        //             account: this.props.DetailUser.account,
        //             displayName: this.props.DetailUser.displayName
        //         }
        //     });
        // }
        // if (!isEqual(prevProps.DetailUser, this.props.DetailUser)) {
        //     // let _id = JSON.parse(localStorage.getItem('infoUser'))._id
        //     this.props.onLoadUser();
        // }
    }


}
const mapStateToProps = (state) => {
    return {
        ListProductsCart: state.ManageCartReducer.cart,
        // isLogOut: state.ManageUserReducer.isLogOut,
        DetailUser: state.ManageUserReducer.DetailUser,
        user: state.ManageUserReducer.user,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        loadCart: () => {
            dispatch(loadCartAction())
        },

        LogoutAction: () => {
            dispatch({
                type: "LOG_OUT"
            });
        },
        onLoadUser: (token) => {
            dispatch(onLoadUserAction(token));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
