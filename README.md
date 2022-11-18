# GeoLocation Task

## Use `npm start` to start this project

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## `Description`
Please checkout video to see the project working : https://drive.google.com/file/d/1pDW2tsQ6vic4QgAGpSNaVAUqRH8sHvVU/view?usp=sharing .

Type the location in the search bar and click search. You will then get search results in a list. 
The https://nominatim.openstreetmap.org/search? API was used to get the search results.
Choose your preferred search result and click on it. The map will then directly move to that point.
We then use the bounding box of that point to use the https://www.openstreetmap.org/api/0.6/map?bbox= API, and the OSM data of the point is retrieved in XML.
We convert the XML results into a JSON array, and then we filter the incoming features according to type: Point, MultiLineString, LineString and Polygon.
Each is displayed in a table, with some randomly chosen attributes of that feature Type.

Note: Sometimes the https://www.openstreetmap.org/api/0.6/map?bbox= does not return results since the bounding box would be too large. Have not implemented error handling in this task, as it was only meant as a quick, small project.
Note 2: You can try testing with wittenbergplatz as the location, which will work. This is were I used to live in Berlin !
