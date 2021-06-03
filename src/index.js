import './sass/styles.scss';
import countryCardTmpl from './templates/country-cards.hbs';
import countryListTmpl from './templates/several-countries.hbs';
import API from './js/fetchCountries';
import getRefs from './js/get-refs';
import debounce from 'lodash.debounce';
import { alert, Stack } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';

const refs = getRefs();

refs.input.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
    refs.cardContainer.innerHTML = "";
    const searchQuery = e.target.value;
    if (searchQuery === "") {
        return;
    }
    API.fetchCountries(searchQuery)
        .then(searchCheck)
        .catch(onFetchError);
};

function searchCheck(country) {
    if (country.length === 1) {
        renderCountryCard(country);
        return;
    };
            
    if (country.length <= 10 && country.length > 1) {
        renderCountryList(country);
        return;
    };

    if (country.length > 10) {
        alert({
            text: "Too many matches found. Please enter a more specific query!",
            hide: true,
            delay: 500,
            styling: 'brighttheme',
            // stack: new Stack({
            //     maxOpen: 1,
            //     dir1: 'up',
            //     dir2: 'right',
            //     firstpos1: 100,
            //     firstpos2: 100,
            //     context: document.querySelector('body'),
            // })
        });
    return;
    };
};

function renderCountryCard(country) {
    const markupCard = countryCardTmpl(country);
    refs.cardContainer.innerHTML = markupCard;
};

function renderCountryList(country) {
    const markupList = countryListTmpl(country);
    refs.cardContainer.innerHTML = markupList;
};

function onFetchError(err) {
    alert({
        text: `Шопопало`,
        hide: true,
        delay: 1000,
    });
};