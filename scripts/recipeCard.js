const input = document.querySelector('.search');
const searchbar = document.querySelector('.searchbar');
const output = document.querySelector('.tags');
const recipeNotFound = document.querySelector('.recipeNotFound');
const recipeList = document.querySelector('.recipeList');

console.log(recipes);

// Function to create the search tags
function outputTag() {
    const tagFormat = input.value;
    const tag = `
        <span class="tag">
            <b>${tagFormat}</b>
            <span class="remove-btn">
                <i class="fa-solid fa-xmark"></i>
            </span>
        </span>`;
    output.innerHTML += tag;
    input.value = "";
}

function sanitizeInput(input) {
    const sanitized = input.replace(/[^a-zA-Z0-9\sàâäéèêëîïôöùûüç,.'-]/g, '');
    return sanitized.trim();
}

// Add event listener to input for filtering and tag creation
input.addEventListener('input', function(event) {
    const inputValue = sanitizeInput(input.value);
    input.value = inputValue;
    if (inputValue.length >= 3) {
        filterCards();
        searchFailed(inputValue);  // Pass the current input value
    }
});

// Handle search input and create tags
function handleSearch() {
    const inputValue = sanitizeInput(input.value.trim());
    if (inputValue !== "") {
        outputTag();
        filterCards();
        searchFailed(inputValue);  // Pass the current input value
    }
}

// Event listener for the Enter key press
input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        handleSearch();
    }
});

// Event listener for the click on the search button
document.querySelector('.searchBtn').addEventListener('click', function(event) {
    event.preventDefault();
    handleSearch();
});

// Toggle dropdown menus and search within them
document.addEventListener('DOMContentLoaded', function() {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(function(toggle) {
        let isOpen = false;
        toggle.addEventListener('click', function() {
            const chevron = toggle.querySelector('.fa-chevron-down');
            const menu = toggle.nextElementSibling;
            isOpen ? menu.classList.remove('show') : menu.classList.add('show');
            isOpen ? chevron.classList.remove('rotate180') : chevron.classList.add('rotate180');
            isOpen = !isOpen;
        });
        document.addEventListener('click', function(event) {
            if (!toggle.contains(event.target)) {
                const chevron = toggle.querySelector('.fa-chevron-down');
                const menu = toggle.nextElementSibling;
                menu.classList.remove('show');
                chevron.classList.remove('rotate180');
                isOpen = false;
            }
        });
    });
});

// Remove tags on click
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('fa-xmark')) {
        e.target.closest('.tag').remove();
        filterCards();
        searchFailed(input.value.trim().toLowerCase());  // Pass the current input value
    }
});

// RecipeCard class to generate card HTML
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
                        <h3>INGRÉDIENTS</h3>
                        <div class="ingredient-container">
                            <div class="ingredient-list">`;
        this.ingredients.forEach(ingredient => {
            cardHTML += `
                <div class="ingredient">
                    <div class="ingredient-name">${ingredient.ingredient}</div>
                    <div class="ingredient-details">${ingredient.quantity ? `${ingredient.quantity} ${ingredient.unit || ''}` : ''}</div>
                </div>`;
        });
        cardHTML += `</div></div></div></div></div>`;
        return cardHTML;
    };
}

// Filter function for dropdown menus
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
dropdownToggles.forEach(dropdownToggle => {
    const dropdownMenu = dropdownToggle.nextElementSibling;
    const dropdownSearchInput = dropdownMenu.querySelector('.dropdown-search');
    const dropdownItems = dropdownMenu.querySelectorAll('li:not(:first-child)');

    dropdownToggle.addEventListener('click', function() {
        dropdownMenu.classList.toggle('show');
    });

    dropdownSearchInput.addEventListener('input', function() {
        const searchValue = sanitizeInput(dropdownSearchInput.value);
        dropdownSearchInput.value = searchValue;
        if (searchValue.length >= 3) {
            dropdownItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                item.style.display = text.includes(searchValue) ? 'block' : 'none';
            });
            dropdownMenu.classList.add('show');
        } else {
            dropdownItems.forEach(item => {
                item.style.display = 'block';
            });
            dropdownMenu.classList.remove('show');
        }
    });

    dropdownItems.forEach(li => {
        li.addEventListener('click', function() {
            const tagText = this.textContent.trim();
            const tag = document.createElement('span');
            tag.classList.add('tag');
            tag.innerHTML = `<b>${tagText}</b><span class="remove-btn"><i class="fa-solid fa-xmark"></i></span>`;
            output.appendChild(tag);
            filterCards();
            searchFailed(input.value.trim().toLowerCase());  // Pass the current input value
        });
    });
});

// Filter cards based on tags
function filterCards() {
    const tags = Array.from(document.querySelectorAll('.tag')).map(tag => tag.textContent.trim().toLowerCase());
    const cards = document.querySelectorAll('.card');
    let count = 0;
    cards.forEach(card => {
        const cardName = card.querySelector('.card-title').textContent.trim().toLowerCase();
        const cardDescription = card.querySelector('.card-text').textContent.trim().toLowerCase();
        const cardIngredients = Array.from(card.querySelectorAll('.ingredient')).map(ingredient => ingredient.textContent.trim().toLowerCase());
        const cardContent = [cardName, cardDescription, ...cardIngredients];
        const matchesAnyTag = tags.every(tag => cardContent.some(content => content.includes(tag)));
        card.style.display = matchesAnyTag ? 'block' : 'none';
        if (card.style.display !== 'none') {
            count++;
        }
    });
    updateCountDisplay(count);
}

// Display error message if no recipe is found
function searchFailed(searchValue) {
    const recipeCount = document.querySelectorAll('.card[style="display: block;"]').length;
    if (recipeCount === 0) {
        recipeNotFound.textContent = `Aucune recette ne contient "${searchValue}", vous pouvez chercher « Tarte aux pommes », « poisson », etc.`;
        recipeNotFound.style.display = 'block';
    } else {
        recipeNotFound.style.display = 'none';
    }
}

// Observe changes in the output container
function observeOutputChanges() {
    const observer = new MutationObserver(filterCards);
    observer.observe(output, { childList: true });
}
observeOutputChanges();

// Create and display recipe cards
document.addEventListener('DOMContentLoaded', function() {
    recipes.forEach(recipe => {
        recipe.image = `assets/images/${recipe.image}`;
        const card = new RecipeCard(recipe);
        const cardHTML = card.generateCardHTML();
        recipeList.innerHTML += cardHTML;
    });
    displayMaxRecipes();
});

// Display the total number of recipes
function displayMaxRecipes() {
    const maxRecipeCount = document.querySelectorAll('.card').length;
    updateCountDisplay(maxRecipeCount);
}

// Update the recipe count display
function updateCountDisplay(count) {
    const recipeCountDisplay = document.querySelector('.recipeCountDisplay');
    recipeCountDisplay.textContent = `${count} recettes`;
}
