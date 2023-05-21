import React from "react";
import { Card, Metric, Text } from "@tremor/react";
import KpiCardGrid from "./Chart/KpiCardGrid";
import "./Dashboard.css";
import NavBar from "components/nav/nav";

const Dashboard = () => {
  return (
    <div>
      <NavBar host />
      <KpiCardGrid />
    </div>
  );
};

export default Dashboard;
