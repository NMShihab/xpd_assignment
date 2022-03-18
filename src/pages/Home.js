import React, { useEffect, useState } from "react";
import axios from "axios";
import TableRows from "../components/TableRows";
import { Table, Container } from "reactstrap";

const Home = () => {
  const [rows, setRows] = useState([]);
  const [allheading, setAllHeading] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchData = async () => {
    try {
      const request = await axios.get("http://localhost/api/list.php");
      setRows(request.data.data.rows);
      setAllHeading(request.data.data.headers);
      setIsLoading(false);

      return request.data.data;
    } catch (error) {
      console.log(error);
      setIsError(true);
      setIsLoading(false);
    }
  };

  const heading = [];
  const objectKeys = [];
  allheading.map((head) => {
    Object.entries(head).forEach(([key, value]) => {
      if (!head[key].hidden) {
        heading.push(head[key]);
        objectKeys.push(key);
      }
    });
  });

  const objectValue = (row, h) => {
    Object.entries(row).forEach(() => {
      return row[h];
    });
  };

  const transFormData = (rows, objectKeys) => {
    const newData = [];
    rows.map((r) => {
      const obj = {};
      objectKeys.map((k) => {
        Object.entries(r).forEach(([key, value]) => {
          const rowKeys = Object.keys(r);
          if (rowKeys.includes(k)) {
            if (k == key) {
              obj[k] = value;
            }
          } else {
            obj[k] = "";
          }
        });
      });

      newData.push(obj);
    });

    return newData;
  };

  const newData = transFormData(rows, objectKeys);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="py-5">
      <Container>
        <Table responsive>
          <thead>
            <tr>
              {heading.map((head) => (
                <th key={head.title}> {head.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {newData.map((row, i) => (
              <TableRows key={i} row={row} objectKeys={objectKeys} />
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default Home;
