import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';

import BackToTop from "react-back-to-top-button";
import arrow from './../../Assets/Images/arrow.png'
import NavHeader from '../../Components/Header/NavHeader';

const HomeLayout = (props) => {
  return <Fragment>
    <Header />
    <NavHeader />
    {props.children}
    <Footer />
    <BackToTop
      showOnScrollUp
      showAt={100}
      speed={1500}
      easing="easeInOutQuint"
    >
      <img src={arrow} alt="error" />
    </BackToTop>
  </Fragment>
}

export const Hometemplate = ({ Component, ...props }) => (
  <Route {...props} render={(propComponent) => (
    <HomeLayout>
      <Component {...propComponent} />
    </HomeLayout>
  )} />
)