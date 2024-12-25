import React, { useEffect } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
// import { chartData } from "../assets/data";
import { useState } from "react";
import axios from "axios";
export const Chart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/tasks/get-all");
        console.log("API Response:", response.data); 
        const tasks = response.data.data.rows || [];

        if (!Array.isArray(tasks)) {
          console.error("Unexpected tasks data:", tasks);
          return;
        }
        const priorities = ["HIGH", "MEDIUM", "NORMAL", "LOW"];
        const chartData = priorities.map((priority) => ({
          name: priority,
          total: tasks.filter((task) => task.priority === priority).length,
        }));

        console.log("Chart Data:", chartData); 
        setChartData(chartData); 
      } catch (error) {
        console.error("Error fetching chart data:", error.message);
      }
    };

    fetchChartData();
  }, []);
  return (
    <ResponsiveContainer width={"100%"} height={300}>
      <BarChart width={150} height={40} data={chartData}>
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray='3 3' />
        <Bar dataKey='total' fill='#8884d8' />
      </BarChart>
    </ResponsiveContainer>
  );
};
