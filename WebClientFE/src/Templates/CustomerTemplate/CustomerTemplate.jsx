import React, { Fragment } from 'react';


import { Route, Redirect } from 'react-router-dom';
import { Roles } from '../../Commons/variable.common';


import BackToTop from "react-back-to-top-button";
import arrow from './../../Assets/Images/arrow.png'
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import { settings } from '../../Commons/Settings';


// const userLoginLocal = JSON.parse(localStorage.getItem(settings.infoUser))
// let isAuthenticated = false;
// let role = "";
// if (userLoginLocal) {
//     isAuthenticated = true;
//     role = userLoginLocal.AccountType.name_AccountType;
// }


const CustomerLayout = (props) => {
    return <Fragment>
        <Header />
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

const token = localStorage.getItem(settings.token) || '';
const user = JSON.parse(localStorage.getItem("infoUser"))
let role = '';
if(user){
    role = user.AccountType.name_AccountType;
}

export const CustomerTemplate = ({

    
    Component,
    ...rest
}) => (
        <Route {...rest}

            render={(propsComponent) => {

                if (token && role === Roles.Customer) {
                    return (
                        <CustomerLayout>
                            <Component {...propsComponent} />
                        </CustomerLayout>
                    )
                } else {

                    return (
                        <Redirect
                            to={{
                                pathname: "/privatePage",
                                state: {
                                    from: propsComponent.location
                                }
                            }}
                        />
                    );
                }
            }} />

    )
