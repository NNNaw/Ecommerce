import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CreateBrandAction, GetAllBrandAction } from '../../Redux/Actions/ManageProduct.Action';



class CreateBrands extends Component {


    constructor(props) {
        super(props);
        this.state = ({
            brand: {
                _id: "",
                nameBrand: "",
                aliasBrand: "",

                image: "",
                cloudinary_id: "",
            },
            brand_empty: {
                _id: "",
                nameBrand: "",
                aliasBrand: "",

                image: "",
                cloudinary_id: "",
            },
            fileSelected: null,

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
            brand: { ...this.state.brand, [name]: value }
        }, () => {
            console.log(this.state.brand)
        })
    }


    handleSubmit = (e) => {
        e.preventDefault();//chặn submit của browser

         this.props.CreateBrand(this.state.fileSelected, this.state.brand);
    }

    renderCategory = (array) => {
        return array.map((ele, index) => {
            return (
                <div className="card text-left col-4" key={index}>
                    <img className="card-img-top" src={ele.image} alt='error' />

                    <div className="card-body">
                        <h4 className="card-title">{ele.nameBrand}</h4>
                        {/* <p className="card-text">Body</p> */}
                    </div>
                </div>

            )
        })
    }
    render() {

        let { nameBrand, image } = this.state.brand;
        return (
            <div className='container'>
                <h3>Create Brand</h3>


                <form onSubmit={this.handleSubmit}>


                    <div className="input-group form-group">
                        <label htmlFor="nameBrand">Tên hãng: </label>
                        <input type="text" className="form-control"
                            // autoComplete="password"
                            id="nameBrand" name='nameBrand' value={nameBrand}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="input-group form-group">
                        <label htmlFor="image">Hình ảnh : </label>
                        <input type="file" className="form-control"
                            // autoComplete="password"
                            id="image" name='image' value={image}
                            onChange={this.handleChangeImage}
                        />
                    </div>

                    <button type='submit'>Thêm</button>
                </form>

                <br />

                <h3>Danh sách loại</h3>

                <div className="row">
                    {this.renderCategory(this.props.Brands)}
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.props.GetAllBrand()
    }
}

function mapStateToProps(state) {
    return {
        Brands: state.ManageProductReducer.Brands
    };
}

function mapDispatchToProps(dispatch) {
    return {
        GetAllBrand: () => {
            dispatch(GetAllBrandAction())
        },
        CreateBrand: (fileSelected, data) => {
            dispatch(CreateBrandAction(fileSelected, data))
        }
    };
}
export default connect(
    mapStateToProps, mapDispatchToProps
)(CreateBrands);