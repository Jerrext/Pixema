import React, { FC, useState } from "react";
import "react-input-range/lib/css/index.css";
import "./RangeComponent.scss";
import InputRange, { Range } from "react-input-range";

const RangeComponent = () => {
  const [rangeState, setRangeState] = useState<number | Range>({
    max: 9.9,
    min: 0,
  });

  const onChange = (value: number | Range) => {
    const valuesArr = Object.values(value).map(
      (item) => Math.round(item * 10) / 10
    );
    const newValue: Range = {
      max: valuesArr[1],
      min: valuesArr[0],
    };
    setRangeState(newValue);
  };

  return (
    <div className="rangeWrapper">
      <InputRange
        maxValue={9.9}
        minValue={0}
        onChange={onChange}
        step={0.1}
        onChangeComplete={(value) => console.log(value)}
        value={rangeState}
      />
    </div>
  );
};

export default RangeComponent;
