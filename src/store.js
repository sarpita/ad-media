import {createStore} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState ={
    products:[],
    brands:[],
    categories:[],
    selectedBrand:[],
    selectedCategories:[],
    order:'',
    showFilters:true,
}
const persistConfig = {
    key: 'root',
    storage,
  }
  
const reducer=(state=initialState,action)=>{
    switch(action.type){
        case 'Add_product': return ({...state,products:action.payload});
        case 'Add_brands': return ({...state,brands: action.payload});
        case 'Add_categories': return ({...state,categories: action.payload});
        case 'set_selected_brand': return ({...state,selectedBrand:action.payload});
        case 'set_selected_categories': return ({...state,selectedCategories:action.payload});
        case 'set_order': return ({...state,order:action.payload});
        case 'clear_order': return ({...state,order:action.payload});
        case 'clear_brand': return ({...state,selectedBrand:action.payload});
        case 'clear_categories': return ({...state,selectedCategories:action.payload});
        case 'show_filters': return ({...state,showFilters:action.payload});
        case 'hide_filters': return ({...state,showFilters:action.payload});
        default: return state;
    } 
}
const persistedReducer = persistReducer(persistConfig, reducer);

const fn= () => {
    let store = createStore(persistedReducer)
    let persistor = persistStore(store)
    return { store, persistor }
}

export default fn;
