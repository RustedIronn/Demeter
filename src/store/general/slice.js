import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMobile: false,
  searchVisible: false,
  addVisible: false,
  dateSelected: new Date(),
  searchText: "",
  common: [],
  branded: [],
  loadingSearch: false,
  loadingAdd: false,
  itemFoodSelected: null,
  servingSize: 0,
  mealTypeSelected: 0,
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    mobileSet(state, action) {
      state.isMobile = action.payload;
    },

    searchModalSet(state, action) {
      const { searchVisible, searchText } = action.payload;

      state.searchVisible = searchVisible;

      if (searchVisible || searchText === "") {
        state.searchText = searchText;
      }
    },

    addModalSet(state, action) {
      state.addVisible = action.payload;
    },

    dateSet(state, action) {
      state.dateSelected = action.payload;
    },

    loadingSearchSet(state, action) {
      state.loadingSearch = action.payload;
    },

    loadingAddSet(state, action) {
      state.loadingAdd = action.payload;
    },

    searchItemsSet(state, action) {
      state.common = action.payload.common;
      state.branded = action.payload.branded;
    },

    itemFoodSelectedSet(state, action) {
      state.itemFoodSelected = {
        ...action.payload,
        serving_size: 0,
      };
    },

    servingSizeSet(state, action) {
      state.servingSize = action.payload;
    },

    mealTypeSelectedSet(state, action) {
      state.mealTypeSelected = action.payload;
    },
  },
});

export const {
  mobileSet,
  searchModalSet,
  addModalSet,
  dateSet,
  loadingSearchSet,
  loadingAddSet,
  searchItemsSet,
  itemFoodSelectedSet,
  servingSizeSet,
  mealTypeSelectedSet,
} = generalSlice.actions;

export default generalSlice.reducer;