import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CreateCategoryAction, GetAllCategoryAction } from '../../Redux/Actions/ManageProduct.Action';



class Admin extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            category: {
                _id: "",
                alias: "",
                nameCategory: "",
                image: "",
                account: "",
            },
            category_empty: {
                _id: "",
                alias: "",
                name: "",
                image: "",
                account: "",
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
            category: { ...this.state.category, [name]: value }
        }, () => {
            console.log(this.state.category)
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();//chặn submit của browser

        this.props.CreateCaterogy(this.state.fileSelected, this.state.category);
    }

    renderCategory = (array) => {
        return array.map((ele, index) => {
            return (
                <div className="card text-left col-4" key={index}>
                    <img className="card-img-top" src={ele.image} alt='error' />

                    <div className="card-body">
                        <h4 className="card-title">{ele.nameCategory}</h4>
                        {/* <p className="card-text">Body</p> */}
                    </div>
                </div>

            )
        })
    }

    render() {

        let { nameCategory, image } = this.state.category;
        return (
            <div className='container'>
                <h3>Admin</h3>


                <form onSubmit={this.handleSubmit}>


                    <div className="input-group form-group">
                        <label htmlFor="nameCategory">Tên : </label>
                        <input type="text" className="form-control"
                            // autoComplete="password"
                            id="nameCategory" name='nameCategory' value={nameCategory}
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
                    {this.renderCategory(this.props.Categories)}
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.props.GetAllCategory();
    }
}
function mapStateToProps(state) {
    return {
        Categories: state.ManageProductReducer.Categories
    };
}

function mapDispatchToProps(dispatch) {
    return {
        GetAllCategory: () => {
            dispatch(GetAllCategoryAction())
        },
        CreateCaterogy: (fileSelected, data) => {
            dispatch(CreateCategoryAction(fileSelected, data))
        },

    };
}
export default connect(mapStateToProps, mapDispatchToProps
)(Admin);
