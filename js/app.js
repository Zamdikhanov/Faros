wrapSize();

function wrapSize() {
    let wrap = document.querySelectorAll('.wrap--center');
    let wrapSelectors = document.querySelectorAll('input[name="wrap-selector"]');

    for (let wrapSelector of wrapSelectors) {
        wrapSelector.addEventListener("change", () => {
            if (wrapSelector.value === "center") {
                for (let wr of wrap) { wr.classList.remove('wrap--full') };
            }
            if (wrapSelector.value === "full") {
                for (let wr of wrap) { wr.classList.add('wrap--full') };
            }
        })
    }
}

window.onscroll = function() { menuSticky() };

let nav = document.getElementsByClassName("nav");
let filterMenu = document.querySelector(".filter");
let sticky = nav[0].offsetTop;

function menuSticky() {
    if (window.pageYOffset >= sticky) {
        nav[0].classList.add("nav--sticky");
        filterMenu.classList.add("nav--sticky2");
    } else {
        nav[0].classList.remove("nav--sticky");
        filterMenu.classList.remove("nav--sticky2");
    }
    // console.log("scroll", window.pageYOffset);
    // console.log("sticky", sticky);
}

const cards = document.querySelectorAll('.js-card');
cards.forEach(card => card.addEventListener('mouseenter', (() => sliderHover(card))));

function sliderHover(card) {
    slider = card.querySelector('.slider-hover');
    if (slider.classList.contains("slider-hover--activated")) return 1;
    slider.classList.add("slider-hover--activated");
    const imgAll = slider.querySelectorAll("img");
    const hoverArea = document.createElement('div');
    hoverArea.classList.add("slider-hover__area");
    slider.append(hoverArea);
    for (let i = 0, length = imgAll.length; i < length; i++) {
        hoverArea.insertAdjacentHTML("beforeEnd", `<div class="slider-hover__box"></div>`);
    }
    const hoverBoxes = hoverArea.querySelectorAll('.slider-hover__box');
    hoverBoxes.forEach((hoverBox, index) => hoverBox.addEventListener('mouseenter', (() => sliderImgActivate(index, imgAll))));
}

function sliderImgActivate(count, imgArray) {
    imgArray.forEach(img => img.classList.remove('slider-hover__img--active'));
    imgArray[count].classList.add('slider-hover__img--active');
}


const filterGroup = document.querySelectorAll('.filter__btn-group');
let arraySelectedFilters = [];
for (let i = 0; i < filterGroup.length; i++) {
    arraySelectedFilters.push('');
}

let filtersButtons = [];
filterGroup.forEach((group, index) => {
    filtersButtons[index] = group.querySelectorAll('.filter__btn')
});

for (let i = 0; i < arraySelectedFilters.length; i++) {
    filtersButtons[i].forEach(button => {
        button.addEventListener('click', (() => clickbutton(i, button)))
    });
}

function clickbutton(filterIndex, button) {
    if (button.dataset.filter == "all") {
        arraySelectedFilters[filterIndex] = "";
    } else {
        arraySelectedFilters[filterIndex] = button.dataset.filter;
    }
    filtersButtons[filterIndex].forEach(button => button.classList.remove('active'));
    button.classList.add('active');
    console.log(arraySelectedFilters[filterIndex]); //////
    showSelection();
}


function showSelection() {
    cards.forEach(card => card.classList.add('luminaire-card--hide'));
    cards.forEach(card => {
        let matches = 0;
        for (let i = 0; i < arraySelectedFilters.length; i++) {
            if (card.dataset.properties.includes(arraySelectedFilters[i])) {
                matches++;
            } else continue;
        }
        if (matches === arraySelectedFilters.length) {
            card.classList.remove('luminaire-card--hide');
        }
    });

}


function test(text) {
    console.log(text);
}


const buttonsDetails = document.querySelectorAll(".b-details");
buttonsDetails.forEach(buttonDetails => {
    buttonDetails.addEventListener('click', (event) => showDetails(event));
});

function showDetails(event) {
    event.target.classList.toggle("active");
    const card = event.target.closest('.luminaire-card__inner');
    card.querySelector('.luminaire-card__specifications').classList.toggle("details--hide");
    setTimeout(() => card.classList.toggle("luminaire-card__inner--full"), 0);
}

const navBurger = document.querySelector('.nav-burger');
const navBody = document.querySelector('.nav-body');
navBurger.addEventListener('click', function(e) {
    document.body.classList.toggle('body--lock');
    navBurger.classList.toggle('menu-button--active');
    navBody.classList.toggle('menu-body--active');
})

const filter = document.querySelector('.btn-filter-show');
const filterBody = document.querySelector('.filter');
filter.addEventListener('click', function(e) {
    document.body.classList.toggle('body--lock');
    filter.classList.toggle('menu-button--active');
    filterBody.classList.toggle('menu-body--active');
})