import React, { Component } from 'react';
import { connect } from 'react-redux';
import { settings } from '../../Commons/Settings';
import { GetAllOrderAction } from '../../Redux/Actions/ManageOrder.Action';
import { ConfirmOrderAction } from '../../Redux/Actions/ManageUsers.Action';
var dateFormat = require('dateformat');


class TabQuanLyHoaDon extends Component {



    constructor(props) {
        super(props);
        this.state = {
            Order: {
                _id: "",
                dateCheckout: "",
                dateCheckin: "",
                status: "",
                address: "",
                note: "",
                account: "",
                Id_PaymentMethod: "",
                namePaymentMethod: "",
                TexMethod: "",
                Id_ShippingMethod: "",
                nameShippingMethod: "",
                FeeShipping: "",
                OrderDetail: []
            },

        }

    }

    formatMoneyVND = (price) => {
        return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + ' VNĐ';
    }
    sumPrice = (data) => {
        let sumprice = data.reduce((sum, ele, index) => {
            return sum += ele.quantity * ele.price
        }, 0)
        console.log(data)
        return sumprice;
    }


    renderListOrder = () => {

        return this.props.Orders.map((ele, index) => {
            let id = ele._id;
            return (
                <tr className='item-line-order' key={index}>
                    <td>{index}</td>
                    <td>{`HĐ${id.substr(17)}`}</td>
                    <td>{dateFormat(ele.dateCheckin, 'dd/mm/yyyy')}</td>
                    <td>
                        {
                            ele.dateCheckout === null ?
                                <p className='text-danger'>---</p> :
                                <p className='text-success' > {dateFormat(ele.dateCheckout, 'dd/mm/yyyy')}</p>
                        }
                    </td>
                    <td>{
                        ele.status ?
                            <p className='text-success'> Đã duyệt </p> : <p className='text-danger'>Đang chờ duyệt</p>
                    }
                    </td>
                    <td>{ele.account}</td>
                    <td>{this.formatMoneyVND(this.sumPrice(ele.OrderDetail))}</td>
                    <td>
                        <button className='btn btn-success'
                            onClick={() => this.setState({ Order: ele })}
                            data-toggle='modal' data-target='#exampleModalCenter'>Xem</button>
                        {!ele.status &&
                            <button className='btn btn-danger' onClick={() => this.props.ConfirmOrder(ele)}>Duyệt</button>
                        }
                    </td>
                </tr>
            )
        })
    }


    render() {
        return (
            <div className='TabQuanLyHoaDon w-100 content-wrapper'>
                <div className="TabQuanLyKhoaHoc_Container content container">

                    {/* Begin Page Content */}
                    <div className="table-content container-fluid">
                        {/* Page Heading */}
                        {/* DataTales Example */}
                        <div className="card shadow mb-4">

                            <div className="card-body tbl-content">
                                <h3 className="m-0 font-weight-bold text-primary mb-3">Danh Sách Hóa Đơn</h3>

                                <div className="table-responsive tbl-body">
                                    <table className="table table-bordered"
                                        id="dataTable" width="100%" cellSpacing={0}>
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Mã Hóa Đơn</th>
                                                <th>Ngày Đặt</th>
                                                <th>Ngày Duyệt</th>
                                                <th>Tình Trạng</th>
                                                <th>Người Mua</th>
                                                <th>Tổng Giá</th>
                                                <th>Thao tác</th>
                                            </tr>
                                        </thead>
                                        <tfoot>
                                            <tr>
                                                <th>STT</th>
                                                <th>Mã Hóa Đơn</th>
                                                <th>Ngày Đặt</th>
                                                <th>Ngày Duyệt</th>
                                                <th>Tình Trạng</th>
                                                <th>Người Mua</th>
                                                <th>Tổng Giá</th>
                                                <th>Thao tác</th>
                                            </tr>
                                        </tfoot>
                                        <tbody className='tbl-body'>
                                            {this.renderListOrder()}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>
                    {/* /.container-fluid */}
                </div>
                {/* End of Main Content */}
                {/* Modal */}
                <div className="modal fade" id="exampleModalCenter" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "1000px" }} role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title" id="exampleModalLongTitle">Thông Tin Đơn Hàng</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body container">
                                {this.renderModalBody()}
                            </div>
                            <div className="modal-footer">
                                {!this.state.Order.status &&
                                    <button className='btn btn-danger' onClick={() => this.props.ConfirmOrder(this.state.Order)} >Duyệt</button>
                                }
                                <button className='btn btn-primary' data-dismiss="modal">Đóng</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        );
    }

    renderOrderProduct = (OrderDetail) => {
        return OrderDetail.map((ele, index) => {
            return (
                <div className="row" id="infoOrderEachItem" key={index}>
                    <div className='infoItem-order-left col-4'  >
                        <img src={settings.domain + '/' + ele.image} alt="Error" />

                    </div>

                    <div className='text-OrderProduct col-8'>
                        <p>Tên sản phẩm : <span>{ele.name}</span> </p>
                        <p>Giá bán : <span>{this.formatMoneyVND(ele.price)}</span> </p>
                        <p>Số lượng : <span>{ele.quantity}</span> </p>
                        <p>Tổng : <span>{this.formatMoneyVND(ele.quantity * ele.price)} </span> </p>
                    </div>

                </div>
            )
        })
    }

    renderModalBody = () => {

        let {
            _id,
            dateCheckout,
            dateCheckin,
            status,
            address,
            note,
            account,
            // Id_PaymentMethod,
            namePaymentMethod,
            TexMethod,
            // Id_ShippingMethod,
            nameShippingMethod,
            FeeShipping,
            OrderDetail } = this.state.Order

        let sumPrice = this.sumPrice(OrderDetail)
        return (

            <div className='tab-content-item row'>
                <div className="col-6 info-order-left">
                    <h3 className='text-title' >Thông tin sản phẩm</h3>
                    {this.renderOrderProduct(OrderDetail)}
                </div>
                <div className="col-6  info-order-right">
                    <h3 className='text-title'>Thông tin chi tiết</h3>
                    <div className="text-info-order-right">

                        <p><span>Mã hóa đơn</span> : {`HĐ${_id.substr(17)}`} </p>

                        <p><span>Ngày đặt hàng</span> : {dateFormat(dateCheckin, "dd/mm/yyyy")}</p>
                        <p><span>Ngày duyệt</span> : {status ?

                            dateFormat(dateCheckout, "dd/mm/yyyy") : "Đang chờ duyệt"
                        }

                        </p>
                        <p><span>Người mua</span> : {account}</p>
                        <p><span>Địa chỉ nhận</span> : {address}</p>
                        <p><span>Phương thức vận chuyển</span> : {nameShippingMethod}</p>
                        <p><span>Phương thức thanh toán</span> : {namePaymentMethod}</p>
                        <p><span>*Ghi chú</span>  : {note}</p>
                        <div className="detail-payment">
                            <p>Chi tiết thanh toán :</p>
                            <ul className="">
                                <li>Tổng giá sản phẩm : {this.formatMoneyVND(sumPrice)}</li>
                                <li>Phí vận chuyển :  {this.formatMoneyVND(FeeShipping)}</li>
                                <li>Thuế thanh toán :{this.formatMoneyVND(TexMethod * sumPrice / 100)} {`(${TexMethod})`}% </li>
                                <li>Số tiền cần thu :
                                            {
                                        this.formatMoneyVND(this.getSumPriceToPay(
                                            sumPrice,
                                            FeeShipping, TexMethod))
                                    }

                                </li>
                            </ul>
                        </div>


                    </div>




                </div>
            </div>
        )
    }
    getSumPriceToPay = (sumPrice, feeShipping, tax) => {

        let total = sumPrice + feeShipping + (tax * sumPrice / 100)
        return total;
    }
    componentDidMount = () => {
        this.props.GetAllOrder()
    }
}
function mapStateToProps(state) {
    return {
        Orders: state.ManageOrderReducer.Orders
    };
}

function mapDispatchToProps(dispatch) {
    return {
        GetAllOrder: () => {
            dispatch(GetAllOrderAction())
        },
        ConfirmOrder: (data) => {
            dispatch(ConfirmOrderAction(data))
        }
    };
}
export default connect(
    mapStateToProps, mapDispatchToProps
)(TabQuanLyHoaDon);