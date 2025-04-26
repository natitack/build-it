import zoningLookup from './zoningLookup.json'

export async function getZoningData(address: string) {

    const nomRes = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`);
    const nomData = await nomRes.json();

    if (!nomData || !nomData[0]) {
        throw new Error('No location found');
    }

    const { lat, lon } = nomData[0];
    console.log(`Latitude: ${lat}, Longitude: ${lon}`);

    const arcgisUrl = `https://services1.arcgis.com/znO8Hz1SuVVohYhZ/arcgis/rest/services/Zoning/FeatureServer/0/query?geometry=${lon},${lat}&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIntersects&returnGeometry=false&f=json`;
    const arcgisRes = await fetch(arcgisUrl);
    const arcgisData = await arcgisRes.json();

    const zoningCode = arcgisData.features?.[0]?.attributes?.ZONE;

    if (!zoningCode) {
        throw new Error('No zoning designation found');
    }

    const zoningInfo = zoningLookup[zoningCode] || {};

    if (!zoningInfo) {
        throw new Error('Zoning code not found in local lookup records.')
    }

    return {
        address,
        coordinates: { lat, lon },
        zoningCode,
        zoningInfo,
      };
}