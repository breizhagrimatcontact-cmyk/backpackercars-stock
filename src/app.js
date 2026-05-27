document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("vehicle-grid");
  const cards = Array.from(grid.querySelectorAll(".vehicle-card"));
  const noResults = document.getElementById("no-results");

  const brandFilter = document.getElementById("filter-brand");
  const fuelFilter = document.getElementById("filter-fuel");
  const transFilter = document.getElementById("filter-transmission");
  const priceFilter = document.getElementById("filter-price");
  const priceDisplay = document.getElementById("price-display");
  const clearBtn = document.getElementById("clear-filters");

  function formatPrice(n) {
    return "$" + Number(n).toLocaleString("en-AU");
  }

  function applyFilters() {
    const brand = brandFilter.value;
    const fuel = fuelFilter.value;
    const trans = transFilter.value;
    const maxPrice = Number(priceFilter.value);

    priceDisplay.textContent =
      maxPrice >= 50000 ? "Any" : formatPrice(maxPrice);

    let visible = 0;
    cards.forEach((card) => {
      const match =
        (!brand || card.dataset.brand === brand) &&
        (!fuel || card.dataset.fuel === fuel) &&
        (!trans || card.dataset.transmission === trans) &&
        (maxPrice >= 50000 || Number(card.dataset.price) <= maxPrice);

      card.hidden = !match;
      if (match) visible++;
    });

    noResults.hidden = visible > 0;
  }

  [brandFilter, fuelFilter, transFilter, priceFilter].forEach(
    (el) => el.addEventListener("input", applyFilters)
  );

  clearBtn.addEventListener("click", () => {
    brandFilter.value = "";
    fuelFilter.value = "";
    transFilter.value = "";
    priceFilter.value = 50000;
    applyFilters();
  });
});
