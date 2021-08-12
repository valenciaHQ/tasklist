import { FC, memo } from "react";
import { ITaskComponent, TaskType } from "../../types";
import styles from "./Task.module.css";

const Task: FC<ITaskComponent> = ({ data, setModal, setSelectedTask }) => (
  <div
    className={styles.task}
    key={data._id}
    onClick={() => {
      setModal(true);
      setSelectedTask(data);
    }}
  >
    <p>#{data._id}</p>
    <p>{data.title}</p>
  </div>
);

export default memo(Task);
