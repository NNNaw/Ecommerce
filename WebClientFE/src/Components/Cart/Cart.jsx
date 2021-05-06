import React, { Component } from 'react'
import { settings } from './../../Commons/Settings'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import swal from 'sweetalert'
import { AddProductCartAction, DeleteProductCartAction, InDecreaseProductCartAction } from '../../Redux/Actions/cartAction'

class Cart extends Component {
    formatMoneyVND = (price) => {
        return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + ' VNĐ';
    }

    formatMoney = (price) => {
        return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }
    renderGioHang = () => {
        //Thay vì prop GioHang nhận từ component cha => thì ta dùng prop nhận từ redux về
        return this.props.ListProductsCart.map((ele, index) => {
            return (
                <tr key={index}>
                    <td>Điện thoại</td>
                    <td>{ele.name}</td>
                    <td><img src={ele.image} width={60} height={50} alt="Error" /></td>
                    <td>{ele.price}</td>
                    <td>
                        <button className='btn btn-warning mr-1'
                            onClick={() => this.props.AddProductCart(ele.id, true, false)}>-</button>
                        {ele.quantity}
                        <button className='btn btn-warning ml-1'
                            onClick={() => this.props.AddProductCart(ele.id, false, false)}>+</button>
                    </td>
                    <td>{ele.price * ele.quantity}</td>
                    <td><button onClick={() => { this.props.DeleteProductCart(ele.id) }} className='btn btn-danger'>X</button></td>


                </tr>
            )
        })
    }

    renderLengthCart = () => {
        let length = this.props.ListProductsCart.reduce((sum, ele, index) => {
            return sum += ele.quantity;
        }, 0);
        return length;
    }

    renderBriefCart = () => {
        return this.props.ListProductsCart.map((ele, index) => {
            return (
                <NavLink to={`/ThongTinSanPham/${ele.id}`} className="dropdown-item items-brief-cart" key={index}>
                    <img src={ele.image} alt="Errors" />

                    <p> {ele.name}</p>
                    <p className='text-cart-price'> {this.formatMoneyVND(ele.price)}</p>
                </NavLink>
            )
        })
    }

    alertLogin = () => {
        swal({
            icon: "warning",
            title: "Thông báo",
            text: "Bạn cần đăng nhập trước khi thanh toán !!!",
            buttons: {

                cancel: {
                    text: "Cancel",
                    value: false,
                    visible: true,
                    className: "",
                    closeModal: true,

                }
            }
        });
    }
    renderButtonPay = () => {
        if (this.props.DetailUser !== null) {
            return (
                <NavLink to={`/QuanLyDonHang/${this.props.DetailUser.account}`} type="button"

                    className="btn btn-success" >Thanh Toán</NavLink>
            )
        }
        else {
            return (
                <button type="button" className="btn btn-success" onClick={() => this.alertLogin()}>Thanh Toán</button>
            )
        }

    }
    moveToOrder = () => {
        document.getElementById("NavLink-to-order").click();
    }
    render() {

        return (
            <div className="nav-item" >

                <div className="dropdown dropdown-cart">

                    <button
                    //  onClick={() => this.moveToOrder()}
                     type="button" className="btn-cart" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                        aria-expanded="false">
                        <span className="LengthCart">{this.renderLengthCart()}</span>
                        <i className="fa fa-cart-plus" aria-hidden="true"></i>
                        <p className="text-cart">Giỏ hàng</p>
                    </button>
                    
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <div className="dropdown-item">
                            <p className='text-header-card'>Sản phẩm mới thêm</p>
                        </div>
                        {this.renderBriefCart()}
                        <div className="dropdown-item">
                            <p className='text-header-card'></p>
                        </div>

                        {/* <button type="button" className="btn btn-danger btn-viewDetailCart" data-toggle="modal" data-target="#exampleModalCenter">
                            <p className="text-cart">Xem Giỏ hàng</p>
                        </button> */}


                        {this.props.DetailUser !== null ?

                            <div className="footer-brief-cart">
                                <NavLink id="NavLink-to-order"
                                 to={`/QuanLyDonHang/${this.props.DetailUser.account}`} type="button"
                                    className="btn btn-success">Xem Giỏ hàng</NavLink>
                            </div>
                            :
                            <div className="footer-brief-cart">
                                <button type="button" className="btn btn-danger btn-viewDetailCart" 
                                data-toggle="modal" data-target="#exampleModalCenter">
                                    <p className="text-cart">Xem Giỏ hàng</p>
                                </button>
                            </div>
                        }



                    </div>

                    {/* Modal */}
                    <div className="modal fade" id="exampleModalCenter" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "1000px" }} role="document" >
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Loại</th>
                                                <th>Tên Sản Phẩm</th>
                                                <th>Hình ảnh</th>
                                                <th>Giá</th>
                                                <th>Số lượng</th>
                                                <th>Tổng tiền</th>
                                                <th>
                                                    <i className="fa fa-cog" aria-hidden="true"></i>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.renderGioHang()}
                                        </tbody>

                                    </table>
                                </div>
                                <div className="modal-footer">

                                    {this.renderButtonPay()}

                                    <button type="button" className="btn btn-secondary" data-dismiss="modal" >Đóng</button>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        )
    }

    componentDidMount = () => {
        if (localStorage.getItem('infoUser') !== null) {
            this.props.GetInfoUser();
        }

    }
}
const mapStateToProps = (state) => {
    return {

        DetailUser: state.ManageUserReducer.DetailUser,

    };
}



const mapDispatchToProps = dispatch => {
    return {

        DeleteProductCart: (id) => {
            dispatch(DeleteProductCartAction(id))
        },

        AddProductCart: (id, isDecrease, isAdd) => {
            dispatch(AddProductCartAction(id, isDecrease, isAdd))
        },

        GetInfoUser: () => {
            dispatch({
                type: "GETINFOUSER"
            });

        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)