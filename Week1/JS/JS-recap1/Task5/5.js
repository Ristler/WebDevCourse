function sum() {
    let output = "";
    let sum = 0;
    let value = parseInt(prompt("Give a positive integer"));

    if(value < 0) {
        output = "Give a positive integer..";
    } else {
        for(let i = 1; i <= value; i++) {
            sum+=i;
        }
        output = sum;
    }
    document.getElementById("result").innerHTML = output;
};
sum();