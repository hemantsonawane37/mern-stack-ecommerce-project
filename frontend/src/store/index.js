import { configureStore, createSlice } from "@reduxjs/toolkit";
// const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};

const PRODUCTS = createSlice({
  name: "Products",
  initialState: {
    Products: {
      Page: 1,
      Cart: [],
      CarLength: [0],
      SingleProduct: {},
      products: { Products: [], ProductCount: null },
      User: {},
      AdminUser:{},
      Reviwes:[],
      Allusers:[],
      ShippingInfo:{},
      myOrder:[],
      SingleOrder:{},
      AllProducts:[],
      AllOrders:{},
      AdminOrders:{},
      loading:true
      

    },
  },
  reducers: {
    initializeProducts(state, action) {
      state.Products.products = []
      state.Products.products = action.payload;

    },
    initializePageNum(state, action) {
      state.Products.Page = action.payload;
    },
    initializeSingleProduct(state, action) {
      state.Products.SingleProduct = action.payload;
    },
    initializeCartItem(state, action) {
      state.Products.Cart = [];
      state.Products.Cart.push(action.payload);
    },
    initializeCartLength(state, action) {
      state.Products.CarLength = [];
      state.Products.CarLength.push(action.payload);
    },
    initializeUser(state,action){
      state.Products.User = action.payload
    },
    removeUser(state){
      state.Products.User = {}
    },
    initialShippingInfo(state,action){
      localStorage.setItem('shippinginfo', JSON.stringify(action.payload))
      state.Products.ShippingInfo = action.payload
    },
    initializeOrder(state,action){
      state.Products.myOrder = []
      state.Products.myOrder = action.payload;
    },
    initializeSingleOrder(state,action){
      // state.Products.SingleOrder = {};
      state.Products.SingleOrder = action.payload;
    },
    initializeAllProducts(state,action){
      state.Products.AllProducts = action.payload;
    },
    initializeAllOrders(state,action){
      state.Products.AllOrders = {};
      state.Products.AllOrders = action.payload;
    },
    initializeAllusers(state,action){
      state.Products.Allusers = [];
      state.Products.Allusers = action.payload;
    },
    initializeAdminUser(state,action){
      state.Products.AdminUser = action.payload;
    },
    initializeReviwes(state,action){
      state.Products.Reviwes = action.payload;
    },
    initializeOrdersAdmin(state,action){
      state.Products.AdminOrders = action.payload;
    },
    initializeLoading(state,action){
      state.Products.loading = action.payload;
    }
  
    
  },
});

export const actions = PRODUCTS.actions;

export const store = configureStore({
  reducer: PRODUCTS.reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
