

const fakeAuth = {
    isAuthenticated: false,
    roleUserLogin: "",
    authenticate(cb, role) {
        this.isAuthenticated = true;
        this.roleUserLogin = role;
        setTimeout(cb(), 100)
    },
    logout(cb) {
        this.isAuthenticated = false;
        this.roleUserLogin = "";
        setTimeout(cb(), 100);
    },
}

export default fakeAuth;


// import React from "react";
// import { Route, Redirect } from "react-router-dom";
// import auth from "./auth";


// export const ProtectedRoute = ({
//     component: Component,
//     ...rest
// }) => {
//     return (
//         <Route
//             {...rest}
//             render={props => {
//                 if (auth.isAuthenticated()) {
//                     return <Component {...props} />;
//                 } else {
//                     return (
//                         <Redirect
//                             to={{
//                                 pathname: "/",
//                                 state: {
//                                     from: props.location
//                                 }
//                             }}
//                         />
//                     );
//                 }
//             }}
//         />
//     );
// };
