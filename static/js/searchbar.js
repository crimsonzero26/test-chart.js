// Shout out to a Youtube Channel named Web Dev Simplified for helping me
// get the search bar to work
const searchInput = document.getElementById("data-search-bar");

searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    // console.log(value);
})

const searchButton = document.getElementById("data-search-button")

function searchSubmit(event) {
    event.preventDefault();
    let query = searchInput.value;
    if (query != "") {
        let destination = `/countries/${query}`;
        window.open(destination, "_blank");
        searchInput.value = "";
    }
}

function searchbarSubmit(event) {
    event.preventDefault()
    let query = searchInput.value;
    if (query != "") {
        let destination = `/countries/${query}`;
        window.open(destination, "_blank");
        searchInput.value = "";
    }
}


// Shout out to John T who somehow made the function below work
searchButton.addEventListener("click", searchSubmit, false);
searchInput.addEventListener("change", searchbarSubmit, false);
