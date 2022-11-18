import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Grid,
  Typography,
  TablePagination,
  TableFooter,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 250,
  },
  tableContainer: {
    borderRadius: 15,
    margin: "10px 10px",
    maxWidth: 950,
  },
  tableHeaderCell: {
    fontWeight: "bold",
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.getContrastText(theme.palette.primary.dark),
  },
  avatar: {
    backgroundColor: theme.palette.getContrastText(theme.palette.primary.light),
    color: theme.palette.getContrastText(theme.palette.primary.light),
  },
  name: {
    fontWeight: "bold",
    color: theme.palette.secondary.dark,
  },
  status: {
    fontWeight: "bold",
    fontSize: "0.75rem",
    color: "white",
    backgroundColor: "grey",
    borderRadius: 8,
    padding: "3px 10px",
    display: "inline-block",
  },
}));

function GeoJsonTable(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { geoJsonArray, propertyArray } = props;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead title="Average Expense Ratio">
          <TableRow>
            <TableCell className={classes.tableHeaderCell}></TableCell>
            {propertyArray?.map((property) => {
              return (
                <TableCell className={classes.tableHeaderCell}>
                  {property?.toUpperCase()}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {geoJsonArray
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (
              <TableRow key={row?.properties?.id}>
                {/* <TableCell>
                  <Typography color="primary" variant="subtitle2">
                    {row?.properties?.id}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="primary" variant="subtitle2">
                    {row?.properties?.changeset}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="primary" variant="subtitle2">
                    {row?.properties?.timestamp}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="body2">
                    {row?.properties?.uid}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    className={classes.status}
                    style={{
                      backgroundColor:
                        (row.geometry.type === "MultiLineString" && "green") ||
                        (row.geometry.type === "Polygon" && "blue") ||
                        (row.geometry.type === "Point" && "orange"),
                    }}>
                    {row?.geometry?.type}
                  </Typography>
                </TableCell> */}

                <TableCell>
                  <Avatar
                    alt={index}
                    src="./placeholder.png"
                    className={classes.avatar}
                  />
                </TableCell>
                {propertyArray.map((property, index) => {
                  return (
                    <TableCell>
                      <Typography
                        color={index % 2 == 1 ? "primary" : "secondary"}
                        variant="body2"
                        className={
                          row?.properties[property] ? "" : classes.status
                        }
                        style={{
                          backgroundColor:
                            (property == "latitude" && "green") ||
                            (property == "longitude" && "orange") ||
                            (!row?.properties[property] && "teal"),
                        }}>
                        {property == "latitude"
                          ? parseFloat(row?.geometry?.coordinates[1])?.toFixed(
                              5
                            )
                          : property == "longitude"
                          ? parseFloat(row?.geometry?.coordinates[0])?.toFixed(
                              5
                            )
                          : row?.properties[property] ?? "NA"}
                      </Typography>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TablePagination
            rowsPerPageOptions={[20, 50, 100]}
            // component="div"
            count={geoJsonArray.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default GeoJsonTable;
