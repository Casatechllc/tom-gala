<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isScrolled = ref(false);
const isNavOpen = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

const toggleNav = () => {
  isNavOpen.value = !isNavOpen.value;
};

const closeNav = () => {
  isNavOpen.value = false;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <nav 
    class="navbar navbar-expand-lg fixed-top"
    :class="{ 'navbar-scrolled': isScrolled, 'bg-white': isNavOpen }"
  >
    <div class="container">
      <router-link to="/" class="navbar-brand" @click="closeNav">
        Thomas Gala
      </router-link>

      <button 
        class="navbar-toggler border-0" 
        type="button" 
        @click="toggleNav"
        aria-controls="navbarNav" 
        aria-expanded="false" 
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div 
        class="collapse navbar-collapse justify-content-end" 
        :class="{ 'show': isNavOpen }" 
        id="navbarNav"
      >
        <ul class="navbar-nav align-items-center">
          <li class="nav-item">
            <router-link to="/" class="nav-link" active-class="active" @click="closeNav">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/gallery" class="nav-link" active-class="active" @click="closeNav">Gallery & Shop</router-link>
          </li>
          <li class="nav-item">
            <a href="mailto:email@example.com" class="nav-link btn-contact" @click="closeNav">Contact</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* Base Navbar Styling */
.navbar {
  background-color: var(--bg-primary); /* Starts Solid White for readability on all pages */
  padding: 1rem 0;
  transition: all 0.3s ease-in-out;
}

/* Brand Styling */
.navbar-brand {
  font-family: var(--font-family-headings);
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-primary);
  letter-spacing: -0.5px;
}

.navbar-brand:hover {
  color: var(--color-accent);
}

/* Link Styling */
.nav-link {
  font-family: var(--font-family-body);
  font-weight: 500;
  color: var(--color-primary);
  margin-left: 1.5rem;
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
}

.nav-link:hover, .nav-link.active {
  color: var(--color-accent);
}

/* Scrolled State */
.navbar-scrolled {
  padding: 0.5rem 0; /* Shrink height slightly */
  box-shadow: var(--box-shadow); /* Add shadow only when scrolling */
  background-color: rgba(255, 255, 255, 0.98); /* Slight transparency */
  backdrop-filter: blur(10px); /* Modern blur effect */
}

/* Contact Button Style override */
.btn-contact {
  border: 1px solid var(--color-primary);
  padding: 5px 20px;
  border-radius: 20px;
  transition: all 0.3s ease;
}

.btn-contact:hover {
  background-color: var(--color-primary);
  color: white !important;
}

/* Mobile Toggler Adjustment */
.navbar-toggler:focus {
  box-shadow: none;
}

@media (max-width: 991px) {
  .nav-link {
    margin-left: 0;
    margin-bottom: 1rem;
    text-align: center;
  }
  
  .navbar-collapse {
    background-color: var(--bg-primary);
    padding-bottom: 1rem;
    border-top: 1px solid #eee;
    margin-top: 1rem;
  }
}
</style>