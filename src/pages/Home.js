import React, { useEffect, useState } from "react";
import axios from "axios";
import TableRows from "../components/TableRows";
import { Table, Container, Spinner } from "reactstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [rows, setRows] = useState([]);
  const [allheading, setAllHeading] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [searchInput, setSearchInput] = useState({});

  // const history = useHistory();
  const navigate = useNavigate();

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
  const searchable = [];
  const searchableHeading = [];

  allheading.map((head) => {
    Object.entries(head).forEach(([key, value]) => {
      if (!head[key].hidden) {
        heading.push(head[key]);
        objectKeys.push(key);
        if (head[key].searchable) {
          searchable.push(key);
          searchableHeading.push(head[key].title);
        }
      }
    });
  });

  // Transform data

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

  var newData = transFormData(rows, objectKeys);

  // Search Funtionality
  const searchData = (newData) => {
    if (Object.keys(searchInput).length === 0) {
      return newData;
    }
    const searchedKey = Object.keys(searchInput);

    searchedKey.forEach((key) => {
      if (searchInput[key].length > 0) {
        newData = newData.filter((d) => {
          let flag = false;
          if (
            String(d[key])
              .toLowerCase()
              .includes(String(searchInput[key]))
          ) {
            flag = true;
          }
          return flag;
        });
      }
    });
    return newData;
  };

  newData = searchData(newData);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="py-5">
      {isLoading ? (
        <div className="d-flex h-100 align-item-center justify-content-center">
          <div className="">
            {" "}
            <Spinner>Loading...</Spinner>
          </div>
        </div>
      ) : (
        <Container>
          <div className="mb-3">
            <h3> Search here</h3>
            <div className="d-flex justify-content-evenly">
              {searchable.map((k, i) => (
                <input
                  key={k}
                  placeholder={searchableHeading[i]}
                  name={k}
                  onChange={(e) =>
                    setSearchInput({
                      ...searchInput,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              ))}
            </div>
          </div>
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
      )}
    </div>
  );
};

export default Home;
