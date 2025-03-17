function converter() {
    let celcius = parseFloat(prompt("Enter temperature in Celcius, to convert to Fahrenheit"));
    let fahrenheit = (celcius * 9/5) + 32;
    document.getElementById("converted").innerHTML= celcius + " celcius is "+fahrenheit + ' Fahrenheit.'
};

converter();