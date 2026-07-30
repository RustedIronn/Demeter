import { useDispatch, useSelector } from "react-redux";
import { Minus, Plus } from "lucide-react";

import Button from "@/shared/ui/Button/Button";

import { servingSizeSet } from "@/features/nutrition/store/slice";
import { selectServingSize } from "@/features/nutrition/store/selectors";

import "./ServingInput.css";

const STEP = 0.1;

export default function ServingInput({ serving_unit }) {
  const dispatch = useDispatch();
  const servingSize = useSelector(selectServingSize);

  const updateValue = (value) => {
    const parsedValue = Number(value);
    const nextValue = Number.isFinite(parsedValue)
      ? Math.max(0, Number(parsedValue.toFixed(1)))
      : 0;

    dispatch(servingSizeSet(nextValue));
  };

  return (
    <div className="ServingInput">
      <div className="ServingInputHeader">
        <span className="ServingInputTitle">Serving</span>
        <span className="ServingInputSubtitle">{serving_unit}</span>
      </div>

      <div className="ServingControl">
        <Button
          type="button"
          variant="secondary"
          className="ServingButton"
          onClick={() => updateValue(servingSize - STEP)}
          disabled={servingSize <= 0}
          aria-label="Decrease serving"
        >
          <Minus size={16} />
        </Button>

        <span className="ServingValue">{servingSize}</span>

        <Button
          type="button"
          variant="secondary"
          className="ServingButton"
          onClick={() => updateValue(servingSize + STEP)}
          aria-label="Increase serving"
        >
          <Plus size={16} />
        </Button>
      </div>
    </div>
  );
}