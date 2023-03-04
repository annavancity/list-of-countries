const countriesElem = document.querySelector(".countries");
const search = document.querySelector("#search");
const btn = document.querySelector("#btn");
const filter = document.querySelector("#filter");
const dropDownBtn = document.querySelector(".dropDownBtn");
const dropDown = document.querySelector(".dropDown");
const drop = document.querySelector(".drop");
const region = document.querySelectorAll(".region");
const regionName = document.getElementsByClassName("regionName");
const countryName = document.getElementsByClassName("countryName");
const darkMode = document.querySelector(".darkMode");
const container = document.querySelector(".container");
const header = document.querySelector(".header");
const loader = document.querySelector(".loader");

const hidePreloader = () => {
    loader.classList.add("disappear");
}

async function getCountry() {
    const url = await fetch("https://restcountries.com/v3.1/all");
    const res = await url.json();
    if (res) {
        hidePreloader();
        res.forEach(element => {
            showCountry(element);
        });
    }
}

getCountry()

const showCountry = (data) => {
    const country = document.createElement("div")
    country.classList.add("country-container")
    country.innerHTML = `<div id="flag"> <img src = "${data.flags.svg}" alt="flag"></div>
    <div class="country-info">
    <h4 class="countryName">${data.name.common}</h4>
    <p> <b>Population: </b> ${data.population}</p>
    <p class="regionName"> <b>Region: </b> ${data.region}</p>
    <p> <b>Capital: </b> ${data.capital}</p>
    </div>`
    countriesElem.appendChild(country);
}

const toggleDropDownMenu = () => {
    drop.classList.toggle("hideDropDown");
}

dropDownBtn.addEventListener('click', toggleDropDownMenu)
dropDown.addEventListener('click', toggleDropDownMenu)

region.forEach(element => {
    element.addEventListener("click", () => {
        toggleDropDownMenu();
        [...regionName].map(elem => {
            const isElementDisplayed = elem.innerText.includes(element.innerText) || element.innerText === "All";
            elem.parentElement.parentElement.style.display = isElementDisplayed? "flex" : "none";
            return elem;
        })
    })   
})

const getInfo = () => {
    Array.from(countryName).forEach(elem => {
        const isElementDisplayed = elem.innerText.toLowerCase().includes(search.value.toLowerCase());
        elem.parentElement.parentElement.style.display = isElementDisplayed? "flex" : "none";
    })
}

btn.addEventListener('click', getInfo)
search.addEventListener('keypress',(e) => {
    if (e.keyCode === 13) {
        getInfo();
    }
})

const darkModeToggle = () => {
    document.body.classList.toggle("dark");
    container.classList.toggle("container-dark");
    header.classList.toggle("header-dark");
}

darkMode.addEventListener ("click", darkModeToggle)