import { isEqual } from 'lodash';
import React, { Component } from 'react';
import { connect } from "react-redux"
import { NavLink } from 'react-router-dom';
import { settings } from '../../Commons/Settings';
import { GetListSearchProductAction, GetAllProductAction } from "./../../Redux/Actions/ManageProduct.Action"
import swal from "sweetalert"
import StarRatings from 'react-star-ratings';

class SearchList extends Component {
    formatMoney = (price) => {
        return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }

    renderRating = (rating) => {
        return (
            <StarRatings
                rating={rating}
                starRatedColor="Gold"
                // changeRating={this.changeRating}
                numberOfStars={5}
                starDimension="20px"
                 starSpacing="10px"
                name='rating'
            />
        )
    }
    renderSearchList = () => {
        return this.props.ListSearchProduct.map((element, index) => {
            return (
                <div className="row SearchList-item" key={index}>
                    <NavLink to={`/ThongTinSanPham/${element._id}`} className="col-10 info-item-listSeart" >
                        <div className="col-4 SearchList-img">
                            <img src={settings.domain + '/' + element.image} alt="Error" />
                        </div>
                        <div className="col-8 SearchList-info">
                            <p className='text-title'>{element.name}</p>
                            <p>Giá Bán : {this.formatMoney(element.price)} VNĐ</p>
                            <p>Số lượng còn : {element.quantity}</p>
                            <p>Ram : {element.ram}, Rom : {element.rom}</p>
                            <p>Camera : 32Mpx, Màn hình : 5.8 Inch</p>
                            <div className="rating">
                                {this.renderRating(1 + (Math.random() * (5 - 1)) ) }
                            </div>
                        </div>
                    </NavLink>
                    <div className="col-2 class-btn-addCart">

                        <button className='btn btn-success  btn-addCart' onClick={() => { this.props.themGioHang(element) }}>Thêm giỏ hàng</button>
                    </div>

                </div>

            )
        })
    }
    componentDidMount = () => {
        let key = this.props.match.params.key;
        console.log(key)

        this.props.GetListSearchProduct(key);


    }


    componentDidUpdate = (prevProps) => {
        let key = this.props.match.params.key;
        if (!isEqual(key, prevProps.match.params.key)) {
            // let key = this.props.match.params.key;
            // console.log(key)

            this.props.GetListSearchProduct(key);

        }
    }

    render() {
        return (
            <div className="SearchList ">
                <div className=" SearchList-content container">
                    {this.renderSearchList()}
                </div>
            </div>
        );
    }


}

const mapStateToProps = (state) => {
    return {
        ListSearchProduct: state.ManageProductReducer.ListSearchProduct
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        GetListSearchProduct: (key) => {
            dispatch(GetListSearchProductAction(key))
        },
        GetAllProduct: () => {
            dispatch(GetAllProductAction())
        },
        themGioHang: (sanPhamClick) => {

            //Tạo ra sản phẩm giỏ hàng từ sản phẩm được click
            const spGioHang = {
                maSP: sanPhamClick._id,
                tenSP: sanPhamClick.name,
                hinhAnh: sanPhamClick.image,
                giaBan: sanPhamClick.price,
                soLuong: 1,
            }
            const action = {
                type: 'THEM_GIO_HANG', //type là thuộc tính bắt buộc của redux,
                spGioHang: spGioHang
            }
            swal({
                icon: "success",
                title: "Thông báo",
                text: "Thêm thành công!",
                buttons: false,
                timer: 1200,
            });
            //Gọi phương thức dispatch khi người dùng click vào nút thêm sản phẩm đưa giá trị lên reducer 
            dispatch(action);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchList);