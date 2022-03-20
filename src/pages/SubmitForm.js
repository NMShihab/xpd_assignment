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

import axios from "axios";

const SubmitForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [fields, setFields] = useState([]);

  const fetchData = async () => {
    try {
      const request = await axios.get("http://localhost/api/get_form.php");
      setIsLoading(false);
      setFields(request.data.data.fields);
      console.log(request.data);
      return request.data;
    } catch (error) {
      console.log(error);
      setIsError(true);
      setIsLoading(false);
    }
  };

  var field_list = [];

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
        } else {
          obj[key] = value;
        }
      });
      newFieldList.push(obj);
    });

    return newFieldList;
  };

  const newFieldList = transFormFieldsData(fields);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <h1> Get Form</h1>
      <Form>
        {newFieldList.map((field) => (
          <FormGroup key={field.title}>
            <Label for="exampleEmail">{field.title}</Label>
            {field.type === "select" ? (
              <Input
                id={field.id}
                className={field.className}
                type={field.type}
                defaultValue={field.defaultValue}
                required={field.required}
              >
                {field.options.map((op) => (
                  <option key={op.key} value={op.key}>
                    {op.label}
                  </option>
                ))}
              </Input>
            ) : field.type == "radio" ? (
              field.options.map((r, index) => (
                <div key={String(index)} className="d-flex">
                  <label>{r.label}</label>
                  <input
                    type={field.type}
                    value={r.key}
                    checked={field.default == r.key}
                    onChange={(e) => console.log(e.target.checked)}
                    name="radio"
                  />
                </div>
              ))
            ) : (
              <Input {...field}></Input>
            )}
          </FormGroup>
        ))}
        <Button>Submit</Button>
      </Form>
    </Container>
  );
};

export default SubmitForm;
