import React from "react";
import { Link } from "react-router-dom";
import logo from '../../assets/shareskill.jpg'
import Header from "../user/layouts/header";
import SideBar from "./layouts/SideBar";

const Dashboard = () => {
  return (
    <div className="max-h-screen bg-zinc-100">
      <SideBar/>
    </div>
  )
}

export default Dashboard
