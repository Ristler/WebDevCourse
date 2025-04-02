const restaurantRow = (restaurant) => {

    const { company, name} = restaurant;
    const row = document.createElement('tr');
    row.innerHTML = `${company}, ${name}`;
    return row;
}
const restaurantModal = (menu, restaurant) => {
  
    const { address, city, company, name, phone, postalCode, _id} = restaurant;
    const { courses } = menu;

      let menuHtml = `
      <h1>${name}</h1>
      <h3>${address}</h3>
      <h3>${city}</h3>
      <h3>${postalCode}</h3>
      <h3>${phone}</h3>
      <table>`

    courses.forEach(element => {
        menuHtml +=  
        `
        <tr>
        <td>
           ${element.name} 
        </td>
        </tr>
        `;    
    });
    menuHtml += `</table>`;
    return menuHtml;
} 
export { restaurantRow, restaurantModal };


