
const t = document.querySelector('table');
const modal = document.querySelector('dialog');
const button = document.querySelector('button');

const infoContainer = document.querySelector('#infoContainer');
const table = document.createElement('table');
infoContainer.append(table);

let restaurantList = [];
let menu = [];
let edellinenHighlight = "";

function getDailyMenu() {

  infoContainer.innerHTML = '';  
  const table = document.createElement('table'); 
  infoContainer.append(table);

  try {
    for (const x of menu) {
      for (const name of x.courses) {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.textContent = name.name;
        row.appendChild(cell);
        table.appendChild(row); 
      }
    }
  } catch (error) {
      console.log(error.message);
  }
}

async function fetchMenu(id) {
  menu.splice(0, menu.length);
  try {
      const response = await fetch(`https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants/daily/${id}/fi`);
      if(!response.ok) throw new Error('Invalid input');
      const jsonData = await response.json();
      menu.push(jsonData);
  } catch (error) {
      console.log(error.message);
  }
}

async function getRestaurantsAndDisplay() {
  try {
      const response = await fetch('https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants');
      if(!response.ok) throw new Error('Invalid input');
      const jsonData = await response.json();
      restaurantList.push(...jsonData);
      //console.log(restaurantList)
  } catch (error) {
      console.log(error.message);
  }


  restaurantList.sort((a,b) => a.name.localeCompare(b.name));

for(const restaurant of restaurantList) {  
  const tr = document.createElement("tr");
  tr.textContent = restaurant.name;
  t.append(tr);
  tr.addEventListener('click', async function() {
    
    if (edellinenHighlight) {
      edellinenHighlight.classList.remove('highLight');
    }
    await fetchMenu(restaurant._id);

    getDailyMenu();
  
    tr.classList.add('highLight');
    document.querySelector('#restaurantName').textContent = restaurant.name;
    document.querySelector('#restaurantAddress').textContent = restaurant.address;
    document.querySelector('#restaurantCity').textContent = restaurant.city;
    document.querySelector('#restaurantPostal').textContent = restaurant.postalCode;
    document.querySelector('#restaurantNumber').textContent = restaurant.phone;
    document.querySelector('#restaurantCompany').textContent = restaurant.company;
   
    modal.showModal();
    edellinenHighlight = tr;
 
  })}

  button.addEventListener('click', function(){
    modal.close();
    edellinenHighlight.classList.remove('highLight');
  })
}


getRestaurantsAndDisplay();
