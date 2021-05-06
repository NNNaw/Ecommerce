import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import atm from './../../Assets/Images/Icons/atm.png'
import dathongbao from './../../Assets/Images/Icons/dathongbao.png'
import dmca from './../../Assets/Images/Icons/dmca.png'
import Dng from './../../Assets/Images/Icons/Dng.png'
import fpt from './../../Assets/Images/Icons/fpt.jpg'
import fpt2 from './../../Assets/Images/Icons/fpt2.png'
import mastercard from './../../Assets/Images/Icons/mastercard.png'
import quality from './../../Assets/Images/Icons/quality.jpg'
import support from './../../Assets/Images/Icons/support.png'
import visa from './../../Assets/Images/Icons/visa.png'



class Footer extends Component {


    render() {
        return (
            <div className='footer container-fluid'>
                <div className="row footer-content">
                    <div className="col-3">
                        <ul className='footer-list'>
                            <li className='footer-item'>Giới thiệu về công ty</li>
                            <li className='footer-item'>Câu hỏi thường gặp mua hàng</li>
                            <li className='footer-item'>Chính sách bảo mật</li>
                            <li className='footer-item'>Quy chế hoạt động</li>
                            <li className='footer-item'>Kiểm tra hóa đơn điện tử</li>
                            <li className='footer-item'>Tra cứu thông tin bảo hành</li>
                        </ul>
                    </div>

                    <div className="col-3">
                        <ul className='footer-list'>
                            <li className='footer-item'>Tin tuyển dụng</li>
                            <li className='footer-item'>Tin khuyến mãi</li>
                            <li className='footer-item'>Hướng dẫn mua online</li>
                            <li className='footer-item'>Hướng dẫn mua trả góp</li>
                            <li className='footer-item'>Chính sách trả góp</li>
                        </ul>
                    </div>
                    <div className="col-3">
                        <div className="footer-payment-top">
                            <p className='text-title'>Tư vấn mua hàng (Miễn phí)</p>
                            <h5 className='text-numberphone'>1800 6601</h5>
                        </div>
                        <div className="footer-support">
                            <p className='text-bold'>Hỗ trợ thanh toán:</p>
                            <div className='footer-image1'>
                                <img src={visa} alt="error" />
                                <img src={mastercard} alt="error" />
                                <img src={atm} alt="error" />
                            </div>
                            <div className='footer-image'>
                                <img src={support} alt="error" />
                                <img src={dathongbao} alt="error" />

                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="footer-payment-top">
                            <p className='text-title'>Góp ý, khiếu nại dịch vụ (8h00-22h00)</p>
                            <h5 className='text-numberphone'>1800 6616</h5>
                            <div className='footer-image1'>
                                <img src={dmca} alt="error" />
                                <img src={quality} alt="error" />
                                <img src={Dng} alt="error" />
                            </div>
                            <p className='text-title'>Website cùng tập đoàn:</p>
                            <div className='footer-image'>
                                <img src={fpt} alt="error" />
                                <img src={fpt2} alt="error" />
                            </div>
                        </div>
                    </div>
                </div>

                <p className='last-text'>© 2007 - 2020 Công Ty Cổ Phần Bán Lẻ Kỹ Thuật Số FPT / Địa chỉ: 261 - 263 Khánh Hội, P5, Q4, TP. Hồ Chí Minh / GPĐKKD số 0311609355 do Sở KHĐT TP.HCM cấp ngày 08/03/2012.
                GP số 47/GP-TTĐT do sở TTTT TP HCM cấp ngày 02/07/2018. Điện thoại: (028)73023456. Email: fptshop@fpt.com.vn.
                 Chịu trách nhiệm nội dung: Nguyễn Trịnh Nhật Linh.</p>


                {this.props.DetailUser != null &&
                    <div className="footer-categories wow fadeIn">
                        {/* data-wow-duration="1.5s" */}
                        <ul className="list-cate">
                            <li className="item-cate-head">
                                <NavLink
                                    to={`/QuanLyDonHang/${this.props.DetailUser.account}`} >
                                    <i className="fa fa-cart-plus" aria-hidden="true"></i>
                                    <span>Xem giỏ hàng</span>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to={`/QuanLyTaiKhoan/user?id=${this.props.DetailUser.account}`} >
                                    <i className="fa fa-info" aria-hidden="true"></i>
                                    <span>Thông tin tài khoản</span>
                                </NavLink>
                            </li>

                            <li >
                                <NavLink
                                    to={`/LienHe/`} >
                                    <i className="fa fa-phone" aria-hidden="true"></i>
                                    <span>Liên hệ</span>
                                </NavLink>
                            </li>

                            <li className="item-cate-tail">

                                <NavLink id='btn-logout' to='/'>
                                    <i className="fa fa-power-off" aria-hidden="true"></i>
                                    <span type='button' onClick={() => { this.LogOut() }}>
                                        Đăng xuất</span>

                                </NavLink>


                            </li>
                        </ul>
                    </div>
                }

            </div>
        )
    }
    LogOut = () => {
        localStorage.clear();
        document.getElementById("btn-logout").click();

    }
    componentDidMount() {

    }

}
const mapStateToProps = (state) => {
    return {
        DetailUser: state.ManageUserReducer.DetailUser,
    };
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer)