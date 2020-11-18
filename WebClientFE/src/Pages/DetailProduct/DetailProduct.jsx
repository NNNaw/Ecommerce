import React, { Component } from 'react'
import { settings } from './../../Commons/Settings'
import { connect } from 'react-redux';
import { GetDetailProductAction } from "../../Redux/Actions/ManageProduct.Action"
import swal from 'sweetalert';
import StarRatings from 'react-star-ratings';

class DetailProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // maKhoaHoc: this.props.match.params.maKhoaHoc,

        }
    }
    formatMoney = (price) => {
        return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }
    formatPage = () => {
        window.scrollTo(0, 0);
    }
    renderRating = (rating) => {
        return (
            <StarRatings
                rating={rating}
                starRatedColor="Gold"
                // changeRating={this.changeRating}
                numberOfStars={5}
                starDimension="19px"
                // starSpacing="15px"
                name='rating'
            />
        )
    }
    render() {
        let { name, price, image, alias, origin, material, quantity, descripts, ram, rom, operator } = this.props.DetailProduct;
        let rating = 1 + (Math.random() * (5 - 1))
        let string = rating.toString().substr(0, 4)
        return (
            <div className='DetailProduct'>
                {this.formatPage()}
                <div className="DetailProduct-content container">
                    <div className="row m-0">
                        <div className='DetailProduct-left col-6'>
                            <div className="text-title-header">
                                <h5 className='text-title-alias'>Đường dẫn sản phẩm :
                                 <p> {alias}</p></h5>
                            </div>

                            <div className='class-img'>
                                <img src={settings.domain + '/' + image} alt="error" />
                            </div>
                            <div className='class-info-product-bottom p-4'>
                                <p className='text-rating' style={{ color: "Gold" }}>
                                    <span className='span-rating' style={{ lineHeight: "19px" }}>{string}</span> <span>{this.renderRating(rating)}</span> </p>

                                <p className='text-ppp' ><span>Đã bán</span> : 51 - </p>
                                <p className='text-ppp'><span>Đánh giá</span> : 312 </p>
                            </div>
                        </div>
                        <div className='DetailProduct-right col-6'>
                            <h3 className='text-title-detailproduct'>Thông tin sản phẩm</h3>

                            <ul className='DetailProduct-list-info'>
                                <li className='DetailProduct-info-item'>
                                    <p className='text-info-item'>Tên sản phẩm :  <span>{name}</span></p>
                                </li>
                                <li className='DetailProduct-info-item'>

                                    {price != null &&
                                        <p className='text-info-item'>Giá sản phẩm : <span>{this.formatMoney(price)} VNĐ</span> </p>
                                    }
                                </li>
                                <li className='DetailProduct-info-item'>
                                    <p className='text-info-item'> Số lượng còn :
                                     <span> {quantity}</span>
                                    </p>
                                </li>
                                <li className='DetailProduct-info-item'>
                                    <p className='text-info-item'> Chất liệu :
                                     <span> {material}</span>
                                    </p>
                                </li>
                                <li className='DetailProduct-info-item'>
                                    <p className='text-info-item'> Xuất xứ :
                                      <span> {origin}</span>
                                    </p>
                                </li>
                                <li className='DetailProduct-info-item'>
                                    <p className='text-info-item'> Thông số cấu hình : </p>

                                </li>
                                <li className='DetailProduct-info-item'>
                                    <p className='text-info-item'> Hỗ trợ công nghệ :
                                     <span>5G , FaceID, Finger Scanner</span>
                                    </p>
                                </li>
                                <li className='DetailProduct-info-item'>
                                    <p className='text-info-item'> Chip xử lý :
                                     <span>IOS 13</span>
                                    </p>
                                </li>
                                <li className='DetailProduct-info-item'>
                                    <p className='text-info-item'> Ram :
                                     <span>{ram}</span>
                                    </p>
                                </li>
                                <li className='DetailProduct-info-item'>
                                    <p className='text-info-item'> Rom :
                                     <span>{rom}</span>
                                    </p>
                                </li >

                                <li className='DetailProduct-info-item'>
                                    <p className='text-info-item'> Hệ điều hàng :
                                     <span>{operator}</span>
                                    </p>
                                </li>

                                <li className='DetailProduct-info-item'>
                                    <p className='text-info-item'> kích thước :
                                     <span>77 x 55 x 11 (mm) </span>
                                    </p>
                                </li>

                                <li className='DetailProduct-info-item'>
                                    <p className='text-info-item'> kích thước màn hình:
                                     <span> 5.8 Inch </span>
                                    </p>
                                </li>
                                <li className='DetailProduct-info-item'>
                                    <p className='text-info-item'> Chất lượng màn hình:
                                     <span> OLED </span>
                                    </p>
                                </li>
                                <li className='DetailProduct-info-item'>
                                    <p className='text-info-item'> Camera :  </p>
                                    <p className='ml-5'> Trước : <span> 23 Mpx </span></p>
                                    <p className='ml-5'> Sau : <span> 13 Mpx </span></p>
                                </li>
                            </ul>
                        </div>

                    </div>

                    <div className="row m-0 DetailProduct-middle">
                        <div className="col-6"></div>
                        <div className="col-6 group-buttons">
                            <button className='btn btn-success' onClick={() => { this.props.themGioHang(this.props.DetailProduct) }}>Thêm giỏ hàng</button>
                            <button className='btn btn-danger'>
                                <i className="fa fa-phone mr-3" aria-hidden="true"></i>
                                Hot line (+1900 1220)
                                </button>
                        </div>
                    </div>
                    <div className="row bg-class"></div>


                    <div className="row introduction-product">
                        <h3 className="p-5">Giới thiệu sản phẩm</h3>
                        <div className="col-12 text-product">
                            <p><span>{descripts}</span> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit dignissimos minus laudantium tenetur, maiores obcaecati itaque totam eaque ex numquam dolor autem nulla facere? Magni veritatis fuga quam tempore amet. Voluptatum ex, sit sunt voluptatem nulla amet praesentium, assumenda laboriosam deserunt commodi corrupti aut.
                                 Veniam delectus soluta tempora nam illum libero cupiditate tempore asperiores ipsa ratione dolorum id ullam molestias iure vel voluptatibus, deserunt repellat modi odit. Dolorum perferendis omnis magnam nulla est unde ipsam quidem hic deleniti aspernatur. Neque asperiores nesciunt molestiae eveniet, labore, libero repellat deserunt earum aliquid, illo dicta id inventore incidunt nam odio cumque saepe. Aspernatur.</p>
                            <p>Lorem ipsum dolor sit amet, <span>consectetur adipisicing elit</span>. Eaque rerum est perferendis, ut cum blanditiis debitis quis vero facilis repellendus perspiciatis! Hic tempore eum, ipsum nemo dolores, sunt a facilis maxime fugiat totam veritatis, porro rerum veniam! Atque sapiente facere tempore ea rem doloribus, aliquid sit ut earum sed modi, consequuntur nulla odio magni veniam ipsa cupiditate in
                            nihil reiciendis corporis? Repellat <span>totam reiciendis ea</span> repellendus est id illum, quis sint impedit magnam, eaque dolores quibusdam quisquam a officia autem?</p>
                        </div>
                    </div>

                </div>

            </div>
        )
    }

    componentDidMount() {
        //lấy giá trị tham số từ url this.props.match.params.tenThamSo
        let { _id } = this.props.match.params;

        this.props.GetDetailProduct(_id);

    }
}
const mapStateToProp = state => {
    return {
        DetailProduct: state.ManageProductReducer.DetailProduct

    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        GetDetailProduct: (id) => {
            dispatch(GetDetailProductAction(id))
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