import { restaurantModal } from "./components.js";


const getDailyMenu = (restaurant, menu, infoContainer) => {  
    infoContainer.innerHTML = '';
    try {
      for (const x of menu) {
          infoContainer.insertAdjacentHTML("beforeend", restaurantModal(x, restaurant));
      }
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
        return restaurantList;
    } catch (error) {
        console.log(error.message);
    }
}

export {getDailyMenu, fetchMenu, getRestaurantsAndDisplay}