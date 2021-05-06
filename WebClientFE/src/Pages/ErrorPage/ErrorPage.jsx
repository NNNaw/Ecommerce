import React from 'react'
import { NavLink } from 'react-router-dom'

export default function ErrorPage() {
    return (
        <div className='container mt-5' style={{ textAlign: "center" }} >
            <h3>404 Not Found</h3>
            <NavLink to={"/"}>Quay về trang chủ</NavLink>

        </div >
    )
}
