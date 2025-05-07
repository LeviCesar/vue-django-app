import { computed, onMounted, ref } from "vue";
import { defineStore } from "pinia";
import http from "@/http";

import { useNotificationStore } from "./notification";

import { IUser, IUserForm } from "@/interfaces/IUser";
import { TypeNotification } from "@/interfaces/INotification";

export const useUserStore = defineStore(
  "user",
  () => {
    // others stores
    const notificationStore = useNotificationStore();

    // states
    const user = ref<IUser>({
      name: "",
      document: "",
      email: "",
      registerDate: null,
    });
    const permissions = ref<Object>({});

    // getters
    const getUser = computed((): IUser => user.value);
    
    const getUserForm = computed((): IUserForm => {
      return {
        name: getUser.value.name,
        document: getUser.value.document,
        email: getUser.value.email,
        password: '',
        confirmPassword: ''
      }
    });

    // actions
    function registerUser(newUser: IUserForm): void {
      console.log(newUser)
      http
        .post("/account/v1/users/register", newUser)
        .then((response) => response.data)
        .then((data) => {
          console.log(data);
          notificationStore.addNotification({
            text: "Sucesso ao adicionar novo usuário",
            type: TypeNotification.SUCCESS,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }

    function loadUser(): void {
      if (!user.value.name || !user.value.email || !user.value.email) {
        http
          .get("/users/get")
          .then((response) => response.data)
          .then((data) => {
            user.value.name = data.user.name;
            user.value.email = data.user.email;
            user.value.document = data.user.document;
            user.value.registerDate = data.user.registerDate;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }

    function updateUser({
      name,
      document,
      email,
      password,
      confirmPassword,
    }: IUserForm): void {
      if (user.value.name != name || user.value.document != document) {
        let payload = {
          name: name,
          document: document,
        };
        http
          .patch("/users/alter", payload)
          .then((response) => {
            notificationStore.addNotification({
              text: "Nome e Documentos alterados com sucesso",
              type: TypeNotification.SUCCESS,
            });
            return response.data;
          })
          .then((data) => {
            user.value.name = data.name;
            user.value.document = data.document;
          })
          .catch((error) => {
            notificationStore.addNotification({
              text: "Erro ao atualizar nome e documento do usuário!",
              type: TypeNotification.ERROR,
            });
          });
      }
    }

    onMounted(async () => await loadUser());

    return {
      // states
      user,
      permissions,

      // getters
      getUser,
      getUserForm,

      // actions
      registerUser,
      updateUser,
    };
  },
  {
    persist: {
      storage: sessionStorage,
    },
  }
);
