function courseGrading() {
    let grade = "";
    let points = parseFloat(prompt("Enter your score:"));

    if(points >= 0 && points <= 39) {
        grade = 0;
    }
    if(points >= 40 && points <= 51) {
        grade = 1;
    }
    if(points >= 52 && points <= 63) {
        grade = 2;
    }
    if(points >= 64 && points <= 75) {
        grade = 3;
    }
    if(points >= 76 && points <= 87) {
        grade = 4;
    }
    if(points >= 88 && points <= 100) {
        grade = 5;
    }
    document.getElementById("result").innerHTML = grade;
    
};
courseGrading();