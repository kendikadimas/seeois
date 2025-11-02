<template>
  <div class="internship-layout">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <Link href="/" class="navbar-brand fw-bold">
          <i class="bi bi-mortarboard"></i> SEEO Internship
        </Link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <Link href="/internship/certificates" class="nav-link">
                <i class="bi bi-file-pdf"></i> Sertifikat
              </Link>
            </li>
            <li class="nav-item">
              <Link :href="route('profile.edit')" class="nav-link">
                <i class="bi bi-person"></i> Profil
              </Link>
            </li>
            <li class="nav-item">
              <Link :href="route('logout')" method="post" as="button" class="nav-link btn">
                <i class="bi bi-box-arrow-right"></i> Keluar
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <main class="py-4">
      <slot />
    </main>

    <footer class="bg-light text-center py-3 mt-4 border-top">
      <p class="text-muted mb-0">&copy; 2024 SEEO Platform. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup>
import { Link } from '@inertiajs/vue3'
import { route } from 'ziggy-js'
</script>

<style scoped>
.internship-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}

.navbar-brand {
  font-size: 1.3rem;
  letter-spacing: 0.5px;
}

.nav-link {
  transition: all 0.3s ease;
}

.nav-link:hover {
  color: #ffc107 !important;
}

footer {
  margin-top: auto;
}
</style>
