import React, { Fragment } from 'react';
import { NavLink, Redirect, Route } from 'react-router-dom';
import { settings } from '../../Commons/Settings';
import { Roles } from '../../Commons/variable.common';
// import { settings } from '../../Commons/Settings';
import './EmployeeTemplate.css'



// let userLoginLocal = JSON.parse(localStorage.getItem('userLoginLocal'))
const userLoginLocal = JSON.parse(localStorage.getItem(settings.infoUser))
let isAuthenticated = false;
let role = "";
if (userLoginLocal) {
  isAuthenticated = true;
  role = userLoginLocal.AccountType.name_AccountType;
}


const openNav = () => {
  //console.log("name")
  // document.getElementById("mySidenav").style.width = "250px";
  // document.getElementById("main").style.marginLeft = "250px";
}
const closeNav = () => {
  // document.getElementById("mySidenav").style.width = "0";
  // document.getElementById("main").style.marginLeft = "0";
}


const EmployeeLayout = (props) => {
  return <Fragment>
    <div>
      <div id="mySidenav" className="sidenav">
        <p className="closebtn" onClick={() => closeNav()}>x</p>
        <NavLink to={'/nhanvien/TabQuanLySanPham'}><p>Quản lý Sản Phẩm</p></NavLink>
        <NavLink to={'/nhanvien/TabQuanLyHoaDon'}><p>Quản lý Hóa Đơn</p></NavLink>
        <NavLink to={`/nhanvien/ThongTinNhanVien/${userLoginLocal.account}`}><p>Tài khoản của bạn</p></NavLink>

      </div>
      <div id="main">
        <div className="container-fluid">
          <div className="row admin-top bg-light">
            <span style={{ fontSize: 30, cursor: 'pointer' }} onClick={() => openNav()}>☰ Menu</span>
            <div className='d-flex'>


              <p className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span> Xin chào , {userLoginLocal.account} </span>
              </p>

              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">

                <NavLink to={"/"} className="dropdown-item">Trang chủ</NavLink>
                <NavLink to={`/nhanvien/ThongTinNhanVien/${userLoginLocal.account}`}
                  className="dropdown-item" >Thông tin nhân viên</NavLink>


                <NavLink to={'/dangnhap'} onClick={() => localStorage.clear()}
                  className="dropdown-item" >Đăng xuất</NavLink>
              </div>
            </div>
          </div>

          <div className="row admin-content">
            {props.children}
          </div>
        </div>

      </div>
    </div>

  </Fragment>
}

export const EmployeeTemplate = ({ Component, ...rest }) => (

  <Route {...rest}
    render={(props) => {
      if (isAuthenticated && role === Roles.Employee) {
        return (
          <EmployeeLayout>
            <Component {...props} />
          </EmployeeLayout>
        )
      } else {

        return (
          <Redirect
            to={{
              pathname: "/privatePage",
              state: {
                from: props.location
              }
            }}
          />
        );
      }
    }} />

)