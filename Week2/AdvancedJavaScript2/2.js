
import { restaurantModal, restaurantRow } from "./components.js";
import { baseUrl } from "./variables.js";
import { setDailyMenu, fetchMenu, getRestaurantsAndDisplay } from "./utils.js";

const t = document.querySelector('table');
const modal = document.querySelector('dialog');
const button = document.querySelector('button');
const infoContainer = document.querySelector('#infoContainer');
const table = document.createElement('table');
infoContainer.append(table);

const sodexoRadioButton = document.querySelector("#sodexo");
const compassRadioButton = document.querySelector("#compass");
const allRadioButton = document.querySelector("#all");

let restaurantList = [];
let menu = [];
let edellinenHighlight = "";

const handleRestaurants = async (update, arr = restaurantList) => {

  if(!update) {
    await getRestaurantsAndDisplay(restaurantList, baseUrl);
  }

  t.innerHTML = '';
  restaurantList.sort((a,b) => a.name.localeCompare(b.name));

  arr.forEach(restaurant => {
    const { address, city, company, name, phone, postalCode, _id} = restaurant;
    const row = restaurantRow(restaurant);
    t.append(row);
    row.addEventListener('click', async function() {
      
      if (edellinenHighlight) {
        edellinenHighlight.classList.remove('highLight');
      }

      await fetchMenu(menu, _id, baseUrl);
      setDailyMenu(restaurant, menu, infoContainer);

      row.classList.add('highLight', 'row');
      
      modal.showModal();
      edellinenHighlight = row;
    });
  })
}
    

//EVENT LISTENERIT
sodexoRadioButton.addEventListener('click', async function() {

  const filteredList = restaurantList.filter(element => element.company === 'Sodexo');
  console.log(filteredList);
  handleRestaurants(true, filteredList);
    console.log("Sodexo painettu")
  });

compassRadioButton.addEventListener('click', async function() {
  const filteredList = restaurantList.filter(element => element.company === 'Compass Group');
  console.log(filteredList);
  
  handleRestaurants(true, filteredList);
});

allRadioButton.addEventListener('click', function() {
  handleRestaurants(true);

});

button.addEventListener('click', function() {
  modal.close();
  edellinenHighlight.classList.remove('highLight');
});


handleRestaurants();
