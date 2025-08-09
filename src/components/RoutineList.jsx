import React from "react";
import RoutineCard from "../components/RoutineCard";

const RoutineList = ({ routines }) => {
  if (routines.length === 0) {
    return <p className="text-center text-gray-500">No routines yet. Add one!</p>;
  }

  return (
    <div className="flex flex-wrap gap-4">
      {routines.map((routine) => (
        <RoutineCard key={routine.id} routine={routine} />
      ))}
    </div>
  );
};

export default RoutineList;
