export enum TypeNotification {
  SUCCESS,
  WARNING,
  ERROR,
}

export interface INotification {
  id?: number;
  progress?: number;
  text: string;
  type: TypeNotification;
}
