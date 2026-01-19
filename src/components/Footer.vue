<script setup>
const year = new Date().getFullYear();
</script>

<template>
  <footer class="site-footer mt-auto">
    <div class="container text-center py-4">
      <p class="mb-1 text-muted copyright">
        &copy; {{ year }} Thomas Gala Art. All Rights Reserved.
      </p>
      <p class="mb-0 powered-by">
        Powered by 
        <a href="https://www.casatechllc.com" target="_blank" rel="noopener noreferrer">
          Casatech LLC
        </a>
      </p>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background-color: var(--color-background); /* Cream background */
  border-top: 1px solid rgba(0,0,0,0.1);    /* Subtle border */
  font-family: var(--font-family-body);
  font-size: 0.9rem;
}

.copyright {
  font-weight: 400;
}

.powered-by {
  font-size: 0.8rem;
  color: var(--color-secondary);
}

.powered-by a {
  color: var(--color-primary); /* Dark Charcoal */
  text-decoration: none;
  font-weight: 700;
  transition: color 0.2s ease;
}

.powered-by a:hover {
  color: var(--color-accent); /* Gold/Bronze on hover */
  text-decoration: underline;
}
</style>