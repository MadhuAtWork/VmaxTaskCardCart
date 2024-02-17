import React, { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import TablePagination from "@mui/material/TablePagination";
import ModalCart from "./ModalCart";

export default function Carts() {
  const [data, setdata] = useState();
  const [type, setType] = useState("Grid");
  const [filter, setFilter] = useState();
  const [filterData, setFilterData] = useState([]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  const handleApi = async () => {
    const response = await axios.get(`https://dummyjson.com/products`);
    setdata(response?.data?.products);
    setFilterData(response?.data?.products);
  };

  useEffect(() => {
    handleApi();
  }, []);
  const handleEvent = (e, value) => {
    setType(value);
  };

  const handleChangeFilter = (event) => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    // if (!filter) {
    //   setdata([]);
    // } else {
    const filteredData = filterData.filter((item) =>
      item?.title.toString().includes(filter)
    );
    setdata(filteredData);
    // }
  }, [filter]);

  const [addCartdData, setAddCartData] = useState([]);
  const [cartDetails, setCartDetails] = useState([]);

  const handleAddCard = (e, data, index) => {
    if (cartDetails.includes(index)) {
      alert("Card already added");
      return;
    }
    setCartDetails((prevData) => [...prevData, index]);

    setAddCartData((prevData) => [...prevData, data]);
  };

  console.log(addCartdData);

  return (
    <>
      <div>
      <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data?.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <div className="row">
          <div className="col-6">
            <input
              type="text"
              onChange={handleChangeFilter}
              value={filter}
            ></input>
          </div>
          <div className="col-6 d-flex">
            <ModalCart
              length={addCartdData?.length}
              addCartdData={addCartdData}
            ></ModalCart>
            <h3>Total Card : {data?.length}</h3>
          </div>
        </div>
        <div className="m-3 ">
          <Button onClick={(e) => handleEvent(e, "Grid")}>Grid</Button>
          <Button onClick={(e) => handleEvent(e, "List")}>List</Button>
        </div>

        <div className="row ">
          {data
            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            ?.map((value, index) => {
              return (
                < >
                  {type == "Grid" ? (
                    <div className="col-4 cardDiv" item key={index}>
                      <Card sx={{ width: 200 }}>
                        <CardMedia
                          sx={{ height: 140 }}
                          image={value?.thumbnail}
                          title="green iguana"
                        />
                        <CardContent>
                          <h3>Title: {value?.title}</h3>
                        </CardContent>
                        <CardContent>
                          <h3>Title: {value?.price}</h3>
                        </CardContent>
                        <CardActions>
                          <Button
                            size="small"
                            onClick={(e) => handleAddCard(e, value, index)}
                          >
                            Add Cart
                          </Button>
                        </CardActions>
                      </Card>
                    </div>
                  ) : (
                    <div
                      item
                      key={index}
                      className="col-12 d-flex justify-content-center align-item-center m-2"
                    >
                      <Card>
                        <CardMedia
                          sx={{ height: 140, width: 100 }}
                          image={value.thumbnail}
                          title="green iguana"
                        />
                        <CardContent>
                          <h3>Title: {value?.title}</h3>
                        </CardContent>
                        <CardContent>
                          <h3>Title: {value?.price}</h3>
                        </CardContent>
                        <CardActions>
                          <Button size="small">Add Cart</Button>
                        </CardActions>
                      </Card>
                    </div>
                  )}
                </>
              );
            })}
        </div>
      
      </div>
    </>
  );
}
