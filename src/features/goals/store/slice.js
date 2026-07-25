import { createSlice } from "@reduxjs/toolkit";


const initialState = {

  caloriesConsumed: 0,

  proteinConsumed: 0,

  carbsConsumed: 0,

  fatConsumed: 0,


  caloriesByMealType: {

    breakfast: 0,

    lunch: 0,

    dinner: 0,

    snack: 0,

  },

};



const goalsSlice = createSlice({

  name: "goals",

  initialState,


  reducers: {


    nutritionSet(state, action) {

      return action.payload;

    },


  },


});



export const {

  nutritionSet,

} = goalsSlice.actions;



export default goalsSlice.reducer;