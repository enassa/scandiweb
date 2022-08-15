import  {configureStore} from "@reduxjs/toolkit"
import ProductSlice from '../ProductsSlice';

export const store = configureStore({
    reducer: {
        products: ProductSlice,
    }
})