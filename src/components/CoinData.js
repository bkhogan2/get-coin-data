import React from "react";
import { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import Button from "@material-ui/core/Button";
import { Image } from "@material-ui/icons";



const URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

const columns = [
  {
    field: "image",
    headerName: "Image",
    width: 50,
    height: 50,
    editable: false,
    renderCell: (params) => (
      <img src={`${params.value}`} height={25} />
    )
  },
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
            image: coin.image,
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
