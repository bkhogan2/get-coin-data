import React from "react";
import { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import Button from "@material-ui/core/Button";

const URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

// setRowState(
//     [
//      // load the data here
//      { id: 1, name: "Snow", price: "Jon", marketCap: 35 },
//      { id: 2, name: "Lannister", price: "Cersei", marketCap: 42 },
//      { id: 3, name: "Lannister", price: "Jaime", marketCap: 45 },
//      { id: 4, name: "Stark", price: "Arya", marketCap: 16 },
//      { id: 5, name: "Targaryen", price: "Daenerys", marketCap: null },
//      { id: 6, name: "Melisandre", price: null, marketCap: 150 },
//      { id: 7, name: "Clifford", price: "Ferrara", marketCap: 44 },
//      { id: 8, name: "Frances", price: "Rossini", marketCap: 36 },
//      { id: 9, name: "Roxie", price: "Harvey", marketCap: 65 },
//    ]);

const columns = [
  { field: "id", headerName: "ID", width: 91 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
    editable: false,
  },
  {
    field: "price",
    headerName: "Price",
    width: 120,
    editable: false,
  },
  {
    field: "marketCap",
    headerName: "Market Cap",
    sortable: true,
    width: 160,
  },
];

const CoinData = () => {
  const [rows, setRowState] = useState([]);

  useEffect(() => {
    fetch(URL)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) =>
        setRowState(
          data.map((coin) => ({
            id: coin.id,
            name: coin.name,
            price: coin.current_price,
            marketCap: coin.market_cap,
          }))
        )
      )
      .catch((error) => {
        console.error("Something went wrong fetching the coin gecko data");
      });
  });

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pmarketCapSize={5}
        checkboxSelection
        disableSelectionOnClick
      />
      <Button>Get Data</Button>
    </div>
  );
};

export default CoinData;
