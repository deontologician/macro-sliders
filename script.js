/** Takes in grams of Soylent and returns the amount of protein and calories */
function perGramSoylent(grams) {
    return {
        protein: grams * (13 / 60),
        calories: grams * (270 / 60),
    };
}

/** Takes in grams of isopure and returns the amount of protein and calories */
function perGramIsopure(grams) {
    return {
        protein: grams * (25 / 29),
        calories: grams * (100 / 29),
    };
}

/** Adds two protein calorie objects */
function addProteinCalories(pa1, pa2) {
    return {
        protein: pa1.protein + pa2.protein,
        calories: pa1.calories + pa2.calories,
    };
}

/** Get the #isopure-slider value */
function getIsopureSliderValue() {
    return document.getElementById("isopure-slider").value;
}

/** Get the #soylent-slider value */
function getSoylentSliderValue() {
    return document.getElementById("soylent-slider").value;
}

/** When a slider changes, update the protein and calorie totals */
function sliderChange() {
    const isoGrams = getIsopureSliderValue();
    let isoValue = perGramIsopure(isoGrams);
    const soylentGrams = getSoylentSliderValue();
    let soylentValue = perGramSoylent(soylentGrams);
    let total = addProteinCalories(isoValue, soylentValue);
    document.getElementById("protein-output").innerHTML = total.protein.toFixed(2);
    document.getElementById("calories-output").innerHTML = total.calories.toFixed(2);
    document.getElementById("soylent-grams").innerHTML = soylentGrams;
    document.getElementById("isopure-grams").innerHTML = isoGrams;
}
