function calcDistance() {
    let x1 = parseFloat(prompt("Enter x1 coordinates"));
    let y1 = parseFloat(prompt("Enter y1 coordinates"));

    let x2 = parseFloat(prompt("Enter x2 coordinates"));
    let y2 = parseFloat(prompt("Enter y2 coordinates"));

    let result = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    document.getElementById("result").innerHTML= "Distance: "+ result;
};
calcDistance();