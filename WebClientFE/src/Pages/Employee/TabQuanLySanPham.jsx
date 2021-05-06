import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEqual } from 'lodash'
import { settings } from '../../Commons/Settings';
import { CreateProductAction, DeleteProductAction, GetAllBrandAction, GetAllCategoryAction, GetAllProductAction, UpdateImageProductAction, UpdateProductAction } from '../../Redux/Actions/ManageProduct.Action';
import { formatMoney } from './../../Commons/functionCommon';


class TabQuanLySanPham extends Component {


    constructor(props) {
        super(props);
        this.state = ({
            Search: {
                keySearch: '',
            },
            page: {
                offset: 0,
                perPage: 8,
                currentPage: 0,
                pageCount: 0,
            },

            product: {
                _id: "",
                alias: "",
                name: "",
                price: "",
                descripts: "",
                image: "",
                material: "",
                origin: "",
                quantity: "",
                ram: "",
                rom: "",
                operator: "",
                nameCategory: "",
                nameBrand: "",
                accountCreatedProduct: "",

                Id_Category: "",
                Id_Brand: "",
                Id_Employee: "",

            },
            product_empty: {
                _id: "",
                alias: "",
                name: "",
                price: "",
                descripts: "",
                image: "",
                material: "",
                origin: "",
                quantity: "",
                ram: "",
                rom: "",
                operator: "",
                nameCategory: "",
                nameBrand: "",
                accountCreatedProduct: "",

                Id_Category: "",
                Id_Brand: "",
                Id_Employee: "",

            },
            fileSelected: null,
            isAdd: true
        })
    }

    inform = (data) => {

        this.setState({
            product: { ...this.state.product, image: data },
            fileSelected: null
        })

    }

    clearFilde = () => {
        this.setState({
            product: {

                name: "",
                price: "",

                image: "",

                quantity: "",
                ram: "",
                rom: "",

                nameCategory: this.props.Categories[0].nameCategory,
                nameBrand: this.props.Brands[0].nameBrand,


                Id_Category: this.props.Categories[0]._id,
                Id_Brand: this.props.Brands[0]._id,

            }
            , fileSelected: null

        })
    }

    renderListProduct = () => {

        return this.props.ListProducts.map((ele, index) => {
            return (
                <tr className='items-line' key={index}>
                    <td>{index}</td>
                    <td>{ele.brand_Product.nameBrand}</td>
                    <td>{ele.category_Product.nameCategory}</td>
                    <td>{ele.name}</td>
                    <td>
                        <img src={ele.images[0].url} alt="error" />
                    </td>
                    <td>{formatMoney(ele.price)}</td>
                    <td>{ele.employee_Product.account}</td>
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

    handleChangeImage = (event) => {
        this.setState({
            fileSelected: event.target.files[0],

        }, () => {
            console.log(this.state.fileSelected)

        });
    }

    handleChange = (event) => {
        let { value, name } = event.target;
        this.setState({
            product: { ...this.state.product, [name]: value }
        }, () => {
            console.log(this.state.product)
        })
    }

    validate = () => {
        return
    }
    handleSubmitModal = (event) => {
        event.preventDefault();//chặn submit của browser
        //Xử lý mật khẩu

        // let { Errorpassword, reNewPassword, newPassword } = this.state.error;

        let validate = this.validate()
        if (validate) {

        }


    }

    renderSelectBrand = (array) => {
        return array.map((ele, index) => {

            return (
                <option key={index} value={ele._id} >
                    {ele.nameBrand}
                </option>
            )
        })
    }

    renderSelectCategory = (array) => {
        return array.map((ele, index) => {

            return (
                <option key={index} value={ele._id} >
                    {ele.nameCategory}
                </option>
            )
        })
    }
    renderButtonSubmit = () => {
        return (
            <div className="btn-submitImage">
                <button className='btn btn-success' onClick={() => this.props.UpdateImageProduct(this.state.fileSelected, this.state.product._id, this.inform)}>Lưu</button>
                <button className='btn btn-danger' onClick={() => this.inform("")}> Thoát</button>
            </div>
        )
    }

    renderModalBody = () => {
        let { name, price, image, Id_Category, Id_Brand,
            ram, rom, quantity } = this.state.product
        return (
            <div className="row modal-body-content">
                <div className="col-5 modal-body-content-left">
                    {image !== "" &&
                        <img src={settings.domain + '/' + image} alt="Error" />}
                    <div className="button-updateing">

                        <input type="file" id="image" name="image" onChange={this.handleChangeImage} />
                        <p className='text-requiment'>
                            Dụng lượng file tối đa 1 MB Định dạng: *.JPG, *.PNG
                                    </p>
                        {this.state.fileSelected != null ?
                            this.renderButtonSubmit() :
                            <button className='btn btn-updateImage'>
                                <i className="fa fa-wrench" aria-hidden="true"></i>

                                {image !== "" ?
                                    <span>Chỉnh Sửa</span> :
                                    <span>Thêm ảnh</span>
                                }


                            </button>
                        }
                    </div>
                </div>
                <div className="col-7 modal-body-content-right">
                    <form onSubmit={this.handleSubmitModal}>

                        <div className="input-group form-group">
                            <label htmlFor="nameBrand">Nhà sản xuất : </label>
                            <select type="text" className="form-control"
                                // autoComplete="password"
                                id="nameBrand" name='Id_Brand' value={Id_Brand}
                                onChange={this.handleChange}
                            >
                                {this.renderSelectBrand(this.props.Brands)}
                            </select>
                        </div>
                        <div className="input-group form-group">
                            <label htmlFor="nameCategory">Loại : </label>
                            <select type="text" className="form-control"
                                // autoComplete="password"
                                id="nameCategory" name='Id_Category' value={Id_Category}
                                onChange={this.handleChange}
                            >
                                {this.renderSelectCategory(this.props.Categories)}
                            </select>
                        </div>
                        <div className="input-group form-group">
                            <label htmlFor="name">Tên : </label>
                            <input type="text" className="form-control"
                                // autoComplete="password"
                                id="name" name='name' value={name}
                                onChange={this.handleChange}
                            />
                        </div>

                        <div className="input-group form-group">
                            <label htmlFor="price">Giá : </label>
                            <input type="number" className="form-control" min='1'
                                // autoComplete="password"
                                id="price" name='price' value={price}
                                onChange={this.handleChange}
                            />
                        </div>

                        <div className="input-group form-group">
                            <label htmlFor="price">Số lượng : </label>
                            <input type="quantity" className="form-control" min='1'
                                // autoComplete="password"
                                id="quantity" name='quantity' value={quantity}
                                onChange={this.handleChange}
                            />
                        </div>

                        <div className="input-group form-group">
                            <label htmlFor="ram">Ram : </label>
                            <input type="number" className="form-control" min='1'
                                // autoComplete="password"
                                id="ram" name='ram' value={ram}
                                onChange={this.handleChange}
                            />
                        </div>

                        <div className="input-group form-group">
                            <label htmlFor="rom">Rom : </label>
                            <input type="text" className="form-control" min='1'
                                // autoComplete="password"
                                id="rom" name='rom' value={rom}
                                onChange={this.handleChange}
                            />
                        </div>


                        <div className="modal-footer">

                            {this.state.isAdd ?
                                <button className="btn btn-success btn-saveinfo"
                                    onClick={() => this.props.CreateProduct(this.state.fileSelected, this.state.product, this.clearFilde)}>Thêm</button>
                                :
                                <button className="btn btn-success btn-saveinfo"
                                    onClick={() => this.props.UpdateProduct(this.state.product)}>Lưu</button>}

                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Đóng</button>

                        </div>
                    </form>
                </div>
            </div>
        )
    }
    render() {
        return (
            <div className='TabQuanLySanPham w-100 content-wrapper'>
                <div className="TabQuanLyKhoaHoc_Container content container">


                    <div className="row TabQuanLyNguoiDung_Top">
                        <div className="col-6 py-5">
                            <button onClick={() => this.setState({ isAdd: true })} className='btn btn-primary ml-4' type="button"
                                data-toggle="modal" data-target="#exampleModalCenter">
                                <i className="fas fa-plus"></i>
                                 Thêm sản phẩm</button>
                        </div>
                        <div className='col-6 TabQuanLyNguoiDung_search py-5'>
                            <div className="form-xx">
                                <input className='' value={this.state.Search.keySearch}
                                    name='keySearch' type="text" placeholder='Tìm theo tên khóa học' onChange={this.handleChange} />
                                <button className='btn btn-danger' type="submit"  >
                                    Tìm
                                </button>
                            </div>
                        </div>
                    </div>


                    {/* Begin Page Content */}
                    <div className="table-content container-fluid">
                        {/* Page Heading */}
                        {/* DataTales Example */}
                        <div className="card shadow mb-4">

                            <div className="card-body tbl-content">
                                <h3 className="m-0 font-weight-bold text-primary mb-3">Danh Sách Sản phẩm</h3>

                                <div className="table-responsive tbl-body">
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
                {/* Modal */}
                <div className="modal fade" id="exampleModalCenter" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "1000px" }} role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title" id="exampleModalLongTitle">Thông Tin Sản Phẩm</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body container">
                                {this.renderModalBody()}
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
        this.props.GetAllBrand();
        this.props.GetAllCategory();
    }

    componentDidUpdate(prevProps, prevState) {
        if (!isEqual(prevProps.Brands, this.props.Brands)) {
            // console.log("prevProps ", prevProps.Brands) WHYYYYYY
            // console.log("this.props ", this.props.Brands)
            this.setState({
                // product_empty: { ...this.state.product_empty, Id_Brand: this.props.Brands[0]._id, nameBrand: this.props.Brands[0].nameBrand },
                product: { ...this.state.product, Id_Brand: this.props.Brands[0]._id, nameBrand: this.props.Brands[0].nameBrand },
            })
        }
        if (!isEqual(prevProps.Categories, this.props.Categories)) {
            this.setState({
                product: { ...this.state.product, Id_Category: this.props.Categories[0]._id, nameCategory: this.props.Categories[0].nameCategory },
                // product_empty: { ...this.state.product_empty, Id_Category: this.props.Categories[0]._id, nameCategory: this.props.Categories[0].nameCategory }
            })
        }
        // find name brand
        if (!isEqual(prevState.product.Id_Brand, this.state.product.Id_Brand)) {

            let brand = this.props.Brands.find(x => x._id === this.state.product.Id_Brand)
            this.setState({
                product: {
                    ...this.state.product, nameBrand: brand.nameBrand
                }
            });
        }
        // find name category
        if (!isEqual(prevState.product.Id_Category, this.state.product.Id_Category)) {

            let cate = this.props.Categories.find(x => x._id === this.state.product.Id_Category)

            this.setState({
                product: {
                    ...this.state.product, nameCategory: cate.nameCategory
                }
            });
        }
    }
}


function mapStateToProps(state) {
    return {
        ListProducts: state.ManageProductReducer.Products,
        Brands: state.ManageProductReducer.Brands,
        Categories: state.ManageProductReducer.Categories,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        GetAllProduct: () => {
            dispatch(GetAllProductAction())
        },
        DeleteProduct: (id) => {
            dispatch(DeleteProductAction(id))
        },
        GetAllCategory: () => {
            dispatch(GetAllCategoryAction())
        },
        GetAllBrand: () => {
            dispatch(GetAllBrandAction())
        },
        UpdateImageProduct: (fileSelected, idProduct, inform) => {
            dispatch(UpdateImageProductAction(fileSelected, idProduct, inform))
        },
        CreateProduct: (fileSelected, data, clearFilde) => {
            dispatch(CreateProductAction(fileSelected, data, clearFilde))
        },
        UpdateProduct: (data) => {
            dispatch(UpdateProductAction(data))
        }
    };
}
export default connect(
    mapStateToProps, mapDispatchToProps
)(TabQuanLySanPham);
