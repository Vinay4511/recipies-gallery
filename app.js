let recipesData = [];

// Fetch recipes and render initially
fetch('https://dummyjson.com/recipes?limit=110&skip=0')
.then(resp => resp.json())
.then(data => {
    recipesData = data.recipes;
    renderRecipes(recipesData);
});

function renderRecipes(recipes) {
    const container = document.getElementById('recipes');
    container.innerHTML = '';
    if(recipes.length === 0) {
        container.innerHTML = "<p>No recipes found.</p>";
        return;
    }
    recipes.forEach(recipe => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.name}">
            <div class="card-content">
                <h2>${recipe.name}</h2>
                <div style="margin-bottom: 4px;">
                    ${recipe.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="recipe-info">
                    <b>${recipe.cuisine}</b> | <b>Prep:</b> ${recipe.prepTimeMinutes}m | <b>Cook:</b> ${recipe.cookTimeMinutes}m
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}
document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', function () {
        const keyword = searchInput.value.toLowerCase().trim();
        const filtered = recipesData.filter(recipe =>
            recipe.name.toLowerCase().includes(keyword) ||
            recipe.tags.some(tag => tag.toLowerCase().includes(keyword)) ||
            recipe.cuisine.toLowerCase().includes(keyword)
        );
        renderRecipes(filtered);
    });
});
