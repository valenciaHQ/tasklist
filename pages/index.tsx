import { InferGetStaticPropsType } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { server } from "../config";
import styles from "../styles/Home.module.css";
import Modal from "react-modal";
import Input from "../components/Input/Input";
import Task from "../components/Task/Task";
import { TaskType } from "../types";

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
  const [selectedTask, setSelectedTask] = useState<TaskType | undefined>();
  const [modal, setModal] = useState(false);

  console.log(tasks);

  useEffect(() => {
    fetch(`${server}/api/tasks?n=${taskQuantity}`)
      .then((res) => res.json())
      .then((result) => setCurrentTasks(result.data));
  }, [taskQuantity]);

  const loadBulk = () => {
    fetch(`${server}/api/tasks`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        fetch(`${server}/api/tasks`)
          .then((res) => res.json())
          .then((result) => setCurrentTasks(result.data));
      });
  };

  const onTaskComplete = () => {
    fetch(`${server}/api/tasks`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: selectedTask?._id }),
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
        You can setup how many task do you want to be rendered, default is 3.
      </h4>
      <Input
        currentQuantity={taskQuantity}
        onTaskNumberChange={(quantity: number) => setTaskQuantity(quantity)}
      />
      <div>
        {taskQuantity &&
          `Now rendering: ${JSON.stringify(currentTasks.length)} ${
            currentTasks.length > 1 ? "tasks" : "task"
          }`}
      </div>
      <main className={styles.main}>
        {currentTasks?.length > 0 ? (
          currentTasks.map((task) => (
            <Task
              key={task._id}
              data={task}
              setModal={setModal}
              setSelectedTask={setSelectedTask}
            />
          ))
        ) : (
          <p>
            You dont have any task, press <a onClick={loadBulk}>Here</a> to load
            some
          </p>
        )}
      </main>
      <Modal isOpen={modal} contentLabel="Example Modal" style={customStyles}>
        <div className={styles.task}>
          <button onClick={() => setModal(false)}>X</button>
          <p>#{selectedTask?._id}</p>
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
  const res = await fetch(`${server}/api/tasks?n=${3}`);
  const result = await res.json();
  const tasks: TaskType[] = result.data;
  return {
    props: {
      tasks,
    },
  };
};

export default Home;
