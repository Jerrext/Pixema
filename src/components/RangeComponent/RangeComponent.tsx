import React, { FC, useEffect, useState } from "react";
import "react-input-range/lib/css/index.css";
import "./RangeComponent.scss";
import InputRange, { Range } from "react-input-range";
import { title } from "process";
import classNames from "classnames";

type RangeComponentProps = {
  maxValue: number;
  rangeState: number | Range;
  minValue: number;
  step: number;
  title: string;
  classNameRange?: string;
  setNewRangeState: (value: React.SetStateAction<Range>) => void;
  formatLabel?: (value: number) => string;
};

const RangeComponent: FC<RangeComponentProps> = ({
  maxValue,
  rangeState,
  minValue,
  step,
  title,
  classNameRange,
  setNewRangeState,
  formatLabel,
}) => {
  const onChange = (value: number | Range) => {
    const valuesArr = Object.values(value).map(
      (item) => Math.round(item * 10) / 10
    );
    const newValue: Range = {
      max: Math.min(valuesArr[1], maxValue),
      min: Math.max(valuesArr[0], minValue),
    };
    setNewRangeState(newValue);
  };

  return (
    <div className="rangeWrapper">
      <p>{title}</p>
      <div className={classNames(classNameRange, "rangeComponent")}>
        <InputRange
          draggableTrack
          maxValue={maxValue}
          value={rangeState}
          formatLabel={formatLabel}
          minValue={minValue}
          onChange={onChange}
          step={step}
        />
      </div>
    </div>
  );
};

export default RangeComponent;
