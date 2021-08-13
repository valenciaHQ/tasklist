export interface IInput {
  currentQuantity: number;
  onTaskNumberChange: (quantity: number) => void;
}

export interface ITaskComponent {
  data: TaskType;
  setModal: (status: boolean) => void;
  setSelectedTask: (task: TaskType) => void;
}

export type TaskType = {
  _id: string;
  title: string;
};

export interface CallbackOneParam<T1, T2 = void> {
  (): T2;
}
