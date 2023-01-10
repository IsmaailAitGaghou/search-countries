// const titleDatails = document.querySelector(".title__datail");

const getDatafromlocal = () => {
  titleDatails.textContent = localStorage.getItem("card__title");
};

getDatafromlocal();


const button = document.querySelector(".button");



button.addEventListener('click' ,() => {
    window.history.back()
})