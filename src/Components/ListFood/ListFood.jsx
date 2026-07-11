import { useSelector } from "react-redux";
import { Col } from "react-bootstrap";

import ItemFood from "../ItemFood/ItemFood";

import "./ListFood.css";

export default function ListFood() {
  const intakeList = useSelector(
    (state) => state.personal.intakeList
  );

  const dateSelected = useSelector(
    (state) => state.general.dateSelected
  );

  const today = new Date();

  const isToday =
    today.toLocaleDateString().substring(0, 10) ===
    dateSelected.toLocaleDateString().substring(0, 10);

  return (
    <Col md="7" className="ListFood pr-0">
      {intakeList.map((item, index) => (
        <div className="ItemFood" key={index}>
          <ItemFood
  item={item}
  index={index}
          />
        </div>
      ))}

      {intakeList.length === 0 && (
        <div className="ListFoodNoElement noselect">
          No food item added{isToday ? " yet" : ""}.
        </div>
      )}
    </Col>
  );
}