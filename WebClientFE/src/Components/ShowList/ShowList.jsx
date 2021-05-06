import React, { Component } from 'react'
import { layDanhSachSanPhamPhanTrangAction } from "../../Redux/Actions/ManageProduct.Action"
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { AddProductCartAction } from '../../Redux/Actions/cartAction';
import ReactPaginate from 'react-paginate';
import './ShowList.css'
import { formatMoney, formatPage } from './../../Commons/functionCommon';

class ShowList extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            page: {
                offset: 0,
                perPage: 8,
                currentPage: 0,
                pageCount: 0,
            },

            offset: 0,
            perPage: 8,
            currentPage: 0,
            pageCount: 0,
        })
    }
    //Phân trang

    set = (count) => {
        this.setState({
            pageCount: count
        });
    }

    handlePageClick = (e) => {

        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;
        this.setState({

            currentPage: selectedPage,
            offset: offset

        }, () => {
            this.props.layDanhSachSanPhamPhanTrang(this.state.offset, this.state.perPage, this.set)
        });

    };
    renderPageIndex = () => {
        const settings = {
            previousLabel: "Trước",
            nextLabel: "Sau",
            breakLabel: "...",
            breakClassName: "break-me",
            pageCount: this.state.pageCount,
            marginPagesDisplayed: 2,
            pageRangeDisplayed: 5,
            onPageChange: this.handlePageClick,
            containerClassName: "pagination",
            subContainerClassName: "pages pagination",
            activeClassName: "active",
        }
        return (

            <ReactPaginate {...settings} />

        )
    }

    // formatMoney = (price) => {
    //     return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    // }
    // formatPage = () => {
    //     window.scrollTo(0, 0);
    // }
    renderListProduct = () => {
        return this.props.mangSanPhamPhanTrang.map((element, index) => {

            return (
                <div className="card col-3 card-item" key={index}>
                    <div className="top-card-item">

                        <img src={element.images[0].url} alt="error" />

                        <div className="card-body card-showlist-body">
                            <h4 className="card-title text-title-item">{element.name}</h4>
                            <p className="card-text text-title-info">{formatMoney(element.price)}</p>

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

                    <button className='btn btn-success'
                     onClick={() => { this.props.AddProductCart(element._id, false, true) }}>Thêm giỏ hàng</button>
                    <NavLink className="btn btn-danger" to={`/chi-tiet-san-pham/${element._id}`}>
                        Chi Tiết
                    </NavLink>

                </div>
            )
        })
    }

    render() {
        return (
            <div className="ShowList">
                <div className="ShowList-content container">
                    <h3>Danh sách sản phẩm</h3>
                    <div className="row ShowList-item">
                        {this.renderListProduct()}
                    </div>
                </div>

                <div className="row">
                    {
                        this.renderPageIndex()}
                </div>
            </div>
        )
    }



    componentDidMount() {
        formatPage();
        //lấy giá trị tham số từ url this.props.match.params.tenThamS
        // this.props.GetAllProduct();
        this.props.layDanhSachSanPhamPhanTrang(this.state.page.offset, this.state.page.perPage, this.set)
    }

}

const mapStateToProps = (state) => {
    return {
        ListProducts: state.ManageProductReducer.Products,// lấy data từ reducer
        mangSanPhamPhanTrang: state.ManageProductReducer.mangSanPhamPhanTrang
    };
}

const mapDispatchToProps = dispatch => {
    return {

        // GetAllProduct: () => {
        //     dispatch(GetAllProductAction())
        // },


        AddProductCart: (productClicked, isDeCrease, isAdd) => {
            dispatch(AddProductCartAction(productClicked, isDeCrease, isAdd))
        },
        layDanhSachSanPhamPhanTrang: (offset, perPage, set) => {
            dispatch(layDanhSachSanPhamPhanTrangAction(offset, perPage, set))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowList)