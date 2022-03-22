import React from "react";
import { Input, Label } from "reactstrap";

const ReapeterComponent = (props) => {
  return (
    <div className="m-2">
      {props.data.map((v, index) => (
        <div key={index}>
          <Label>{v.title}</Label>
          <Input
            {...v}
            key={index}
            name={`${v.title.toLowerCase()}${index}`}
            onChange={(e) =>
              props.setFieldData({
                ...props.fieldData,
                [e.target.name]: e.target.value,
              })
            }
          />
        </div>
      ))}
    </div>
  );
};

export default ReapeterComponent;
