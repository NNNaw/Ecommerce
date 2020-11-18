// import React, { Component } from 'react'
// import { CreateProductAction, GetAllProductAction } from "../../Redux/Actions/ManageProduct.Action"
// import { connect } from 'react-redux';
// import { settings } from './../../Commons/Settings'
// import axios from 'axios'

// import './../../Assets/lib-css/startbootstrap-simple-sidebar-gh-pages/css/simple-sidebar.css'


// class Employee extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             product: {
//                 name: '',
//                 price: '',
//                 image: ''
//             },
//             fileSelected: null
//         }
//     }

//     componentDidMount() {
//         //lấy giá trị tham số từ url this.props.match.params.tenThamS
//         this.props.GetAllProduct();

//     }

//     handleChange = (event) => {
//         let { name, value } = event.target;
//         if (name === 'image') {
//             // value = value.split(/(\\|\/)/g).pop()
//             // let file = 

//             this.setState({
//                 fileSelected: event.target.files[0],

//             }, () => {
//                 console.log(this.state.fileSelected)
//             });
//         }

//         this.setState({
//             product: { ...this.state.product, [name]: value }
//         }, () => {
//             console.log(this.state.product)
//         })
//     }

//     fileUploadHandler = () => {
//         const fd = new FormData();
//         // fd.append('imageProduct', this.state.fileSelected, this.state.fileSelected.name)
//         fd.append('nameProduct', this.state.product.nameProduct);
//         fd.append('priceProduct', this.state.product.priceProduct);
//         console.log(fd)
//         axios.post(settings.domain + "/productTest", fd)
//             .then(res =>
//                 console.log(res)

//             );
//     }

//     handleSubmit = (e) => {
//         e.preventDefault();//chặn submit của browser
//         //  this.props.CreateProduct(this.state.product, this.state.fileSelected);
//         this.fileUploadHandler();
//     }



//     renderCourseSearch = () => {

//         return this.props.ListProducts.map((element, index) => {

//             return (
//                 <div className="card text-white bg-primary col-4" key={index}>

//                     <img src={settings.domain + '/' + element.image} width="100%" height="250px" alt="error" />
//                     <div className="card-body">
//                         <h4 className="card-title">{element.name}</h4>
//                         <p className="card-text">{element.price}</p>
//                     </div>
//                 </div>
//             )
//         })
//     }
//     render() {
//         return (
//             <div className='container'>

//                 <div className='Admin'>
//                     <div className="Admin_container container-fluid">
//                         <ul className="nav nav-tabs" id="myTab" role="tablist">
//                             <li className="nav-item">
//                                 <a className="nav-link active text-danger h-100" id="home-tab" data-toggle="tab"
//                                     href="#home" role="tab" aria-controls="ghiDanhQuaKhoaHoc" aria-selected="true">Ghi danh qua khóa học</a>
//                             </li>
//                             <li className="nav-item">
//                                 <a className="nav-link text-danger h-100" id="profile-tab" data-toggle="tab"
//                                     href="#profile" role="tab" aria-controls="ghiDanhQuaTaiKhoan" aria-selected="false">Ghi danh qua tài khoản</a>
//                             </li>

//                         </ul>
//                         <div className="tab-content p-4" id="myTabContent">
//                             <div className="tab-pane fade show active" id="ghiDanhQuaKhoaHoc" role="tabpanel" aria-labelledby="home-tab">
//                                 {/* {this.renderTabCourse()} */}
//                             </div>
//                             <div className="tab-pane fade" id="ghiDanhQuaTaiKhoan" role="tabpanel" aria-labelledby="profile-tab">
//                                 {/* {this.renderTabCourse()} */}

//                             </div>
//                         </div>
//                     </div>
//                 </div>

//             </div>
//         )
//     }
// }
// const mapStateToProps = (state) => {
//     return {
//         ListProducts: state.ManageProductReducer.Products
//     };
// }



// const mapDispatchToProps = dispatch => {
//     return {
//         CreateProduct: (product, fileSelected) => {
//             dispatch(CreateProductAction(product, fileSelected))
//         },
//         GetAllProduct: () => {
//             dispatch(GetAllProductAction())
//         }
//     }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(Employee)













import React, { Component } from 'react';
import { connect } from 'react-redux';
import { settings } from '../../Commons/Settings';
import { GetAllProductAction } from '../../Redux/Actions/ManageProduct.Action';


class Employee extends Component {




    renderListProduct = () => {

        return this.props.ListProducts.map((ele, index) => {

            return (
                <tr className='items-line' key={index}>
                    <td>{index}</td>
                    <td>{ele.nameBrand}</td>
                    <td>{ele.nameCategory}</td>
                    <td>{ele.name}</td>
                    <td>
                        <img src={settings.domain + '/' + ele.image} alt="error" />
                    </td>
                    <td>{ele.price}</td>
                    <td>{ele.accountCreatedProduct}</td>
                    <td>
                        <button className='btn btn-warning mr-2' type="button"
                            data-toggle="modal" data-target="#exampleModalCenter"
                            onClick={() => this.setState({ product: ele, isAdd: false })}
                        >Sửa</button>
                        <button className='btn btn-danger' onClick={() => this.props.DeleteProduct(ele._id)}>Xóa</button>
                    </td>
                </tr>
            )
        })
    }


    render() {
        return (




            <div id='page-top'>
                {/* Page Wrapper */}
                <div id="wrapper">

                    {/* Content Wrapper */}
                    <div id="content-wrapper" className="d-flex flex-column">
                        {/* Main Content */}
                        <div id="content">
                            {/* Begin Page Content */}
                            <div className="container-fluid">
                                {/* Page Heading */}
                                <h1 className="h3 mb-2 text-gray-800">Tables</h1>
                                {/* DataTales Example */}
                                <div className="card shadow mb-4">
                                    <div className="card-header py-3">
                                        <h6 className="m-0 font-weight-bold text-primary">DataTables Example</h6>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table className="table table-bordered"
                                                id="dataTable" width="100%" cellSpacing={0}>
                                                <thead>
                                                    <tr>
                                                        <th>STT</th>
                                                        <th>Sản Xuất</th>
                                                        <th>Loại</th>

                                                        <th>Tên Sản Phẩm</th>

                                                        <th>Hình ảnh</th>

                                                        <th>Giá Bán</th>

                                                        <th>Người tạo</th>

                                                        <th>Thao tác</th>
                                                    </tr>
                                                </thead>
                                                <tfoot>
                                                    <tr>
                                                        <th>STT</th>
                                                        <th>Sản Xuất</th>
                                                        <th>Loại</th>

                                                        <th>Tên Sản Phẩm</th>

                                                        <th>Hình ảnh</th>

                                                        <th>Giá Bán</th>

                                                        <th>Người tạo</th>

                                                        <th>Thao tác</th>
                                                    </tr>
                                                </tfoot>
                                                <tbody className='tbl-body'>
                                                    {this.renderListProduct()}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* /.container-fluid */}
                        </div>
                        {/* End of Main Content */}
                        {/* Footer */}
                        <footer className="sticky-footer bg-white">
                            <div className="container my-auto">
                                <div className="copyright text-center my-auto">
                                    <span>Copyright © Your Website 2020</span>
                                </div>
                            </div>
                        </footer>
                        {/* End of Footer */}
                    </div>
                    {/* End of Content Wrapper */}
                </div>
                {/* End of Page Wrapper */}
                {/* Scroll to Top Button*/}
                <a className="scroll-to-top rounded" href="#page-top">
                    <i className="fas fa-angle-up" />
                </a>
                {/* Logout Modal*/}

                <div className="modal fade" id="logoutModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                                <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                                <a className="btn btn-primary" href="login.html">Logout</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>






        );
    }
    componentDidMount() {
        //lấy giá trị tham số từ url this.props.match.params.tenThamS
        this.props.GetAllProduct();
    }

}
function mapStateToProps(state) {
    return {
        ListProducts: state.ManageProductReducer.Products,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        GetAllProduct: () => {
            dispatch(GetAllProductAction())
        },
    };
}

export default connect(
    mapStateToProps,mapDispatchToProps
)(Employee);