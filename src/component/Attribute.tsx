import React, { useEffect } from "react";
import { useState } from "react";

interface Props {
  name: string;
  initialvalue: number;
  total: number;
  options?: {
    hideimage?: boolean;
    hidebutton?: boolean;
  };
  onchange?: (value: number) => void;
}

export default function Attribute(props: Props) {
  const [value, setValue] = useState<number>(props.initialvalue);

  function SetValue(value: number) {
    if (value < 0 || value > props.total) return;
    setValue(value);
    if (props.onchange) props.onchange(value);
  }

  useEffect(() => {
    setValue(props.initialvalue);
  }, [props.initialvalue]);

  const bars = React.useMemo(() => {
    let bars = [];
    for (let i = 0; i < props.total; i++) {
      if (i < value)
        bars.push(
          <div key={i} className="column txt-center">
            <span className="bg-white p-10">&nbsp;</span>
          </div>
        );
      else {
        bars.push(
          <div key={i} className="column txt-center">
            <span className="bg-white-50 p-10">&nbsp;</span>
          </div>
        );
      }
    }
    return bars;
  }, [value, props.total]);

  return (
    <div className="grid align-middle">
      {props.options?.hideimage !== true && (
        <div className="column w-auto grid align-middle justify-center bg-warn mr-4 clr-black" style={{ height: "50px", width: "50px" }}>
          img
        </div>
      )}
      <div className="column">
        <div>{props.name}</div>
        <div className="grid align-middle">
          {props.options?.hidebutton !== true && (
            <div className="column w-auto">
              <button className="btn clr-white inline-flex txt-super is-circle icon txt-1 p-0" onClick={() => SetValue(value - 1)}>
                -
              </button>
            </div>
          )}
          <div className="column grid has-gap-0">{bars}</div>
          {props.options?.hidebutton !== true && (
            <div className="column w-auto">
              <button className="btn clr-white inline-flex txt-super is-circle icon txt-1 p-0" onClick={() => SetValue(value + 1)}>
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
