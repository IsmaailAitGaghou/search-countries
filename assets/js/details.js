

const getDatafromlocal = () => {
  //   titleDatails.textContent = localStorage.getItem("country");

  console.log(localStorage.getItem("country"));
};

getDatafromlocal();


const button = document.querySelector(".button");



button.addEventListener('click' ,() => {
    window.history.back()
})