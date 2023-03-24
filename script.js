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

d3.csv("data.csv")
  .then(function (data) {
    articles = data;
    console.log(articles);
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

map.on("click", (event) => {
  // If the user clicked on one of your markers, get its information.
  const features = map.queryRenderedFeatures(event.point, {
    layers: slugToName, // replace with your layer name
  });

  if (!features.length) {
    return;
  }
  const feature = features[0];

  console.log(feature.layer.id);

  console.log(
    articles.filter((article) => article.Region === feature.layer.id)
  );

  const popup = new mapboxgl.Popup({ offset: [0, -15] })
    .setLngLat(event.lngLat)
    .setHTML(
      `<h3>Study Information</h3>${articles
        .filter((article) => feature.layer.id === article.Region)
        .map((article) => `<p>${article.Study Information}</p>`)
        .join("")}`
    )
    .addTo(map);
});
