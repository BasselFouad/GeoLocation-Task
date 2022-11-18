import React, { useState } from "react";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import osmtogeojson from "osmtogeojson";
const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";
const params = {
  q: "",
  format: "json",
  addressdetails: "addressdetails",
};

export default function SearchBox(props) {
  const {
    selectPosition,
    setSelectPosition,
    setLineGeoJsonArray,
    setMultiLineGeoJsonArray,
    setPointGeoJsonArray,
    setPolygonGeoJsonArray,
  } = props;
  const [searchText, setSearchText] = useState("");
  const [listPlace, setListPlace] = useState([]);

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  const onSearch = async () => {
    const params = {
      q: searchText,
      format: "json",
      addressdetails: 1,
      polygon_geojson: 0,
    };
    const queryString = new URLSearchParams(params).toString();
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    const response = await fetch(
      `${NOMINATIM_BASE_URL}${queryString}`,
      requestOptions
    );
    const result = await response.json();
    setListPlace(result);

    const boundingBox = result[0].boundingbox
      .toString()
      .replace("[")
      .replace("]");
    console.log(boundingBox);
    const responnseTwo = await fetch(
      `https://www.openstreetmap.org/api/0.6/map?bbox=13.3416273,52.5008804,13.3443524,52.5027695`,
      requestOptions
    );
    const myResp = await responnseTwo.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(myResp, "text/xml");
    const geosJsonArray = osmtogeojson(xml)?.features;

    const multiLineStringGeoJson = geosJsonArray.filter(
      (entry) => entry?.geometry?.type == "MultiLineString"
    );

    setMultiLineGeoJsonArray(multiLineStringGeoJson);
    const polygonGeoJson = geosJsonArray.filter(
      (entry) => entry?.geometry?.type == "Polygon"
    );

    setPolygonGeoJsonArray(polygonGeoJson);

    const lineGeoJson = geosJsonArray.filter(
      (entry) => entry?.geometry?.type == "LineString"
    );

    setLineGeoJsonArray(lineGeoJson);

    const pointGeoJsonArray = geosJsonArray.filter(
      (entry) => entry?.geometry?.type == "Point"
    );
    setPointGeoJsonArray(pointGeoJsonArray);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "75%",
        margin: "auto",
        marginTop: "5%",
        height: "50%",
      }}>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <OutlinedInput
            style={{ width: "100%" }}
            value={searchText}
            onChange={(event) => {
              setSearchText(event.target.value);
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0px 20px",
          }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onSearch()}>
            Search
          </Button>
        </div>
      </div>
      <div>
        <List component="nav" aria-label="main mailbox folders">
          {listPlace.map((item) => {
            return (
              <div key={item?.place_id}>
                <ListItem
                  button
                  onClick={() => {
                    setSelectPosition(item);
                  }}>
                  <ListItemIcon>
                    <img
                      src="./placeholder.png"
                      alt="Placeholder"
                      style={{ width: 38, height: 38 }}
                    />
                  </ListItemIcon>
                  <ListItemText primary={item?.display_name} />
                </ListItem>
                <Divider />
              </div>
            );
          })}
        </List>
      </div>
    </div>
  );
}
