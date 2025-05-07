<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const logout = () => {
  authStore.logout()
}
</script>

<template>
  <div class="h-full w-full flex flex-col">
    <!-- Cabeçalho -->
    <header class="flex justify-between items-center px-8 py-4 bg-indigo-600 text-white shadow-md">
      <h1 class="text-2xl font-semibold">SecureTech</h1>
      <button
        @click="logout"
        class="bg-white text-indigo-600 font-medium px-4 py-2 rounded-full hover:bg-indigo-100 transition duration-200"
      >
        Logout
      </button>
    </header>

    <!-- Conteúdo Principal -->
    <main class="flex-1 flex items-center justify-center">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-indigo-700 mb-2">Bem-vindo de volta!</h2>
        <p class="text-gray-600 text-lg">Você está logado no sistema.</p>
      </div>
    </main>
  </div>
</template>
