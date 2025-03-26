const insert = document.querySelector("#target");
const browserInfo = document.createElement("p");
const platform = document.createElement("p");
const screenSize = document.createElement("p");
const availScreenSize = document.createElement("p");
const currentDateTime = document.createElement("p");

//LOCALIZATION -> 1. helmikuuta 2056 DATE FORMAT
const date = new Date();
const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

browserInfo.textContent = navigator.userAgent;
platform.textContent = navigator.platform;

screenSize.textContent = "Screen width: "+ screen.width + "px, " + "height: "+screen.height + "px";
availScreenSize.textContent = "Available width: "+window.innerWidth + "px, "+ " height: "+window.innerHeight + "px ";

currentDateTime.textContent = date.toLocaleString("fi-FI", options);

insert.appendChild(browserInfo);
insert.appendChild(platform);
insert.appendChild(screenSize);
insert.appendChild(availScreenSize);
insert.appendChild(currentDateTime)

