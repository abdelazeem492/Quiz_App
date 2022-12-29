const body = document.querySelector("body");
const toggle = document.getElementById("toggle");
const header = document.querySelector("header");

let root = document.querySelector(":root");
let rootStyles = getComputedStyle(root);
let mainColor = rootStyles.getPropertyValue("--mainColor");
let secondColor = rootStyles.getPropertyValue("--secondColor");
let whiteColor = rootStyles.getPropertyValue("--whiteColor");

toggle.onclick = () => {
  toggle.classList.toggle("active");
  if (toggle.className == "active") {
    header.classList.toggle("active");
    root.style.setProperty("--mainColor", "#eee");
    root.style.setProperty("--secondColor", "lightGray");
    root.style.setProperty("--whiteColor", "#000");
    countdownEle.style.color = "black";
  } else {
    header.className = "";
    root.style.setProperty("--mainColor", "rgb(35, 35, 35)");
    root.style.setProperty("--secondColor", "rgb(19, 19, 19)");
    root.style.setProperty("--whiteColor", "#fff");
  }
};
