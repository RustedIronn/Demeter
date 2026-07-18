import { useDispatch, useSelector } from "react-redux";

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
    (state) => state.general.servingSize
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


        <button
          onClick={decrease}
          type="button"
        >
          <Minus size={16}/>
        </button>



        <span className="ServingValue">
          {servingSize}
        </span>



        <button
          onClick={increase}
          type="button"
        >
          <Plus size={16}/>
        </button>


      </div>



      <span className="InputNumberCustomSubtitle">
        {serving_unit}
      </span>


    </div>
  );
}