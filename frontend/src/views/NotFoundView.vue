<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="text-center">
      <h1 class="text-9xl font-extrabold text-gray-500">404</h1>
      <p class="text-2xl font-semibold text-gray-700 mt-4">Page Not Found</p>
      <p class="text-gray-500 mt-2">
        The page you are looking for does not exist.
      </p>
      <router-link
        to="/home"
        class="mt-6 inline-block px-6 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >Go Home</router-link
      >
    </div>
  </div>
</template>