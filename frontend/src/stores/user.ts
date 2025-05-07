import { computed, onMounted, ref } from "vue";
import { defineStore } from "pinia";
import http from "@/http";
import router from "@/routes";

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
      id: null,
      username: null,
      email: null,
      registerDate: null
    });
    const permissions = ref<Object>({});

    // getters
    // const getUser = computed((): IUser => user.value);
    
    // const getUserForm = computed((): IUserForm => {
    //   return {
    //     name: getUser.value.name,
    //     document: getUser.value.document,
    //     email: getUser.value.email,
    //     password: '',
    //     confirmPassword: ''
    //   }
    // });

    // actions
    function registerUser(newUser: IUserForm): void {
      console.log('forumalario ', newUser)
      http
        .post("/api/v1/register/", newUser)
        .then((response) => response.data)
        .then((data) => {
          console.log(data);
          notificationStore.addNotification({
            text: "Sucesso ao adicionar novo usuário",
            type: TypeNotification.SUCCESS,
          });

          router.push("/login");
        })
        .catch((error) => {
          console.log(error);
        });
    }

    function loadUser(): void {
      if (!user.value.id) {
        http
          .get("/api/v1/users/")
          .then((response) => response.data)
          .then((data) => {
            if (data?.results[0].id) {
              user.value.id = data.results[0]?.id;
              user.value.username = data.results[0]?.username;
              user.value.email = data.results[0]?.email;
              user.value.registerDate = data.results[0]?.date_joined;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }

    onMounted(async () => await loadUser());

    return {
      // states
      user,
      permissions,

      // getters
      // getUser,
      // getUserForm,

      // actions
      registerUser,
      // updateUser,
    };
  },
  {
    persist: {
      storage: sessionStorage,
    },
  }
);
