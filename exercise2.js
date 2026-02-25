const API_BASE = "https://corsproxy.io/?https://cambo-gazetteer.manethpak.dev/api/v1";

// store all select elements in one object
const get = {
  province: document.getElementById("province"),
  district: document.getElementById("district"),
  commune: document.getElementById("commune"),
  village: document.getElementById("village"),
};


//helper the populate select or drop down select
function populateSelect(selectElement, items, placeholderText) {
  selectElement.innerHTML = `<option value="" disabled selected>${placeholderText}</option>`;

  items.forEach(function(item) {
    const name = item.name_en || item.name_km;
    const option = new Option(name + " (" + item.name_km + ")", item.code);
    selectElement.add(option);
  });

  selectElement.disabled = false;
}


//helper to reset the select
function resetSelect(selectElement, placeholderText) {
  selectElement.innerHTML = `<option value="" disabled selected>${placeholderText}</option>`;
  selectElement.disabled = true;
}


//first thing is to load the province
async function loadProvinces() {
  try {
    const response = await fetch(API_BASE + "/provinces");
    const result = await response.json();
    populateSelect(get.province, result.data, "Select Province");
  } catch (error) {
    console.error("Error loading provinces:", error);
  }
}


//when province change
get.province.addEventListener("change", async function() {

  resetSelect(get.district, "Select District");
  resetSelect(get.commune, "Select Commune");
  resetSelect(get.village, "Select Village");

  try {
    const response = await fetch(
      API_BASE + "/districts?province=" + get.province.value
    );
    const result = await response.json();
    populateSelect(get.district, result.data, "Select District");
  } catch (error) {
    console.error("Error loading districts:", error);
  }
});


//when distric change
get.district.addEventListener("change", async function() {

  resetSelect(get.commune, "Select Commune");
  resetSelect(get.village, "Select Village");

  try {
    const response = await fetch(
      API_BASE + "/communes?district=" + get.district.value
    );
    const result = await response.json();
    populateSelect(get.commune, result.data, "Select Commune");
  } catch (error) {
    console.error("Error loading communes:", error);
  }
});


//when commune change
get.commune.addEventListener("change", async function() {

  resetSelect(get.village, "Select Village");

  try {
    const response = await fetch(
      API_BASE + "/villages?commune=" + get.commune.value
    );
    const result = await response.json();
    populateSelect(get.village, result.data, "Select Village");
  } catch (error) {
    console.error("Error loading villages:", error);
  }
});


//start
loadProvinces();