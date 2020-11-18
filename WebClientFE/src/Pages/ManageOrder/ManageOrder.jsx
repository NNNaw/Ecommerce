import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { settings } from '../../Commons/Settings';
import { GetAllMethodPaymentAction, GetAllMethodShippingAction, GetAllOrderByIdCustomerAction } from '../../Redux/Actions/ManageOrder.Action';
import { BuyProductAction, CancelOrderAction } from './../../Redux/Actions/ManageUsers.Action'
import { isEqual } from 'lodash'
import { DeleteProductCartAction, InDecreaseProductCartAction, DeleteALLProductCartAction } from '../../Redux/Actions/cartAction';
import swal from 'sweetalert';
var dateFormat = require('dateformat');



class ManageOrder extends Component {


    constructor(props) {
        super(props);
        this.state = {

            Order: {

                address: "",
                note: "",
                Id_PaymentMethod: "",
                Id_ShippingMethod: "",

                // account: "",
                // OrderDetail: [
                //     // {
                //     //     Id_Product: "",
                //     //     quantity: 0
                //     // },

                // ]
            },
            error: {
                address: "",
            }
        }

    }

    handleChange = (event) => {
        let { value, name } = event.target;
        this.setState({
            Order: { ...this.state.Order, [name]: value },

        }, () => {
            console.log(this.state.Order)
        })
    }
    formatPage = () => {
         window.scrollTo(0, 0);
    }
    formatMoney = (price) => {
        return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }

    formatMoneyVND = (price) => {
        return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + ' VNĐ';
    }
    getSumPrice = (array) => {

        let SumPrice = array.reduce((sum, ele, index) => {
            return sum += ele.price * ele.quantity;
        }, 0);
        return SumPrice;
    }


    renderOrderProduct = (OrderDetail) => {
        return OrderDetail.map((ele, index) => {
            return (
                <NavLink to={`/ThongTinSanPham/${ele._id}`} className="row" id="infoOrderEachItem" key={index}>
                    <div className='infoItem-order-left col-4'  >
                        <img src={settings.domain + '/' + ele.image} alt="Error" />

                    </div>

                    <div className='text-OrderProduct col-8'>
                        <p>Tên sản phẩm : <span>{ele.name}</span> </p>
                        <p>Giá bán : <span>{this.formatMoney(ele.price)} VNĐ</span> </p>
                        <p>Số lượng : <span>{ele.quantity}</span> </p>
                        <p>Tổng : <span>{this.formatMoney(ele.quantity * ele.price)} VNĐ</span> </p>
                    </div>

                </NavLink>
            )
        })
    }


    getSumPriceToPay = (sumPrice, feeShipping, tax) => {

        let BigSum = sumPrice + feeShipping + (tax * sumPrice / 100)
        return this.formatMoney(BigSum);
    }

    handleAlert = (id) => {
        swal({
            title: "Thông báo!!!?",
            text: "Bạn chắc muốn hủy hóa đơn này của bạn chứ ???",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Poof! Hóa đơn đã hủy !", {
                        icon: "success",
                    });
                    this.props.BuyProduct(id);
                } else {
                    swal("Hóa đơn của bạn không thay đổi!");
                }
            });

    }

    renderTab = (array, isComfirmed) => {

        if (array.length === 0) {
            return (
                <div className='tab-content-item'>
                    <h5 style={{ width: "300px", padding: "20px" }}
                        className='text-right'>Chưa có hóa đơn!!!!</h5>
                </div>
            )
        }

        return array.map((element, index) => {

            return (
                <div className='tab-content-item row' key={index}>
                    <div className="col-6 info-order-left">
                        <h3 className='text-title' >Thông tin sản phẩm</h3>
                        {this.renderOrderProduct(element.OrderDetail)}
                    </div>
                    <div className="col-6  info-order-right">
                        <h3 className='text-title'>Thông tin đơn hàng</h3>
                        <div className="text-info-order-right">
                            <p><span>Ngày đặt hàng</span> : {dateFormat(element.dateCheckin, "fullDate")}</p>
                            <p><span>Ngày duyệt</span> : {isComfirmed ?

                                dateFormat(element.dateCheckout, "fullDate") : "Đang chờ duyệt"
                            }

                            </p>
                            <p><span>Địa chỉ nhận</span> : {element.address}</p>
                            <p><span>Phương thức vận chuyển</span> : {element.nameShippingMethod}</p>
                            <p><span>Phương thức thanh toán</span> : {element.namePaymentMethod}</p>
                            <p><span>*Ghi chú</span>  : {element.note}</p>
                            <div className="detail-payment">
                                <p>Chi tiết thanh toán :</p>
                                <ul className="">

                                    <li>Tổng giá sản phẩm : {this.formatMoney(this.getSumPrice(element.OrderDetail))} VNĐ</li>
                                    <li>Phí vận chuyển :  {this.formatMoney(element.FeeShipping)} VNĐ</li>
                                    <li>Thuế thanh toán : {element.TexMethod} %</li>
                                    <li>Số tiền cần thanh toán :
                                            {this.getSumPriceToPay(this.getSumPrice(element.OrderDetail),
                                        element.FeeShipping, element.TexMethod
                                    )} VNĐ</li>
                                </ul>
                            </div>


                        </div>


                        {isComfirmed ?
                            <div className="bnt-reOrder">
                                <button className='btn btn-success'
                                    onClick={() => this.handleOrder(element.OrderDetail, element, true)}>
                                    Tái đặt hàng</button>
                            </div>
                            :
                            <div className="bnt-reOrder">
                                <button className='btn btn-danger'
                                    onClick={() => this.handCancelOrder(this.props.user.account, element._id)}>Hủy đặt hàng</button>
                            </div>
                        }

                    </div>

                </div >
            )


        })
    }

    handCancelOrder = (account, _id) => {
        swal({
            title: "Thông báo!!!?",
            text: "Bạn chắc muốn xóa sản phẩm này ra khỏi giỏ hàng của bạn chứ ???",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    this.props.CancelOrder(account, _id)
                    swal("Poof! hóa đơn của bạn đã được xóa !", {
                        icon: "success",
                    });

                } else {
                    swal("Hóa đơn của bạn không thay đổi!");
                }
            });
    }

    // handChooseQuantity = (id, quantity){
    //     let product = this.props.
    // }

    renderInputQuantity = (ele) => {
        return (
            <td className='td-2 td-quantity'>
                <button className='btn btn-warning btn-decrease-quantity'
                    onClick={() => this.props.InDecreaseProductCart(ele.id, false)}>-</button>
                {/* <input type="number" id="quantity" name="quantity"
                    value=  min="1" max="5" /> */}
                <span className='span-quantity'>{ele.quantity}</span>
                <button className='btn btn-warning btn-increase-quantity'
                    onClick={() => this.props.InDecreaseProductCart(ele.id, true)}>+</button>
            </td>
        )
    }

    renderGioHang = () => {

        //Thay vì prop GioHang nhận từ component cha => thì ta dùng prop nhận từ redux về

        return this.props.ListProductsCart.map((ele, index) => {
            return (
                <tr key={index}>
                    <td className='td-1'>Điện thoại</td>
                    <td className='td-3'>
                        <NavLink to={`/ThongTinSanPham/${ele.id}`} >
                            {settings.domain + '/' + ele.name}
                        </NavLink>
                    </td>
                    <td className='td-1'>{ele.name}</td>
                    <td className='td-2'>
                        <img src={settings.domain + "/" + ele.image} width={75} height={100} alt="Error" /></td>
                    <td className='td-2'>{this.formatMoneyVND(ele.price)}</td>
                    {this.renderInputQuantity(ele)}
                    <td className='td-3'>{this.formatMoneyVND(ele.price * ele.quantity)}</td>
                    <td className='td-1'><button onClick={() => { this.props.DeleteProductCart(ele.id) }} className='btn btn-danger'>X</button></td>


                </tr>
            )
        })
    }

    renderSelectPayment = (array) => {
        return array.map((ele, index) => {

            return (
                <option key={index} value={ele._id}> {ele.namePaymentMethod} </option>
            )
        })
    }
    renderSelectShipping = (array) => {
        return array.map((ele, index) => {
            return (
                <option key={index} value={ele._id}>{ele.nameShippingMethod}</option>
            )
        })
    }

    handleResetCart = () => {
        this.props.DeleteALLProductCart();

        this.setState({
            error: {
                address: ""
            }
        }, () => {
            console.log("Nam", this.state.error)
        });


    }

    handleOrder = (arrayProduct, element, isReOrder) => {
        let arr = [];

        if (isReOrder) {

            arrayProduct.forEach(element => {
                let product = {
                    Id_Product: element._id,
                    quantity: element.quantity
                }
                arr.push(product)
            });
        } else {
            arrayProduct.forEach(element => {
                let product = {
                    Id_Product: element.id,
                    quantity: element.quantity
                }
                arr.push(product)
            });
        }

        let { address, note, Id_PaymentMethod, Id_ShippingMethod } = element
        if (address === "") { // check empty
            this.setState({
                error: {
                    address: "(*)Không được bỏ trống địa chỉ!"
                }
            });
            return;
        }


        const fd = new FormData();
        fd.append('address', address)
        fd.append('note', note);
        fd.append('Id_PaymentMethod', Id_PaymentMethod);
        fd.append('Id_ShippingMethod', Id_ShippingMethod);

        fd.append('OrderDetail', JSON.stringify(arr));

        this.props.BuyProduct(this.props.user.account, fd, this.handleResetCart);

        // axios.post(settings.domain + `/order/CreateOrder/${this.props.user.account}`, fd)
        //     .then(res =>
        //         console.log(res)
        //     );

    }

    handleSubmit = (event) => {
        event.preventDefault();//chặn submit của browser
        //Xử lý mật khẩu



        this.handleOrder(this.props.ListProductsCart, this.state.Order, false);

        // this.props.BuyProduct(this.props.user.account, order);
    }
    renderFormSubmitOrder = () => {
        return (
            <form action="Post" onSubmit={this.handleSubmit}>
                <h3>Tùy chọn giao hàng</h3>
                <div className='option-payment'>

                    <label htmlFor="payment-method">Phương thức thanh toán : </label>
                    <select onChange={this.handleChange} value={this.state.Order.Id_PaymentMethod} id="payment-method"
                        name="Id_PaymentMethod">
                        {this.renderSelectPayment(this.props.listMethodPayment)}
                    </select>


                </div>
                <div className='option-shipping'>
                    <label htmlFor="shipping-method">Phương thức vận chuyển : </label>
                    <select onChange={this.handleChange}
                        value={
                            this.state.Order.Id_ShippingMethod

                        } id="shipping-method" name="Id_ShippingMethod">
                        {this.renderSelectShipping(this.props.listMethodShipping)}
                    </select>

                </div>

                <div className='option-note'>

                    <div className="note-address">
                        <label htmlFor="id-address">Nhập địa chỉ : </label>
                        <input onChange={this.handleChange} value={this.state.Order.address} name="address" id='id-address' placeholder="Điền vào địa chỉ muốn nhận hàng" type="text" />
                        {this.state.error.address !== "" &&
                            <div className="error"><p className='text-danger'>{this.state.error.address}</p></div>}
                    </div>

                    <div className="note-note">
                        <label htmlFor="id-note">*Thêm ghi chú : </label>

                        <input onChange={this.handleChange} value={this.state.Order.note}
                            name="note" id="id-note" rows="4" cols="50"
                            placeholder='Ghi chú hóa đơn' />
                    </div>
                </div>
                <div className="div-button-footer-order">
                    <button className='btn btn-primary' type='submit'>Mua hàng</button>
                </div>
            </form>
        )
    }

    render() {

        return (
            <div className='ManageOrder'>

                <div className="ManageOrder-content container">

                    <div className="row cart-in-order">
                        <h3 className='text-title my-3 pl-3'>Giỏ hàng của bạn</h3>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className='th-1'>Loại</th>
                                    <th className='th-3'>Link Sản phẩm</th>
                                    <th className='th-2'>Tên</th>
                                    <th className='th-2'>Hình ảnh</th>
                                    <th className='th-2'>Giá</th>
                                    <th className='th-2'>Số lượng</th>
                                    <th className='th-3'>Tổng tiền</th>
                                    <th className='th-1'>
                                        <i className="fa fa-cog" aria-hidden="true"></i>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.ListProductsCart.length > 0 ?
                                    this.renderGioHang() :
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>

                                        <td>
                                            <h5 style={{ width: "300px" }} className=''>Chưa có sản phẩm trong giỏ</h5>
                                        </td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>

                                }
                            </tbody>

                        </table>

                        <div className="footer-order-cart">
                            {this.props.ListProductsCart.length > 0 &&
                                this.renderFormSubmitOrder()
                            }
                        </div>
                    </div>

                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active text-danger h-100" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Hóa Đơn Đã Mua</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-danger h-100" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Hóa Đơn Chờ Giao</a>
                        </li>

                    </ul>
                    <div className="tab-content p-4" id="myTabContent">

                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            {this.renderTab(this.props.arrayOrderConfirmed, true)}
                        </div>
                        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                            {this.renderTab(this.props.arrayOrderunConfirmed, false)}

                        </div>

                    </div>

                </div>

            </div>
        )
    }



    componentDidMount() {

        let { account } = this.props.match.params;

        this.props.GetAllOrderByIdCustomer(account)

        if (localStorage.getItem('infoUser')) {
            this.props.GetInfoUser();
        }

        if (localStorage.getItem('UserCart')) {
            let cart = JSON.parse(localStorage.getItem('UserCart'))
            this.props.loadCart(cart);
        }


        this.props.GetAllMethodShipping();
        this.props.GetAllMethodPayment();
        this.formatPage()
    }



    componentDidUpdate(prevProps, prevState) {

        // console.log("componentDidUpdate : props", prevProps.listMethodPayment, this.props.listMethodPayment)
        // console.log("componentDidUpdate : State", prevState.Order, this.state.Order)
        // if (!isEqual(prevProps.listMethodPayment, this.props.listMethodPayment)) {


        //     this.setState({
        //         Order: {
        //             ...this.state.Order, Id_PaymentMethod: this.props.listMethodPayment[0]._id

        //         }
        //     }, () => {
        //         console.log(this.state.Order)
        //     });
        // }


        if (isEqual(this.state.Order.Id_PaymentMethod, "")) {
            // let method = this.props.listMethodPayment[0]
            // console.log(method)  
            // code ngu
            this.setState({
                Order: {
                    ...this.state.Order, Id_PaymentMethod: "5f9ed20d4209cb5d9fbccd0d",

                    Id_ShippingMethod: "5f9ed3004209cb5d9fbccd10"
                }
            });

        }



    }

}

const mapStateToProps = (state) => {
    return {
        user: state.ManageUserReducer.user,
        ListProductsCart: state.ManageCartReducer.cart,
        arrayOrderConfirmed: state.ManageOrderReducer.listOrder.arrayOrderConfirmed,
        arrayOrderunConfirmed: state.ManageOrderReducer.listOrder.arrayOrderunConfirmed,
        listMethodPayment: state.ManageOrderReducer.listMethodPayment,
        listMethodShipping: state.ManageOrderReducer.listMethodShipping,

    };
}

const mapDispatchToProps = dispatch => {
    return {


        //local
        loadCart: (cart) => {
            let action = {
                type: 'Load_Cart',
                cart
            }
            dispatch(action)
        },



        insertCart: (arrayProduct) => {
            dispatch({
                type: 'INSERT_CART',
                arrayProduct
            })
        },

        GetInfoUser: () => {
            dispatch({
                type: "GETINFOUSER"
            });
        },

        DeleteProductCart: (id) => {
            dispatch(DeleteProductCartAction(id))
        },
        DeleteALLProductCart: () => {
            dispatch(DeleteALLProductCartAction())
        },
        InDecreaseProductCart: (id, isDown) => {
            dispatch(InDecreaseProductCartAction(id, isDown))
        },


        //api


        GetAllOrderByIdCustomer: (account) => {
            dispatch(GetAllOrderByIdCustomerAction(account))
        },
        BuyProduct: (account, data, handleResetCart) => {
            dispatch(BuyProductAction(account, data, handleResetCart));
        },
        GetAllMethodShipping: () => {
            dispatch(GetAllMethodShippingAction());
        },
        GetAllMethodPayment: () => {
            dispatch(GetAllMethodPaymentAction());
        },
        CancelOrder: (account, id) => {
            dispatch(CancelOrderAction(account, id))
        }

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageOrder);