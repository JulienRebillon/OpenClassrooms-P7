

const input = document.querySelector('.search');
const searchbar = document.querySelector('.searchbar');
const output = document.querySelector('.tags');
const max = document.querySelector('.max');
const recipeNotFound = document.querySelector('.recipeNotFound');



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




// Add an input event listener to the search input field for 3 characters+ filtering
input.addEventListener('keydown', function(event) {
    //event.preventDefault(); // Prevent the default form submission behavior
    
    const inputValue = input.value.trim().toLowerCase();
    
    // Check if the input value has at least 3 characters
    if (inputValue.length >= 3) {
        
        filterCards(inputValue);
        searchfailed();
    }
});



function handleSearch() {
    // Get the input value
    const inputValue = input.value.trim();
    // Check if the input value is not empty
    if (inputValue !== "") {
        
        outputTag();
    }
}


// Event listener for the Enter key press
input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        
        event.preventDefault();
        // Call the handleSearch function
        handleSearch();
        
    }
});

// Event listener for the click on the search button

document.querySelector('.searchBtn').addEventListener('click', function(event) {
    
    event.preventDefault();
    // Call the handleSearch function
    handleSearch();
});



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

    // Function to generate HTML for the card   

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
    // Get the tags, trimming whitespace from each tag
    const tags = Array.from(document.querySelectorAll('.tag')).map(tag => tag.textContent.trim().toLowerCase());
    const cards = document.querySelectorAll('.card');

    let count = 0;

    cards.forEach(card => {
        // Get the card name and description, trimming whitespace from each
        const cardName = card.querySelector('.card-title').textContent.trim().toLowerCase();
        const cardDescription = card.querySelector('.card-text').textContent.trim().toLowerCase();
        
        // Get the card ingredients, trimming whitespace from each
        const cardIngredients = Array.from(card.querySelectorAll('.ingredient-list li')).map(ingredient => ingredient.textContent.trim().toLowerCase());

        // Combine all card content into an array
        const cardContent = [cardName, cardDescription, ...cardIngredients];
        
        console.log('Tags:', tags);
        console.log('CardContent:', cardContent);

        // Check if every tag matches any content
        const matchesAnyTag = tags.every(tag => containsTag(cardContent, tag));
        console.log('MatchesAnyTag:', matchesAnyTag);

        // Set display style based on matching tags
        card.style.display = matchesAnyTag ? 'block' : 'none';

        // Increment the visible recipe count if the card matches the tags and is displayed
        if (card.style.display !== 'none') {
            count++;
        }
    });

    console.log('Visible Card Count:', count);

    updateCountDisplay(count);
}



function containsTag(cardContent, tag) {
    return cardContent.some(content => content.includes(tag));
}


function searchRefresh() {

    // Add an input event listener to the search input field for 3 characters+ filtering
    searchbar.addEventListener('input', function(event) {
        event.preventDefault(); // Prevent the default form submission behavior

        // Get the input value
        const inputValue = input.value.trim();  
        
        //const inputValue = searchbar.value.trim().toLowerCase();


        // Check if the input value has at least 3 characters
        if (inputValue.length >= 3) {
            // Execute filterCards function
            filterCards();
        }
    });
}

// Call searchRefresh function to enable live search filtering
searchRefresh();


// Display the error message if no recipe is displayed:
function searchFailed() {
//     // Get the value of the search bar input and trim any whitespace
//     const searchValue = input.value.trim();
//     // Update the text content of the RecipeNotFound element
//     recipeNotFound.textContent = `Aucune recette ne contient ‘${searchValue}’, vous pouvez chercher « ${searchValue} », « poisson », etc.`;
// }
    // Get the value of the search bar input and trim any whitespace
    const searchValue = input.value.trim();
    const recipeCount = document.querySelectorAll('.card[style="display: block;"]').length;
    // Check if any recipes are displayed
    recipeNotFound.textContent = 'TEST MESSAGE ERREUR';
    console.log('helloworld', 'CECI EST UN TEST');
    if (recipeCount === 0) {
        // Update the text content of the RecipeNotFound element
        recipeNotFound.textContent = `Aucune recette ne contient '${searchValue}', vous pouvez chercher « ${searchValue} », « poisson », etc.`;
        // Show the message
        recipeNotFound.style.display = 'block';
    } else {
        // Hide the message if recipes are found
        recipeNotFound.style.display = 'none';
    }
    }









// Define the function to observe changes in the output container
function observeOutputChanges() {
    const observer = new MutationObserver(filterCards);
    observer.observe(output, { childList: true });
}

// Call the function to observe changes in the output container
observeOutputChanges();

// Display the initial number of recipes
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

//Displays after page loading the total number of recipes

function displayMaxRecipes() {
    const maxRecipeCount = document.querySelectorAll('.card').length;
    updateCountDisplay(maxRecipeCount);
}
document.addEventListener('DOMContentLoaded', function() {
    displayMaxRecipes();
});

// Update the number of recipes displayed

function updateCountDisplay(count) {
    const recipeCountDisplay = document.querySelector('.recipeCountDisplay');    
    recipeCountDisplay.textContent = `${count} recettes`;    
}

updateCountDisplay();