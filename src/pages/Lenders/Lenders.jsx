import * as React from "react";
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { db } from "../../services/firebase";
import { collection, getDocs } from "firebase/firestore";
import TableDeleteButton from "../../components/Buttons/TableDeleteButton";
import TableEditButton from "../../components/Buttons/TableEditButton";
import { Stack } from "@mui/material";

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);
  const empCollectionRef = collection(db, "products");

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await getDocs(empCollectionRef);
    setRows(response.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Typography gutterBottom variant="h5" component="div" sx={{ padding: 2 }}>
        Lenders List
      </Typography>
      <Divider />
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                Action
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                Name
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                Price
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                Category
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                Date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1}>
                    <TableCell key={row.id} align="left">
                      <Stack spacing={2} direction="row">
                      <TableEditButton onClick={() => handleEdit(employee.id)} />
                      <TableDeleteButton onClick={() => handleDelete(employee.id)} />
                      </Stack>
                    </TableCell>
                    <TableCell key={row.id} align="left">
                      {row.name}
                    </TableCell>
                    <TableCell key={row.id} align="left">
                      {row.price}
                    </TableCell>
                    <TableCell key={row.id} align="left">
                      {row.category}
                    </TableCell>
                    <TableCell key={row.id} align="left">
                      {row.date}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
