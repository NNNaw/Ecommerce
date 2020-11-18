import React, { Component } from 'react';
import { connect } from 'react-redux'
import { GetAllCategoryAction } from './../../Redux/Actions/ManageProduct.Action'
import { settings } from './../../Commons/Settings'
import { NavLink } from 'react-router-dom';
class Filter extends Component {

    renderFilter = () => {
        return this.props.ListCategories.map((element, index) => {
            return (
                <NavLink to={`/TheoLoaiSanPham/${element._id}`} key={index} className='col-3 Filter-item'>
                    <div className="item-content">
                        <img src={settings.domain + '/' + element.image} alt="Errors" />
                        <div className="infoNameCate">
                            <p className='text-nameCate'>{element.nameCategory}</p>
                        </div>
                    </div>
                </NavLink>
            )
        })
    }

    render() {
        return (
            <div className="Filter container">
                <div className="Filter-content row">
                    {this.renderFilter()}
                </div>

            </div>
        );
    }
    componentDidMount() {
        //lấy giá trị tham số từ url this.props.match.params.tenThamSo

        this.props.GetAllCategory();

    }
}

const mapStateToProp = state => {
    return {
        ListCategories: state.ManageProductReducer.Categories
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        GetAllCategory: () => {
            dispatch(GetAllCategoryAction())
        },

    }
}


export default connect(mapStateToProp, mapDispatchToProps)(Filter);