import React from 'react'
import { NavLink } from 'react-router-dom'

export default function PrivatePage() {
    return (
        <div className='container mt-5' style={{ textAlign: "center" }} >
            <h3>Bạn chưa đăng nhập hoặc không có quyền truy cập vào trang này .... </h3>
            <NavLink to={"/"}>Quay về trang chủ</NavLink>
        </div >
    )
}
