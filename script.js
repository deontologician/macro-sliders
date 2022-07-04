/** Takes in grams of Soylent and returns the amount of protein and calories */
function perGramSoylent(grams) {
    return {
        protein: grams * (13 / 60),
        calories: grams * (270 / 60),
    };
}
/** Given an amount of protein required, says how much soylent you need */
function proteinToSoylent(targetProtein) {
    return targetProtein / (13 / 60);
}

/** Given an amount of calories required, says how much soylent you need */
function caloriesToSoylent(targetProtein) {
    return targetProtein / (270 / 60);
}

/** Takes in grams of isopure and returns the amount of protein and calories */
function perGramIsopure(grams) {
    return {
        protein: grams * (25 / 29),
        calories: grams * (100 / 29),
    };
}

/** Given an amount of protein required, says how much isopure you need */
function proteinToIsopure(targetProtein) {
    return targetProtein / (25 / 29);
}

/** Given an amount of calories required, says how much isopure you need */
function caloriesToIsopure(targetCalories) {
    return targetCalories / (100 / 29);
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
    const soylentGrams = getSoylentSliderValue();
    document.getElementById("soylent-grams").innerHTML = soylentGrams;
    document.getElementById("isopure-grams").innerHTML = isoGrams;
    // store slider values in local storage
    localStorage.setItem("soylent-grams", soylentGrams);
    localStorage.setItem("isopure-grams", isoGrams);
}

/** On page load set slider values to local storage values */
function onLoad() {
    const soylentGrams = localStorage.getItem("soylent-grams");
    const isopureGrams = localStorage.getItem("isopure-grams");
    if (soylentGrams) {
        document.getElementById("soylent-slider").value = soylentGrams;
    }
    if (isopureGrams) {
        document.getElementById("isopure-slider").value = isopureGrams;
    }
    sliderChange();
}

/** Take a target protein and target calories and determine
 * the amount of soylent and isopure needed to meet the target.
 * 
 * This is a linear constraint solving problem.
 * Total protein = soylent protein + isopure protein
 * Total calories = soylent calories + isopure calories
 * Calories per gram of soylent = 100 / 29
 * Calories per gram of isopure = 270 / 60
 * Protein per gram of soylent = 13 / 60
 * Protein per gram of isopure = 25 / 29
 */
function onTargetChange() {
    console.log("Ran");
    let targetProtein = document.getElementById("protein-target").value;
    let targetCalories = document.getElementById("calories-target").value;
    console.log(`Target protein: ${targetProtein}, target calories: ${targetCalories}`);
    let soyProt = (13 / 60);
    let isoProt = (25 / 29);
    let soyCal = (270 / 60);
    let isoCal = (100 / 29);
    let soyCalProt = soyCal / soyProt;
    let isoG = (targetCalories / isoCal - ((soyCal * targetProtein) / (isoCal * soyProt))) / (1 - (soyCal * isoProt) / (isoCal * soyProt));
    let soyG = (targetProtein - isoG * isoProt) / soyProt;
    console.log(`Soylent: ${soyG} grams`);
    console.log(`Isopure: ${isoG} grams`);
    console.log(`Total protein: ${soyG * soyProt + isoG * isoProt} grams`);
    console.log(`Total calories: ${soyG * soyCal + isoG * isoCal} calories`);
    document.getElementById("soylent-slider").value = soyG;
    document.getElementById("isopure-slider").value = isoG;
    sliderChange();
}

function prettyClose(a, b) {
    return Math.abs(a - b) < 0.01;
}