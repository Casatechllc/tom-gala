<script setup>
const year = new Date().getFullYear();
</script>

<template>
  <footer class="site-footer mt-auto">
    <div class="container text-center py-4">
      
      <div class="contact-info mb-3">
        <a href="mailto:tomgala35@gmail.com" class="contact-link mx-2">
          tomgala35@gmail.com
        </a>
        <!-- <span class="divider d-none d-md-inline">|</span>
        <a href="tel:+12038489212" class="contact-link mx-2">
          (203) 848-9212
        </a> -->
      </div>

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
  background-color: var(--color-background);
  border-top: 1px solid rgba(0,0,0,0.1);
  font-family: var(--font-family-body);
  font-size: 0.9rem;
}

/* Contact Links Styling */
.contact-info {
  font-size: 1rem;
}

.contact-link {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 600; /* Slightly bold for visibility */
  transition: color 0.2s ease;
}

.contact-link:hover {
  color: var(--color-accent);
}

.divider {
  color: var(--color-secondary);
  opacity: 0.5;
}

.copyright {
  font-weight: 400;
  font-size: 0.85rem;
}

.powered-by {
  font-size: 0.75rem;
  color: var(--color-secondary);
  margin-top: 5px;
}

.powered-by a {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 700;
  transition: color 0.2s ease;
}

.powered-by a:hover {
  color: var(--color-accent);
  text-decoration: underline;
}
</style>