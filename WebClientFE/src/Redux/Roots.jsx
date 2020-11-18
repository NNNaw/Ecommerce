import {combineReducers} from 'redux';
import {ManageUserReducer} from './Reducers/ManageUsersReducer'
import {ManageProductReducer} from './Reducers/ManageProductsReducer'
import {ManageCartReducer} from './Reducers/ManageCartReducer'
import {ManageOrderReducer} from './Reducers/ManageOrderReducer'
export const rootReducer = combineReducers({
  //Chứa reducer theo từng nghiệp vụ
  ManageUserReducer,
  ManageProductReducer,
  ManageCartReducer,
  ManageOrderReducer
});
