function arrayPrint() {
    const fruits = ["apple", "banana", "orange", "grape", "kiwi"];
    const vegetables = [];
  
    console.log("Fruits: "+ fruits);
    console.log("Length of Fruits: "+ fruits.length);
    console.log("Element at Index 2: "+ fruits[2]);
    console.log("Last Element of Fruits: "+ fruits[fruits.length - 1])

    let vegetable1 = prompt("Enter the first vegetable");
    let vegetable2 = prompt("Enter the second vegetable");
    let vegetable3 = prompt("Enter the third vegetable");

    vegetables.push(vegetable1, vegetable2, vegetable3);

    console.log("Vegetables: "+ vegetables);
    console.log("Length of Vegetables: "+ vegetables.length)
}
arrayPrint();