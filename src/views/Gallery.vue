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
        <p class="lead text-muted">Original Oil Paintings available as 11’’ x 14’’ Matted Prints.</p>
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
            
            <div class="card-img-wrapper" @click="openModal(art)"> <img :src="art.image" :alt="art.title" class="card-img-top">
              <div class="overlay d-flex align-items-center justify-content-center">
                <button class="btn btn-light rounded-circle shadow-sm p-3">
                  <span style="font-size: 1.2rem;">👁️</span>
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
.filter-btn {
  background: transparent;
  border: 1px solid #ddd;
  padding: 8px 16px;
  border-radius: 20px;
  color: var(--color-primary);
  font-family: var(--font-family-body);
  transition: var(--transition-color);
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

/* Floating Cart Button */
.floating-cart-btn {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--color-accent);
  color: white;
  border: none;
  font-size: 1.5rem;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s;
}

.floating-cart-btn:hover {
  transform: scale(1.1);
}

.cart-count {
  position: absolute;
  top: 0;
  right: 0;
  background: var(--color-primary);
  color: white;
  font-size: 0.8rem;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Cart Sidebar */
.cart-sidebar {
  position: fixed;
  top: 0;
  right: -400px; /* Hidden by default */
  width: 350px;
  height: 100vh;
  background: white;
  z-index: 1050;
  transition: right 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
}

.cart-sidebar.open {
  right: 0;
}

.cart-body {
  flex-grow: 1;
  overflow-y: auto;
}

.cart-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.5);
  z-index: 1040;
}

.remove-link:hover {
  text-decoration: underline;
}
</style>