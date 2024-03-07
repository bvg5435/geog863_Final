require(["esri/Map",
        "esri/views/MapView",
        "esri/layers/FeatureLayer",
        "esri/renderers/UniqueValueRenderer",
        "esri/widgets/Legend"],
    (Map, MapView, FeatureLayer, UniqueValueRenderer, Legend) => {
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
            return {
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
        const template = {
            title: "{PID}",
            content: "Data Sheet: {DATA_SRCE}<br />Last Reviewed: {LAST_RECV}<br />Last Condition: {LAST_COND}<br />Marker: {MARKER}",
        };

        // Create the feature layer from an item on AGOL.
        const featureLayer = new FeatureLayer({
            portalItem: {
                id: "ed525488e1734683a53144bf4cf95c3d"
            },
            renderer: ngsRenderer,
            outFields: ["PID", "DATA_SRCE", "LAST_RECV", "LAST_COND", "MARKER"],
            popupTemplate: template
        });

        map.add(featureLayer);


        // Create a legend for the map.
        const legend = new Legend({
            view: view,
            layerInfos: [{
                layer: featureLayer,
                title: "Control Point Status"
            }]
        });
        // Add the legend.
        view.ui.add(legend, "top-left");

    });