import {
  searchFoods,
  getFood,
} from "@/features/nutrition/api/demeter";


import {
  searchItemsSet,
  itemFoodSelectedSet,
  intakeListSet,
  servingSizeSet,
  mealTypeSelectedSet,
  stopEditingFood,
} from "./slice";


import {
  searchModalSet,
  loadingSearchSet,
  loadingAddSet,
  addModalSet,
  dateSet,
} from "@/shared/store/uiSlice";


import {
  dataPointsSet,
} from "@/features/profile/store/slice";


import {
  updateCalories,
} from "@/features/goals/store/thunks";


import {
  getDateFormatted,
} from "@/shared/utils/utils";


let latestSearch = "";



export const searchModal =
(searchVisible, searchText) =>
async(dispatch)=>{


  dispatch(
    searchModalSet({
      searchVisible,
    })
  );


  const query =
    searchText.trim();



  if(!query){

    dispatch(
      searchItemsSet({
        common: [],
        branded: [],
      })
    );


    dispatch(
      loadingSearchSet(false)
    );


    return;

  }



  latestSearch = query;


  dispatch(
    loadingSearchSet(true)
  );



  try{


    const foods =
      await searchFoods(query);



    if(latestSearch !== query)
      return;



    dispatch(
      searchItemsSet({
        common: foods,
        branded: [],
      })
    );


  }
  catch(error){

    console.error(error);

  }
  finally{


    if(latestSearch === query){

      dispatch(
        loadingSearchSet(false)
      );

    }

  }


};





export const itemFoodSelected =
(foodId)=>
async(dispatch)=>{


  dispatch(
    loadingAddSet(true)
  );


  dispatch(
    searchModalSet({
      searchVisible:false,
    })
  );



  try{


    const food =
      await getFood(foodId);



    dispatch(
      itemFoodSelectedSet(food)
    );


    dispatch(
      addModalSet(true)
    );


  }
  catch(error){

    console.error(error);

  }
  finally{

    dispatch(
      loadingAddSet(false)
    );

  }


};






export const setDate =
(dateSelected, dataPoints)=>
(dispatch)=>{


  dispatch(
    dateSet(
      dateSelected.toISOString()
    )
  );


  dispatch(
    setIntakeList(
      dataPoints,
      dateSelected
    )
  );


};






export const setIntakeList =
(dataPoints,date)=>
(dispatch)=>{


  const intakeList =
    getIntakeList(
      dataPoints,
      date
    );



  dispatch(
    intakeListSet(
      intakeList
    )
  );


  dispatch(
    updateCalories(
      intakeList
    )
  );


};






export const getIntakeList =
(dataPoints,date)=>{


  const formatted =
    getDateFormatted(date);



  return (

    dataPoints.find(
      (day)=>
        day.date === formatted
    )?.intake_list ?? []

  );


};






const buildFoodItem =
(
 itemFoodSelected,
 mealType,
 servingSize
)=>{


 const serving =
 itemFoodSelected.servings[
   itemFoodSelected.selectedServing ?? 0
 ];



 return {

  id:
    itemFoodSelected.id,


  name:
    itemFoodSelected.name,


  brand:
    itemFoodSelected.brand,


  image:
    itemFoodSelected.image,


  meal_type:
    mealType,


  serving_size:
    servingSize,


  serving: {

    ...serving,

  },

 };


};








export const addItemFood =
(
dataPointsOld,
itemFoodSelected,
mealType,
servingSize
)=>
(dispatch,getState)=>{


 const item =
 buildFoodItem(
  itemFoodSelected,
  mealType,
  servingSize
 );



 const date =
 getDateFormatted(
  getState().ui.dateSelected
 );



 let found = false;



 const dataPoints =
 dataPointsOld.map(
(day)=>{


 if(day.date !== date)
  return day;



 found = true;



 return {

  ...day,

  intake_list:[
    ...day.intake_list,
    item,
  ],

 };


 });



 if(!found){

  dataPoints.push({

    date,

    intake_list:[
      item,
    ],

    water:0,

  });

 }



 dispatch(
  dataPointsSet(dataPoints)
 );



 dispatch(
  setIntakeList(
    dataPoints,
    new Date(date)
  )
 );



 closeFoodModal(dispatch);


};








export const updateItemFood =
(
dataPointsOld,
itemFoodSelected,
mealType,
servingSize,
editingIndex
)=>
(dispatch,getState)=>{


 const item =
 buildFoodItem(
  itemFoodSelected,
  mealType,
  servingSize
 );



 const date =
 getDateFormatted(
  getState().ui.dateSelected
 );



 const dataPoints =
 dataPointsOld.map(
(day)=>{


 if(day.date !== date)
  return day;



 const intakeList =
 [
  ...day.intake_list
 ];



 intakeList[editingIndex] =
 item;



 return {

  ...day,

  intake_list:intakeList,

 };


 });



 dispatch(
  dataPointsSet(dataPoints)
 );



 dispatch(
  setIntakeList(
    dataPoints,
    new Date(date)
  )
 );



 closeFoodModal(dispatch);


};








export const removeItemFood =
(dataPointsOld,index)=>
(dispatch,getState)=>{


 const date =
 getDateFormatted(
  getState().ui.dateSelected
 );



 const dataPoints =
 dataPointsOld.map(
(day)=>{


 if(day.date !== date)
  return day;



 return {

  ...day,

  intake_list:
   day.intake_list.filter(
    (_,i)=>i!==index
   ),

 };


 });



 dispatch(
  dataPointsSet(dataPoints)
 );



 dispatch(
  setIntakeList(
   dataPoints,
   new Date(date)
  )
 );


};








const closeFoodModal =
(dispatch)=>{


 dispatch(
  stopEditingFood()
 );


 dispatch(
  mealTypeSelectedSet(0)
 );


 dispatch(
  servingSizeSet(0)
 );


 dispatch(
  addModalSet(false)
 );


 dispatch(
  searchModalSet({
    searchVisible:false,
  })
 );


};