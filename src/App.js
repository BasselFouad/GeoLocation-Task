import React, { useState } from "react";
import SearchBox from "./SearchBox";
import Maps from "./Maps";
import Container from "@material-ui/core/Container";
import GeoJsonTable from "./GeoJsonTable";
import {
  lineGeoJsonPropertyNames,
  multiLineGeoJsonPropertyNames,
  pointGeoJsonPropertyNames,
  polygonGeoJsonPropertyNames,
} from "./constants";
function App() {
  const [selectPosition, setSelectPosition] = useState(null);
  const [multiLineGeoJsonArray, setMultiLineGeoJsonArray] = useState(null);
  const [lineGeoJsonArray, setLineGeoJsonArray] = useState(null);
  const [polygonGeoJsonArray, setPolygonGeoJsonArray] = useState(null);
  const [pointGeoJsonArray, setPointGeoJsonArray] = useState(null);

  const tableHeaderStyle = {
    color: "teal",
    fontWeight: "800",
    margin: "auto",
  };
  return (
    <div
      style={{
        display: "flex",
        paddingLeft: "3rem",
        paddingRight: "3rem",
        display: "flex",
        flexDirection: "column",
      }}>
      <h1
        style={{
          color: "#3f51b5",
          fontWeight: "800",
          margin: "auto",
        }}>
        Welcome to the GeoLocation Task
      </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100vw",
          height: "95vh",
        }}>
        <div style={{ width: "50vw", height: "90%", marginTop: "2rem" }}>
          <Maps selectPosition={selectPosition} />
        </div>
        <div style={{ width: "50vw" }}>
          <SearchBox
            selectPosition={selectPosition}
            setSelectPosition={setSelectPosition}
            setMultiLineGeoJsonArray={setMultiLineGeoJsonArray}
            setLineGeoJsonArray={setLineGeoJsonArray}
            setPointGeoJsonArray={setPointGeoJsonArray}
            setPolygonGeoJsonArray={setPolygonGeoJsonArray}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          // width: "100vw",
          margin: "auto",
          justifyContent: "center",
          alignItems: "center",
          // height: "95vh",
        }}>
        <h1 style={tableHeaderStyle}>Points: GeoJson</h1>
        {pointGeoJsonArray?.length > 0 && (
          <GeoJsonTable
            geoJsonArray={pointGeoJsonArray}
            propertyArray={pointGeoJsonPropertyNames}
          />
        )}
        <h1 style={tableHeaderStyle}> MultiLineStrings: GeoJson</h1>

        {multiLineGeoJsonArray?.length > 0 && (
          <GeoJsonTable
            geoJsonArray={multiLineGeoJsonArray}
            propertyArray={multiLineGeoJsonPropertyNames}
          />
        )}
        <h1 style={tableHeaderStyle}>Polygons: GeoJson</h1>

        {polygonGeoJsonArray?.length > 0 && (
          <GeoJsonTable
            geoJsonArray={polygonGeoJsonArray}
            propertyArray={polygonGeoJsonPropertyNames}
          />
        )}
        <h1 style={tableHeaderStyle}>Lines: GeoJson</h1>

        {lineGeoJsonArray?.length > 0 && (
          <GeoJsonTable
            geoJsonArray={lineGeoJsonArray}
            propertyArray={lineGeoJsonPropertyNames}
          />
        )}
      </div>
    </div>
  );
}

export default App;
