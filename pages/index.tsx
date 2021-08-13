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
let mainContent: JSX.Element;

function Home() {
  const [currentTasks, setCurrentTasks] = useState<TaskType[]>([]);
  const [taskQuantity, setTaskQuantity] = useState(0);
  const [selectedTask, setSelectedTask] = useState<TaskType | undefined>();
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);

  const fetchTasks = async (quantity: number) => {
    fetch(`${server}/api/tasks?n=${quantity}`)
      .then((res) => res.json())
      .then((result) => {
        setCurrentTasks(result.data);
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchTasks(parseInt(process.env.DEFAULT_TASK_QUANTITY!));
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchTasks(taskQuantity);
    setLoading(false);
  }, [taskQuantity]);

  const loadBulk = () => {
    setLoading(true);
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

  if (loading) {
    mainContent = <div className={styles.loading}>Loading...</div>;
  }

  if (currentTasks?.length > 0) {
    mainContent = (
      <>
        {currentTasks.map((task) => (
          <Task
            key={task._id}
            data={task}
            setModal={setModal}
            setSelectedTask={setSelectedTask}
          />
        ))}
      </>
    );
  }

  if (!loading && currentTasks?.length === 0) {
    mainContent = (
      <p>
        You dont have any task, press <a onClick={loadBulk}>Here</a> to load
        some
      </p>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Task application</title>
        <meta name="description" content="Task app challenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Task application</h1>
      <h4>
        {`You can setup how many task do you want to be rendered, default is
        ${process.env.defaultTaskQuantity}.`}
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
      <main className={styles.main}>{mainContent}</main>
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

export default Home;
