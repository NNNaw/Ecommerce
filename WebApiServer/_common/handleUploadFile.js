
const idType = require('./variable.common')

export function checkRole(id) {
  switch (id) {
    case idType.idTypeManagement:
      return 1;
    // break;
    case idType.idTypeEmplopyee:
      return 2;
    // break;
    case idType.idTypeCutomer:
      return 3;
    // break;
    default:
      return 3;
    // break;
  }
};