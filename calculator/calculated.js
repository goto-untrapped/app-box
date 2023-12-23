// for calclation
var Operations;
(function (Operations) {
    Operations["initialized"] = "";
    Operations["plus"] = "+";
})(Operations || (Operations = {}));
var calcMode = Operations.initialized;
function calcModeIsInitialized() {
    calcMode = Operations.initialized;
}
function calcModeIsPlus() {
    calcMode = Operations.plus;
}
// record former display number
var formerNumber = 0;
// set number to display
document.querySelectorAll(".input-number").forEach(function (button) {
    button.addEventListener("click", function (event) {
        var target = event.currentTarget;
        if (calcMode != Operations.initialized) {
            clearDisplay();
        }
        var inputNumber = target.textContent;
        displayAddedNumber(inputNumber);
    });
});
// plus
document.getElementById("plus").addEventListener("click", function () {
    var display = numberDisplay();
    formerNumber = Number(display.textContent);
    calcModeIsPlus();
});
// equal
document.getElementById("equal").addEventListener("click", function () {
    if (calcMode = Operations.plus) {
        displayPlusedNumber();
    }
    calcModeIsInitialized();
});
function displayPlusedNumber() {
    var display = numberDisplay();
    var calcedNumber = formerNumber + Number(display.textContent);
    var calcedNumberStr = calcedNumber.toString();
    displayNumber(calcedNumberStr);
}
function displayNumber(inputNumber) {
    var display = numberDisplay();
    display.textContent = inputNumber;
}
function displayAddedNumber(inputNumber) {
    var display = numberDisplay();
    display.textContent += inputNumber;
}
function clearDisplay() {
    var display = numberDisplay();
    display.textContent = "";
}
function numberDisplay() {
    return document.querySelector('span[name="displayed"]');
}
