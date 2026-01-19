<script setup>
import { useCart } from '../store/cart.js';

// Import the global cart logic
const { state, count, total, subtotal, removeFromCart, toggleCart, SHIPPING_RATE, PRINT_PRICE } = useCart();
</script>

<template>
  <div>
    <button 
      v-if="count > 0" 
      @click="toggleCart" 
      class="floating-cart-btn shadow-lg"
    >
      <span class="cart-icon">🛒</span>
      <span class="cart-count">{{ count }}</span>
    </button>

    <div class="cart-sidebar shadow-lg" :class="{ open: state.isOpen }">
      <div class="cart-header d-flex justify-content-between align-items-center p-3 border-bottom">
        <h4 class="m-0">Your Collection</h4>
        <button @click="toggleCart" class="btn-close"></button>
      </div>

      <div class="cart-body p-3">
        <div v-if="count === 0" class="text-center text-muted mt-5">
          <p>Your cart is empty.</p>
          <button @click="toggleCart" class="btn btn-sm btn-outline-secondary">Keep Browsing</button>
        </div>

        <ul v-else class="list-unstyled">
          <li v-for="(item, index) in state.items" :key="index" class="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom border-light">
            <div class="d-flex align-items-center">
              <img :src="item.image" class="rounded me-3" style="width: 50px; height: 50px; object-fit: cover;">
              <div>
                <h6 class="mb-0">{{ item.title }}</h6>
                <small class="text-muted">11" x 14" Print</small>
              </div>
            </div>
            <div class="text-end">
              <div class="fw-bold">${{ PRINT_PRICE.toFixed(2) }}</div>
              <small @click="removeFromCart(index)" class="text-danger remove-link" style="cursor: pointer;">remove</small>
            </div>
          </li>
        </ul>
      </div>

      <div v-if="count > 0" class="cart-footer p-3 bg-light border-top">
        <div class="d-flex justify-content-between mb-2">
          <span>Subtotal</span>
          <span>${{ subtotal.toFixed(2) }}</span>
        </div>
        <div class="d-flex justify-content-between mb-3 text-muted">
          <span>Shipping (Flat Rate)</span>
          <span>${{ SHIPPING_RATE.toFixed(2) }}</span>
        </div>
        <div class="d-flex justify-content-between mb-4 fs-5 fw-bold text-dark">
          <span>Total</span>
          <span>${{ total }}</span>
        </div>
        <button class="btn btn-primary w-100">Checkout Now</button>
      </div>
    </div>
    
    <div v-if="state.isOpen" @click="toggleCart" class="cart-backdrop"></div>
  </div>
</template>

<style scoped>
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
  z-index: 2000; /* Higher Z-index to sit on top of everything */
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
  right: -400px;
  width: 350px;
  height: 100vh;
  background: white;
  z-index: 2050; /* Higher than navbar */
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
  z-index: 2040;
}

.remove-link:hover {
  text-decoration: underline;
}
</style>