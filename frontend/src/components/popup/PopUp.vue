<script setup lang="ts">
import { computed } from "vue";
import { useNotificationStore } from "@/stores/notification";
import { TypeNotification } from "@/interfaces/INotification";

const store = useNotificationStore();
const notifications = computed(() => store.notifications);

const context = {
  [TypeNotification.SUCCESS]: {
    container: "bg-green-600",
    progress: "bg-green-300",
    icon: ["fas", "circle-check"],
  },
  [TypeNotification.WARNING]: {
    container: "bg-yellow-500",
    progress: "bg-yellow-300",
    icon: ["fas", "circle-exclamation"],
  },
  [TypeNotification.ERROR]: {
    container: "bg-red-500",
    progress: "bg-red-300",
    icon: ["fas", "circle-xmark"],
  },
};

function removeNotification(id?: number) {
  if (id) store.removeNotification(id);
}
</script>

<template>
  <div class="notifications">
    <transition-group name="fade" tag="div">
      <article
        v-for="notification in notifications"
        :key="notification.id"
        role="alert"
        class="w-72 mb-3 shadow-md rounded-lg overflow-hidden"
        :class="context[notification.type].container"
      >
        <div class="flex items-center gap-3 px-4 py-3 text-white">
          <font-awesome-icon :icon="context[notification.type].icon" class="text-lg" />
          <p class="flex-1 text-sm leading-tight">
            {{ notification.text }}
          </p>
          <button
            @click="removeNotification(notification.id)"
            class="text-white text-xl font-bold px-2 hover:scale-110 transition-transform"
            aria-label="Fechar notificação"
          >
            &times;
          </button>
        </div>
        <div
          class="h-1 transition-all duration-300"
          :class="context[notification.type].progress"
          :style="{ width: notification.progress + '%' }"
        ></div>
      </article>
    </transition-group>
  </div>
</template>

<style scoped>
.notifications {
  position: fixed;
  top: 1rem;
  right: 1rem;
  width: 300px;
  z-index: 105;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
