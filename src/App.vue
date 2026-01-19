<script setup>
  import { RouterView } from 'vue-router';
  import Navbar from '@/components/Navbar.vue';
  import CartSidebar from '@/components/CartSidebar.vue';
  import Footer from '@/components/Footer.vue';
</script>

<template>
  <Navbar />
  
  <main>
    <RouterView />
  </main>

  <Footer />
   <CartSidebar />
</template>


<style>
body {
  padding-top: var(--spacing-top);
}
</style>
