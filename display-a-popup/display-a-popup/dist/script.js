// TO MAKE THE MAP APPEAR YOU MUST
	// ADD YOUR ACCESS TOKEN FROM
	// https://account.mapbox.com
	mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';
    const map = new mapboxgl.Map({
        container: 'map',
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-96, 37.8],
        zoom: 2
    });

    const popup = new mapboxgl.Popup({ closeOnClick: false })
        .setLngLat([-100, 50])
        .setHTML('<h1>Welcome to the University of Virginia map of scholarly literature about the Belt and Road Initiative. Scroll to zoom for the country layer, and click on any location to see information.</h1>')
        .addTo(map);