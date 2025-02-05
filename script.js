// Quantity Button
var a = 1;
const page = document.body.dataset.page;

console.log(`page context is ${page}`);

// called via html button onclicked 
function singleAddToCart(){
    // Referenz zur WarenkorbSumme
    const cartCountElement = document.getElementById("cart-count");
       
    cartCount++;
    cartCountElement.textContent = cartCount;  
    sessionStorage.setItem("cartCount", cartCount);
    console.log('singleAddToCart incremented cartCount');
}

// initialize or get cartcount sum
let cartCount = parseInt(sessionStorage.getItem("cartCount")) || 0;

function singleAddToCartBird(event) {
    // Verhindert, dass das Event die Kette hinaufgeht
    if (event) {
        event.preventDefault(); // Standardaktion stoppen
        event.stopPropagation(); // Ereignis-Bubbling verhindern
    }

    // Referenz zur Warenkorb-Summe
    const cartCountElement = document.getElementById("cart-count");

    // Warenkorb-Zähler inkrementieren
    cartCount++;
    cartCountElement.textContent = cartCount;
    sessionStorage.setItem("cartCount", cartCount);
    console.log('singleAddToCartBird incremented coutCount');
}

// load cartCount for each page
window.addEventListener("load", () => {
    const cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
        console.log(`setting cartcount to ${cartCount} onload of ${document.body.dataset.page}`);
    }
    // save line position of page products
    if (page === "products"){
        const scrollPosition = sessionStorage.getItem("scrollPosition");
        if (scrollPosition !== null) {
        window.scrollTo(0, parseInt(scrollPosition, 10));
        console.log(`scroll to ${scrollPosition} onload event`);
        }
    }
});
 
document.addEventListener("DOMContentLoaded", function () {
    const shoppingbag = document.getElementById("shoppingbag");

    if (!shoppingbag){
        return;
    }
    const popup = document.createElement("div");
    popup.style.position = "absolute";
    popup.style.background = "white";
    popup.style.padding = "10px";
    popup.style.border = "2px solid black";
    popup.style.zIndex = "1000";
    popup.style.display = "none";
    document.body.appendChild(popup);
    
    shoppingbag.addEventListener("click", function () {
        const rect = shoppingbag.getBoundingClientRect();
        popup.style.top = `${window.scrollY + 17 + rect.bottom}px`;
        popup.style.right = `${window.innerWidth - rect.right - window.scrollX}px`;

        popup.innerHTML = `<h3>🛒🍎🥖🧀</h3><br /><p><strong>Your cart has ${cartCount} items!<br />Time to open a grocery store!</strong></p><br /><br /><button id='closePopup'>Close</button>`;
        popup.style.display = "block";
        
        document.getElementById("closePopup").addEventListener("click", function () {
            popup.style.display = "none";
        });
    });
});



if (page !== "products") {
    document.addEventListener("DOMContentLoaded", () => {
        const plus = document.querySelector(".quantity-increase");
        const minus = document.querySelector(".quantity-decrease");
        const num = document.querySelector(".quantity-value");

        if (!plus || !minus || !num) {
            console.warn(`No plus, minus or num object found on ${page}`);
            return;
        }

        plus.addEventListener("click", () => {
            a++;
            a = a < 10 ? "0" + a : a;
            num.textContent = a;
            console.log(`Incremented: ${a}`);
        });

        minus.addEventListener("click", () => {
            if (a > 1) {
                a--;
                a = a < 10 ? "0" + a : a;
                num.textContent = a;
                console.log(`Decrimented: ${a}`);
            }
        });
    });

    // Warenkorb Icon
    document.addEventListener("DOMContentLoaded", () => {
        // Referenz zum Warenkorb-Zähler
        const cartCountElement = document.getElementById("cart-count");

        // Den Button mit der Klasse "cart-button" auswählen
        const addToCartButton = document.querySelector(".cart-button");

        // Überprüfen, ob der Button existiert
        if (!addToCartButton) {
            console.warn(`Element of class 'cart-button' notfound on ${page}`);
            return;
        }

        // Event Listener für den Button hinzufügen
        addToCartButton.addEventListener("click", () => {
            cartCount= cartCount + parseInt(a); // increment counter with offset of a, parseInt caused by leading "0" for numbers < 10
            cartCountElement.textContent = cartCount; // Zähler im DOM aktualisieren
            console.log(`click on cart-button sets carcount to: ${cartCount}`); // Debugging-Ausgabe
            sessionStorage.setItem("cartCount", cartCount);
        });
    });
}

if (page === "products") {
    document.addEventListener("DOMContentLoaded", () => {
        const filterButton = document.getElementById("filter-button");
        const filterContainer = document.querySelector(".filter-container");
        const closeButton = document.querySelector(".close-button");

        // Funktion zum Anzeigen des Filters
        const showFilter = () => {
            const buttonRect = filterButton.getBoundingClientRect();
            filterContainer.style.position = "absolute";
            filterContainer.style.top = `${buttonRect.bottom + window.scrollY}px`;
            filterContainer.style.left = `${buttonRect.left + window.scrollX}px`;
            filterContainer.style.display = "flex";
            filterButton.style.visibility = "hidden";
        };

        // Funktion zum Verstecken des Filters
        const hideFilter = () => {
            filterContainer.style.display = "none";
            filterButton.style.visibility = "visible";
        };

        // Scroll-Event hinzufügen
        window.addEventListener("scroll", () => {
            const scrollY = window.scrollY;
            const moveSpeed = 0; // Geschwindigkeit, wie schnell der Button mitbewegt wird

            // Berechne die Verschiebung des Buttons basierend auf dem Scrollwert
            const moveDistance = scrollY * moveSpeed;

            // Fixiere den Button relativ zum Bildschirm
            filterButton.style.position = "fixed";
            
            // Setze die vertikale Position des Buttons so, dass er mit dem Scrollen mitgeht
            const buttonOffsetTop = Math.min(moveDistance, window.innerHeight - filterButton.offsetHeight);

            // Wenn der Button noch innerhalb des sichtbaren Bereichs ist, bleibe er sichtbar
            filterButton.style.top = `${buttonOffsetTop}px`;
        });

        window.addEventListener("beforeunload", () => {
            sessionStorage.setItem("scrollPosition", window.scrollY);
            sessionStorage.setItem("cartCount", cartCount);
            //console.log("set scrollPosition: ${window.scrollY}");
            console.log("beforeunload");
        });

        // Event Listener für den Filter-Button
        // const filterbutton= document.querySelector("#filterbutton");


        if (filterButton) {
            filterButton.addEventListener("click", showFilter);
        }

        // Event Listener für den Close-Button
        closeButton.addEventListener("click", hideFilter);
    });


    // Klick auf Bird-Product zur Einzelansicht
    document.addEventListener("DOMContentLoaded", function () {
        // Ziel: Bird of Paradise Card
        const birdCard = document.querySelector('.plant-card:nth-child(1)'); // Erste Card in der Liste
        
        if (birdCard) {
            birdCard.addEventListener("click", function () {
                // Weiterleitung zur Bird Plant HTML
                window.location.href = "birdplant.html";
            });
        } else {
            console.error("Bird of Paradise card not found.");
        }
    });

    // Suchleiste
    document.addEventListener('DOMContentLoaded', () => {
        const searchInput = document.querySelector('.searchbar'); // Suchfeld
        const plantCards = document.querySelectorAll('.plant-card'); // Produktkarten

    if (searchInput) {
        // Filterfunktion für die Suchleiste
        searchInput.addEventListener('input', (e) => {
            const searchText = e.target.value.toLowerCase(); // Suchtext (kleingeschrieben)
            
            plantCards.forEach(card => {
                const commonName = card.querySelector('.common-name').textContent.toLowerCase(); // Allgemeiner Name
                const scientificName = card.querySelector('.scientific-name').textContent.toLowerCase(); // Wissenschaftlicher Name
                
                // Prüfen, ob der Suchtext in einem der beiden Namen enthalten ist
                if (commonName.includes(searchText) || scientificName.includes(searchText)) {
                    card.style.display = 'flex'; // Zeige passende Karten
                } else {
                    card.style.display = 'none'; // Verstecke unpassende Karten
                }
            });
        });
        }
    });


    // Filter
    document.addEventListener("DOMContentLoaded", () => {
        const plantCards = document.querySelectorAll(".plant-card");
        const sizeFilters = document.querySelectorAll('input[name="size"]');
        const familyFilters = document.querySelectorAll('input[name="family"]');
        const lightFilters = document.querySelectorAll('input[name="light"]');
        const waterFilters = document.querySelectorAll('input[name="water"]');

        // Filterfunktion
        function filterPlants() {
            plantCards.forEach(card => {
                // Attributwerte der Karte
                const size = card.getAttribute('data-size').toLowerCase();
                const family = card.getAttribute('data-family').toLowerCase();
                const light = card.getAttribute('data-light').toLowerCase();
                const water = card.getAttribute('data-water').toLowerCase();
        
                // Helper-Funktion für Filterlogik
                const isMatch = (filters, value) => 
                    !Array.from(filters).some(input => input.checked) || 
                    Array.from(filters).some(input => input.checked && input.value.toLowerCase() === value);
        
                // Überprüfen, ob die Karte in allen Kategorien passt
                const sizeMatch = isMatch(sizeFilters, size);
                const familyMatch = isMatch(familyFilters, family);
                const lightMatch = isMatch(lightFilters, light);
                const waterMatch = isMatch(waterFilters, water);
        
                // Karte anzeigen oder ausblenden
                card.style.display = sizeMatch && familyMatch && lightMatch && waterMatch ? 'block' : 'none';
            });
        }

        // Event-Listener für Checkboxen
        sizeFilters.forEach(filter => filter.addEventListener('change', filterPlants));
        familyFilters.forEach(filter => filter.addEventListener('change', filterPlants));
        lightFilters.forEach(filter => filter.addEventListener('change', filterPlants));
        waterFilters.forEach(filter => filter.addEventListener('change', filterPlants));

        // Rufe initial die Filter-Logik auf
        //initializeFilters();
        filterPlants();
    });
}
