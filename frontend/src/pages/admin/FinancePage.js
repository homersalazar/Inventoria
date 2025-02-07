import React from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import SideBar from "../../components/admin/SideBar";

// Register required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const FinancePage = () => {
    const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]; // Replace with actual month names

    const data = {
        labels: labels,
        datasets: [
            {
                label: "Monthly Performance",
                data: [65, 59, 80, 81, 56, 55, 40],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                    "rgba(255, 205, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(201, 203, 207, 0.2)",
                ],
                borderColor: [
                    "rgb(255, 99, 132)",
                    "rgb(255, 159, 64)",
                    "rgb(255, 205, 86)",
                    "rgb(75, 192, 192)",
                    "rgb(54, 162, 235)",
                    "rgb(153, 102, 255)",
                    "rgb(201, 203, 207)",
                ],
                borderWidth: 1,
            },
        ],
    };

    const date = new Date();

    return (
        <>
            <SideBar />
            <div className='flex flex-col gap-10 px-5 md:ml-56'>
                <h1 className='text-2xl md:text-3xl font-semibold'>Finances</h1>
                <div className="flex flex-row gap-5 w-full">
                    <select className="select select-bordered w-full max-w-xs">
                        <option disabled selected>View range</option>
                        <option>Han Solo</option>
                        <option>Greedo</option>
                    </select>
                    <span className="py-3">{date.toDateString()}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
                    <div className="border-2 rounded-lg p-5 border-[var(--secondary)] h-full">
                        <Bar data={data} options={{ maintainAspectRatio: false }} />
                    </div>
                    <div className="border-2 rounded-lg p-5 border-[var(--secondary)] h-full">
                        <Bar data={data} options={{ maintainAspectRatio: false }} />
                    </div>
                    <div className="border-2 rounded-lg p-5 border-[var(--secondary)] h-full">
                        <Bar data={data} options={{ maintainAspectRatio: false }} />
                    </div>
                </div>
            </div>
        </>

    );
};

export default FinancePage;
