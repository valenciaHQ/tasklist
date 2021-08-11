export interface IInput {
  currentQuantity: number;
  onTaskNumberChange: (quantity: number) => void;
}

export type Task = {
  id: string;
  title: string;
};
