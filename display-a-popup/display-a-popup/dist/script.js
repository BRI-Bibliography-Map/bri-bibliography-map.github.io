	mapboxgl.accessToken = 'pk.eyJ1IjoicHJpbmNlMjM1MSIsImEiOiJjbGFldDE5MXcwM3kzM3BwOWZtcTNtMHl2In0.VjFh-fU8xktSsNTfGW5iGg';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-96, 37.8],
        zoom: 2
    });

    const popup = new mapboxgl.Popup({ closeOnClick: false })
        .setLngLat([-100, 50])
        .setHTML('<h1>Welcome to the University of Virginia map of scholarly literature about the Belt and Road Initiative. Scroll to zoom for the country layer, and click on any location to see information.</h1>')
        .addTo(map);
