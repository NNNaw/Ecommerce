import { actionTypes } from '../Contants/ManageProducts.Contant'
import { settings } from '../../Commons/Settings'
import axios from 'axios'
import swal from 'sweetalert'


export const GetAllProductAction = () => {

    return dispatch => {
        axios({
            url: settings.domain + '/products',
            method: 'GET',

        }).then(result => {
            console.log(result.data)
            dispatch({
                type: actionTypes.GET_ALL_PRODUCT,
                Products: result.data
            });

        }).catch(error => {
            console.log(error.response)

        })
    }
}

export const layDanhSachSanPhamPhanTrangAction = (offset, perPage, set) => {
    return dispatch => {
      axios({
        url: settings.domain + "/products",
        method: 'get'
      }).then(result => {
        //Đưa mangDanhMucKhoaHoc => Reducer
        const data = result.data;
      
        const dataSliced = data.slice(offset, offset + perPage)
        console.log(dataSliced) 
        dispatch({
          type: actionTypes.LAY_DANH_SACH_SAN_PHAM_PHAN_TRANG,
          mangSanPhamPhanTrang: dataSliced
        });
  
        const count = Math.ceil(data.length / perPage)
        set(count)
      }).catch(error => {
        console.log(error.response);
      })
    }
  }

export const GetDetailProductAction = (id) => {

    return dispatch => {
        axios({
            url: settings.domain + `/products/${id}`,
            method: 'GET',

        }).then(result => {

            console.log(result.data)
            dispatch({
                type: actionTypes.GET_DETAIL_PRODUCT,
                DetailProduct: result.data
            });

        }).catch(error => {
            console.log(error.response)

        })


    }
}
export const GetListSearchProductAction = (key) => {
    console.log(key)
    return dispatch => {
        axios({
            url: settings.domain + `/products/SearchList/${key}`,
            method: 'GET',

        }).then(result => {

            console.log("dnah sach :", result.data)
            dispatch({
                type: actionTypes.GET_LIST_SEARCH_PRODUCT,
                ListSearchProduct: result.data
            });

        }).catch(error => {
            console.log(error.response)

        })
    }
}

export const CreateProductAction = (fileSelected, product, clearFilde) => {

    let account = JSON.parse(localStorage.getItem('infoUser')).account


    const fd = new FormData();
    fd.append('image', fileSelected, fileSelected.name)
    fd.append('name', product.name);
    fd.append('price', product.price);
    fd.append('quantity', product.quantity);

    fd.append('rom', product.rom);
    fd.append('ram', product.ram);
    fd.append('Id_Brand', product.Id_Brand);
    fd.append('Id_Category', product.Id_Category);
    // fd.append('nameBrand', product.nameBrand);
    // fd.append('nameCategory', product.nameCategory);
    return dispatch => {
        axios({
            url: settings.domain + `/products/${account}`,
            method: 'POST',
            data: fd
        }).then(result => {
            console.log(result.data);
            dispatch(GetAllProductAction())
            swal("Thông báo!", "Thêm thành công!", "success");
            clearFilde();
        }).catch(error => {
            console.log(error.response.data)
            swal("Thông báo!", error.response.data, "error");
        })
    }
}




export const DeleteProductAction = (idProduct) => {
    return dispatch => {
        axios({
            url: settings.domain + `/products/${idProduct}`,
            method: 'DELETE',
        }).then(result => {
            console.log(result.data);
            swal("Thông báo!", "Xóa thành công!", "success");
            dispatch(GetAllProductAction())
        }).catch(error => {
            console.log(error.response)
            swal("Thông báo đăng ký!", error.response.data, "error");
        })
    }
}


//category action

export const GetAllCategoryAction = () => {
    return dispatch => {
        axios({
            url: settings.domain + '/category',
            method: 'GET',

        }).then(result => {
            console.log(result.data)
            dispatch({
                type: actionTypes.GET_ALL_CATEGORY,
                Categories: result.data
            });

        }).catch(error => {
            console.log(error.response)

        })
    }
}

export const GetByIdCategoryAction = (id) => {
    return dispatch => {
        axios({
            url: settings.domain + `/products/GetByIdCategory/${id}`,
            method: 'GET',

        }).then(result => {
            console.log(result.data)
            dispatch({
                type: actionTypes.GET_BY_ID_CATEGORY,
                ListCateProduct: result.data
            });

        }).catch(error => {
            console.log(error.response)

        })
    }
}

export const GetBrandByIdCategoryAction = (id) => {
    return dispatch => {
        axios({
            url: settings.domain + `/brandCategory/${id}`,
            method: 'GET',

        }).then(result => {
            console.log(result.data)
            dispatch({
                type: actionTypes.GET_BRAND_BY_ID_CATEGORY,
                ListBrandByCate: result.data
            });

        }).catch(error => {
            console.log(error.response)

        })
    }
}

//Brand
export const GetAllBrandAction = () => {
    return dispatch => {
        axios({
            url: settings.domain + '/brand',
            method: 'GET',

        }).then(result => {
            console.log(result.data)
            dispatch({
                type: actionTypes.GET_ALL_BRAND,
                Brands: result.data
            });

        }).catch(error => {
            console.log(error.response)

        })
    }
}

export const GetAllIdBrandAction = (id) => {
    return dispatch => {
        axios({
            url: settings.domain + `/brand/${id}`,
            method: 'GET',

        }).then(result => {
            console.log(result.data)
            dispatch({
                type: actionTypes.GET_ALL_BRAND_BY_ID,
                ByIdBrands: result.data
            });

        }).catch(error => {
            console.log(error.response)

        })
    }
}

export const UpdateImageProductAction = (fileSelected, idProduct, inform) => {


    const fd = new FormData();
    fd.append('image', fileSelected, fileSelected.name)

    // axios.post(settings.domain + "/productTest", fd)
    //     .then(res =>
    //         console.log(res)

    //     );

    return dispatch => {
        axios({
            url: settings.domain + `/products/updateImageProduct/${idProduct}`,
            method: "PATCH",
            data: fd
        }).then(result => {
            swal({
                icon: "success",
                title: "Thông báo",
                text: "Thay đổi thành công!",
                buttons: false,
                timer: 1200,
            });
            dispatch(GetAllProductAction());
            inform(result.data);
        }).catch(error => {
            console.log(error.response)

            swal("Thông báo!", error.response.data, "error");
            inform();
        })
    }
}

export const UpdateProductAction = (data) => {

    let account = JSON.parse(localStorage.getItem('infoUser')).account


    return dispatch => {
        axios({
            url: settings.domain + `/products/${account}`,
            method: "PATCH",
            data: data
        }).then(result => {
            console.log(result.data)


            swal({
                icon: "success",
                title: "Thông báo",
                text: "Thay đổi thành công!",
                buttons: false,
                timer: 1200,
            });
            dispatch(GetAllProductAction());
        }).catch(error => {
            console.log(error.response)
        })
    }

}