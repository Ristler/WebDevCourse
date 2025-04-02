import { restaurantModal } from "./components.js";

const setDailyMenu = (restaurant, menu, infoContainer) => {  
    infoContainer.innerHTML = '';
    try {
      menu.forEach(element => {
        infoContainer.insertAdjacentHTML("beforeend", restaurantModal(element, restaurant));
      })
    } catch (error) {
        console.log(error.message);
    }
  }

  const fetchMenu = async (menu, id, baseUrl) => {
    menu.splice(0, menu.length);
    try {
        const response = await fetch(`${baseUrl}daily/${id}/fi`);
        if(!response.ok) throw new Error('Invalid input');
        const jsonData = await response.json();
        menu.push(jsonData);
    } catch (error) {
        console.log(error.message);
    }
  }

const getRestaurantsAndDisplay = async (restaurantList, baseUrl) => {

    try {
        const response = await fetch(`${baseUrl}`);
        if(!response.ok) throw new Error('Invalid input');
        const jsonData = await response.json();
        restaurantList.push(...jsonData);
        console.log(restaurantList)
        return restaurantList;
    } catch (error) {
        console.log(error.message);
    }
}

export {setDailyMenu, fetchMenu, getRestaurantsAndDisplay}