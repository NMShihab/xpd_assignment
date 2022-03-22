import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from "reactstrap";

import ReapeterComponent from "../components/ReapeterComponent";

import axios from "axios";

const UpdateForm = () => {
  const [fields, setFields] = useState([]);
  const [fieldData, setFieldData] = useState({});
  const [repList, setRepList] = useState([]);

  var field_list = [];
  const repeater_value = [];
  const repeater_key = [];

  const transFormFieldsData = (data) => {
    data.map((d) =>
      Object.entries(d).forEach(([key, value]) => {
        field_list.push(d[key]);
      })
    );

    const newFieldList = [];

    field_list.map((f) => {
      const obj = {};
      Object.entries(f).forEach(([key, value]) => {
        if (key === "html_attr") {
          Object.entries(f[key]).forEach(([k, v]) => {
            if (k === "class") {
              obj["className"] = v;
            } else {
              obj[k] = v;
            }
          });
        } else if (key === "value") {
          obj[key] = value;
        } else if (key === "repeater_fields") {
          Object.entries(f.value).forEach(([key, value]) => {
            console.log(key, value);
            Object.entries(value).forEach(([k, v]) => {
              repeater_key.push(k);
            });

            repeater_value.push(value);
          });
        } else {
          obj[key] = value;
        }
      });
      newFieldList.push(obj);
    });

    return newFieldList;
  };

  const newFieldList = transFormFieldsData(fields);

  console.log(newFieldList);

  const fetchData = async () => {
    try {
      const request = await axios.get(
        "http://localhost/api/get_form.php?id=67"
      );

      setFields(request.data.data.fields);

      console.log(request.data);

      return request.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmission = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost/api/submit_form.php",
        fieldData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log();
    }

    console.log(fieldData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {" "}
      <Container>
        <h1> Update Form</h1>
        <Form onSubmit={handleSubmission}>
          {newFieldList.map((field) => (
            <FormGroup key={field.title}>
              <Label>{field.title}</Label>
              {field.type === "select" ? (
                <Input
                  id={field.id}
                  className={field.className}
                  type={field.type}
                  defaultValue={field.defaultValue}
                  required={field.required}
                  name={field.title.toLowerCase()}
                  value={field.value}
                  onChange={(e) =>
                    setFieldData({
                      ...fieldData,
                      [e.target.name]: e.target.value,
                    })
                  }
                >
                  {field.options.map((op) => (
                    <option key={op.key} value={op.key}>
                      {op.label}
                    </option>
                  ))}
                </Input>
              ) : field.type == "radio" ? (
                field.options.map((r, index) => (
                  <div
                    key={String(index)}
                    className="d-flex justify-content-start"
                  >
                    <label>{r.label}</label>
                    <input
                      type={field.type}
                      value={r.key}
                      checked={field.default == r.key}
                      onChange={(e) =>
                        setFieldData({
                          ...fieldData,
                          [e.target.name]: e.target.value,
                        })
                      }
                      name="radio"
                    />
                  </div>
                ))
              ) : field.type === "repeater" ? (
                repeater_value.map((rv, index) => (
                  <div className="m-2">
                    {Object.entries(rv).map((m) => (
                      <div className="d-flex">
                        <Label className="m-2">{m[0].toUpperCase()}</Label>{" "}
                        <Input value={m[1]} />
                      </div>
                    ))}
                  </div>
                ))
              ) : (
                <Input
                  {...field}
                  name={field.title.toLowerCase()}
                  onChange={(e) =>
                    setFieldData({
                      ...fieldData,
                      [e.target.name]: e.target.value,
                    })
                  }
                ></Input>
              )}
            </FormGroup>
          ))}
          <Button>Submit</Button>
        </Form>
      </Container>
    </div>
  );
};

export default UpdateForm;
