const fs = require("fs");
const path = require("path");

const OUTPUT_DIR = path.join(__dirname, "public");
const IMAGES_DIR = path.join(OUTPUT_DIR, "images", "vehicles");

fs.mkdirSync(IMAGES_DIR, { recursive: true });

const mockVehicles = [
  {
    id: "mock-1",
    title: "Toyota - Hiace - BY43XQ",
    brand: "Toyota",
    model: "Hiace",
    year: 2008,
    km: 285000,
    price: 18500,
    fuel: "Diesel",
    transmission: "Manual",
    color: "White",
    state: "NSW",
    equipment: ["Roof Rack", "Bed Inside", "Dual battery + fridge 40L", "Awnings", "Kitchen Table"],
    localImage: null,
  },
  {
    id: "mock-2",
    title: "Honda - CRV - AHB669",
    brand: "Honda",
    model: "CRV",
    year: 2007,
    km: 225000,
    price: 10500,
    fuel: "Petrol",
    transmission: "Manual",
    color: "Silver",
    state: "Victoria",
    equipment: [],
    localImage: null,
  },
  {
    id: "mock-3",
    title: "Toyota - RAV 4 - AK36FY",
    brand: "Toyota",
    model: "RAV 4",
    year: 2006,
    km: 200240,
    price: 10500,
    fuel: "Petrol",
    transmission: "Automatic",
    color: "Silver",
    state: "NSW",
    equipment: ["Roof Basket", "BullBar"],
    localImage: null,
  },
  {
    id: "mock-4",
    title: "Nissan - X-trail - 1IUZ503",
    brand: "Nissan",
    model: "X-trail",
    year: 2005,
    km: 198000,
    price: 8900,
    fuel: "Petrol",
    transmission: "Automatic",
    color: "Blue",
    state: "Queensland",
    equipment: ["Roof Rack", "Drawers"],
    localImage: null,
  },
  {
    id: "mock-5",
    title: "Toyota - Commuter - DP64MF",
    brand: "Toyota",
    model: "Commuter",
    year: 2010,
    km: 312000,
    price: 25000,
    fuel: "Diesel",
    transmission: "Manual",
    color: "White",
    state: "NSW",
    equipment: ["Rooftop Tent", "Solar panel blanket", "Dual battery + fridge 40L", "Coocking stove", "Sink", "Water Pump"],
    localImage: null,
  },
  {
    id: "mock-6",
    title: "Mitsubishi - Pajero - XYZ123",
    brand: "Mitsubishi",
    model: "Pajero",
    year: 2004,
    km: 245000,
    price: 12000,
    fuel: "Diesel",
    transmission: "Automatic",
    color: "Silver",
    state: "Western Australia",
    equipment: ["BullBar", "Roof Rack", "Drawers"],
    localImage: null,
  },
];

function formatPrice(n) {
  if (!n) return "POA";
  return "$" + n.toLocaleString("en-AU");
}

function formatKm(n) {
  if (!n) return "N/A";
  return n.toLocaleString("en-AU") + " km";
}

function buildWhatsAppLink(title, price) {
  const msg = encodeURIComponent(
    `Hi, I'm interested in the ${title} listed at ${formatPrice(price)} on your website.`
  );
  return `https://wa.me/61450661612?text=${msg}`;
}

function vehicleCard(v) {
  const imgSrc = v.localImage || "images/placeholder.svg";
  const equipTags = v.equipment
    .map((e) => `<span class="tag">${e}</span>`)
    .join("");

  return `
    <article class="vehicle-card" data-brand="${v.brand}" data-fuel="${v.fuel}" data-transmission="${v.transmission}" data-price="${v.price || 0}">
      <div class="card-image">
        <img src="${imgSrc}" alt="${v.title}" loading="lazy" />
      </div>
      <div class="card-body">
        <h3 class="card-title">${v.year || ""} ${v.brand} ${v.model}</h3>
        <p class="card-price">${formatPrice(v.price)}</p>
        <div class="card-specs">
          ${v.km ? `<span class="spec"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"/><path d="M12 6V12L16 14"/></svg>${formatKm(v.km)}</span>` : ""}
          ${v.fuel ? `<span class="spec"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 22V6C3 4.89543 3.89543 4 5 4H13C14.1046 4 15 4.89543 15 6V22"/><path d="M15 10H17C18.1046 10 19 10.8954 19 12V16C19 17.1046 19.8954 18 21 18V18"/><path d="M3 22H15"/><rect x="6" y="8" width="6" height="4"/></svg>${v.fuel}</span>` : ""}
          ${v.transmission ? `<span class="spec"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="6" cy="6" r="2"/><circle cx="12" cy="6" r="2"/><circle cx="18" cy="6" r="2"/><line x1="6" y1="8" x2="6" y2="20"/><line x1="12" y1="8" x2="12" y2="14"/><line x1="18" y1="8" x2="18" y2="11"/><line x1="6" y1="20" x2="18" y2="20"/><line x1="18" y1="11" x2="18" y2="20"/></svg>${v.transmission}</span>` : ""}
          ${v.color ? `<span class="spec"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7L12 12L22 7L12 2Z"/><path d="M2 17L12 22L22 17"/><path d="M2 12L12 17L22 12"/></svg>${v.color}</span>` : ""}
        </div>
        ${equipTags ? `<div class="card-tags">${equipTags}</div>` : ""}
        <div class="card-spacer"></div>
        <a href="${buildWhatsAppLink(v.title, v.price)}" target="_blank" rel="noopener" class="btn-enquire">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Enquire Now
        </a>
      </div>
    </article>`;
}

function buildHTML(vehicles) {
  const brandSet = [...new Set(vehicles.map((v) => v.brand).filter(Boolean))].sort();

  const brandOptions = brandSet.map((b) => `<option value="${b}">${b}</option>`).join("");

  const cards = vehicles.map(vehicleCard).join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>BackpackerCars Australia — Adventure Vehicles for Sale</title>
  <meta name="description" content="Find your adventure ride with BackpackerCars Australia. Quality used vehicles equipped for road trips and van life across Australia." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <header class="header">
    <div class="header-inner">
      <a href="/" class="logo">
        <img src="images/logo.png" alt="BCA" width="200" height="68" />
      </a>
      <nav class="header-nav">
        <a href="https://backpackercars.com" target="_blank" rel="noopener">backpackercars.com</a>
        <a href="https://luffare.com.au" target="_blank" rel="noopener">luffare.com.au</a>
      </nav>
    </div>
  </header>

  <section class="hero">
    <div class="hero-inner">
      <div class="hero-content">
        <h1>Find your<br/><span class="accent">adventure ride</span></h1>
        <p class="hero-sub">Quality vehicles built for road trips across Australia. Fully equipped, road-ready, and waiting for you.</p>
        <a href="https://configurator.backpacker-cars.com" target="_blank" rel="noopener" class="btn-primary">
          Build Your Own
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
        </a>
      </div>
      <div class="hero-stats">
        <div class="stat">
          <span class="stat-number">${vehicles.length}</span>
          <span class="stat-label">Vehicles Available</span>
        </div>
      </div>
    </div>
  </section>

  <section class="stock" id="stock">
    <div class="stock-inner">
      <div class="filters">
        <h2 class="section-title">Our Stock</h2>
        <div class="filter-controls">
          <div class="filter-group">
            <select id="filter-brand" aria-label="Filter by brand">
              <option value="">All Brands</option>
              ${brandOptions}
            </select>
          </div>
          <div class="filter-group">
            <select id="filter-fuel" aria-label="Filter by fuel">
              <option value="">All Fuel Types</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
            </select>
          </div>
          <div class="filter-group">
            <select id="filter-transmission" aria-label="Filter by transmission">
              <option value="">All Transmissions</option>
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
            </select>
          </div>
          <div class="filter-group price-range">
            <label for="filter-price">Max Price: <span id="price-display">Any</span></label>
            <input type="range" id="filter-price" min="0" max="50000" step="1000" value="50000" aria-label="Maximum price" />
          </div>
          <button id="clear-filters" class="btn-clear">Clear Filters</button>
        </div>
      </div>

      <div class="vehicle-grid" id="vehicle-grid">
        ${cards}
      </div>

      <p class="no-results" id="no-results" hidden>No vehicles match your filters. Try adjusting your criteria.</p>
    </div>
  </section>

  <footer class="footer">
    <div class="footer-top">
      <div class="footer-top-inner">
        <img src="images/logo.png" alt="BCA" />
        <p class="footer-address">21 Luland Street, Botany NSW 2019</p>
      </div>
    </div>
    <div class="footer-bottom-section">
      <div class="footer-inner">
        <div class="footer-links">
          <h4>Links</h4>
          <a href="https://backpackercars.com" target="_blank" rel="noopener">backpackercars.com</a>
          <a href="https://luffare.com.au" target="_blank" rel="noopener">luffare.com.au</a>
          <a href="https://configurator.backpacker-cars.com" target="_blank" rel="noopener">bcaconfigurator.com</a>
        </div>
        <div class="footer-contact">
          <h4>Contact</h4>
          <a href="https://wa.me/61431024621" target="_blank" rel="noopener">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            +61 431 024 621
          </a>
        </div>
        <div class="footer-bottom">
          <p>&copy; ${new Date().getFullYear()} BackpackerCars Australia. All rights reserved.</p>
        </div>
      </div>
    </div>
  </footer>

  <script src="app.js"></script>
</body>
</html>`;
}

const html = buildHTML(mockVehicles);
fs.writeFileSync(path.join(OUTPUT_DIR, "index.html"), html);
fs.copyFileSync(path.join(__dirname, "src", "style.css"), path.join(OUTPUT_DIR, "style.css"));
fs.copyFileSync(path.join(__dirname, "src", "app.js"), path.join(OUTPUT_DIR, "app.js"));
console.log("Preview build done with mock data.");
