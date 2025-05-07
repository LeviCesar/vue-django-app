<script setup lang="ts">
import { reactive } from "vue";
import { useAuthStore } from "@/stores/auth";
import { ILoginAuth } from "@/interfaces/IAuth";
import InputIcon from "@/components/inputs/InputIcon.vue"
import InputPasswordIcon from "@/components/inputs/InputPasswordIcon.vue"

const authStore = useAuthStore();
const auth = reactive<ILoginAuth>({
  username: "",
  password: "",
});
</script>

<template>
  <div class="h-full w-full flex">
    <div class="w-3/5 p-8 flex flex-col gap-6 justify-center items-center">
      <h1 class="text-center text-4xl font-semibold text-indigo-600">Login</h1>
      <form
        class="w-96 grid gap-6 justify-items-center"
        @submit.prevent="authStore.login(auth)"
      >
        <InputIcon icon="user" input-id="email" input-placeholder="johndue@email.com" v-model="auth.username" />
        <InputPasswordIcon input-id="password" input-placeholder="************" v-model="auth.password" />
        <router-link to="#" class="text-indigo-600 text-center underline">
          Esqueceu sua senha?
        </router-link>
        <button
          type="submit"
          class="w-52 p-2 rounded-full bg-gradient-to-tr from-indigo-600 to-teal-500 transition-all duration-500 ease-in-out transform hover:scale-105 text-white text-lg font-medium"
        >
          Entrar
        </button>
      </form>
    </div>

    <div
      class="w-2/5 flex flex-col gap-6 justify-center items-center bg-gradient-to-tr from-indigo-600 to-teal-500 text-white"
    >
      <h1 class="text-center text-4xl font-semibold">Olá, Bem-vindo!</h1>
      <p class="w-3/4 text-center text-lg">
        Acesse a página de cadastro e crie sua conta para entrar na área do usuário!
      </p>
      <router-link
        class="py-2 px-6 border border-white rounded-full text-lg font-medium bg-white text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-300"
        :to="{ name: 'Register' }"
      >
        Cadastrar-se
      </router-link>
    </div>
  </div>
</template>
