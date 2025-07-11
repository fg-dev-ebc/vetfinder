// ===== DATOS DINÁMICOS =====
let veterinarias = [];
let uiTexts = {};
let stats = {};
let cities = [];

// ===== VARIABLES GLOBALES =====
let filteredVeterinarias = [];
let userLocation = null;
let lastPage = 'landing'; // Para recordar de dónde venimos

// ===== CARGAR DATOS JSON =====
async function loadData() {
  try {
    // Intentar cargar desde JSON, si falla usar datos fallback
    try {
      const uiResponse = await fetch('data/ui-texts.json');
      uiTexts = await uiResponse.json();
      
      const vetResponse = await fetch('data/veterinarias.json');
      const vetData = await vetResponse.json();
      veterinarias = vetData.veterinarias;
      stats = vetData.stats;
      cities = vetData.cities;
    } catch (fetchError) {
      // Fallback: usar datos embebidos
      loadFallbackData();
    }
    
    // Inicializar UI con textos
    initializeUI();
    
    // Inicializar filtros
    filteredVeterinarias = [...veterinarias];
    
    console.log('Datos cargados correctamente');
  } catch (error) {
    console.error('Error cargando datos:', error);
  }
}

// ===== DATOS FALLBACK =====
function loadFallbackData() {
  uiTexts = {
    "site": {
      "title": "VetFinder - Directorio de Veterinarias",
      "brandName": "VetFinder"
    },
    "navigation": {
      "services": "Servicios",
      "about": "Nosotros",
      "contact": "Contacto",
      "viewDirectory": "Ver Directorio",
      "backToHome": "Volver al Inicio",
      "backToResults": "Volver a Resultados"
    },
    "hero": {
      "title": "Encuentra la mejor <span class=\"highlight\">veterinaria</span> cerca de ti",
      "description": "Conectamos a las mascotas con los mejores profesionales veterinarios. Encuentra atención de calidad, cerca de tu ubicación.",
      "searchButton": "Buscar Veterinarias",
      "emergencyButton": "Emergencias 24/7"
    },
    "features": {
      "title": "¿Por qué elegir VetFinder?",
      "description": "Facilitamos la búsqueda de atención veterinaria de calidad para tu mascota",
      "smartLocation": {
        "title": "Ubicación Inteligente",
        "description": "Encuentra veterinarias cerca de ti usando tu ubicación actual"
      },
      "verifiedProfessionals": {
        "title": "Profesionales Verificados",
        "description": "Todos nuestros veterinarios están certificados y verificados"
      },
      "flexibleSchedules": {
        "title": "Horarios Flexibles",
        "description": "Encuentra atención veterinaria en horarios que se adapten a ti"
      }
    },
    "stats": {
      "veterinarias": "Veterinarias Registradas",
      "cities": "Ciudades Cubiertas",
      "pets": "Mascotas Atendidas",
      "rating": "Calificación Promedio"
    },
    "cta": {
      "title": "¿Listo para encontrar la veterinaria perfecta?",
      "description": "Únete a miles de dueños de mascotas que confían en VetFinder para encontrar la mejor atención veterinaria",
      "button": "Explorar Directorio"
    },
    "footer": {
      "brandDescription": "Conectando mascotas con los mejores veterinarios desde 2024",
      "servicesTitle": "Servicios",
      "services": [
        "Directorio de Veterinarias",
        "Emergencias 24/7",
        "Consultas Online",
        "Vacunación"
      ],
      "companyTitle": "Empresa",
      "company": [
        "Sobre Nosotros",
        "Contacto",
        "Términos de Uso",
        "Privacidad"
      ],
      "contactTitle": "Contacto",
      "contactInfo": [
        "info@vetfinder.com",
        "+1 (555) 123-4567",
        "Ciudad de México, México"
      ],
      "copyright": "© 2024 VetFinder. Todos los derechos reservados."
    },
    "directory": {
      "title": "Directorio de Veterinarias",
      "description": "Encuentra la mejor atención veterinaria cerca de ti",
      "searchPlaceholder": "Buscar por nombre o zona...",
      "allCities": "Todas las ciudades",
      "sortBy": {
        "nearest": "Más cercanas",
        "rating": "Mejor calificadas",
        "name": "Nombre A-Z"
      },
      "applyFilters": "Aplicar Filtros",
      "loadingText": "Cargando veterinarias...",
      "showingResults": "Mostrando",
      "veterinarias": "veterinarias",
      "orderedByDistance": "ordenadas por distancia",
      "noResults": {
        "title": "No se encontraron veterinarias",
        "description": "Intenta ajustar tus filtros de búsqueda"
      }
    },
    "vetCard": {
      "call": "Llamar",
      "directions": "Cómo llegar",
      "details": "Ver Detalles",
      "badge24h": "24h",
      "moreServices": "más",
      "reviews": "reseñas"
    },
    "vetDetail": {
      "availableServices": "Servicios Disponibles",
      "userReviews": "Reseñas de Usuarios",
      "addReview": "Agregar Reseña",
      "callNow": "Llamar Ahora",
      "howToGet": "Cómo Llegar",
      "distance": "de distancia",
      "noReviews": "No hay reseñas aún. ¡Sé el primero en compartir tu experiencia!",
      "addReviewAlert": "Funcionalidad de agregar reseña próximamente. ¡Gracias por tu interés!"
    },
    "messages": {
      "locationError": "Error obteniendo ubicación:",
      "initSuccess": "VetFinder inicializado correctamente",
      "mobileMenuError": "Elementos del menú móvil no encontrados"
    }
  };

  // Datos de veterinarias
  const vetData = {
    "veterinarias": [
      {
        "id": 1,
        "nombre": "Clínica Veterinaria San Ángel",
        "direccion": "Av. Revolución 1234, San Ángel, CDMX",
        "telefono": "+52 55 1234-5678",
        "horario": "Lun-Vie 8:00-20:00, Sáb 9:00-18:00",
        "rating": 4.8,
        "reviews": 124,
        "servicios": ["Consulta General", "Cirugía", "Emergencias", "Radiología"],
        "imagen": "https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "ciudad": "Ciudad de México",
        "zona": "San Ángel",
        "lat": 19.3467,
        "lng": -99.1903,
        "emergencia24h": true,
        "descripcion": "Clínica veterinaria con más de 15 años de experiencia en el cuidado de mascotas. Contamos con equipo de última generación y un equipo de profesionales altamente capacitados.",
        "comentarios": [
          {
            "id": 1,
            "usuario": "María González",
            "rating": 5,
            "fecha": "2024-06-15",
            "comentario": "Excelente atención, muy profesionales. Mi perro salió muy bien de la cirugía y el seguimiento fue perfecto.",
            "mascota": "Perro"
          },
          {
            "id": 2,
            "usuario": "Carlos Mendoza",
            "rating": 4,
            "fecha": "2024-06-10",
            "comentario": "Buena atención, aunque tuve que esperar un poco. Los precios son justos y el doctor muy amable.",
            "mascota": "Gato"
          }
        ]
      },
      {
        "id": 2,
        "nombre": "Hospital Veterinario Roma Norte",
        "direccion": "Calle Orizaba 45, Roma Norte, CDMX",
        "telefono": "+52 55 2345-6789",
        "horario": "24 horas",
        "rating": 4.9,
        "reviews": 89,
        "servicios": ["Consulta General", "Radiología", "Laboratorio", "Emergencias", "UCI"],
        "imagen": "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "ciudad": "Ciudad de México",
        "zona": "Roma Norte",
        "lat": 19.4126,
        "lng": -99.1576,
        "emergencia24h": true,
        "descripcion": "Hospital veterinario de especialidades con atención 24 horas. Especialistas en medicina interna, cirugía y cuidados intensivos.",
        "comentarios": [
          {
            "id": 1,
            "usuario": "Jorge Pérez",
            "rating": 5,
            "fecha": "2024-06-20",
            "comentario": "Salvaron a mi perrito en una emergencia nocturna. Personal muy capacitado y instalaciones excelentes.",
            "mascota": "Perro"
          }
        ]
      },
      {
        "id": 3,
        "nombre": "Veterinaria Condesa",
        "direccion": "Av. Tamaulipas 123, Condesa, CDMX",
        "telefono": "+52 55 3456-7890",
        "horario": "Lun-Dom 9:00-19:00",
        "rating": 4.7,
        "reviews": 156,
        "servicios": ["Consulta General", "Vacunación", "Estética", "Nutrición"],
        "imagen": "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "ciudad": "Ciudad de México",
        "zona": "Condesa",
        "lat": 19.4103,
        "lng": -99.1711,
        "emergencia24h": false,
        "descripcion": "Veterinaria familiar con enfoque integral en el bienestar de tu mascota. Servicios de medicina preventiva y estética canina.",
        "comentarios": [
          {
            "id": 1,
            "usuario": "Patricia López",
            "rating": 5,
            "fecha": "2024-06-12",
            "comentario": "Excelente servicio de estética. Mi golden retriever quedó hermoso y muy relajado.",
            "mascota": "Perro"
          }
        ]
      }
    ],
    "stats": {
      "veterinarias": "500+",
      "cities": "50+",
      "pets": "10k+",
      "rating": "4.8"
    },
    "cities": [
      "Ciudad de México",
      "Guadalajara",
      "Monterrey"
    ]
  };

  veterinarias = vetData.veterinarias;
  stats = vetData.stats;
  cities = vetData.cities;
}

// ===== INICIALIZAR UI CON TEXTOS =====
function initializeUI() {
  // Página principal
  document.getElementById('pageTitle').textContent = uiTexts.site.title;
  document.getElementById('brandName').textContent = uiTexts.site.brandName;
  document.getElementById('navServices').textContent = uiTexts.navigation.services;
  document.getElementById('navAbout').textContent = uiTexts.navigation.about;
  document.getElementById('navContact').textContent = uiTexts.navigation.contact;
  document.getElementById('navViewDirectory').textContent = uiTexts.navigation.viewDirectory;
  
  // Hero section
  document.getElementById('heroTitle').innerHTML = uiTexts.hero.title;
  document.getElementById('heroDescription').textContent = uiTexts.hero.description;
  document.getElementById('heroSearchButton').textContent = uiTexts.hero.searchButton;
  document.getElementById('heroEmergencyButton').textContent = uiTexts.hero.emergencyButton;
  
  // Features section
  document.getElementById('featuresTitle').textContent = uiTexts.features.title;
  document.getElementById('featuresDescription').textContent = uiTexts.features.description;
  document.getElementById('feature1Title').textContent = uiTexts.features.smartLocation.title;
  document.getElementById('feature1Description').textContent = uiTexts.features.smartLocation.description;
  document.getElementById('feature2Title').textContent = uiTexts.features.verifiedProfessionals.title;
  document.getElementById('feature2Description').textContent = uiTexts.features.verifiedProfessionals.description;
  document.getElementById('feature3Title').textContent = uiTexts.features.flexibleSchedules.title;
  document.getElementById('feature3Description').textContent = uiTexts.features.flexibleSchedules.description;
  
  // Stats section
  document.getElementById('statVeterinarias').textContent = stats.veterinarias;
  document.getElementById('statVeterinariasLabel').textContent = uiTexts.stats.veterinarias;
  document.getElementById('statCities').textContent = stats.cities;
  document.getElementById('statCitiesLabel').textContent = uiTexts.stats.cities;
  document.getElementById('statPets').textContent = stats.pets;
  document.getElementById('statPetsLabel').textContent = uiTexts.stats.pets;
  document.getElementById('statRating').textContent = stats.rating;
  document.getElementById('statRatingLabel').textContent = uiTexts.stats.rating;
  
  // CTA section
  document.getElementById('ctaTitle').textContent = uiTexts.cta.title;
  document.getElementById('ctaDescription').textContent = uiTexts.cta.description;
  document.getElementById('ctaButton').textContent = uiTexts.cta.button;
  
  // Footer
  document.getElementById('footerBrandName').textContent = uiTexts.site.brandName;
  document.getElementById('footerBrandDescription').textContent = uiTexts.footer.brandDescription;
  document.getElementById('footerServicesTitle').textContent = uiTexts.footer.servicesTitle;
  document.getElementById('footerCompanyTitle').textContent = uiTexts.footer.companyTitle;
  document.getElementById('footerContactTitle').textContent = uiTexts.footer.contactTitle;
  document.getElementById('footerCopyright').textContent = uiTexts.footer.copyright;
  
  // Llenar listas del footer
  const servicesList = document.getElementById('footerServicesList');
  servicesList.innerHTML = uiTexts.footer.services.map(service => `<li>${service}</li>`).join('');
  
  const companyList = document.getElementById('footerCompanyList');
  companyList.innerHTML = uiTexts.footer.company.map(item => `<li>${item}</li>`).join('');
  
  const contactList = document.getElementById('footerContactList');
  contactList.innerHTML = uiTexts.footer.contactInfo.map(info => `<li>${info}</li>`).join('');
  
  // Directorio
  document.getElementById('directoryBrandName').textContent = uiTexts.site.brandName;
  document.getElementById('backToHomeButton').textContent = uiTexts.navigation.backToHome;
  document.getElementById('directoryTitle').textContent = uiTexts.directory.title;
  document.getElementById('directoryDescription').textContent = uiTexts.directory.description;
  document.getElementById('searchInput').placeholder = uiTexts.directory.searchPlaceholder;
  document.getElementById('allCitiesOption').textContent = uiTexts.directory.allCities;
  document.getElementById('sortByNearest').textContent = uiTexts.directory.sortBy.nearest;
  document.getElementById('sortByRating').textContent = uiTexts.directory.sortBy.rating;
  document.getElementById('sortByName').textContent = uiTexts.directory.sortBy.name;
  document.getElementById('applyFiltersButton').textContent = uiTexts.directory.applyFilters;
  document.getElementById('resultsCount').textContent = uiTexts.directory.loadingText;
  document.getElementById('noResultsTitle').textContent = uiTexts.directory.noResults.title;
  document.getElementById('noResultsDescription').textContent = uiTexts.directory.noResults.description;
  
  // Detalle
  document.getElementById('detailBrandName').textContent = uiTexts.site.brandName;
  document.getElementById('backToResultsButton').textContent = uiTexts.navigation.backToResults;
  
  // Agregar ciudades al select
  const cityFilter = document.getElementById('cityFilter');
  cities.forEach(city => {
    const option = document.createElement('option');
    option.value = city;
    option.textContent = city;
    cityFilter.appendChild(option);
  });
}

// ===== FUNCIONES DE NAVEGACIÓN =====
function showDirectory() {
  document.getElementById("landing-page").classList.add("hidden");
  document.getElementById("directory-page").classList.remove("hidden");
  document.getElementById("detail-page").classList.add("hidden");
  lastPage = 'directory';
  initializeDirectory();
}

function showLanding() {
  document.getElementById("directory-page").classList.add("hidden");
  document.getElementById("detail-page").classList.add("hidden");
  document.getElementById("landing-page").classList.remove("hidden");
  lastPage = 'landing';
}

function showVetDetail(vetId) {
  const vet = veterinarias.find(v => v.id === vetId);
  if (!vet) return;

  // Ocultar otras pantallas
  document.getElementById("landing-page").classList.add("hidden");
  document.getElementById("directory-page").classList.add("hidden");
  document.getElementById("detail-page").classList.remove("hidden");

  // Renderizar detalle
  renderVetDetail(vet);
  
  // Scroll to top
  window.scrollTo(0, 0);
}

function goBackToDirectory() {
  document.getElementById("detail-page").classList.add("hidden");
  if (lastPage === 'directory') {
    document.getElementById("directory-page").classList.remove("hidden");
  } else {
    showDirectory();
  }
}

// ===== INICIALIZAR DIRECTORIO =====
function initializeDirectory() {
  getUserLocation();
  renderVeterinarias();
  setupEventListeners();
}

// ===== GEOLOCALIZACIÓN =====
function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        applyFilters();
      },
      (error) => {
        console.log("Error obteniendo ubicación:", error);
        // Ubicación por defecto (CDMX)
        userLocation = { lat: 19.4326, lng: -99.1332 };
        applyFilters();
      }
    );
  } else {
    // Ubicación por defecto si no hay geolocalización
    userLocation = { lat: 19.4326, lng: -99.1332 };
    applyFilters();
  }
}

// ===== CALCULAR DISTANCIA =====
function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // Radio de la Tierra en km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * 
    Math.cos((lat2 * Math.PI) / 180) * 
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// ===== APLICAR FILTROS =====
function applyFilters() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  const selectedCity = document.getElementById("cityFilter").value;
  const sortBy = document.getElementById("sortBy").value;

  // Filtrar veterinarias
  filteredVeterinarias = veterinarias.filter((vet) => {
    const matchesSearch = 
      vet.nombre.toLowerCase().includes(searchTerm) || 
      vet.zona.toLowerCase().includes(searchTerm);
    const matchesCity = selectedCity === "todas" || vet.ciudad === selectedCity;
    return matchesSearch && matchesCity;
  });

  // Agregar distancia si tenemos ubicación del usuario
  if (userLocation) {
    filteredVeterinarias = filteredVeterinarias.map((vet) => ({
      ...vet,
      distancia: calculateDistance(userLocation.lat, userLocation.lng, vet.lat, vet.lng),
    }));
  }

  // Ordenar según criterio seleccionado
  filteredVeterinarias.sort((a, b) => {
    switch (sortBy) {
      case "distancia":
        return (a.distancia || 0) - (b.distancia || 0);
      case "rating":
        return b.rating - a.rating;
      case "nombre":
        return a.nombre.localeCompare(b.nombre);
      default:
        return 0;
    }
  });

  renderVeterinarias();
}

// ===== RENDERIZAR VETERINARIAS =====
function renderVeterinarias() {
  const grid = document.getElementById("veterinariasGrid");
  const noResults = document.getElementById("noResults");
  const resultsCount = document.getElementById("resultsCount");

  // Actualizar contador de resultados
  const countText = `${uiTexts.directory.showingResults} ${filteredVeterinarias.length} ${uiTexts.directory.veterinarias}`;
  const locationText = userLocation ? ` ${uiTexts.directory.orderedByDistance}` : "";
  resultsCount.textContent = countText + locationText;

  if (filteredVeterinarias.length === 0) {
    grid.classList.add("hidden");
    noResults.classList.remove("hidden");
    return;
  }

  noResults.classList.add("hidden");
  grid.classList.remove("hidden");

  grid.innerHTML = filteredVeterinarias
    .map((vet) => `
      <div class="vet-card">
        <div class="vet-image">
          <img src="${vet.imagen}" alt="${vet.nombre}" loading="lazy">
          ${vet.emergencia24h ? `<div class="badge badge-24h">${uiTexts.vetCard.badge24h}</div>` : ""}
          ${vet.distancia ? `<div class="badge badge-distance">${vet.distancia.toFixed(1)} km</div>` : ""}
        </div>
        <div class="vet-content">
          <div class="vet-header">
            <h3 class="vet-name">${vet.nombre}</h3>
            <div class="vet-rating">
             <i data-lucide="star"></i>
             <span>${vet.rating}</span>
             <span style="color: #9ca3af;">(${vet.reviews})</span>
           </div>
         </div>
         <div class="vet-info">
           <div class="vet-info-item">
             <i data-lucide="map-pin"></i>
             <span>${vet.direccion}</span>
           </div>
           <div class="vet-info-item">
             <i data-lucide="phone"></i>
             <span>${vet.telefono}</span>
           </div>
           <div class="vet-info-item">
             <i data-lucide="clock"></i>
             <span>${vet.horario}</span>
           </div>
         </div>
         <div class="vet-services">
           ${vet.servicios
             .slice(0, 3)
             .map((servicio) => `<span class="service-badge">${servicio}</span>`)
             .join("")}
           ${
             vet.servicios.length > 3
               ? `<span class="service-badge">+${vet.servicios.length - 3} ${uiTexts.vetCard.moreServices}</span>`
               : ""
           }
         </div>
         <div class="vet-actions">
           <button class="btn btn-call" onclick="callVet('${vet.telefono}')">
             <i data-lucide="phone"></i>
             ${uiTexts.vetCard.call}
           </button>
           <button class="btn btn-directions" onclick="getDirections(${vet.lat}, ${vet.lng})">
             <i data-lucide="navigation"></i>
             ${uiTexts.vetCard.directions}
           </button>
           <button class="btn btn-details" onclick="showVetDetail(${vet.id})">
             <i data-lucide="info"></i>
             ${uiTexts.vetCard.details}
           </button>
         </div>
       </div>
     </div>
   `)
   .join("");

 // Reinicializar iconos de Lucide después de renderizar
 lucide.createIcons();
}

// ===== RENDERIZAR DETALLE DE VETERINARIA =====
function renderVetDetail(vet) {
 const detailContainer = document.getElementById("vetDetailContent");
 
 // Calcular distancia si tenemos ubicación
 const distanceText = vet.distancia ? `${vet.distancia.toFixed(1)} km ${uiTexts.vetDetail.distance}` : '';
 
 // Generar estrellas para rating
 const stars = Array.from({length: 5}, (_, i) => {
   const filled = i < Math.floor(vet.rating);
   return `<i data-lucide="star" ${filled ? 'style="fill: #fbbf24; color: #fbbf24;"' : 'style="color: #d1d5db;"'}></i>`;
 }).join('');

 detailContainer.innerHTML = `
   <div class="vet-detail-header">
     <div class="vet-detail-image">
       <img src="${vet.imagen}" alt="${vet.nombre}">
       ${vet.emergencia24h ? `<div class="badge badge-24h">${uiTexts.vetCard.badge24h}</div>` : ''}
       ${vet.distancia ? `<div class="badge badge-distance">${vet.distancia.toFixed(1)} km</div>` : ''}
     </div>
     
     <div class="vet-detail-info">
       <div class="vet-detail-title">
         <div>
           <h1 class="vet-detail-name">${vet.nombre}</h1>
           <div class="vet-detail-rating">
             ${stars}
             <span>${vet.rating}</span>
             <span style="color: #9ca3af;">(${vet.reviews} ${uiTexts.vetCard.reviews})</span>
           </div>
         </div>
       </div>
       
       <p class="vet-detail-description">${vet.descripcion}</p>
       
       <div class="vet-detail-meta">
         <div class="vet-meta-item">
           <i data-lucide="map-pin"></i>
           <span>${vet.direccion}</span>
         </div>
         <div class="vet-meta-item">
           <i data-lucide="phone"></i>
           <span>${vet.telefono}</span>
         </div>
         <div class="vet-meta-item">
           <i data-lucide="clock"></i>
           <span>${vet.horario}</span>
         </div>
         ${distanceText ? `
           <div class="vet-meta-item">
             <i data-lucide="navigation"></i>
             <span>${distanceText}</span>
           </div>
         ` : ''}
       </div>
       
       <div class="vet-detail-actions">
         <button class="btn btn-primary" onclick="callVet('${vet.telefono}')">
           <i data-lucide="phone"></i>
           ${uiTexts.vetDetail.callNow}
         </button>
         <button class="btn btn-outline" onclick="getDirections(${vet.lat}, ${vet.lng})">
           <i data-lucide="navigation"></i>
           ${uiTexts.vetDetail.howToGet}
         </button>
       </div>
     </div>
   </div>
   
   <div class="vet-detail-services">
     <h3>${uiTexts.vetDetail.availableServices}</h3>
     <div class="services-list">
       ${vet.servicios.map(servicio => `<span class="service-tag">${servicio}</span>`).join('')}
     </div>
   </div>
   
   <div class="comments-section">
     <div class="comments-header">
       <h3 class="comments-title">${uiTexts.vetDetail.userReviews}</h3>
       <div class="comments-summary">
         <i data-lucide="star"></i>
         <span>${vet.rating} • ${vet.reviews} ${uiTexts.vetCard.reviews}</span>
       </div>
     </div>
     
     <div class="comments-list">
       ${renderComments(vet.comentarios)}
     </div>
     
     <div style="text-align: center; margin-top: 24px;">
       <button class="add-comment-btn" onclick="showAddCommentForm(${vet.id})">
         <i data-lucide="plus"></i>
         ${uiTexts.vetDetail.addReview}
       </button>
     </div>
   </div>
 `;

 // Reinicializar iconos
 lucide.createIcons();
}

// ===== RENDERIZAR COMENTARIOS =====
function renderComments(comentarios) {
 if (!comentarios || comentarios.length === 0) {
   return `
     <div style="text-align: center; padding: 40px; color: var(--text-light);">
       <i data-lucide="message-square" style="width: 48px; height: 48px; margin-bottom: 16px; color: #9ca3af;"></i>
       <p>${uiTexts.vetDetail.noReviews}</p>
     </div>
   `;
 }

 return comentarios.map(comentario => {
   const stars = Array.from({length: 5}, (_, i) => {
     const filled = i < comentario.rating;
     return `<i data-lucide="star" ${filled ? 'style="fill: #fbbf24; color: #fbbf24;"' : 'style="color: #d1d5db;"'}></i>`;
   }).join('');

   // Formatear fecha
   const fecha = new Date(comentario.fecha).toLocaleDateString('es-ES', {
     year: 'numeric',
     month: 'long',
     day: 'numeric'
   });

   return `
     <div class="comment-card">
       <div class="comment-header">
         <div class="comment-user">
           <div class="comment-name">${comentario.usuario}</div>
           <div class="comment-meta">
             <span class="comment-mascota">${comentario.mascota}</span>
             <span>•</span>
             <span>${fecha}</span>
           </div>
         </div>
         <div class="comment-rating">
           ${stars}
         </div>
       </div>
       <p class="comment-text">${comentario.comentario}</p>
     </div>
   `;
 }).join('');
}

// ===== CONFIGURAR EVENT LISTENERS =====
function setupEventListeners() {
 const searchInput = document.getElementById("searchInput");
 const cityFilter = document.getElementById("cityFilter");
 const sortBy = document.getElementById("sortBy");

 searchInput.addEventListener("input", debounce(applyFilters, 300));
 cityFilter.addEventListener("change", applyFilters);
 sortBy.addEventListener("change", applyFilters);
}

// ===== FUNCIÓN DEBOUNCE =====
function debounce(func, wait) {
 let timeout;
 return function executedFunction(...args) {
   const later = () => {
     clearTimeout(timeout);
     func(...args);
   };
   clearTimeout(timeout);
   timeout = setTimeout(later, wait);
 };
}

// ===== FUNCIONES DE ACCIÓN =====
function callVet(telefono) {
 window.open(`tel:${telefono}`, "_self");
}

function getDirections(lat, lng) {
 const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
 window.open(url, "_blank");
}

function showAddCommentForm(vetId) {
 // Por ahora, solo mostrar una alerta
 // Más adelante puedes implementar un modal para agregar comentarios
 alert(uiTexts.vetDetail.addReviewAlert);
}

// ===== MENÚ MÓVIL =====
function setupMobileMenu() {
 const mobileToggle = document.getElementById('mobileMenuToggle');
 const navMenu = document.getElementById('navMenu');
 
 if (!mobileToggle || !navMenu) {
   console.error('Elementos del menú móvil no encontrados');
   return;
 }

 // Toggle del menú
 mobileToggle.addEventListener('click', function(e) {
   e.stopPropagation();
   navMenu.classList.toggle('active');
   
   // Cambiar icono
   const icon = mobileToggle.querySelector('i');
   if (navMenu.classList.contains('active')) {
     icon.setAttribute('data-lucide', 'x');
   } else {
     icon.setAttribute('data-lucide', 'menu');
   }
   lucide.createIcons();
 });

 // Cerrar menú al hacer click fuera
 document.addEventListener('click', function(e) {
   if (navMenu.classList.contains('active') && 
       !navMenu.contains(e.target) && 
       !mobileToggle.contains(e.target)) {
     navMenu.classList.remove('active');
     const icon = mobileToggle.querySelector('i');
     icon.setAttribute('data-lucide', 'menu');
     lucide.createIcons();
   }
 });

 // Cerrar menú al hacer click en enlaces
 navMenu.querySelectorAll('a, button').forEach(function(element) {
   element.addEventListener('click', function() {
     navMenu.classList.remove('active');
     const icon = mobileToggle.querySelector('i');
     icon.setAttribute('data-lucide', 'menu');
     lucide.createIcons();
   });
 });
}

// ===== SMOOTH SCROLL =====
function setupSmoothScroll() {
 document.querySelectorAll('a[href^="#"]').forEach(anchor => {
   anchor.addEventListener('click', function (e) {
     e.preventDefault();
     const target = document.querySelector(this.getAttribute('href'));
     if (target) {
       target.scrollIntoView({
         behavior: 'smooth',
         block: 'start',
       });
     }
   });
 });
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
 // Cargar datos primero
 loadData().then(() => {
   // Inicializar iconos de Lucide
   lucide.createIcons();
   
   // Configurar menú móvil
   setupMobileMenu();
   
   // Configurar smooth scroll
   setupSmoothScroll();
   
   console.log(uiTexts.messages.initSuccess);
 }).catch(error => {
   console.error('Error en la inicialización:', error);
 });
});