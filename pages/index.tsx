import { InferGetStaticPropsType } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Input from "../components/Input";
import { server } from "../config";
import styles from "../styles/Home.module.css";
import Modal from "react-modal";
import { Task } from "../types";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#__next");

function Home({ tasks }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [currentTasks, setCurrentTasks] = useState(tasks);
  const [taskQuantity, setTaskQuantity] = useState(tasks.length);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>();
  const [modal, setModal] = useState(false);

  useEffect(() => {
    fetch(`${server}/api/tasks?n=${taskQuantity}`)
      .then((res) => res.json())
      .then((data) => setCurrentTasks(data));
  }, [taskQuantity]);

  const onTaskComplete = () => {
    fetch(`${server}/api/tasks`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: selectedTask?.id }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        setModal(false);
      });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Task application</title>
        <meta name="description" content="Task app challenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Task application</h1>
      <h4>
        You can setup how many task do you want to be render, default is 3
      </h4>
      <Input
        currentQuantity={taskQuantity}
        onTaskNumberChange={(quantity: number) => setTaskQuantity(quantity)}
      />
      <div>{`Now rendering: ${JSON.stringify(taskQuantity)} ${
        taskQuantity > 1 ? "tasks" : "task"
      }`}</div>
      <main className={styles.main}>
        {currentTasks.map((task) => (
          <div
            className={styles.task}
            key={task.id}
            onClick={() => {
              setModal(true);
              setSelectedTask(task);
            }}
          >
            <p>#{task.id}</p>
            <p>{task.title}</p>
          </div>
        ))}
      </main>
      <Modal isOpen={modal} contentLabel="Example Modal" style={customStyles}>
        <div className={styles.task}>
          <button onClick={() => setModal(false)}>X</button>
          <p>#{selectedTask?.id}</p>
          <p>{selectedTask?.title}</p>
          <button className={styles.completeTaskBtn} onClick={onTaskComplete}>
            Complete
          </button>
        </div>
      </Modal>
    </div>
  );
}

export const getStaticProps = async () => {
  const res = await fetch(`${server}/api/tasks?n=${20}`);
  const tasks: Task[] = await res.json();
  return {
    props: {
      tasks,
    },
  };
};

export default Home;
