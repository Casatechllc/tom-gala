<script setup>
import { useCart } from '../store/cart.js';

const props = defineProps({
  isOpen: Boolean,
  artwork: Object
});

const emit = defineEmits(['close']);

const { addToCart } = useCart();

const handleAddToCart = () => {
  addToCart(props.artwork);
  emit('close'); // Optional: close modal after adding
};
</script>

<template>
  <Transition name="fade">
    <div v-if="isOpen" class="modal-backdrop" @click.self="$emit('close')">
      
      <div class="modal-content-wrapper">
        <button class="btn-close-custom" @click="$emit('close')">&times;</button>

        <div class="framed-piece" :class="artwork.orientation">
          
          <img src="/images/frame-copy.png" class="frame-layer" alt="Frame" />
          
          <img :src="artwork.image" class="art-layer" :alt="artwork.title" />
          
        </div>

        <div class="modal-details text-center mt-4">
          <h2 class="text-white mb-1">{{ artwork.title }}</h2>
          <p class="text-white-50 mb-4">{{ artwork.categories.join(', ') }}</p>
          
          <div class="d-flex justify-content-center gap-3">
            <button @click="handleAddToCart" class="btn btn-primary btn-lg px-5">
              Add to Cart - $24.00
            </button>
          </div>
        </div>
      </div>

    </div>
  </Transition>
</template>

<style scoped>
/* Backdrop */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 3000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content-wrapper {
  position: relative;
  /* Ensure content doesn't touch screen edges */
  max-width: 95vw; 
  max-height: 95vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Close Button */
.btn-close-custom {
  position: absolute;
  top: -50px; /* Moved up slightly to clear the frame */
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 2.5rem;
  line-height: 1;
  cursor: pointer;
  z-index: 3002;
  opacity: 0.8;
  transition: opacity 0.2s;
}

.btn-close-custom:hover {
  opacity: 1;
}

/* --- FRAMING LOGIC --- */
.framed-piece {
  position: relative;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7); /* Deep shadow for depth */
  background-color: #1a1a1a; /* Dark backing in case image loads slow */
  overflow: hidden;
}

/* EXACT 11x14 DIMENSIONS 
   We set a base height/width and let aspect-ratio handle the shape.
*/

/* LANDSCAPE (14 inches wide, 11 inches tall) */
.framed-piece.landscape {
  height: 60vh; /* Base size based on screen height */
  aspect-ratio: 14 / 11; /* The Golden Ratio for your prints */
}

/* PORTRAIT (11 inches wide, 14 inches tall) */
.framed-piece.portrait {
  height: 65vh; /* Slightly taller allowed for portrait */
  aspect-ratio: 11 / 14; 
}

/* The Frame Image (Top Layer) */
.frame-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  pointer-events: none;
  object-fit: stretch; /* Stretches the frame PNG to match the 11x14 box exactly */
}

/* The Art Image (Bottom Layer) */
.art-layer {
  position: absolute;
  z-index: 5;
  
  /* 1. ANCHOR THE TOP-LEFT CORNER */
  top: 14.5%;   /* Moves it down past the top matting */
  left: 14%;  /* Moves it right past the side matting */
  
  /* 2. FORCE EXACT SIZE 
     Calculation: 
     Width = 100% - Left(6%) - Right(6%) = 88%
     Height = 100% - Top(3%) - Bottom(3%) = 94%
  */
  height: 71%;
  width: 72%;
  
  
  /* 3. FIT BEHAVIOR */
  object-fit: fill; /* Forces image to stretch/squish to fit exactly */
  
  background-color: #fff; 
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  /* On mobile, we base size on Width instead of Height to prevent overflow */
  .framed-piece.landscape {
    width: 90vw;
    height: auto; 
    aspect-ratio: 14 / 11;
  }

  .framed-piece.portrait {
    width: 80vw; /* Narrower to fit screen */
    height: auto;
    aspect-ratio: 11 / 14;
  }
  
  .modal-details h2 {
    font-size: 1.5rem;
  }
}

/* Transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>