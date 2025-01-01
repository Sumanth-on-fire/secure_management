import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import SecurityIcon from "@mui/icons-material/Security";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PeopleIcon from "@mui/icons-material/People"; // NEW ICON
import TimelineIcon from '@mui/icons-material/Timeline';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const role = localStorage.getItem("role"); // Retrieve user role

  const tabs = [
    { label: "Personal information", icon: <AccountCircleIcon /> },
    { label: "Data and privacy", icon: <SecurityIcon /> },
    { label: "About", icon: <InfoIcon /> },
  ];

  if (role === "Admin") {
    tabs.push({ label: "Manage Users", icon: <PeopleIcon /> }); // Add "Manage Users" for admins
    // tabs.push({ label: "User Logs", icon: <TimelineIcon /> });
  }

  return (
    <Box
      sx={{
        width: "20%",
        backgroundColor: "#263238",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 3,
        boxShadow: "2px 0 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <List sx={{ width: "100%" }}>
        {tabs.map((tab) => (
          <ListItem key={tab.label} disablePadding>
            <ListItemButton
              selected={activeTab === tab.label}
              onClick={() => setActiveTab(tab.label)}
              sx={{
                py: 2,
                color: activeTab === tab.label ? "#26c6da" : "white",
                "&.Mui-selected": { backgroundColor: "#37474f" },
                "&:hover": { backgroundColor: "#455a64" },
              }}
            >
              <ListItemIcon
                sx={{ color: activeTab === tab.label ? "#26c6da" : "white" }}
              >
                {tab.icon}
              </ListItemIcon>
              <ListItemText primary={tab.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
