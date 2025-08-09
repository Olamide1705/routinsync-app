import React, { useState, useEffect } from "react";
import { FaPlusCircle } from "react-icons/fa";
import RoutineForm from "../components/RoutineForm";
import RoutineList from "../components/RoutineList";
import DashboardLayout from "./../layouts/DashboardLayout";

const Routines = () => {
  const [routines, setRoutines] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Load routines from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("routines");
    if (stored) setRoutines(JSON.parse(stored));
  }, []);

  // Save routines to localStorage whenever routines change
  useEffect(() => {
    localStorage.setItem("routines", JSON.stringify(routines));
  }, [routines]);

  const addRoutine = (routine) => {
    setRoutines((prev) => [...prev, routine]);
    setShowForm(false);
  };

  return (
    <DashboardLayout>
      <div className="p-4 relative min-h-screen">
        <h1 className="text-2xl font-bold mt-8 md:mt-0 mb-4">My Routines</h1>

        <RoutineList routines={routines} />

        {/* Add Routine Button */}
        <button
          onClick={() => setShowForm(true)}
          className="fixed bottom-6 right-6 bg-[rgb(255,208,102)] text-white rounded-full w-16 h-16 flex items-center justify-center shadow-xl hover:bg-yellow-500 hover:scale-110 transition-transform duration-200 z-50"
        >
          <FaPlusCircle size={36} />
        </button>

        {/* Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-white bg-opacity-40 flex justify-center items-center z-40">
            <RoutineForm onSave={addRoutine} />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Routines;
