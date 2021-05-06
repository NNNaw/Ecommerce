

import React, {useEffect , Suspense} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'


import { Hometemplate } from './Templates/Hometemplate/Hometemplate'
import { EmployeeTemplate } from './Templates/EmployeeTemplate/EmployeeTemplate'
import { AdminTemplate } from './Templates/Admintemplate/AdminTemplate'
import { CustomerTemplate } from './Templates/CustomerTemplate/CustomerTemplate'

import Home from './Pages/Home/Home'
import Contact from './Pages/Contacts/Contact'
import InfoWebsite from './Pages/Contacts/InfoWebsite'
import Recuitment from './Pages/Contacts/Recuitment'




import DetailProduct from './Pages/DetailProduct/DetailProduct';
import SearchList from './Pages/SearchList/SearchList';
import UserDetail from './Pages/UserDetail/UserDetail'
import ManageOrder from './Pages/ManageOrder/ManageOrder'
import Category from './Pages/Category/Category';
import Brand from './Pages/Brand/Brand'

import Admin from './Pages/Admin/Admin'
import { onLoadUserAction } from './Redux/Actions/ManageUsers.Action'
import TabQuanLySanPham from './Pages/Employee/TabQuanLySanPham'
import TabQuanLyHoaDon from './Pages/Employee/TabQuanLyHoaDon'
//scss
import './Assets/Scss/main.scss'
import CreateBrands from './Pages/Admin/CreateBrands';
import { settings } from './Commons/Settings';
import ErrorPage from './Pages/ErrorPage/ErrorPage';
import PrivatePage from './Pages/ErrorPage/PrivatePage';
import { useSelector } from 'react-redux';

const Register = React.lazy(() => import('./Pages/Register/Register'))

const Login = React.lazy(() => import('./Pages/Login/Login'))


function App() {

  let token = localStorage.getItem(settings.token) || '';
  let role = JSON.parse(localStorage.getItem("infoUser"));
  const user = useSelector(state => state.ManageUserReducer.DetailUser) // get role user

  useEffect(() => {
    if (typeof role == 'null')
    {
      role.AccountType.name_AccountType = 'Customer'
    }
  // Cập nhập document title sử dụng browser API
  if (user === null) {
    console.log("app")
    onLoadUserAction(token)
  }
});


return (


  
  <Suspense fallback={<div> Loading ... </div>}>
    <BrowserRouter>
      <Switch>

        {/* xử lý nghiệp vụ */}
        <Route exact path='/dangnhap' component={Login} />
        <Route exact path='/dangky' component={Register} />

        {/* route common */}
        <Hometemplate exact path='/' Component={Home} />
        <Hometemplate exact path='/LienHe' Component={Contact} />
        <Hometemplate exact path='/ThongTin' Component={InfoWebsite} />
        <Hometemplate exact path='/TuyenDung' Component={Recuitment} />



        {/* route employee */}
        {/* <EmployeeTemplate exact path='/nhanvien' Component={Employee} /> */}
        <EmployeeTemplate exact path='/nhanvien/TabQuanLySanPham' Component={TabQuanLySanPham} />
        <EmployeeTemplate exact path='/nhanvien/TabQuanLyHoaDon' Component={TabQuanLyHoaDon} />
        {/* <EmployeeTemplate exact path='/nhanvien/ThongTinNhanVien/:account' Component={InfoEmployee} /> */}

        {/* route admin */}
        <AdminTemplate exact path='/quanly' Component={Admin} />
        <AdminTemplate exact path='/taoHang' Component={CreateBrands} />

        {/* route user */}


        <CustomerTemplate exact path='/QuanLyTaiKhoan/:id' Component={UserDetail} />
        <CustomerTemplate exact path='/QuanLyDonHang/:id' Component={ManageOrder}  />


        <Hometemplate exact path='/chi-tiet-san-pham/:id' Component={DetailProduct} />
        <Hometemplate exact path='/:aliasBrand/:aliasCategory/:aliasProduct' Component={DetailProduct} />
        <Hometemplate exact path='/:aliasBrand/:aliasCategory/:aliasSeries/:aliasProduct' Component={DetailProduct} />
        <Hometemplate path='/tim-kiem/:key' Component={SearchList} />
        <Hometemplate exact path='/TheoLoaiSanPham/:Id_Category' Component={Category} />
        <Hometemplate exact path='/TheoLoaiHang/:Id_Brand' Component={Brand} />


        <Route path="/privatePage" component={PrivatePage} />

        {/* path="*" nên để cuối cùng vì có độ ưu tiên thấp nhất...*/}
        <Route path="*" component={ErrorPage} />
      </Switch>
    </BrowserRouter>
  </Suspense>



);
}

export default App;
