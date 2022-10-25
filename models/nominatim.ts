export default async function getCoordinates(city: string) {
    const urlEncodedCity = encodeURIComponent(city);
    const url = "https://nominatim.openstreetmap.org/search.php?format=jsonv2&q=";
    const response = await fetch(`${url}${urlEncodedCity}`);
    const result = await response.json();
    
    return result;
};