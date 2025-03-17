function checkTriangle() {
    let output = "";

    let first = parseFloat(prompt("Give the first side length"));
    let second = parseFloat(prompt("Give the second side length"));
    let third = parseFloat(prompt("Give the third side length"));

    if(first === second && second === third) {
        output = "Equilateral"
    }
    else if(first == second || second == third || first == third) {
        output = "Isosceles"
    }
    else if(first !== second && second !== third && first !== third) {
        output = "Scalene"
    }
    document.getElementById("result").innerHTML = output;
};
checkTriangle();