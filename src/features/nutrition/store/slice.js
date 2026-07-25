import { createSlice } from "@reduxjs/toolkit";


const initialState = {

  searchText: "",

  common: [],

  branded: [],

  intakeList: [],

  loadingSearch: false,

  loadingAdd: false,

  itemFoodSelected: null,

  servingSize: 0,

  mealTypeSelected: 0,

  isEditingFood: false,

  editingFoodIndex: null,

};



const nutritionSlice = createSlice({

  name: "nutrition",

  initialState,


  reducers: {


    searchTextSet(state, action) {

      state.searchText =
        action.payload;

    },


    searchItemsSet(state, action) {

      state.common =
        action.payload.common;


      state.branded =
        action.payload.branded;

    },


    loadingSearchSet(state, action) {

      state.loadingSearch =
        action.payload;

    },


    loadingAddSet(state, action) {

      state.loadingAdd =
        action.payload;

    },


    itemFoodSelectedSet(state, action) {

      state.itemFoodSelected = {
        ...action.payload,
        serving_size: 0,
      };

    },

intakeListSet(state, action) {
  state.intakeList = action.payload;
},


    servingSizeSet(state, action) {

      state.servingSize =
        action.payload;

    },


    mealTypeSelectedSet(state, action) {

      state.mealTypeSelected =
        action.payload;

    },


    startEditingFood(state, action) {

      state.isEditingFood = true;

      state.editingFoodIndex =
        action.payload;

    },


    stopEditingFood(state) {

      state.isEditingFood = false;

      state.editingFoodIndex = null;

    },


  },

});



export const {

  searchTextSet,

  searchItemsSet,

  loadingSearchSet,

  intakeListSet,

  loadingAddSet,

  itemFoodSelectedSet,

  servingSizeSet,

  mealTypeSelectedSet,

  startEditingFood,

  stopEditingFood,

} = nutritionSlice.actions;



export default nutritionSlice.reducer;