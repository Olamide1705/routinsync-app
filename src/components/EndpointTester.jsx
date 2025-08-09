import React, { useEffect } from "react";
import API from "../api/api"; // your axios instance

const EndpointTester = () => {
  useEffect(() => {
    const endpoints = [
      "myroutines/",
      "routine/title/",
      "create/routine/",
      "edit/tasks/<slug:routine_slug>/",
      "edit/details/<slug:routine_slug>/",
      "edit/delete/<slug:routine_slug>/",
      "edit/<slug:routine_slug>/",
    ];

    endpoints.forEach(ep => {
      API.get(ep)
        .then(res => {
          console.log(`✅ Endpoint: ${ep}`, res.data);
        })
        .catch(err => {
          console.error(`❌ Error at ${ep}`, err.response?.data || err.message);
        });
    });
  }, []);

  return null;
};

export default EndpointTester;
