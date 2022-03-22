import React from "react";
import { useNavigate } from "react-router-dom";

const TableRows = ({ row, objectKeys }) => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    navigate("/update-form");
  };
  return (
    <tr style={{ cursor: "pointer" }} onClick={handleClick}>
      {objectKeys.map((k) =>
        Object.entries(row).map(
          (m, index) => k == m[0] && <td key={m[0]}> {m[1]}</td>
        )
      )}
    </tr>
  );
};

export default TableRows;
