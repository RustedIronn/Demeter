import { createSlice } from "@reduxjs/toolkit";


const initialState = {

  isMobile: false,


  searchVisible: false,

  addVisible: false,


  loadingSearch: false,

  loadingAdd: false,


  dateSelected: new Date().toISOString(),

};



const uiSlice = createSlice({

  name: "ui",


  initialState,


  reducers: {


    mobileSet(state, action) {

      state.isMobile =
        action.payload;

    },


searchModalSet(state, action) {
  state.searchVisible =
    action.payload.searchVisible;

  state.searchText =
    action.payload.searchText ?? "";
},


    addModalSet(state, action) {

      state.addVisible =
        action.payload;

    },


    loadingSearchSet(state, action) {

      state.loadingSearch =
        action.payload;

    },


    loadingAddSet(state, action) {

      state.loadingAdd =
        action.payload;

    },


    dateSet(state, action) {

      state.dateSelected =
        action.payload;

    },


  },

});



export const {

  mobileSet,

  searchModalSet,

  addModalSet,

  loadingSearchSet,

  loadingAddSet,

  dateSet,

} = uiSlice.actions;



export default uiSlice.reducer;