const apiToken = "OfcJM5gSdU7WvdVm1KiXsJhFpWLCgi9m5GoaatM2";
const searchUrl = "https://developer.nps.gov/api/v1/parks";

function formatQueryParams(params) {
  const queryItems = Object.keys(params).map(
    key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
  );
  return queryItems.join("&");
}

function displayResults(responseJson) {
  console.log(responseJson);
  $(".results-list").empty();
  for (let i = 0; i < responseJson.data.length; i++) {
    $(".results-list").append(
      `<li>Park Name: ${responseJson.data[i].fullName}</li>
      <li>Description: ${responseJson.data[i].description}</li>
      <li>URL: ${responseJson.data[i].url}</li>
      <li>States: ${responseJson.data[i].states}</li>`
    );
  }
  $(".results").removeClass("hidden");
}

function getParks(state, limit = 10) {
  const params = {
    api_key: apiToken,
    stateCode: state,
    limit
  };
  const queryString = formatQueryParams(params);
  const url = searchUrl + "?" + queryString;

  console.log(url);
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $(".error-message").text(`Something went wrong: ${err.message}`);
    });
}

function handleForm() {
  $("form").submit(event => {
    event.preventDefault();
    const searchTerm = $("#state").val();
    const maxResults = $("#maxResults").val();
    getParks(searchTerm, maxResults);
  });
}

$(handleForm);
