import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

export default function Home() {
  const [task, setTask] = useState([]);
  const [input, setInput] = useState({ id: "", task: "", complete: "" });

  useEffect(() => {
    const taskData = localStorage.getItem("task");
    if (taskData) {
      setTask(JSON.parse(taskData));
    }
    //eslint-disable-next-line
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.task.trim()) {
      const newData = [
        ...task,
        { id: uuid(), task: input.task.trim(), complete: false },
      ];
      setTask(newData);

      localStorage.setItem("task", JSON.stringify(newData));
    } else {
      alert("Enter some value");
    }
    setInput({ id: "", task: "", complete: "" });
  };

  const handleCheckbox = (i) => {
    const taskData = [...task];

    taskData[i] = { ...taskData[i], complete: !taskData[i].complete };
    setTask(taskData);

    localStorage.setItem("task", JSON.stringify(taskData));
  };

  const handleDelete = (i) => {
    const taskData = [...task];
    taskData.splice(i, 1);
    setTask(taskData);

    localStorage.setItem("task", JSON.stringify(taskData));
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
                  key={e.id}
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
