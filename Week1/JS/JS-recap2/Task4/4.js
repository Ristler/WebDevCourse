const nmbrs = [10, 5, 200, 40];


function sortArray(numbers) {
    console.log("Original array: "+ numbers);
    numbers.sort((a,b) => a-b);
    console.log("Sorted array: "+ numbers);
    
}
sortArray(nmbrs);