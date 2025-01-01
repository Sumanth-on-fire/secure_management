import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import Sidebar from "./Sidebar";
import PersonalInfo from "./PersonalInfo";
import DataAndPrivacy from "./DataAndPrivacy";
import About from "./About";
import AppHeader from "./AppHeader";
import AdminControls from "./AdminControls";
import UserLogsViewer from "./UserLogsViewer"
import {exportLogs} from '../../api/admin.js'

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Personal information");
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(()=>{
    const role = localStorage.getItem('role')
    setIsAdmin(role==="Admin")
  }, [])

  const handleExport = async () => {
    try{
      await exportLogs();
      // window.location.href = result.file_path;
    }
    catch(error){
      console.error("Failed to export logs:", error)
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case "Personal information":
        return <PersonalInfo />;
      case "Data and privacy":
        return <DataAndPrivacy isAdmin={isAdmin} handleExport={handleExport}/>;
      case "About":
        return <About />;
      case "Manage Users":
        // return <AdminControls isAdmin={isAdmin} handleExport={handleExport}/>
      // case "User Logs":
        return <UserLogsViewer isAdmin={isAdmin} handleExport={handleExport}/>;
      default:
        return <PersonalInfo />;
    }
  };

  

  return (
    <>
    <AppHeader/>
    <Box
        sx={{
          display: "flex",
          height: "calc(97vh - 64px)", // Adjusting for AppHeader height (default AppBar height is 64px)
          background: "linear-gradient(to bottom right, #f5f7fa, #c3cfe2)",
        }}
      >
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <Box
        sx={{
          width: "80%",
          overflowY: "auto",
          p: 3,
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          margin: 3,
        }}
      >
        {renderContent()}
      </Box>
    </Box>
    </>
  );
};

export default Dashboard;
