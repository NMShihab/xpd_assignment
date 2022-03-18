import React from "react";

const TableRows = ({ row, objectKeys }) => {
  return (
    <tr>
      {objectKeys.map((k) =>
        Object.entries(row).map((m) => k == m[0] && <td key={m[0]}> {m[1]}</td>)
      )}
    </tr>
  );
};

export default TableRows;
