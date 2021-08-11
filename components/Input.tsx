import { FC, KeyboardEventHandler, useState } from "react";
import { IInput } from "../types";
import styles from "./Input.module.css";

const Input: FC<IInput> = ({ currentQuantity, onTaskNumberChange }) => {
  const [quantity, setQuantity] = useState<number>(currentQuantity);

  const handleKeyPress = (event: React.KeyboardEvent<any>) => {
    if (event.key === "Enter") {
      () => onTaskNumberChange(quantity);
    }
  };

  return (
    <div className={styles.container}>
      <label>Change tasks quantity</label>
      <input
        type="number"
        onChange={(e) => setQuantity(parseInt(e.target.value))}
        value={quantity}
        onKeyPress={handleKeyPress}
      />
      <div
        className={styles.check}
        onClick={() => onTaskNumberChange(quantity)}
      />
    </div>
  );
};

export default Input;
