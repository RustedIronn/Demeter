import { searchFoods, getFood } from "@/features/nutrition/api/demeter";

import {
  searchModalSet,
  loadingSearchSet,
  searchItemsSet,
  dateSet,
  loadingAddSet,
  itemFoodSelectedSet,
  addModalSet,
} from "./slice";

import { setIntakeList } from "@/features/profile/store/thunks";  
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
      const foods = await searchFoods(query);
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