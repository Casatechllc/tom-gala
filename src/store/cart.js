import { reactive, computed } from 'vue';

// 1. The State (Data that changes)
const state = reactive({
  items: [],
  isOpen: false
});

// 2. Constants
const PRINT_PRICE = 24.00;
const SHIPPING_RATE = 6.00;

// 3. Computed Properties (Calculations)
const count = computed(() => state.items.length);

const subtotal = computed(() => {
  return state.items.length * PRINT_PRICE;
});

const total = computed(() => {
  const shipping = state.items.length > 0 ? SHIPPING_RATE : 0;
  return (subtotal.value + shipping).toFixed(2);
});

// 4. Actions (Methods to change state)
const addToCart = (product) => {
  state.items.push(product);
  state.isOpen = true; // Open cart when item is added
};

const removeFromCart = (index) => {
  state.items.splice(index, 1);
};

const toggleCart = () => {
  state.isOpen = !state.isOpen;
};

// Export everything so components can use them
export const useCart = () => {
  return {
    state,
    count,
    subtotal,
    total,
    addToCart,
    removeFromCart,
    toggleCart,
    PRINT_PRICE,
    SHIPPING_RATE
  };
};