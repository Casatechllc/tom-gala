<script setup>
import 'aos/dist/aos.css';

// Awards Data
const awards = [
  {
    location: "Silvermine Art Center, New Canaan, CT",
    title: "Windsor & Newtown Painting Award",
    desc: "Recognized for exceptional painting skills and technique."
  },
  {
    location: "Society of Publications Designers, NYC",
    title: "Magazine Illustration Award",
    desc: "Excellence in commercial illustration."
  },
  {
    location: "Allentown, NY",
    title: "Art Competition Winner",
    desc: ""
  },
  {
    location: "Havre De Grace, MD",
    title: "Art Show & Competition",
    desc: ""
  },
  {
    location: "Rowayton, CT",
    title: "Award & Competition",
    desc: ""
  }
];
</script>

<template>
  <div class="home-view">
    
    <header class="hero-section d-flex align-items-center justify-content-center text-center">
      <div class="container" data-aos="fade-in">
        <h1 class="display-4 mb-3 hero-title">Thomas Gala</h1>
        <p class="lead hero-subtitle mb-4">Fine Artist | Oil Paintings | Custom Prints</p>
        <router-link to="/gallery" class="btn btn-primary btn-lg shadow-sm">
          View Now
        </router-link>
      </div>
    </header>

    <section class="section-padding bg-light">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 mb-5 mb-lg-0" data-aos="fade-right">
            <h2 class="mb-4">About the Artist</h2>
            <p>
              Thomas Gala is an American self-taught artist whose work celebrates our American culture 
              and its varied subject matter. His artwork draws inspiration from his travels and heritage 
              as well as his sense of innate humor.
            </p>
            <p>
              Graduated from Northeastern Illinois University, Thomas relocated from Chicago, Illinois 
              to Weston, Connecticut. He worked as an Illustrator for NYC Publishing Houses painting 
              paperback book covers. Many of his paintings are held by private collectors throughout the Northeast.
            </p>
            <div class="mt-4">
               <span class="signature">Thomas Gala</span>
            </div>
          </div>
          
          <div class="col-lg-6" data-aos="fade-left">
            <div class="artist-portrait-placeholder shadow-lg">
              <img src="/images/Hiedi at Seashore.jpg" alt="Thomas Gala Portrait" class="img-fluid rounded">
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-padding text-white" style="background-color: var(--dark-background);">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center" data-aos="fade-up">
            <h2 class="text-white mb-5">Artist Statement</h2>
            <blockquote class="blockquote custom-blockquote">
              <p class="mb-4">
                "I work exclusively in oil paints. I am constantly experimenting with my chosen medium 
                and use a wide variety of painting techniques. I enjoy painting different subjects such 
                as seascapes, animals, marine scenes, landscapes, still life, and modern art… They all interest me."
              </p>
              <p>
                "I have established myself as a Fine Artist over the past 20 years by annually participating 
                in many Fine Art Shows, Art Festivals, and Art Competitions."
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>

    <section class="section-padding">
      <div class="container">
        <div class="text-center mb-5" data-aos="fade-up">
          <h2>Noteworthy Awards</h2>
          <div class="divider mx-auto"></div>
        </div>
        
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <div class="list-group list-group-flush shadow-sm award-list">
              <div 
                v-for="(award, index) in awards" 
                :key="index" 
                class="list-group-item d-flex justify-content-between align-items-center p-4 award-item"
                data-aos="fade-up"
                :data-aos-delay="index * 100"
              >
                <div>
                  <h5 class="mb-1 fw-bold">{{ award.title }}</h5>
                  <small class="text-muted">{{ award.location }}</small>
                </div>
                <span v-if="award.desc" class="badge bg-secondary rounded-pill d-none d-md-inline-block">{{ award.desc }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-padding bg-light">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-8 col-lg-6">
            <div class="card art-card text-center p-5" data-aos="zoom-in">
              <h3 class="mb-3">Collect a Print</h3>
              <p class="text-muted mb-4">Own a piece of the collection.</p>
              
              <ul class="list-unstyled mb-4 text-start d-inline-block mx-auto">
                <li class="mb-2"><strong>Size:</strong> 11’’ x 14’’ (Matted Frame)</li>
                <li class="mb-2"><strong>Price:</strong> $24.00 per print</li>
                <li class="mb-2"><strong>Shipping:</strong> +$6.00 (Flat Rate)</li>
              </ul>
              
              <div class="d-grid gap-2">
                <router-link to="/gallery" class="btn btn-primary">Browse Gallery</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
/* Hero Styling */
.hero-section {
  height: 90vh; /* Takes up most of the screen */
  background-color: var(--dark-background); 
  /* Placeholder for Hero Image - Add actual URL later */
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://via.placeholder.com/1920x1080?text=Oil+Painting+Detail');
  background-size: cover;
  background-position: center;
  color: var(--light-text);
  margin-top: -80px; /* Pull behind transparent navbar if needed */
  padding-top: 80px;
}

.hero-title {
  font-family: var(--font-family-headings);
  font-weight: 700;
  letter-spacing: 2px;
  color: #fff;
}

.hero-subtitle {
  font-family: var(--font-family-body);
  font-weight: 300;
  letter-spacing: 1px;
  color: #ddd;
}

/* Typography Overrides */
.signature {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  color: var(--color-accent);
  font-style: italic;
}

/* Custom Blockquote */
.custom-blockquote {
  font-family: var(--font-family-headings);
  font-size: 1.25rem;
  line-height: 1.8;
  font-style: italic;
  border-left: 3px solid var(--color-accent);
  padding-left: 2rem;
}

/* Divider for Sections */
.divider {
  height: 2px;
  width: 60px;
  background-color: var(--color-accent);
  margin-top: 1rem;
}

/* Award List Styling */
.award-list .list-group-item {
  background-color: var(--bg-primary);
  border-color: rgba(0,0,0,0.05);
  transition: var(--transition-default);
}

.award-list .list-group-item:hover {
  background-color: #fafafa;
  padding-left: 2rem !important; /* Slight nudge effect */
  border-left: 4px solid var(--color-accent);
}

.badge {
    background-color: var(--color-secondary) !important;
    font-weight: normal;
}

/* Placeholder Image Styling */
.artist-portrait-placeholder img {
    border: 8px solid white;
}
</style>