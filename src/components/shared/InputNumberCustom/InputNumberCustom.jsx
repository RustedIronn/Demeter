import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputNumber from "rc-input-number";

import { servingSizeSet } from "@/store/general/slice";

import "rc-input-number/assets/index.css";
import "./InputNumberCustom.css";

export default function InputNumberCustom({ serving_unit }) {
  const dispatch = useDispatch();

  const servingSize = useSelector(
    (state) => state.general.servingSize
  );

  const onChange = (value) => {
    dispatch(servingSizeSet(value));
  };

  const onClick = () => {
    const searchInput = document.getElementsByClassName("SearchInput");
    const searchInputMobile =
      document.getElementsByClassName("SearchInputMobile");
    const input =
      document.getElementsByClassName("rc-input-number-input");

    if (searchInput.length > 0) searchInput[0].focus();
    if (searchInputMobile.length > 0) searchInputMobile[0].focus();
    if (input.length > 0) input[0].focus();
  };

  const upHandler = (
    <div style={{ color: "#6a6a6a" }} onClick={onClick}>
      <FontAwesomeIcon icon="chevron-up" />
    </div>
  );

  const downHandler = (
    <div style={{ color: "#6a6a6a" }}>
      <FontAwesomeIcon icon="chevron-down" />
    </div>
  );

  return (
    <div className="InputNumberCustom noselect">
      <span className="InputNumberCustomTitle">Servings</span>

      <div style={{ margin: 0 }}>
        <InputNumber
          className="form-control"
          min={0}
          style={{ width: 110 }}
          value={servingSize}
          onChange={onChange}
          onClick={onClick}
          step={0.1}
          upHandler={upHandler}
          downHandler={downHandler}
        />
      </div>

      <span className="InputNumberCustomSubtitle">
        {serving_unit}
      </span>
    </div>
  );
}