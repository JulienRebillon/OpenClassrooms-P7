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
        <i class="fa-solid fa-xmark"></i>
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


//Function to reserve the chevron in dropdown menus

// document.addEventListener('DOMContentLoaded', function() {
//     const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
//     dropdownToggles.forEach(function(toggle) {
//         toggle.addEventListener('click', function() {
//             const chevron = toggle.querySelector('.fa-chevron-down');
//             chevron.classList.toggle('rotate180');
//         });
//     });
// });

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

window.addEventListener('click', e => {
    if (e.target.classList.contains('remove-btn')) {
        e.target.parentElement.remove ();
        //disable the output {
            input.disabled = false;
        //Modify placeholder text
        input.placeholder = "Ajouter un critère"; 

    }
})

// // Event listener to handle tag removal
// output.addEventListener('click', function(event) {
//     // Check if the clicked element has the class 'remove-btn'
//     if (event.target.classList.contains('remove-btn')) {
//         // Remove the parent element (the tag)
//         event.target.parentElement.parentElement.remove();
//         // Enable the search input
//         input.disabled = false;
//         // Reset the placeholder text
//         input.placeholder = "Ajouter un critère";
//     }
// });



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
    // this.generateCardHTML = function() {
    //     let cardHTML = `
    //         <div class="card">
    //             <img src="${this.image}" alt="${this.name}" class="card-img-top">
    //             <div class="card-content">
    //                 <p class="card-time">${this.time}min</p>
    //                 <div class="card-body">
    //                     <h2 class="card-title">${this.name}</h2>
    //                     <h3 class="rubrique">RECETTE</h3>
    //                     <p class="card-text">${this.description}</p>
                        
    //                     <h3>INGREDIENTS</h3>
    //                     <div class="ingredient-columns">`;

    //     // Start first column
    //     cardHTML += `<div class="ingredient-column">`;

    //     // Add ingredients to the first column
    //     cardHTML += `<ul class="ingredient-list">`;
    //     this.ingredients.forEach((ingredient, index) => {
    //         // Check if it's time to start the second column
    //         if (index === Math.ceil(this.ingredients.length / 2)) {
    //             cardHTML += `</ul></div><div class="ingredient-column"><ul class="ingredient-list">`;
    //         }
    //         cardHTML += `<li>${ingredient.ingredient}${ingredient.quantity ? `: ${ingredient.quantity}` : ''}${ingredient.unit ? ` ${ingredient.unit}` : ''}</li>`;
    //     });
    //     cardHTML += `</ul></div></div></div></div></div>`;

    //     return cardHTML;
    //};

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


// Dropdown menu filter function

document.addEventListener('DOMContentLoaded', function() {
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const dropdownSearchInput = document.querySelector('.dropdown-search');
    const dropdownItems = dropdownMenu.querySelectorAll('li');

    dropdownToggle.addEventListener('click', function() {
        dropdownMenu.classList.toggle('show');
    });

    dropdownSearchInput.addEventListener('input', function() {
        const searchValue = dropdownSearchInput.value.toLowerCase();
        
        // Start from index 1 to exclude the first <li> (search input)
        for (let i = 1; i < dropdownItems.length; i++) {
            const item = dropdownItems[i];
            const text = item.textContent.toLowerCase();
            if (text.includes(searchValue)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        }
        
        dropdownMenu.classList.add('show'); // Ensure the dropdown menu stays open
    });
});



//Search tag created from Ingrédients/Appareils/ustensils dropdown menus.

// Get all the li elements, excluding the first one
const liElements = document.querySelectorAll('.dropdown-menu li:not(:first-child)');

// Attach click event listener to each li element
liElements.forEach(li => {
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




// Search function



// function filterCards() {
//     const tags = Array.from(document.querySelectorAll('.tag')).map(tag => tag.textContent.trim().toLowerCase());
//     const cards = document.querySelectorAll('.card');

//     //Search for ingredients
//     cards.forEach(card => {
//         const cardIngredients = Array.from(card.querySelectorAll('.ingredient-list li')).map(ingredient => ingredient.textContent.trim().toLowerCase());
//         const matchesAllTags = tags.every(tag => cardIngredients.includes(tag));
//         card.style.display = matchesAllTags ? 'block' : 'none';
//     });
// }

function filterCards() {
    // Get the tags, trimming whitespace from each tag
    let tags = Array.from(document.querySelectorAll('.tag')).map(tag => tag.textContent.trim().toLowerCase());
    const cards = document.querySelectorAll('.card');
    

    console.log('Tags:', tags);

    cards.forEach(card => {
        // Get the card name and description, trimming whitespace from each
        const cardName = card.querySelector('.card-title').textContent.trim().toLowerCase();
        const cardDescription = card.querySelector('.card-text').textContent.trim().toLowerCase();
        
        // Get the card ingredients, trimming whitespace from each
        const cardIngredients = Array.from(card.querySelectorAll('.ingredient-list li')).map(ingredient => ingredient.textContent.trim().toLowerCase());

        // Combine all card content into an array
        // const cardContent = [cardName, cardDescription, ...cardIngredients];
        const cardContent = [cardName];

        console.log('CardContent:', cardContent);

        // Check if any tag matches any content

        const matchesAnyTag = tags.some(tag => cardContent.includes(tag));

        console.log('MatchesAnyTag:', matchesAnyTag);

        // Set display style based on matching tags
        card.style.display = matchesAnyTag ? 'block' : 'none';
    });
}













// Define the function to observe changes in the output container
function observeOutputChanges() {
    const observer = new MutationObserver(filterCards);
    observer.observe(output, { childList: true });
}

// Call the function to observe changes in the output container
observeOutputChanges();




document.addEventListener('DOMContentLoaded', function() {
    const recipeList = document.querySelector('.recipeList');
    recipes.forEach(recipe => {
        recipe.image = `assets/images/${recipe.image}`;

        const card = new RecipeCard(recipe);
        const cardHTML = card.generateCardHTML();
        recipeList.innerHTML += cardHTML;
    });
});

