import { createSlice } from "@reduxjs/toolkit";
import { changeLoadState, openSnack } from "./actionsSlice";
import { client } from "../apollo/Apollo";
import { GET_CATEGORIES, GET_CURRENCIES, GET_PRODUCTS } from "../graphql/Queries";
import { checkIfFetched } from '../../utils/functions';
const initialState = {
    categories:[],
    products:{},
    activeCategory:'',
    currencies:[],
    activeCurrency:{}
}
export const ProductSlice = createSlice({
    name:"productSlice",
    initialState,
    reducers:{
        getCategories: (state, action) => {
            state.categories = action.payload
            // state.activeCategory = action.payload[0].name
        },
        getAllProducts: (state, action) => {
            state.products = {...state.products, ...action.payload}
        },
        setActiveCategory: (state, action) => {
            state.activeCategory = action.payload
        },
        getMoreProducts: () => {

        },
        getCurrencies: (state, action) => {
          state.currencies = action.payload
        },
        setActiveCurrency: (state, action) => {
          state.activeCurrency = action.payload
      },
        getProductsByCategory: (state) => {
            
        },
    }
});

export const getAllProductsSync = (categoryName) => async (dispatch, state) => {
      dispatch(changeLoadState())
      client
      .query({
        query: GET_PRODUCTS,
        variables: {CategoryInput:{
            title: categoryName
        }},
      })
      .then((response) => {
        console.log(response)
        if (response?.data?.category?.products.length){
            dispatch( getAllProducts({[categoryName]: response.data.category.products}))
            dispatch(setActiveCategory(categoryName))
        }
      })
      .catch((error)=>{})
      .finally(() => {
        let snackData = {
            state:true,
            message:"Group created successfully",
            type:"success"
        }
      })
  };
  
  export const getCategoriesSync = (data) => async (dispatch) => {
    dispatch(changeLoadState())
    client
    .query({ query: GET_CATEGORIES})
    .then((response) => {
      if(response.data.categories.length){
          dispatch(getCategories(response.data.categories));
          dispatch(setActiveCategory(response.data.categories[0]?.name));
          dispatch(getAllProductsSync(response.data.categories[0]?.name));
      }
    })
    .catch((error)=>{})
    .finally(() => {})
};
  export const getCurrenciesSync = (data) => async (dispatch) => {
    client
    .query({ query: GET_CURRENCIES})
    .then((response) => {
      dispatch(getCurrencies(response.data.currencies));
    })
    .catch((error) => {})
    .finally(() => {})
};
export const {
  getCategories, 
  getAllProducts, 
  getCurrencies, 
  setActiveCurrency,
  getMoreProducts, 
  setActiveCategory
} = ProductSlice.actions
export default ProductSlice.reducer

