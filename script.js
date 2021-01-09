// console.log("Hello from inside");
const endpoint = "./data.JSON";
const cities = [];

fetch(endpoint)
  .then((blob) => blob.json())
  .then((data) => cities.push(...data.data));

// console.log(cities);
function findMatches(wordToMatch, cities) {
  return cities.filter((place) => {
    // here we need to figure out if the city or state matches what was searched
    const regex = new RegExp(wordToMatch, "gi");
    return place.city_name.match(regex) || place.region.match(regex);
  });
}

//stackoverflow
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function displayMatches() {
  const matchArray = findMatches(this.value, cities);
  const html = matchArray
    .map((place) => {
      const regex = new RegExp(this.value, "gi");
      const cityName = place.city_name.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );

      const regionName = place.region.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      return `
  <li>
    <span class="cityName">City Name: ${cityName}</span><br>
    <span class="regionName">Region Name: ${regionName}</span><br>
    <span class="population">Population: ${place.population} <i class="em em-man-man-girl-boy" aria-role="presentation" aria-label=""></i></span><br>
    <span class="licenceNumber">Licence Number: ${place.licence_number} <i class="em em-blue_car" aria-role="presentation" aria-label="RECREATIONAL VEHICLE"></i></span><br>
    <span class="dialingCode">Dialing Code: ${place.dialing_code} <i class="em em-phone" aria-role="presentation" aria-label="BLACK TELEPHONE"></i></span><br>
    <span class="area">Area: ${place.area}km²</span> <i class="em em-mount_fuji" aria-role="presentation" aria-label="MOUNT FUJI"></i><br>
    <span class="malePop">Male Population: ${place.male_population_percentage} <i class="em em-male_red_haired" aria-role="presentation" aria-label=""></i></span><br>
    <span class="femalePop">Female Population: ${place.female_population_percentage} <i class="em em-female_curly_haired" aria-role="presentation" aria-label=""></i></span>
  </li>
`;
    })
    .join("");
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector("#search");
const suggestions = document.querySelector(".suggestions");

searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);

// Alternative Solution
// const result = document.querySelector("#results");
// const displayBtn = document.querySelector("#displayButton");
// const search = document.querySelector("#search");

// const url = "./lib/data.JSON";

// async function loadJSON(url) {
//   const res = await fetch(url);
//   return await res.json();
// }

// displayBtn.addEventListener("click", (event) => {
//   loadJSON(url).then((Data) => {
//     const cities = Data.data.filter((city) => {
//       // console.log(city.city_name);
//       return city.city_name === document.getElementById("search").value;
//     });
//     cities.forEach((element) => {
//       result.innerHTML = "";
//       const show = `
//       <p class="list-item"><i class="fas fa-chart-area"></i> Area: ${element.area} km²</p>
//       <p class="list-item"><i class="fas fa-mountain"></i> Region: ${element.region}</p>
//       <p class="list-item"><i class="fas fa-user-friends"></i> Population: ${element.population}</p>
//       <p class="list-item"><i class="fas fa-male"></i> Male Population: ${element.male_population}</p>
//       <p class="list-item"><i class="fas fa-percentage"></i> Percentage of Male Population: ${element.male_population_percentage}</p>
//       <p class="list-item"><i class="fas fa-female"></i> Female Population: ${element.female_population}</p>
//       <p class="list-item"> <i class="fas fa-percentage"></i> Percentage of Female Population: ${element.female_population_percentage}</p>
//     `;
//       result.insertAdjacentHTML("beforeend", show);
//     });
//   });
//   // loadJSON();
// });
