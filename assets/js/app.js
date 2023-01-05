// Dark Theme

const themebutton = document.querySelector(".change__theme");
const darkTheme = "dark__theme";
const iconTheme = "ri-moon-fill";

const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

const getCurrentTheme = () => {
  document.body.classList.contains(darkTheme) ? "dark" : "light";
};

const getCurrentIcon = () => {
  themebutton.classList.contains(iconTheme) ? "ri-moon-line" : "ri-moon-fill";
};

if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themebutton.classList[selectedIcon === "ri-moon-line" ? "add" : "remove"](
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

Continent.addEventListener('change', ()=> {

    
    console.log(Continent.options[Continent.selectedIndex].textContent);
    console.log(Continent.value);

})

const getCountries = async () => {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const data = await res.json();

  CountryElement(data)
};

// Search for countries by Name of the Country

const getCountriesBySearch = async () => {
  const countryName = Search.value;

  const res = await fetch("https://restcountries.com/v3.1/name/" + countryName);
  const data = await res.json();

  Countries.innerHTML = "";

  if(Search.value === "") {
    getCountries();
  } else {
    CountryElement(data);
  }
};

const getCountriesByRegion = async () => {
    
}


const CountryElement = (dataProvided) => {

    dataProvided.map((country) => {
      const Title = country.name.common;
      const flag = country.flags.png;
      const population = country.population;
      const region = country.region;
      const capital = country.capital;

      const countryCard = `
        <div class="card country">
                <div class="country__image">
                    <img src="${flag}" alt="">
                </div>
                <div class="card__info">
                    <h2 class="card__title" title=${Title}>${
                        Title.length >= 15 ? Title.slice(0, 15).trim() + " ..." : Title
                    }</h2>
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
}

Search.addEventListener('keyup' , getCountriesBySearch)

window.addEventListener("DOMContentLoaded", getCountries());
