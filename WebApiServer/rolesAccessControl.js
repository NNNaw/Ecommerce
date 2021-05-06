
// server/roles.js
const AccessControl = require("accesscontrol");
const { Roles } = require('./_common/variable.common')

const ac = new AccessControl();

exports.roles = (function () {

    ac.grant(Roles.Customer)
        .readOwn("profile")
        .updateOwn("profile")
        .updateOwn("invoice")

        
    ac.grant(Roles.Employee)
        .extend(Roles.Customer)
        .updateAny("invoice")
        .updateAny("product")
        .deleteAny("product")

    ac.grant(Roles.Management)
        .extend(Roles.Customer)
        .extend(Roles.Employee)
        .updateAny("resources")
        .deleteAny("resources")

    return ac;
})();