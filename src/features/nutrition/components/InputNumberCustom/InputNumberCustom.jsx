import { useDispatch, useSelector } from "react-redux";
import Button from "@/shared/ui/Button/Button";

import {
  Minus,
  Plus,
} from "lucide-react";

import {
  servingSizeSet,
} from "@/features/nutrition/store/slice";

import "./InputNumberCustom.css";


export default function InputNumberCustom({
  serving_unit,
}) {
  const dispatch = useDispatch();


  const servingSize = useSelector(
    (state) => state.nutrition.servingSize
  );


  const updateValue = (value) => {
    const newValue = Math.max(
      0,
      Number(
        Number(value).toFixed(1)
      )
    );

    dispatch(
      servingSizeSet(newValue)
    );
  };


  const decrease = () => {
    updateValue(servingSize - 0.1);
  };


  const increase = () => {
    updateValue(servingSize + 0.1);
  };


  return (
    <div className="InputNumberCustom">


      <span className="InputNumberCustomTitle">
        Serving
      </span>


      <div className="ServingControl">


        <Button
  variant="secondary"
  onClick={decrease}
  type="button"
  className="ServingButton"
>
  <Minus size={16}/>
</Button>


        <span className="ServingValue">
          {servingSize}
        </span>



        <Button
  variant="secondary"
  onClick={increase}
  type="button"
  className="ServingButton"
>
  <Plus size={16}/>
</Button>


      </div>



      <span className="InputNumberCustomSubtitle">
        {serving_unit}
      </span>


    </div>
  );
}