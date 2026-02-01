<template>
  <div class="container text-center mt-5 pt-5">
    <div class="card shadow-lg p-5 mx-auto" style="max-width: 600px;">
      <div class="mb-4 text-success">
        <i class="bi bi-check-circle-fill" style="font-size: 4rem;"></i>
      </div>
      <h1 class="mb-3">Payment Successful!</h1>
      <p class="lead text-muted">
        Thank you for your order. You will receive an email confirmation shortly.
      </p>
      <hr class="my-4">
      <router-link to="/" class="btn btn-primary btn-lg">
        Return to Gallery
      </router-link>
    </div>
  </div>
</template>