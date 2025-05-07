import { defineStore } from 'pinia';
import { INotification } from '@/interfaces/INotification';

interface State {
  notifications: Array<INotification>
}

export const useNotificationStore = defineStore('notification', {
  state: (): State => ({
    notifications: [] as INotification[],
  }),
  actions: {
    addNotification({id = new Date().getTime(), progress = 100, text, type}: INotification) {
      this.notifications.push({
        id,
        progress,
        text,
        type
      });

      let width = 100;
      const intervalId = setInterval(() => {
        width -= 1;
        if (width <= 0) {
          width = 0;
          clearInterval(intervalId); 
          this.removeNotification(id);
        }
        this.updateProgress(id, width);
      }, 4000/100);
    },
    updateProgress(id: number, progress: number) {
      const notification = this.notifications.find(n => n.id === id);
      if (notification) {
        notification.progress = progress;
      }
    },
    removeNotification(id: number) {
      this.notifications = this.notifications.filter(n => n.id !== id);
    }
  }
});