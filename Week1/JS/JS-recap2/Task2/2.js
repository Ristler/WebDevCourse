function arrayOperations() {
    const numbers = [];

    let n1 = parseInt(prompt("Enter first number"));
    let n2 = parseInt(prompt("Enter second number"));
    let n3 = parseInt(prompt("Enter third number"));
    let n4 = parseInt(prompt("Enter fourth number"));
    let n5 = parseInt(prompt("Enter fifth number"));

    numbers.push(n1, n2, n3, n4, n5);

    console.log("Numbers: "+ numbers)

    let find = parseInt(prompt("Search for a number in the array"));

    if(numbers.includes(find)) {
        console.log("Number "+ find + " is found in the array.");
    } else {
        console.log("Number "+ find + " is not found in the array.");
    }
    numbers.pop();
    console.log("Updated Numbers: "+ numbers);
    numbers.sort((a,b) => a-b);
    console.log("Sorted Numbers: "+ numbers);

};

arrayOperations();