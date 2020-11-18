import { actionTypes } from '../Contants/ManageProducts.Contant'

const intialState = {
    Products: [],
    DetailProduct: {},
    ListSearchProduct: [],
    Categories: [],
    ListCateProduct: [],
    ListBrandByCate: [],
    Brands :[],
    mangSanPhamPhanTrang : [],
    ByIdBrands: [],
}

export const ManageProductReducer = (state = intialState, action) => {
    switch (action.type) {

        //case product
        case actionTypes.GET_ALL_PRODUCT: {
            state.Products = action.Products;
            return { ...state }
        }
        case actionTypes.LAY_DANH_SACH_SAN_PHAM_PHAN_TRANG: {
            state.mangSanPhamPhanTrang = action.mangSanPhamPhanTrang;
            return { ...state }
        }
        case actionTypes.GET_DETAIL_PRODUCT: {
            state.DetailProduct = action.DetailProduct;
            return { ...state }
        }
        case actionTypes.GET_LIST_SEARCH_PRODUCT: {
            state.ListSearchProduct = action.ListSearchProduct;
            return { ...state }
        }


        //case category
        case actionTypes.GET_ALL_CATEGORY: {
            state.Categories = action.Categories;
            return { ...state }
        }
        case actionTypes.GET_BY_ID_CATEGORY: {
            state.ListCateProduct = action.ListCateProduct;
            return { ...state }
        }

        case actionTypes.GET_BRAND_BY_ID_CATEGORY: {
            state.ListBrandByCate = action.ListBrandByCate;
            return { ...state }
        }

          //case brand
          case actionTypes.GET_ALL_BRAND: {
            state.Brands = action.Brands;
            return { ...state }
        }
        case actionTypes.GET_ALL_BRAND_BY_ID: {
            state.ByIdBrands = action.ByIdBrands;
            return { ...state }
        }
        default:
            return { ...state }
    }
}

