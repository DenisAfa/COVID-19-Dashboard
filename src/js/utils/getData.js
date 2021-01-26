export default async function getData(dataUrl) {
    const url = dataUrl;
    const response = await fetch(url);
    const data = await response.json();

    return data;
}
