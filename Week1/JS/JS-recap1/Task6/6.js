function multiplicationTable() {
    let result = 0;
    table = document.getElementById("table");

    let userInput = parseInt(prompt("Enter a positive integer"));
    if(userInput < 0) {
       
        document.getElementById("header").innerHTML = "You must enter a positive integer.";

    } else {

        for(let i = 1; i <= userInput; i++) {
            let rows = document.createElement("tr");
           
        
            for(let j = 1; j <= userInput; j++) {
            result = i * j;
            let cells = document.createElement("td");
            cells.textContent = result;
            rows.appendChild(cells);
          
            }
            table.appendChild(rows);
        }
    }
};
multiplicationTable();