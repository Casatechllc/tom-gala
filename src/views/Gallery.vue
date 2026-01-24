<script setup>
import { ref, computed } from 'vue';
import { useCart } from '../store/cart.js';
import { artworks } from '../assets/art/artwork.js';
import ViewModal from '../components/ViewModal.vue';

// --- State ---
const activeCategory = ref('All');

const { addToCart, PRINT_PRICE } = useCart();

// --- Computed ---
const categories = ['All', 'Seascapes', 'Animals', 'Landscapes', 'Still Life'];

const filteredArtworks = computed(() => {
  if (activeCategory.value === 'All') {
    return artworks;
  }
  return artworks.filter(art => art.categories.includes(activeCategory.value));
});

// --- Modal Logic ---
const showViewModal = ref(false);
const selectedArt = ref(null);

const openModal = (art) => {
  selectedArt.value = art;
  showViewModal.value = true;
};
</script>

<template>
  <div class="gallery-view">
    
    <header class="gallery-header text-center section-padding">
      <div class="container">
        <h1 data-aos="fade-down">Art Portfolio & Shop</h1>
        <p class="lead">Original Oil Paintings available as 11’’ x 14’’ Matted Prints.</p>
      </div>
    </header>

    <div class="container mb-5" data-aos="fade-up">
      <div class="d-flex justify-content-center flex-wrap gap-2">
        <button v-for="cat in categories" :key="cat" @click="activeCategory = cat" 
                class="filter-btn" :class="{ active: activeCategory === cat }">
          {{ cat }}
        </button>
      </div>
    </div>

    <div class="container pb-5">
      <div class="row g-4">
        <div v-for="art in filteredArtworks" :key="art.id" class="col-md-6 col-lg-3" data-aos="fade-up">
          <div class="card art-card h-100 border-0">
            
            <div class="card-img-wrapper" @click="openModal(art)">
              <img 
                :src="art.image" 
                :alt="art.title" 
                class="card-img-top"
                loading="lazy" 
                width="400" 
                height="500"
              >
              <div class="overlay d-flex align-items-center justify-content-center">
                <button class="btn btn-light rounded-circle shadow-sm">
                  <span style="font-size: 1.2rem; color:var(--color-primary)" class="bi bi-eye-fill"></span>
                </button>
              </div>
            </div>

            <div class="card-body text-center">
                <span class="badge bg-light text-dark mb-2">{{ art.categories.join(', ') }}</span>
                <h5 class="card-title">{{ art.title }}</h5>
                <p class="card-text text-muted mb-3">${{ PRINT_PRICE.toFixed(2) }}</p>
                
                <div class="d-flex gap-2 justify-content-center">
                    <button 
                    @click="openModal(art)" 
                    class="btn btn-outline-dark btn-sm flex-fill"
                    >
                    View
                    </button>

                    <button 
                    @click="addToCart(art)" 
                    class="btn btn-primary btn-sm flex-fill"
                    >
                    Add to Cart
                    </button>
                </div>
                
            </div>

          </div>
        </div>
      </div>
    </div>

    <ViewModal 
      :isOpen="showViewModal" 
      :artwork="selectedArt || {}"
      @close="showViewModal = false"
    />

  </div>
  </template>

<style scoped>
/* Filter Buttons */
.gallery-view {
  background-attachment: fixed;
  background-image: linear-gradient(180deg,rgba(0, 0, 0, 1) 32%, rgba(0, 0, 0, 1) 9%, rgba(0, 0, 0, 0.44) 56%, rgba(0, 0, 0, 0.25) 70%, rgba(0, 0, 0, 0) 85%),
    linear-gradient(rgba(240, 239, 231, 0.5), rgba(240, 239, 231, 0.5)),
    url('/images/Background.png');
  background-size: cover;
  background-position: center;
}

.gallery-header {
  background: transparent;
}

.gallery-header p {
  color: var(--light-text);
}

.gallery-header h1 {
  color: var(--light-text);
}

.filter-btn {
  /* background: transparent; */
  border: 2px solid #ddd;
  padding: 8px 16px;
  border-radius: 20px;
  color: var(--color-primary);
  font-family: var(--font-family-body);
  transition: var(--transition-color);
  background-color: var(--color-background);
}

.filter-btn:hover, .filter-btn.active {
  background-color: var(--color-accent);
  border-color: var(--color-accent);
  color: white;
}

/* Card Styling Override */
.card-img-wrapper {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  
  /* Placeholder Background */
  background-color: #e0e0e0; /* Light Grey */
  
  /* Optional: Add a subtle loading animation */
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { background-color: #e0e0e0; }
  50% { background-color: #f0f0f0; }
  100% { background-color: #e0e0e0; }
}

.card-img-top {
  height: 250px;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.card:hover .card-img-top {
  transform: scale(1.05);
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.3);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.card:hover .overlay {
  opacity: 1;
}
</style>