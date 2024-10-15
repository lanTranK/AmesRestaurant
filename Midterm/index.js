document.addEventListener('DOMContentLoaded', function () {
    const restaurantList = document.getElementById('restaurantList');
    const searchInput = document.getElementById('searchInput');
    const sortDropdown = document.getElementById('sortDropdown');
    let allRestaurants = [];

    // Fetch restaurant data from JSON file
    fetch('restaurants.json')
        .then(response => response.json())
        .then(data => {
            allRestaurants = data.restaurants;
            renderRestaurants(allRestaurants);
        })
        .catch(error => {
            console.error('Error fetching the restaurant data:', error);
        });

    // Function to render restaurant cards
    function renderRestaurants(restaurants) {
        restaurantList.innerHTML = ''; // Clear current content
        if (restaurants.length === 0) {
            document.getElementById('noResults').classList.remove('d-none');
        } else {
            document.getElementById('noResults').classList.add('d-none');
            restaurants.forEach(restaurant => {
                const colDiv = document.createElement('div');
                colDiv.classList.add('col');
                colDiv.innerHTML = `
                    <div class="card h-100 restaurant-card" tabindex="0">
                        <img src="${restaurant.image}" class="card-img-top" alt="${restaurant.name}">
                        <div class="card-body">
                            <h5 class="card-title">${restaurant.name}</h5>
                            <p class="card-text">Food Category: ${restaurant.category}</p>
                            <p class="card-text">Address: ${restaurant.address}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="rating">${generateRatingStars(restaurant.rating)}</div>
                                <button class="btn btn-primary btn-custom">View Details</button>
                            </div>
                        </div>
                    </div>
                `;
                restaurantList.appendChild(colDiv);
            });
        }
    }

    // Generate rating stars
    function generateRatingStars(rating) {
        let stars = '';
        for (let i = 0; i < 5; i++) {
            stars += (i < rating) ? '<span class="star">★</span>' : '<span class="star-empty">☆</span>';
        }
        return stars;
    }

    // Filter restaurants based on search input
    searchInput.addEventListener('input', function () {
        const searchValue = searchInput.value.toLowerCase();
        const filteredRestaurants = allRestaurants.filter(restaurant =>
            restaurant.name.toLowerCase().includes(searchValue) || restaurant.category.toLowerCase().includes(searchValue)
        );
        renderRestaurants(filteredRestaurants);
    });

    // Sort restaurants by selected food category
    sortDropdown.addEventListener('change', function () {
        const selectedCategory = sortDropdown.value;
        if (selectedCategory) {
            const sortedRestaurants = allRestaurants.filter(restaurant => restaurant.category === selectedCategory);
            renderRestaurants(sortedRestaurants);
        } else {
            renderRestaurants(allRestaurants); // Show all if no sort is selected
        }
    });
});
