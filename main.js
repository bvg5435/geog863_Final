require(["esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/renderers/UniqueValueRenderer",], (Map, MapView, FeatureLayer, UniqueValueRenderer) => {
    const map = new Map({
        basemap: "hybrid"
    });

    // Set the zoom extent to Minnesota.
    const Lat = 46.169553;
    const Long = -94.587120;

    // Create the map view.
    const view = new MapView({
        container: "viewDiv",
        map: map,
        zoom: 7,
        center: [Long, Lat]
    });

    function createValueInfos(varLabel, varValue, symbolColor, symbolSize, symbolType) {
        return{
            label: varLabel,
            value: varValue,
            symbol: {
                type: "simple-marker",
                color: symbolColor,
                size: symbolSize,
                style: symbolType
            }
        }
    }

    const typeNotVisited = createValueInfos("Not Visited", "Not Visited", "blue", 4, "square");
    const typeLocated = createValueInfos("Visited - Located", "Visited - Located", "green", 4, "square");
    const typeNotLocated = createValueInfos("Visited - Not Located", "Visited - Not Located", "red", 4, "square");

    const ngsRenderer = new UniqueValueRenderer({
        field: "FieldLocated",
        uniqueValueInfos: [
            typeNotVisited,
            typeNotLocated,
            typeLocated
        ]
    });


    // Pop-up Creation
    //const template = {
        //title: "Site: {CAMPING_UNIT_NAME}",
        //content: "Site Length: {SITE_PAD_LENGTH_FT}<br />Campsite Type: {CAMPSITE_TYPE_NAME}<br />Tent Pad Size (ft): {TENT_PAD_DIMENSIONS_FT_X_FT}",
    //};

    // Create the feature layer from an item on AGOL.
    const featureLayer = new FeatureLayer({
        portalItem: {
            id:"ed525488e1734683a53144bf4cf95c3d"
        },
        renderer: ngsRenderer,
        outFields: ["*"],
        //popupTemplate: template
    });

    map.add(featureLayer);
});