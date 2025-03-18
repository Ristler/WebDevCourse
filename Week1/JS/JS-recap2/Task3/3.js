function numbersPrint() {
    const numbers = [];
    const evenNumbers = [];
    let ok = true;
    let whatToRender;

    while(ok) {
        const input = prompt("Enter a number (or 'done' to finish: ");

        if(input == "done") {
            ok = false;
        
            for(let i = 0; i <= numbers.length; i++) {
                if(numbers[i] % 2 == 0) {
                    evenNumbers.push(numbers[i]);
                
                }
            }
        } else {
            numbers.push(input);
        }
    }
    if(evenNumbers.length == 0) {
        whatToRender = "None";
    } else if(evenNumbers.length != 0) {
        whatToRender = evenNumbers;

    }
    document.getElementById("numbers").innerHTML = "Even Numbers: "+ whatToRender;
}
numbersPrint();