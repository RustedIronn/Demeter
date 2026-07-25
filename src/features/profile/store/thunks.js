import { getDateFormatted } from "@/shared/utils/utils";

import {
  loadProfileStorage,
  saveProfileStorage,
} from "@/shared/utils/storage";

import { data } from "@/shared/constants/data";


import {
  profileDataSet,
  profileUpdated,
  dataPointsSet,
  weightHistorySet,
  goalWeightSet,
  goalDateSet,
  proteinGoalSet,
  carbsGoalSet,
  fatGoalSet,
  waterGoalSet,
} from "./slice";



export const setProfileData =
() =>
(dispatch) => {


  const savedData =
    loadProfileStorage();


  const profileData =
    savedData ?? data;


  if (!savedData) {

    saveProfileStorage(profileData);

  }


  dispatch(
    profileDataSet(profileData)
  );

};



export const updateProfileData =
(payload) =>
(dispatch, getState) => {


  const oldWeight =
    getState().profile.weight_kg;


  dispatch(
    profileUpdated(payload)
  );



  if (
    payload.weight_kg !== undefined &&
    payload.weight_kg !== oldWeight
  ) {


    const history =
      getState().profile.weight_history ?? [];


    const date =
      getDateFormatted(
        new Date()
      );


    const entry = {

      date,

      weight:
        payload.weight_kg,

    };


    const index =
      history.findIndex(
        (item) =>
          item.date === date
      );



    const updatedHistory =
      index !== -1

        ? history.map(
            (item, i) =>
              i === index
                ? entry
                : item
          )

        : [
            ...history,
            entry,
          ];



    dispatch(
      weightHistorySet(updatedHistory)
    );

  }



  persistProfileData(getState);

};



export const increaseWater =
() =>
(dispatch, getState) => {

  updateWater(
    dispatch,
    getState,
    1
  );

};



export const decreaseWater =
() =>
(dispatch, getState) => {

  updateWater(
    dispatch,
    getState,
    -1
  );

};



const updateWater =
(
 dispatch,
 getState,
 amount
) => {


  const date =
getDateFormatted(
  new Date(getState().ui.dateSelected)
)



  let found = false;



  const dataPoints =
    getState()
      .profile
      .data_points
      .map(
        (day) => {


          if(day.date !== date)
            return day;


          found = true;


          return {

            ...day,

            water:
              Math.max(
                (day.water ?? 0) + amount,
                0
              ),

          };

        }
      );



  if(!found){

    dataPoints.push({

      date,

      intake_list: [],

      water:
        Math.max(amount,0),

    });

  }



  dispatch(
    dataPointsSet(dataPoints)
  );


  persistProfileData(getState);

};




export const setGoalWeight =
(weight) =>
(dispatch,getState)=>{

  dispatch(
    goalWeightSet(weight)
  );


  persistProfileData(getState);

};



export const setGoalDate =
(date) =>
(dispatch,getState)=>{

  dispatch(
    goalDateSet(date)
  );


  persistProfileData(getState);

};



export const setProteinGoal =
(goal) =>
(dispatch,getState)=>{

  dispatch(
    proteinGoalSet(goal)
  );


  persistProfileData(getState);

};



export const setCarbsGoal =
(goal) =>
(dispatch,getState)=>{

  dispatch(
    carbsGoalSet(goal)
  );


  persistProfileData(getState);

};



export const setFatGoal =
(goal) =>
(dispatch,getState)=>{

  dispatch(
    fatGoalSet(goal)
  );


  persistProfileData(getState);

};



export const setWaterGoal =
(goal) =>
(dispatch,getState)=>{

  dispatch(
    waterGoalSet(goal)
  );


  persistProfileData(getState);

};



const persistProfileData =
(getState) => {

  saveProfileStorage(
    getState().profile
  );

};