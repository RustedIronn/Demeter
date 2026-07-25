import { createSelector } from "@reduxjs/toolkit";


export const selectUI = (state) =>
  state.ui;



export const selectIsMobile = (state) =>
  state.ui.isMobile;



export const selectSearchVisible = (state) =>
  state.ui.searchVisible;



export const selectAddVisible = (state) =>
  state.ui.addVisible;



export const selectLoadingSearch = (state) =>
  state.ui.loadingSearch;



export const selectLoadingAdd = (state) =>
  state.ui.loadingAdd;



export const selectSelectedDate = createSelector(

  [
    (state) =>
      state.ui.dateSelected,
  ],

  (date) =>
    new Date(date)

);