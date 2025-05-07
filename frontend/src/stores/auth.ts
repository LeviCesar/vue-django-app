import { defineStore } from "pinia";
import { computed, ref } from "vue";
import axios, { AxiosInstance } from "axios";
import router from "@/routes";
import { toZonedTime } from 'date-fns-tz';

import { useNotificationStore } from "./notification";

import { ILoginAuth, IRefreshToken, ITokenData } from "@/interfaces/IAuth";
import { TypeNotification } from "@/interfaces/INotification";

const authSession: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-type": "application/json"
  },
  timeout: 1000
});

export const useAuthStore = defineStore(
  "auth",
  () => {
    // others stores
    const useNotification = useNotificationStore();

    // states
    const accessToken = ref<string>("");
    const refreshToken = ref<string>("");

    //getters
    const isAuthenticated = computed((): boolean => {
      let content = accessToken.value.split('.');
      if (content.length == 0) return false;
      
      let contentObj = JSON.parse(atob(content[1]));
      let tokenExpiry = contentObj?.exp;
      if (!tokenExpiry) return false;

      const utcDate = new Date();
      const timeZone = 'America/Sao_Paulo';

      const zonedDate = toZonedTime(utcDate, timeZone);
      const currentTimeInSeconds = Math.floor(zonedDate.getTime() / 1000);
      return tokenExpiry > currentTimeInSeconds;
    });

    const getAccessToken = computed((): string => accessToken.value);

    // actions
    function login(user: ILoginAuth): void {
      authSession
        .post("/api/v1/token/", user)
        .then((response) => response.data)
        .then((data: ITokenData) => {
          accessToken.value = data.access;
          refreshToken.value = data.refresh;

          useNotification.addNotification({
            text: "Login realizado com sucesso",
            type: TypeNotification.SUCCESS,
          });

          router.push("/home");
        })
        .catch((error) => {
          useNotification.addNotification({
            text: "Usuário ou senha incorreto(s)",
            type: TypeNotification.ERROR,
          });
        });
    }

    function logout(): void {
      sessionStorage.clear();
      localStorage.clear();
      useNotification.addNotification({
        text: 'Volte sempre!',
        type: TypeNotification.SUCCESS
      })
      router.push("/login");
    }

    async function refreshSession(): Promise<boolean> {
      if (!refreshToken.value) return false;

      let payload: IRefreshToken = { refresh: refreshToken.value };

      let status = await authSession
        .post("/api/v1/token/refresh/", payload)
        .then((response) => response.data)
        .then((data: ITokenData) => {
          accessToken.value = data.access;

          return true;
        })
        .catch((error) => {
          if (error.response.status == 440) {
            logout();

            useNotification.addNotification({
              text: "Sua Sessão Foi expirada realize o login novamente!",
              type: TypeNotification.ERROR,
            });
            return false;
          }

          useNotification.addNotification({
            text: error.response.detail,
            type: TypeNotification.ERROR,
          });
          return false;
        });
      
      return status;
    }

    return {
      // states
      accessToken,
      refreshToken,

      // getters
      isAuthenticated,
      getAccessToken,

      // actions
      login,
      logout,
      refreshSession,
    };
  },
  {
    persist: true,
  }
);
