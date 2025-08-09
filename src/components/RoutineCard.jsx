import React from "react";

const RoutineCard = ({ routine }) => {
  return (
    <div>
<div className="bg-white shadow rounded-lg overflow-hidden">
  <div className="w-full table-auto border-collapse">
    {/* Header */}
    <div className="table-row bg-[rgb(255,208,102)]  font-bold text-sm md:text-base">
      <div className="table-cell p-3">Date</div>
      <div className="table-cell p-3">Title</div>
      <div className="table-cell p-3">Description</div>
      <div className="table-cell p-3">Activity</div>
      <div className="table-cell p-3">Start</div>
      <div className="table-cell p-3">Ends</div>
    </div>

    {/* Data */}
    <div className="table-row">
      <div className="table-cell p-3 align-top">{routine.date}</div>
      <div className="table-cell p-3 align-top">{routine.title}</div>
      <div className="table-cell p-3 align-top">{routine.description}</div>

      {/* Tasks */}
      <div className="table-cell p-3 align-top">
        {routine.tasks.map((task, idx) => (
          <div key={idx} className="mb-1">{task.name}</div>
        ))}
      </div>
      <div className="table-cell p-3 align-top">
        {routine.tasks.map((task, idx) => (
          <div key={idx} className="mb-1">{task.start}</div>
        ))}
      </div>
      <div className="table-cell p-3 align-top">
        {routine.tasks.map((task, idx) => (
          <div key={idx} className="mb-1">{task.end}</div>
        ))}
      </div>
    </div>
  </div>
</div>
    </div>
  );
};

export default RoutineCard;
