// Dark Theme

const themebutton = document.querySelector('.change__theme')
const darkTheme = 'dark__theme'
const iconTheme = 'ri-moon-fill'

const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

const getCurrentTheme = () => {
    document.body.classList.contains(darkTheme) ? 'dark' : 'light'
}

const getCurrentIcon = () => {
    themebutton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-moon-fill'
}

if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themebutton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}

themebutton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme)
    themebutton.classList.toggle(iconTheme)

    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

// get data of the countries
const Countries = document.querySelector('.countries')

const getCountries = async () => {

    const res = await fetch('https://restcountries.com/v3.1/all')
    const data = await res.json()

    for (let i = 0; i < data.length; i++) {
        const country = data[i];
        const countryName = country.name.common;
        const flag = country.flags.svg
        const population = country.population
        const region = country.region
        const capital = country.capital


        Countries.innerHTML += `
            <div class="card country">
                <div class="country__image">
                    <img src="${flag}" alt="">
                </div>
                <div class="card__info">
                    <h2 class="card__title">${countryName}</h2>
                    <div class="card__descrition">
                        <p><code>Population:</code> <span>${population}</span></p>
                        <p><code>Region:</code> <span>${region}</span></p>
                        <p><code>Capital:</code> <span>${capital}</span></p>
                    </div>
                </div>
            </div>
        `;
    }

}

getCountries()

