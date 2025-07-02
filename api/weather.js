export default async function handler(req, res) {
  const city = req.query.city || "Delhi"; // default if not provided
  const apiKey = process.env.WEATHER_API_KEY;

  const response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7&aqi=yes&alerts=yes`
  );
  const data = await response.json();

  res.status(200).json(data);
}