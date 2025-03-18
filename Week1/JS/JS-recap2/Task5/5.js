const nmbrs = [1, 2, 3, 4, 5];


function sortArray(numbers, option) {

    if(option == "asc") {
        console.log("Ascending option choosed.");
        numbers.sort((a,b) => a-b);
        console.log(numbers);

    } else if(option == "desc") {
        console.log("Descending option choosed");
        numbers.sort((a,b) => b-a);
        console.log(numbers)
    } 
}
sortArray(nmbrs, "asc");