import React, { Component } from 'react'
import { connect } from 'react-redux';
import { GetDetailProductAction } from "../../Redux/Actions/ManageProduct.Action"
import swal from 'sweetalert';
import StarRatings from 'react-star-ratings';
import { formatMoney, formatPage, getParam } from '../../Commons/functionCommon';
import { isEqual } from 'lodash';
import { typeOf } from 'react-back-to-top-button';
import { AddProductCartAction } from '../../Redux/Actions/cartAction';
class DetailProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            indexCurrent: 0,
            urlImageCurrent: "",
            optionProduct: {
                _id: "",
                rom: 1,
                sale_off: {
                    isSale_Off: false,
                    percent: 0
                },
                price: 1,
                images: [
                    {
                        Id_cloud: "",
                        quantity: 1,
                        _id: "",
                        url: "",
                        color: "",
                        employee_Product: {
                            _id: "",
                            account: ""
                        },
                        dateCreated: ""
                    }
                ],
                nameOption: "",
                alias_Option: ""
            }

        }
    }
    renderRating = (rating) => {
        return (
            <StarRatings
                rating={rating}
                starRatedColor="Gold"
                // changeRating={this.changeRating}
                numberOfStars={5}
                starDimension="17px"
                // starSpacing="15px"
                name='rating'
            />
        )
    }


    handleChange = (event) => {
        let { name, value } = event.target;
        this.props.history.push(`?dung-luong=${value}gb`)

        if (value != this.state.optionProduct.rom) {
            this.setState({
                optionProduct: this.props.DetailProduct.options[
                    this.findIndexOption(this.props.DetailProduct.options, value)],

            });
        }
    }

    renderOptions = (options) => {

        return options?.map((ele, index) => {
            return (
                <div className="item-option" key={index}>

                    <input type="radio"
                        id={ele.rom} value={ele.rom}
                        checked={ele._id === this.state.optionProduct._id}
                        onChange={this.handleChange}
                    />
                    <label htmlFor={ele.rom}>
                        {ele.rom}GB
                            <p>{ele.sale_off.isSale_Off ?
                            formatMoney(ele.price * (100 - ele.sale_off.percent) / 100) :
                            formatMoney(ele.price)
                        }
                        </p>
                    </label>



                </div>
            )
        })
    }


    handleChangeSelectImage = (url) => {
        this.setState({ urlImageCurrent: url });

    }

    renderImageOptions = (images) => {

        return images?.map((ele, index) => {
            return (
                <div className="select-image-color">
                    <div className={`image-option${ele.url == this.state.urlImageCurrent ? "-active" : ""}`} key={index}
                        onClick={() => this.handleChangeSelectImage(ele.url)}
                    >
                        <img src={ele.url} alt="error" />
                    </div>
                    <div className="color-option">
                        <p>{ele.color}</p>
                    </div>
                </div>
            )

        })

    }

    renderDetailPrice = (sale_off, price) => {

        if (sale_off == undefined) return
        if (sale_off.isSale_Off) {
            return (
                <p>
                    {formatMoney(price * (100 - sale_off.percent) / 100)}
                    <strong>₫</strong>
                    <del> {formatMoney(price)} ₫</del>
                    <label className='product-sale-off'>Giảm -{sale_off.percent}%</label>
                    <label classname="product-pernumpro">
                        Trả góp 0%
                 </label>
                </p>

            )

        }
        else {
            console.log(sale_off, price)
            return (
                <p>
                    {formatMoney(price)}
                    <strong>₫</strong>
                    <label className="product-pernumpro">
                        Trả góp 0%
                 </label>
                </p>

            )
        }

    }

    renderTitleNameProduct = (nameOption, _id) => {

        return (
            <div className="Header-Title-Name">
                <h1 className='Header-detail-product-title' >{nameOption}</h1>
                <span>(No.{_id.substr(-11)})</span>
            </div>
        )


    }

    render() {

        console.log(this.props.DetailProduct)
        let rating = 1 + (Math.random() * (5 - 1))
        // let string = rating.toString().substr(0, 4)
        let { name, options, nameOption, _id, price, images } = this.props.DetailProduct

        // let { nameOption, _id, sale_off, price, images } = this.state.optionProduct
        // let option;
        // if (options != undefined) {
        //     option = options[this.state.indexCurrent];
        // }
        return (
            <div className='DetailProduct'>

                <div className="DetailProduct-content container">

                    <div className="Header-detail-product">
                        {/* {this.renderTitleNameProduct(nameOption, _id)} */}

                        <div className="Header-Title-Name">
                            <h1 className='Header-detail-product-title' >{nameOption}</h1>
                            <span>(No.{!_id ? '0xxnx1' : _id.substr(-6)} )</span>
                        </div>

                        <div className="Header-rating">
                            <div>{this.renderRating(rating)} </div>
                            <span> 1 khách hàng đánh giá | 21 câu hỏi được trả lời</span>
                        </div>
                    </div>


                    <div className="Main-detail-product row">
                        <div className="col-5 Main-detail-product-left">
                            <img src={
                                images ? images[0]?.url : 'Null'
                            }
                                alt="error" />
                                <p>{name}</p>
                        </div>
                        <div className="col-7 Main-detail-product-middle">
                            <div className="product-price">
                                {this.renderDetailPrice(false, price)}
                            </div>
                            <div className="text-shipping">
                                <i className="fa fa-truck" aria-hidden="true"></i>
                                <p className='text-shipping'>
                                    GIAO HÀNG TRÊN 63 TỈNH THÀNH
                             </p>
                            </div>
                            <div className="options-product">
                                {this.renderOptions(options)}

                            </div>
                            <div className="options-image-product">

                                {this.renderImageOptions(images)}

                            </div>
                            <div className="options-discount">
                                <h4>Ưu đãi thêm</h4>
                                <ul className='list-contentDiscount'>
                                    <li><i class="fa fa-check"></i>  Giảm thêm 500.000đ cho Apple Watch/AirPods khi mua kèm iPhone</li>
                                    <li><i class="fa fa-check"></i> Tặng PMH 600.000đ mua Combo: Củ sạc nhanh 20W + Tai nghe EarPods</li>
                                    <li><i class="fa fa-check"></i>
                                    Thu cũ đổi mới – Trợ giá ngay 15% <a href="#">Xem thêm chi tiết</a></li>
                                </ul>

                            </div>
                        </div>


                    </div>

                    <div className="row m-0 DetailProduct-middle p-5">
                        <div className="col-6"></div>
                        <div className="col-6 group-buttons">
                            <button className='btn btn-success mr-4'
                                onClick={() => { this.props.AddProductCart(_id, false, true) }}>Thêm giỏ hàng</button>
                            <button className='btn btn-danger'>
                                <i className="fa fa-phone mr-3" aria-hidden="true"></i>
            Hot line (+1900 1220)
        </button>
                        </div>
                    </div>

                </div>

            </div>
        )
    }


    findIndexOption = (Option, capacity) => {


        if (capacity !== undefined) {

            return Option?.findIndex(ele => ele.rom === capacity)

        }
        return 0;

    }
    componentDidMount() {
        //lấy giá trị tham số từ url this.props.match.params.tenThamSo
        formatPage();
        // let { aliasBrand, aliasCategory, aliasSeries, aliasProduct } = this.props.match.params;
        let { id } = this.props.match.params;

        this.props.GetDetailProduct(id);

    }
    componentDidUpdate(prevProps, prevState) {
        console.log("didupdate")

        // let { aliasBrand, aliasCategory, aliasSeries, aliasProduct } = this.props.match.params;
        // if (!this.props.DetailProduct) {

        //     this.props.GetDetailProduct(aliasBrand, aliasCategory, aliasSeries, aliasProduct);
        //     // this.setState({
        //     //     optionProduct: this.findOption(this.props.DetailProduct.options)
        //     // })
        // }
        // if (!this.state.optionProduct._id) {
        //     let capacity = getParam(this.props.location.search, "dung-luong")
        //     capacity = capacity.slice(0, capacity.indexOf("gb"));
        //     this.setState({
        //         optionProduct: this.props.DetailProduct.options[
        //             this.findIndexOption(this.props.DetailProduct.options, capacity)],

        //     })
        // }
        // if (!this.state.urlImageCurrent || !isEqual(this.state.optionProduct, prevState.optionProduct)) {
        //     this.setState({
        //         urlImageCurrent: this.props.DetailProduct.options[0].images[0].url,
        //     })
        // }

    }
}
const mapStateToProp = state => {
    return {
        DetailProduct: state.ManageProductReducer.DetailProduct

    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        // GetDetailProduct: (aliasBrand, aliasCategory, aliasSeries, aliasProduct) => {
        //     dispatch(GetDetailProductAction(aliasBrand, aliasCategory, aliasSeries, aliasProduct))
        // },
        GetDetailProduct: (id) => {
            dispatch(GetDetailProductAction(id))
        },
        AddProductCart: (productClicked, isDeCrease, isAdd) => {
            dispatch(AddProductCartAction(productClicked, isDeCrease, isAdd))
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
            //dùng hàm dispatch của connect đưa dữ liệu lên redux (gioHangReducer)
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

export default connect(mapStateToProp, mapDispatchToProps)(DetailProduct);