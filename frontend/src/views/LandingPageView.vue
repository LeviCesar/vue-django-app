<script setup lang="ts"></script>

<template>
  <header class="container mx-auto p-6 flex justify-between items-center">
  <h1 class="text-3xl font-bold text-indigo-700">SecureTech</h1>
  <nav class="flex gap-6 text-gray-700 font-medium">
    <!-- <router-link to="/">Início</router-link>
    <router-link to="/services">Serviços</router-link>
    <router-link to="/platform">Plataforma</router-link> -->
  </nav>
  <router-link
    class="inline-block bg-indigo-600 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-indigo-700 transition"
    :to="{ name: 'Login' }"
  >
    Área do Cliente
  </router-link>
</header>

<main class="bg-slate-100">
  <section class="container mx-auto p-12 flex flex-col md:flex-row items-center gap-12">
    <div class="flex-1">
      <h2 class="text-4xl font-bold text-gray-900 leading-tight mb-6">
        Proteja seu software com soluções modernas e inteligentes
      </h2>
      <p class="text-lg text-gray-700 mb-6">
        A SecureTech oferece ferramentas poderosas para proteger sua aplicação, prevenir ataques e garantir a conformidade com as normas de segurança mais exigentes.
      </p>
      <router-link
        class="inline-block bg-indigo-600 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-indigo-700 transition"
        :to="{ name: 'Register' }"
      >
        Seja um cliente
      </router-link>
    </div>
    <div class="flex-1">
      <img src="https://placehold.co/600x400?text=Espaço+Reservado&bg=cccccc&fg=000000" alt="Imagem Placeholder" class="rounded-xl shadow-md" />
    </div>
  </section>

  <section class="bg-white border-t py-12">
    <div class="container mx-auto text-center">
      <h3 class="text-2xl font-bold mb-6">Nossos Serviços</h3>
      <ul class="grid md:grid-cols-2 gap-4 text-left max-w-3xl mx-auto text-gray-800">
        <li>✅ Monitoramento contínuo de vulnerabilidades</li>
        <li>✅ Análise de código-fonte segura</li>
        <li>✅ Testes de penetração (Pentest)</li>
        <li>✅ Gestão de conformidade e LGPD</li>
        <li>✅ Criação de APIs seguras</li>
        <li>✅ Automação de auditorias de segurança</li>
      </ul>
    </div>
  </section>

  <section class="bg-slate-50 py-12 border-t">
    <div class="container mx-auto text-center">
      <h3 class="text-2xl font-bold mb-4">Por que escolher a SecureTech?</h3>
      <p class="text-gray-700 max-w-xl mx-auto">
        Nossa plataforma foi desenvolvida com foco em escalabilidade, automação e proteção completa. Combinamos tecnologia de ponta com um time experiente para entregar segurança real.
      </p>
    </div>
  </section>
</main>

<footer class="bg-slate-800 text-white p-6 text-center">
  <p>&copy; 2025 SecureTech. Todos os direitos reservados.</p>
</footer>

</template>

<style scoped>
a.router-link-active {
  @apply border-b-2 border-indigo-600;
}
</style>
