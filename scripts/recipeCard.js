//Fetch date from the json file

async function fetchRecipes() {
    try {
        // Import recipes from the recipes.js file
        const { recipes } = await import('../assets/json/recipes.js');
        return recipes;
    } catch (error) {
        console.error('Error fetching recipes:', error);
        return null;
    }
}

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
                <div class="card-body">
                    <h2 class="card-title">${this.name}</h5>
                    <p class="card-text">Servings: ${this.servings}</p>
                    <p class="card-text">Time: ${this.time} minutes</p>
                    <p class="card-text">Description: ${this.description}</p>
                    <p class="card-text">Appliance: ${this.appliance}</p>
                    <p class="card-text">Ustensils: ${this.ustensils.join(', ')}</p>
                    <h6>Ingredients:</h6>
                    <ul>`;
        this.ingredients.forEach(ingredient => {
            cardHTML += `
                        <li>${ingredient.quantity ? ingredient.quantity : ''} ${ingredient.unit ? ingredient.unit : ''} ${ingredient.ingredient}</li>`;
        });
        cardHTML += `
                    </ul>
                </div>
            </div>`;
        return cardHTML;
    };
}

document.addEventListener('DOMContentLoaded', function() {
    fetchRecipes().then(recipes => {
        if (recipes) {
            recipes.forEach(recipe => {
                // Adjust image URL path
                recipe.image = `assets/images/${recipe.image}`;

                const card = new RecipeCard(recipe);
                const cardHTML = card.generateCardHTML();
                document.getElementById('recipeCards').innerHTML += cardHTML;
            });
        }
    });
});