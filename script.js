function getHandle(searchHandle) {
  const url = "https://api.github.com/users/USERNAME/repos"
  console.log(url);
  let completeUrl = url.replace("USERNAME", searchHandle);
  console.log(completeUrl);

fetch(completeUrl)
.then(response => {
  if (response.ok) {
    return response.json();
  }
  throw new Error(response.statusText);
})
.then(responseJson => displayResults(responseJson))
.catch(err => {
  $('#js-error-message').text(`Something went wrong: ${err.message}`);
});
}

function displayResults(responseJson) {
  console.log(responseJson.length)
  console.log(responseJson);
  for (let i = 0; i < responseJson.length; i++){
    $('#results-list').append(
      `<li><h3>${responseJson[i].name}:<h3><a href="${responseJson[i].url}">${responseJson[i].url}</li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    $('#results-list').empty();
    $('#js-error-message').empty();
    const searchHandle = $('#js-github-handle').val();
    getHandle(searchHandle);
  });
}

$(watchForm);
