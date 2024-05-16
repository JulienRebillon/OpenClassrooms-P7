//Fetch date from the json file



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
        <i class="fa-solid fa-xmark"></i>
    </span>
    </span>`;

    //output the tag
    output.innerHTML += tag;

    //clear the input
    input.value = "";

}


//Add a submit event to the form and prevents default behavior.


// Add an input event listener to the search input field for 3 characters+ filtering
input.addEventListener('input', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    
    const inputValue = input.value.trim().toLowerCase();
    
    // Check if the input value has at least 3 characters
    if (inputValue.length >= 3) {
        // Execute search function
        filterCards(inputValue);
    }
});

// Add an input event listener to the search input field for manual trigger of the search

function handleSearch() {
    // Get the input value
    const inputValue = input.value.trim();

    // Check if the input value is not empty
    if (inputValue !== "") {
        // Call the outputTag function with the input value
        outputTag(inputValue);
    }
}

// Event listener for the Enter key press
input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        // Prevent the default form submission behavior
        event.preventDefault();
        // Call the handleSearch function
        handleSearch();
    }
});

// Event listener for the click on the search button
document.querySelector('.searchBtn').addEventListener('click', handleSearch);




//Function to reverse the chevron in dropdown menus


document.addEventListener('DOMContentLoaded', function() {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(function(toggle) {
        let isOpen = false;
        
        toggle.addEventListener('click', function() {
            const chevron = toggle.querySelector('.fa-chevron-down');
            const menu = toggle.nextElementSibling;
            
            if (isOpen) {
                menu.classList.remove('show');
                chevron.classList.remove('rotate180');
            } else {
                menu.classList.add('show');
                chevron.classList.add('rotate180');
            }
            
            isOpen = !isOpen;
        });
        
        // Close the dropdown menu when clicking outside of it
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






//Function to close the tags



document.addEventListener('click', function(e) {
    if (e.target.classList.contains('fa-xmark')) {
        e.target.closest('.tag').remove();        
    }
});


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

    // Method to generate the HTML code for the card
    
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
                        <div class="ingredient-container">`;
    
        // Add ingredients to the ingredient container
        cardHTML += `<div class="ingredient-list">`;
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


// // Dropdown menu filter function

// Select all dropdown toggles
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

// Iterate over each dropdown toggle
dropdownToggles.forEach(dropdownToggle => {
    // Get the corresponding dropdown menu, search input, and items for the current toggle
    const dropdownMenu = dropdownToggle.nextElementSibling;
    const dropdownSearchInput = dropdownMenu.querySelector('.dropdown-search');
    const dropdownItems = dropdownMenu.querySelectorAll('li:not(:first-child)');

    // Add click event listener to the dropdown toggle
    dropdownToggle.addEventListener('click', function() {
        dropdownMenu.classList.toggle('show');
    });

    // Add input event listener to the dropdown search input
    dropdownSearchInput.addEventListener('input', function() {
        const searchValue = dropdownSearchInput.value.toLowerCase();

        // Check if the input has at least three characters
        if (searchValue.length >= 3) {
            // Start from index 0 to include all dropdown items
            dropdownItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                // Check if the item's text contains the search value
                if (text.includes(searchValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });

            dropdownMenu.classList.add('show'); // Ensure the dropdown menu stays open
        } else {
            // If the input has less than three characters, reset the display of all items
            dropdownItems.forEach(item => {
                item.style.display = 'block';
            });

            dropdownMenu.classList.remove('show'); // Close the dropdown menu
        }
    });

    // Attach click event listener to each li element within the current dropdown menu
    dropdownItems.forEach(li => {
        li.addEventListener('click', function() {
            // Get the text content of the clicked li element
            const tagText = this.textContent.trim();

            // Create the tag element
            const tag = document.createElement('span');
            tag.classList.add('tag');
            tag.innerHTML = `<b>${tagText}</b><span class="remove-btn"><span class="remove-btn">
                <i class="fa-solid fa-xmark"></i>
            </span></span>`;

            // Append the tag to the output container
            output.appendChild(tag);
        });
    });
});




// Search function



function filterCards() {
    const tags = Array.from(document.querySelectorAll('.tag')).map(tag => tag.textContent.trim().toLowerCase());
    const cards = document.querySelectorAll('.card');
    let count = 0;

    cards.forEach(card => {
        const cardName = card.querySelector('.card-title').textContent.trim().toLowerCase();
        const cardDescription = card.querySelector('.card-text').textContent.trim().toLowerCase();
        const cardIngredients = Array.from(card.querySelectorAll('.ingredient-list li')).map(ingredient => 
            ingredient.textContent.trim().toLowerCase());

        let isVisible = false;

        tags.forEach(tag => {
            const tagLower = tag.toLowerCase();
            // Check if the tag matches the card name, description, or any ingredient
            if (cardName.includes(tagLower) || cardDescription.includes(tagLower) || cardIngredients.some(ingredient => 
                ingredient.includes(tagLower))) {
                isVisible = true;
            }
        });

        card.style.display = isVisible ? 'block' : 'none';

        if (isVisible) {
            count++;
        }
    });

    updateCountDisplay(count);
}







// Define the function to observe changes in the output container
function observeOutputChanges() {
    const observer = new MutationObserver(filterCards);
    observer.observe(output, { childList: true });
}

// Call the function to observe changes in the output container
observeOutputChanges();

// Display the initial list of recipes in the recipeList section
filterCards();





// ------------------------------------------------------

document.addEventListener('DOMContentLoaded', function() {
    const recipeList = document.querySelector('.recipeList');
    recipes.forEach(recipe => {
        recipe.image = `assets/images/${recipe.image}`;

        const card = new RecipeCard(recipe);
        const cardHTML = card.generateCardHTML();
        recipeList.innerHTML += cardHTML;
    });
});


// Update the number of recipes displayed

function updateCountDisplay(count = 0) {
    const recipeCountDisplay = document.querySelector('.recipeCountDisplay');    
    recipeCountDisplay.textContent = `${count} recettes`;    
}

updateCountDisplay();