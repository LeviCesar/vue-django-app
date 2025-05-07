<script setup lang="ts">
import { reactive } from "vue";
import { IUserForm } from "@/interfaces/IUser";
import { useUserStore } from "@/stores/user";

import InputPasswordIcon from "@/components/inputs/InputPasswordIcon.vue";
import InputIcon from "@/components/inputs/InputIcon.vue";

const userStore = useUserStore();
const user = reactive<IUserForm>({
  username: "",
  email: "",
  password: ""
});
</script>

<template>
  <div class="h-full w-full flex">
    <div
      class="w-2/5 flex flex-col gap-6 justify-center items-center bg-gradient-to-tr from-indigo-600 to-teal-500 text-white"
    >
      <h1 class="text-center text-4xl font-semibold">Bem-vindo, novamente!</h1>
      <p class="w-96 text-center text-lg">
        Já tem um usuário? <br />
        Acesse a Área de usuário na página de login!
      </p>
      <router-link
        class="py-2 px-6 border border-white rounded-full text-lg font-medium bg-white text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-300"
        :to="{ name: 'Login' }"
      >
        Login
      </router-link>
    </div>
    <div class="w-3/5 flex flex-col gap-6 justify-center items-center">
      <h1 class="text-center text-4xl font-semibold text-indigo-600">
        Cadastro de Novo Usuário
      </h1>
      <form
        class="w-2/5 grid gap-4 justify-items-center"
        @submit.prevent="userStore.registerUser(user)"
      >
        <InputIcon icon="user" input-id="username" input-placeholder="Nome Usuário" v-model="user.username" />
        <InputIcon icon="envelope" input-id="email" input-placeholder="Email" input-type="email"  v-model="user.email"/>
        <InputPasswordIcon input-id="password" input-placeholder="Senha" v-model="user.password"/>
        <button
          type="submit"
          class="w-52 p-2 rounded-full bg-gradient-to-tr from-indigo-600 to-teal-500 transition-all duration-500 ease-in-out transform hover:scale-105 text-white text-lg font-medium"
        >
          Cadastrar
        </button>
      </form>
    </div>
  </div>
</template>
