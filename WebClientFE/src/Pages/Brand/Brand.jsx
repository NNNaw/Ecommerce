import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { settings } from '../../Commons/Settings';
import { GetAllCategoryAction, GetAllIdBrandAction } from '../../Redux/Actions/ManageProduct.Action';


class Brand extends Component {


    constructor(props) {
        super(props);
        this.state = {

        }
    }
    formatMoney = (price) => {
        return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }

    renderListCateProduct = () => {
        return this.props.ByIdBrands.map((element, index) => {

            return (
                <div className="card col-3 card-item" key={index}>
                    <div className="top-card-item">

                        <img src={settings.domain + '/' + element.image} alt="error" />

                        <div className="card-body card-showlist-body">
                            <h4 className="card-title text-title-item">{element.name}</h4>
                            <p className="card-text text-title-info">{this.formatMoney(element.price)} VNĐ</p>

                        </div>

                        <div className="text-TraGop"> <p>Trả Góp 0%</p> </div>


                        <div className="text__overplay">
                            <h5 className='pt-3'>Thông số cơ bản :</h5>
                            <p>Ram : {element.ram}</p>
                            <p>Rom : {element.rom}</p>
                            <p>IOS : {element.operator}</p>
                            <p>Xuất xứ : {element.origin}</p>
                            <p>Chính hãng : 100% Like New </p>
                        </div>
                    </div>


                    <button className='btn btn-success' onClick={() => { this.props.AddProductCart(element) }}>Thêm giỏ hàng</button>
                    <NavLink className="btn btn-danger" to={`/ThongTinSanPham/${element._id}`}>
                        Chi Tiết
                    </NavLink>

                </div>
            )
        })
    }

    formatPage = () => {
        window.scrollTo(0, 0);
    }

    renderListBrandCate = () => {
        return this.props.ListBrandByCate.map((element, index) => {
            return (
                <NavLink to={`/TheoLoaiHang/${element._id}`} key={index} className='col-2 Caterory-itemBrand'>
                    <img src={settings.domain + '/' + element.image} alt={element.nameBrand} />
                    <p className='text-nameCate'>{element.nameBrand}</p>
                </NavLink>
            )
        })
    }
    renderFilter = () => {
        return this.props.Categories.map((element, index) => {
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
            <div className='Brand container'>
                <div className="Brand-content">
                    <div className="row my-4 Brand-content-listBrand">
                        {this.renderFilter()}
                    </div>
                    <div className="row Category-content-product" >
                        {this.renderListCateProduct()}
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        let { Id_Brand } = this.props.match.params;
        this.props.GetAllIdBrand(Id_Brand);
        this.props.GetAllCategory();
        this.formatPage()
    }
}
function mapStateToProps(state) {
    return {
        ByIdBrands: state.ManageProductReducer.ByIdBrands,
        Categories :state.ManageProductReducer.Categories
    };
}

function mapDispatchToProps(dispatch) {
    return {
        GetAllIdBrand: (id) => {
            dispatch(GetAllIdBrandAction(id))
        },
        GetAllCategory: () => {
            dispatch(GetAllCategoryAction())
        },
    };
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(Brand);