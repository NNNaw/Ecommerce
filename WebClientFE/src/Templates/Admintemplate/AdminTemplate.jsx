import React, { Fragment } from 'react';


import { Route, Redirect } from 'react-router-dom';
import { settings } from '../../Commons/Settings';
import { Roles } from '../../Commons/variable.common';
// import fakeAuth from "./../../Commons/fakeAuth.common";


const userLoginLocal = JSON.parse(localStorage.getItem(settings.infoUser))
let isAuthenticated = false;
let role = "";
if (userLoginLocal) {
  isAuthenticated = true;
  role = userLoginLocal.AccountType.name_AccountType;
}


const AdminLayout = (props) => {
  return <Fragment>
    {props.children}
  </Fragment>
}

export const AdminTemplate = ({
  Component,
  ...rest
}) => (
    <Route {...rest}

      render={(propsComponent) => {

        if (isAuthenticated && role === Roles.Management) {
          return (
            <AdminLayout>
              <Component {...propsComponent} />
            </AdminLayout>
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
