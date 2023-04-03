const slugToName = [
  "Africa",
  "Central and South America",
  "Central and West Asia",
  "East Asia and Oceania",
  "South Asia",
  "Europe and North America",
  "China",
  "Southeast Asia",
];

let articles;
let countryData = {};

d3.csv("data.csv")
  .then(function (data) {
    articles = data;
    console.log(articles);
  })
  .catch(function (error) {
    // handle error
  });

d3.csv("countryData.csv")
  .then(function (data) {
    //convert array of objects to object of objects with country as key and the rest of the data as value
    data.forEach((d) => {
      countryData[d.Country] = d;
      // remove the country key from the value
      delete countryData[d.Country].Country;
    });
  })
  .catch(function (error) {
    // handle error
  });

mapboxgl.accessToken =
  "pk.eyJ1IjoicHJpbmNlMjM1MSIsImEiOiJjbGFldDE5MXcwM3kzM3BwOWZtcTNtMHl2In0.VjFh-fU8xktSsNTfGW5iGg";
const map = new mapboxgl.Map({
  container: "map",
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: "mapbox://styles/prince2351/claexaqnl000k14n7sw0j9mzj",
});

// once the map loads, add the data source
// this is using the Mapbox API

function handleRegion(event) {
  // If the user clicked on one of your markers, get its information.
  const features = map.queryRenderedFeatures(event.point, {
    layers: slugToName,
  });

  const feature = features[0];

  const popup = new mapboxgl.Popup({ offset: [0, -15] })
    .setLngLat(event.lngLat)
    .setHTML(
      `<h3>${feature.layer.id} Study Information</h3>${articles
        .filter((article) => feature.layer.id === article.Region)
        .map((article) => `<p>${article.Study_Information}</p>`)
        .join("")}`
    )
    .addTo(map);
}

function handleCountry(event, country) {
  // If the user clicked on one of your markers, get its information.
  const features = map.queryRenderedFeatures(event.point);

  // create a new object with the country data only with values greater than 0
  const localData = Object.keys(countryData[country]).reduce((acc, key) => {
    if (countryData[country][key] > 0) {
      acc[key] = countryData[country][key];
    }
    return acc;
  }, {});

  // sort by value
  const sortedData = Object.keys(localData)
    .sort((a, b) => localData[b] - localData[a])
    .reduce((acc, key) => {
      acc[key] = localData[key];
      return acc;
    }, {});

  const countryDataHTML = Object.keys(sortedData).map(
    (key) => `${sortedData[key]} - ${key}`
  );

  console.log(countryDataHTML);

  // display the popup with data from the countryData object for the country
  const popup = new mapboxgl.Popup({ offset: [0, -15] })
    .setLngLat(event.lngLat)
    .setHTML(
      `<h3>${country} Study Information</h3>${countryDataHTML
        .map((data) => `<p>${data}</p>`)
        .join("")}`
    )
    .addTo(map);
}

map.on("click", (event) => {
  // log all features under the mouse
  console.log(map.queryRenderedFeatures(event.point)[0].properties);

  if (!map.queryRenderedFeatures(event.point).length) {
    return;
  }

  // if it has the continent property, then it is a continent / region
  if (map.queryRenderedFeatures(event.point)[0].properties.Continent) {
    handleRegion(event);
  } else if (map.queryRenderedFeatures(event.point)[0].properties.ADMIN) {
    handleCountry(
      event,
      map.queryRenderedFeatures(event.point)[0].properties.ADMIN
    );
  }
});
