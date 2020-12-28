// Personal API Key for OpenWeatherMap API
const API_KEY = "1f0eae00d572678c3f8fdfc04b02459d";
// Base URL for the weather app
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?";
// DOM Elements
const generateButton = document.querySelector("#generate");

// Event listener to add function to existing HTML DOM element
generateButton.addEventListener("click", () => {
  getWeatherAndUserData();
});

/* Function called by event listener */
const getWeatherAndUserData = async () => {
  const zipCode = document.querySelector("#zip").value;
  const feelings = document.querySelector("#feelings").value;
  const weatherData = await getWeatherData(BASE_URL, zipCode, API_KEY);
  const projectData = {
    temperature: weatherData.main.temp,
    date: getEntryDate(),
    userResponse: feelings,
  };
  postProjectdata("/post-project-data", projectData).then(() =>
    updateMostRecentEntry()
  );
};

/* Function to GET Web API Data*/
const getWeatherData = async (baseURL, zipCode, APIKey) => {
  const getWeatherByZipCode = `${baseURL}zip=${zipCode}&appid=${APIKey}`;
  const response = await fetch(getWeatherByZipCode);
  const data = await response.json();
  return data;
};

/* Function to POST data */
const postProjectdata = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

/* Function to GET Project Data */
const getProjectData = async (url) => {
  const projectData = await fetch(url);
  return projectData;
};

/* Function to Update Most Recent Entry */
const updateMostRecentEntry = async () => {
  const entryDate = document.querySelector("#date");
  const entryTemp = document.querySelector("#temp");
  const entryContent = document.querySelector("#content");

  const response = await getProjectData("/all");
  const projectData = await response.json();

  entryDate.innerHTML = `Date: ${projectData.date}`;
  entryTemp.innerHTML = `Temperature: ${projectData.temperature}`;
  entryContent.innerHTML = `Feeling: ${projectData.userResponse}`;
};

/* Function to get todays date in DD/MM/YYYY format */
const getEntryDate = () => {
  const [month, date, year] = new Date().toLocaleDateString("en-US").split("/");
  const entryDate = `${date}/${month}/${year}`;
  return entryDate;
};
