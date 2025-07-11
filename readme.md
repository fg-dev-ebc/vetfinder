# VetFinder - Directorio de Veterinarias

---

## Tecnologías Utilizadas

- **HTML5**: Estructura semántica de la aplicación.
- **CSS3** (con variables y responsive design): Estilos modernos, mobile-first y adaptativos.
- **JavaScript Vanilla (ES6+)**: Lógica de la aplicación, manipulación del DOM y manejo de eventos.
- **Lucide Icons**: Iconografía SVG moderna y personalizable vía CDN.
- **Geolocalización Web API**: Para calcular distancias y mostrar veterinarias cercanas.

---

## Estructura de Archivos

- `index.html`: Página principal y estructura de la SPA (Single Page Application).
- `styles.css`: Todos los estilos, incluyendo responsividad y variables CSS.
- `main.js`: Toda la lógica de la aplicación, manejo de datos, filtros, renderizado y menú móvil.

---

## Estructura de Datos

El directorio de veterinarias está definido en el archivo `main.js` como un arreglo de objetos:

```js
const veterinarias = [
  {
    id: 1,
    nombre: "Clínica Veterinaria San Ángel",
    direccion: "Av. Revolución 1234, San Ángel, CDMX",
    telefono: "+52 55 1234-5678",
    horario: "Lun-Vie 8:00-20:00, Sáb 9:00-18:00",
    rating: 4.8,
    reviews: 124,
    servicios: ["Consulta General", "Cirugía", "Emergencias"],
    imagen: "URL de imagen",
    ciudad: "Ciudad de México",
    zona: "San Ángel",
    lat: 19.3467,
    lng: -99.1903,
    emergencia24h: true
  },
  // ...más veterinarias
]
```

### Esquema de cada veterinaria:
- **id**: Identificador único.
- **nombre**: Nombre de la veterinaria.
- **direccion**: Dirección completa.
- **telefono**: Teléfono de contacto.
- **horario**: Horario de atención.
- **rating**: Calificación promedio (0-5).
- **reviews**: Número de reseñas.
- **servicios**: Array de servicios ofrecidos.
- **imagen**: URL de imagen representativa.
- **ciudad**: Ciudad donde se ubica.
- **zona**: Zona o colonia.
- **lat/lng**: Coordenadas geográficas.
- **emergencia24h**: Booleano, si ofrece emergencias 24/7.

---

## Funcionalidades y Flujo

### Navegación SPA
- **Landing Page**: Presentación, hero, features, estadísticas y llamada a la acción.
- **Directorio**: Listado de veterinarias con filtros, búsqueda y ordenamiento.

### Menú de Navegación y Hamburguesa
- **Menú Desktop**: Navegación horizontal.
- **Menú Móvil**: Menú hamburguesa con animación y cierre automático.

### Filtros y Búsqueda
- **Búsqueda**: Por nombre o zona.
- **Filtro por ciudad**: Selección de ciudad.
- **Ordenamiento**: Por distancia, rating o nombre.
- **Distancia**: Calculada automáticamente usando la ubicación del usuario (si la permite).

### Renderizado Dinámico
- **Veterinarias**: Se renderizan como tarjetas con imagen, datos, servicios y acciones.
- **Acciones**: Llamar (abre app de teléfono), Cómo llegar (abre Google Maps).

### Iconografía
- **Lucide Icons**: Todos los íconos se renderizan dinámicamente y se actualizan tras cada render.

---

## Descripción de Funciones Principales (`main.js`)

- **showDirectory() / showLanding()**: Cambian entre la landing y el directorio.
- **initializeDirectory()**: Inicializa el directorio, obtiene ubicación y listeners.
- **getUserLocation()**: Usa la Web API de geolocalización para obtener la ubicación del usuario (o CDMX por defecto).
- **calculateDistance(lat1, lng1, lat2, lng2)**: Calcula la distancia en km entre dos puntos geográficos.
- **applyFilters()**: Aplica búsqueda, filtros y ordenamiento sobre el array de veterinarias.
- **renderVeterinarias()**: Renderiza las tarjetas de veterinarias y actualiza los íconos.
- **setupEventListeners()**: Asigna listeners a los filtros y búsqueda.
- **debounce(func, wait)**: Optimiza la búsqueda para no disparar demasiados eventos.
- **callVet(telefono)**: Abre la app de teléfono para llamar.
- **getDirections(lat, lng)**: Abre Google Maps con la dirección.
- **setupMobileMenu()**: Lógica del menú hamburguesa, animación y cierre automático.
- **setupSmoothScroll()**: Scroll suave para navegación interna.

---

## Funcionamiento del menú hamburguesa
- El botón con id `mobileMenuToggle` alterna la clase `active` en el menú (`navMenu`).
- Cambia el ícono de hamburguesa a "X" y viceversa usando Lucide.
- Cierra el menú al hacer clic fuera o en una opción.

---

## Cálculo de distancia
- Se usa la API de geolocalización del navegador para obtener la posición del usuario.
- Se calcula la distancia entre el usuario y cada veterinaria.
- Si el usuario no da permiso, se usa una ubicación por defecto (CDMX).

---
