function multiplicationTable() {
    let result = 0;
    let table = document.getElementById("table");

    let userInput = parseInt(prompt("Enter a positive integer"));
    if(userInput < 0) {
        prompt("You must enter a positive integer! Otherwise i cannot calculate.");
    } else {

        for(let i = 1; i <= userInput; i++) {
            for(let j = 1; j <= userInput; j++) {
            result = i * j;

        
            console.log(i + ' times ' + j + ' is ' + result + ".");



            }
            

        }
    }
};
multiplicationTable();