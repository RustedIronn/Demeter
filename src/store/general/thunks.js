import { searchFoods, getFood } from "../../api/demeter";

import {
  searchModalSet,
  loadingSearchSet,
  searchItemsSet,
  dateSet,
  loadingAddSet,
  itemFoodSelectedSet,
  addModalSet,
} from "./slice";

import { setIntakeList } from "../personal/thunks";
let latestSearch = "";
export const searchModal =
  (searchVisible, searchText) => async (dispatch) => {
    dispatch(
      searchModalSet({
        searchVisible,
        searchText,
      })
    );

    const query = searchText.trim();

    if (!query) {
      dispatch(
        searchItemsSet({
          common: [],
          branded: [],
        })
      );
      dispatch(loadingSearchSet(false));
      return;
    }

    latestSearch = query;

    dispatch(loadingSearchSet(true));

    try {
      console.log("Searching:", query);
      const foods = await searchFoods(query);
console.log("Results for:", query, foods.length);
      // Ignore stale responses
      if (latestSearch !== query) return;

      dispatch(
        searchItemsSet({
          common: foods,
          branded: [],
        })
      );
    } catch (error) {
      console.error(error);
    } finally {
      if (latestSearch === query) {
        dispatch(loadingSearchSet(false));
      }
    }
  };

export const setDate =
  (dateSelected, dataPoints) => (dispatch) => {
    dispatch(dateSet(dateSelected));
    dispatch(setIntakeList(dataPoints, dateSelected));
  };

export const itemFoodSelected = (foodId) => async (dispatch) => {
  dispatch(loadingAddSet(true));
  dispatch(searchModalSet({ searchVisible: false, searchText: "" }));

  try {
    const food = await getFood(foodId);

    dispatch(itemFoodSelectedSet(food));
    dispatch(addModalSet(true));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(loadingAddSet(false));
  }
};

export const itemFoodSelectedById = () => () => {
  console.warn("TODO: Replace FatSecret food lookup endpoint.");
};