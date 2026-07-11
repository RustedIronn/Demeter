import { Image, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { removeItemFood } from "../../store/personal/thunks";
import { capitalize, capitalizeAll } from "../../assets/utils/utils";

import "./ItemFood.css";

export default function ItemFood({ item, index }) {
  const dispatch = useDispatch();

  const dataPoints = useSelector(
    (state) => state.personal.data_points
  );

  if (!item) return null;

  const {
    image,
    name,
    serving,
    serving_size,
    meal_type,
  } = item;

  const handleDelete = () => {
    dispatch(removeItemFood(dataPoints, index));
  };

  return (
    <div className="ItemFood d-flex bd-highlight mt-3 mb-3 noselect">
      <div className="p-2 bd-highlight">
        <Image src={image} />
      </div>

      <div className="w-100 d-flex justify-content-between ItemFoodTexts">
        <div className="p-2 bd-highlight">
          <div className="ItemFoodText">
            {capitalizeAll(name)}
          </div>

          <div className="ItemFoodSubtitle">
            {serving_size} {serving.servingUnit}
            {serving.metricAmount
              ? ` (${Math.round(
                  serving.metricAmount * serving_size
                )} ${serving.metricUnit})`
              : ""}
          </div>
        </div>

        <div className="p-2 bd-highlight text-right">
          <div className="ItemFoodText">
            {Math.round(serving.calories * serving_size)} cal
          </div>

          <div className="ItemFoodSubtitle">
            {capitalize(meal_type)}
          </div>

          <Button
            variant="danger"
            size="sm"
            className="mt-2"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}