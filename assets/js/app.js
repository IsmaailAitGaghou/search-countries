// Dark Theme

const themebutton = document.querySelector(".change__theme");
const darkTheme = "dark__theme";
const iconTheme = "ri-sun-line";

const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

const getCurrentTheme = () => {
  return document.body.classList.contains(darkTheme) ? "dark" : "light";
};

const getCurrentIcon = () => {
  return themebutton.classList.contains(iconTheme)
    ? "ri-sun-line"
    : "ri-moon-line";
};

if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themebutton.classList[selectedIcon === "ri-sun-line" ? "add" : "remove"](
    iconTheme
  );
}

themebutton.addEventListener("click", () => {
  document.body.classList.toggle(darkTheme);
  themebutton.classList.toggle(iconTheme);

  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

// get data of the countries

const Countries = document.querySelector(".countries");
const Search = document.querySelector(".search");
const Continent = document.querySelector(".Region");
let countriesData;

const getCountries = async () => {
  const res = await fetch("https://restcountries.com/v3.1/all");
  countriesData = await res.json();

  CountryElement(countriesData)

  localStorage.setItem("countries", JSON.stringify(countriesData));

};

// Search for countries by Name of the Country

const getCountriesBySearch = async () => {
  const countryName = Search.value;
  // const newUrl = "/" + countryName;

  const res = await fetch("https://restcountries.com/v3.1/name/" + countryName);
  countriesData = await res.json();

  Countries.innerHTML = "";

  if (Search.value === "") {
    getCountries();
  } else {
    if (!countriesData.length) {
      Countries.innerHTML = "There is no country with name: " + countryName;
      return false;
    }

    CountryElement(countriesData);
  }

  

  // history.pushState(null, null, newUrl);
};

const getCountriesByRegion = async () => {
  const FilterRegion = Continent.value;
  // const newUrl = "/" + FilterRegion;

  console.log(FilterRegion);
  const res = await fetch(
    "https://restcountries.com/v3.1/region/" + FilterRegion
  );
  countriesData = await res.json();

  Countries.innerHTML = "";

  if (FilterRegion === "") {
    getCountries();
    return;
  }
  CountryElement(countriesData);

  // history.pushState(null, null, newUrl);
};

const titleDatails = document.querySelector(".title__datail");

const CountryElement = (dataProvided) => {
  dataProvided.map((country) => {
    const Title = country.name.common;
    const flag = country.flags.png;
    const population = country.population;
    const region = country.region;
    const capital = country.capital;

    countryCard = `
        <div class="card country animate__animated animate__fadeIn">
                <div class="country__image">
                    <img src="${flag}" alt=${flag}" loading="lazy" />
                </div>
                <div class="card__info">
                    <h2 class="card__title" title=${Title}>${Title}</h2>
                    <div class="card__descrition">
                        <p><code>Population:</code> <span>${population}</span></p>
                        <p><code>Region:</code> <span>${region}</span></p>
                        <p><code>Capital:</code> <span>${
                          typeof capital !== "undefined"
                            ? capital[0]
                            : "no capital"
                        }</span></p>
                    </div>
                </div>
            </div>
    `;

    Countries.insertAdjacentHTML("beforeend", countryCard);
  });

  const card = document.querySelectorAll(".card__title");
  

  card.forEach((c) => {
    c.addEventListener("click", (e) => {
      console.log(e.target.textContent);

      localStorage.setItem("card__title", e.target.textContent)
      
      window.location.assign("/details.html")

      // titleDatails.innerHTML = localStorage.getItem("card__title");

    });
  });
};


Search.addEventListener("keyup", getCountriesBySearch);

Continent.addEventListener("change", getCountriesByRegion);

window.addEventListener("DOMContentLoaded", getCountries());
