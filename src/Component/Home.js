import { useEffect, useState } from "react";

export default function Home() {
  const [task, setTask] = useState([]);
  const [input, setInput] = useState({ task: "", complete: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.task) {
      const newData = [...task, input];
      setTask(newData);
    } else {
      alert("Enter some value");
    }
  };

  const handleCheckbox = (i) => {
    const taskData = task;
    const before = taskData.slice(0, i);
    const after = taskData.slice(i + 1);
    const updatedTask = [
      ...before,
      { task: taskData[i].task, complete: !taskData[i].complete },
      ...after,
    ];
    setTask(updatedTask);
  };

  console.log(task);

  //   useEffect(() => {
  //     const taskData = localStorage.getItem("task");
  //     setTask(JSON.parse(taskData));
  //     //eslint-disable-next-line
  //   }, []);

  //   useEffect(() => {
  //     const taskData = JSON.stringify(task);
  //     localStorage.setItem("task", taskData);
  //   }, [task]);

  const handleDelete = (i) => {
    const taskData = task;
    taskData.splice(i, 1);
    setTask(taskData);
  };

  return (
    <>
      <div className="container">
        <form className="my-2">
          <div className="mb-3">
            <label className="form-label">Enter task</label>
            <textarea
              className="form-control"
              aria-label="textarea"
              value={input["task"]}
              onChange={(e) => {
                setInput({
                  task: `${e.target.value}`,
                  complete: false,
                });
              }}
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Add Task
          </button>
        </form>
        <div className="container my-4">
          {task &&
            task.map((e, index) => {
              return (
                <div
                  className="alert alert-secondary alert-dismissible fade show"
                  key={index}
                >
                  <input
                    className="form-check-input mx-2"
                    type="checkbox"
                    value=""
                    checked={e.complete}
                    onChange={() => {
                      handleCheckbox(index);
                    }}
                  />
                  {e.task}
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    onClick={() => {
                      handleDelete(index);
                    }}
                  ></button>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
