import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
// import Header from '../../Components/Header/Header';
// import Footer from '../../Components/Footer/Footer';
const AdminLayout = (props) => {
  return <Fragment>
     {/* <Header></Header> */}
      {props.children}
      {/* <Footer/> */}
  </Fragment>
}

export const AdminTemplate = ({ Component, ...props }) => (
  <Route {...props} render={(propComponent) => (
    <AdminLayout>
      <Component {...propComponent}/>
    </AdminLayout>
  )} />
)