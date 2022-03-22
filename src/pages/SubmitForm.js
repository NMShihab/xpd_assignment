import React, { useState, useEffect } from "react";
import { Container, Button, Form, FormGroup, Label, Input } from "reactstrap";

import axios from "axios";
import ReapeterComponent from "../components/ReapeterComponent";

const SubmitForm = () => {
  const [fields, setFields] = useState([]);
  const [fieldData, setFieldData] = useState({});
  const [isRepeater, setIsReapeter] = useState(false);
  const [repList, setRepList] = useState([]);

  const fetchData = async () => {
    try {
      const request = await axios.get("http://localhost/api/get_form.php");

      setFields(request.data.data.fields);
      console.log(request.data);
      return request.data;
    } catch (error) {
      console.log(error);
    }
  };

  var field_list = [];
  const repeater_field = [];
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
          if (f[key].lenght > 0) {
            obj[key] = value;
          }
        } else if (key === "repeater_fields") {
          Object.entries(f.repeater_fields).forEach(([key, value]) => {
            repeater_field.push(value);
            repeater_key.push(key);
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

  const addComponentInput = (e) => {
    e.preventDefault();
    setIsReapeter(true);
    setRepList([...repList, repeater_field]);
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
    <Container>
      <h1> Get Form</h1>
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
              isRepeater ? (
                <div>
                  {repList.map((rf, index) => (
                    <ReapeterComponent
                      fieldData={fieldData}
                      setFieldData={setFieldData}
                      data={rf}
                      key={index}
                    />
                  ))}
                  <button onClick={addComponentInput}>add</button>
                </div>
              ) : (
                <div>
                  <button onClick={addComponentInput}> add</button>
                </div>
              )
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
  );
};

export default SubmitForm;
