//Fetch date from the json file

// async function fetchRecipes() {
//     try {
//         // Import recipes from the recipes.js file
//         const { recipes } = await import('../assets/data/recipes.js');
//         console.log(recipes);
//         return recipes;
        
//     } catch (error) {
//         console.error('Error fetching recipes:', error);
//         return null;
//     }
// }

//import { recipes } from '../assets/data/recipes.js';

const input = document.querySelector('.search');
const searchbar = document.querySelector('.searchbar');
const output = document.querySelector('.tags');
const max = document.querySelector('.max');


console.log(recipes);


//function ot create the search tags
function outputTag () {
    //Create the tag element, insert its input value
    const tagFormat = input.value;
    const tag = `<span class="tag">
    <b>${tagFormat}</b>
    <span class="remove-btn">
        close
    </span>
    </span>`;

    //output the tag
    output.innerHTML += tag;

    //clear the input
    input.value = "";

}


//Add a submit event to the form and prevents default behavior.
searchbar.addEventListener('submit', e => {
    //check if input is empty
    if(input.value === "") {
        //Prevent default form behavior
        e.preventDefault();
    }
    //limit the number of tags to 5
    else if(output.children.length >= 4) {
        //Run the outputTag function
        outputTag();
        //disable the output {
            input.disabled = true;
        //Modify placeholder text
            input.placeholder = "Nombre maximum de critère de filtrage atteint.";
        }
    else {
        //Run the outputTag function
        outputTag();
        //Prevent default form behavior
        e.preventDefault();
    }
});


//Function to close the tags
window.addEventListener('click', e => {
    if (e.target.classList.contain('remove-btn')) {
        e.target.patentElement.remove ();
        //disable the output {
            input.disabled = false;
        //Modify placeholder text
        input.placeholder = "Ajouter un critère"; 

    }
})



//Create the recipe cards


function RecipeCard(recipe) {
    this.id = recipe.id;
    this.image = recipe.image;
    this.name = recipe.name;
    this.servings = recipe.servings;
    this.ingredients = recipe.ingredients;
    this.time = recipe.time;
    this.description = recipe.description;
    this.appliance = recipe.appliance;
    this.ustensils = recipe.ustensils;

    // Method to generate HTML for the card
    this.generateCardHTML = function() {
        let cardHTML = `
            <div class="card">
                <img src="${this.image}" alt="${this.name}" class="card-img-top">
                <div class="card-content">
                    <p class="card-time">${this.time}min</p>
                    <div class="card-body">
                        <h2 class="card-title">${this.name}</h2>
                        <h3 class="rubrique">RECETTE</h3>
                        <p class="card-text">${this.description}</p>
                        
                        <h3>INGREDIENTS</h3>
                        <div class="ingredient-columns">`;

        // Start first column
        cardHTML += `<div class="ingredient-column">`;

        // Add ingredients to the first column
        cardHTML += `<ul class="ingredient-list">`;
        this.ingredients.forEach((ingredient, index) => {
            // Check if it's time to start the second column
            if (index === Math.ceil(this.ingredients.length / 2)) {
                cardHTML += `</ul></div><div class="ingredient-column"><ul class="ingredient-list">`;
            }
            cardHTML += `<li>${ingredient.ingredient}${ingredient.quantity ? `: ${ingredient.quantity}` : ''}${ingredient.unit ? ` ${ingredient.unit}` : ''}</li>`;
        });
        cardHTML += `</ul></div></div></div></div></div>`;

        return cardHTML;
    };
}




// Search function

function filterCards() {
    const tags = Array.from(document.querySelectorAll('.tag')).map(tag => tag.textContent.trim());
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const cardText = card.querySelector('.card-text').textContent.trim().toLowerCase();
        const matchesAllTags = tags.every(tag => cardText.includes(tag.toLowerCase()));
        card.style.display = matchesAllTags ? 'block' : 'none';
    });
}

// Add an event listener to the output container to call the filter function whenever tags are added or removed
output.addEventListener('DOMNodeInserted', filterCards);
output.addEventListener('DOMNodeRemoved', filterCards);



document.addEventListener('DOMContentLoaded', function() {
    const recipeList = document.querySelector('.recipeList');
    recipes.forEach(recipe => {
        recipe.image = `assets/images/${recipe.image}`;

        const card = new RecipeCard(recipe);
        const cardHTML = card.generateCardHTML();
        recipeList.innerHTML += cardHTML;
    });
});

