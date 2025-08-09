import React, { useState } from "react";

const RoutineForm = ({ onSave }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([{ name: "", start: "", end: "" }]);

  const handleTaskChange = (index, field, value) => {
    const updatedTasks = [...tasks];
    updatedTasks[index][field] = value;
    setTasks(updatedTasks);
  };

  const handleAddTask = () => {
    setTasks([...tasks, { name: "", start: "", end: "" }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRoutine = {
      id: Date.now(), // Unique ID
      title,
      description,
      tasks,
      date: new Date().toISOString().split("T")[0],
    };

    onSave(newRoutine);

    // Reset form
    setTitle("");
    setDescription("");
    setTasks([{ name: "", start: "", end: "" }]);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Add Routine</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block font-semibold">Title</label>
          <input
            type="text"
            className="border p-2 rounded-md w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold">Description</label>
          <textarea
            className="border p-2 rounded-md w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Tasks */}
        <div className="w-full">
          <label className="block font-semibold mb-2">Tasks</label>
          {tasks.map((task, index) => (
            <div key={index} className="flex flex-col md:flex-row space-y-3 gap-2 mb-2">
              <input
                type="text"
                placeholder="Activity name"
                className="border p-2 rounded flex-1"
                value={task.name}
                onChange={(e) => handleTaskChange(index, "name", e.target.value)}
              />
              <input
                type="time"
                className="border p-2 rounded"
                value={task.start}
                onChange={(e) => handleTaskChange(index, "start", e.target.value)}
              />
              <input
                type="time"
                className="border p-2 rounded"
                value={task.end}
                onChange={(e) => handleTaskChange(index, "end", e.target.value)}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddTask}
            className="bg-green-500 text-white px-3 py-1 rounded mt-2"
          >
            + Add Task
          </button>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Save Routine
        </button>
      </form>
    </div>
  );
};

export default RoutineForm;
