
import { restaurantModal, restaurantRow } from "./components.js";
import { baseUrl } from "./variables.js";
import { getDailyMenu, fetchMenu, getRestaurantsAndDisplay } from "./utils.js";

const t = document.querySelector('table');
const modal = document.querySelector('dialog');
const button = document.querySelector('button');
const infoContainer = document.querySelector('#infoContainer');
const table = document.createElement('table');
infoContainer.append(table);

let restaurantList = [];
let menu = [];
let edellinenHighlight = "";


const handleRestaurants = async () => {
  await getRestaurantsAndDisplay(restaurantList, baseUrl);
  restaurantList.sort((a,b) => a.name.localeCompare(b.name));

  for(const restaurant of restaurantList) {
    const { address, city, company, name, phone, postalCode, _id} = restaurant;
    const row = restaurantRow(restaurant);
    t.append(row);
    row.addEventListener('click', async function() {
      
      if (edellinenHighlight) {
        edellinenHighlight.classList.remove('highLight');
      }

      await fetchMenu(menu, _id, baseUrl);
      getDailyMenu(restaurant, menu, infoContainer);

      row.classList.add('highLight');
      modal.showModal();
      edellinenHighlight = row;
    });
  }
  
  button.addEventListener('click', function() {
    modal.close();
    edellinenHighlight.classList.remove('highLight');
  });
}


handleRestaurants();
