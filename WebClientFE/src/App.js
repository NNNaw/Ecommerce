

import React, { Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'


import { Hometemplate } from './Templates/Hometemplate/Hometemplate'
import { EmployeeTemplate } from './Templates/EmployeeTemplate/EmployeeTemplate'
import { AdminTemplate } from './Templates/Admintemplate/AdminTemplate'


import Home from './Pages/Home/Home'
import Contact from './Pages/Contacts/Contact'
import InfoWebsite from './Pages/Contacts/InfoWebsite'
import Recuitment from './Pages/Contacts/Recuitment'


// import './App.css';
//scss
import './Assets/Scss/main.scss'

function App() {
  return (
    

    <Fragment>
    <BrowserRouter>
      <Switch>


        {/* xử lý nghiệp vụ */}
        {/* <Route exact path='/dangnhap' component={Login} />
        <Route exact path='/dangky' component={Register} /> */}

        {/* route common */}
        <Hometemplate exact path='/' Component={Home} />
        <Hometemplate exact path='/LienHe' Component={Contact} />
        <Hometemplate exact path='/ThongTin' Component={InfoWebsite} />
        <Hometemplate exact path='/TuyenDung' Component={Recuitment} />
      


        {/* route employee */}
        {/* <EmployeeTemplate exact path='/nhanvien' Component={Employee} />
        <EmployeeTemplate exact path='/nhanvien/TabQuanLySanPham' Component={TabQuanLySanPham} />
        <EmployeeTemplate exact path='/nhanvien/TabQuanLyHoaDon' Component={TabQuanLyHoaDon} />
        <EmployeeTemplate exact path='/nhanvien/ThongTinNhanVien/:account' Component={InfoEmployee} /> */}




        {/* route admin */}
        {/* <AdminTemplate exact path='/quanly' Component={Admin} /> */}


        {/* route user */}


        {/* <Hometemplate exact path='/QuanLyTaiKhoan/:account' Component={UserDetail} />
        <Hometemplate exact path='/QuanLyDonHang/:account' Component={ManageOrder} />




        <Hometemplate exact path='/ThongTinSanPham/:_id' Component={DetailProduct} />
        <Hometemplate path='/DanhSachSanPhamTimKiem/:key' Component={SearchList} />
        <Hometemplate exact path='/TheoLoaiSanPham/:Id_Category' Component={Category} />
        <Hometemplate exact path='/TheoLoaiHang/:Id_Brand' Component={Brand} /> */}


      </Switch>
    </BrowserRouter>
  </Fragment>


  );
}

export default App;
