import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import axiosInstance from "../../api/axiosInstance";
import {fetchUserIP} from "../../common/ipAddress"
import {getUserProfile} from "../../api/user"
import PasswordInputWithEyeIcon from '../../common/muiItems/PasswordTextField'
import {updatePassword} from "../../api/auth"
import SnackBarComponent from "../../common/muiItems/Snackbar";
import {fieldVal,passwordVal,snackbarContent} from "../../common/enum.js";

const UserDashboard: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [currentPassword, setCurrentPassword] = useState<string | null>("")
  const [newPassword, setNewPassword] = useState<string | null>("")
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false)
  const [openSnackbar1, setOpenSnackbar1] = useState<boolean>(false)
  const [formData, setFormData] = useState({
    email: "",
    address: "",
    phoneNumber: "",
  });
  const [editData, setEditData] = useState({
    email: "",
    address: "",
    phoneNumber: "",
  });
  const [currData, setCurrData] = useState({
    current_email: "",
    current_address: "",
    current_phone: "",
  })

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await getUserProfile(localStorage.getItem('email'))
        const { email, address, phone_number, username, role } = response;
        localStorage.setItem('userName', username)
        localStorage.setItem('role', role)
        setFormData({
          email,
          address: address || "No address available",
          phoneNumber: phone_number || "No phone number available",
        });
        setEditData({
          email,
          address: address || "",
          phoneNumber: phone_number || "",
        });
        setCurrData({
          current_email: email,
          current_address: address || "",
          current_phone: phone_number || "",
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
        setMessage("Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCurrentPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPassword(e.target.value)
  }

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value)
  }

  const handleUpdatePassword = async () => {
    try{
      const isUpdated = await updatePassword({email: localStorage.getItem('email'), current_password: currentPassword, new_password: newPassword})
      if(isUpdated){
        setOpenSnackbar1(true)
      }
      else{
        setOpenSnackbar(true)
      }
    }
    catch(e){
      setOpenSnackbar(true)
    }
  }

  const handleUpdate = async (field: "email" | "address" | "phoneNumber") => {
    setLoading(true);
    const myIpAdd = await fetchUserIP()
    try {
      await axiosInstance.put(`/user/profile/${field}`, {
        email: currData[fieldVal['email']],
        [`new_${field}`]: editData[field],
        ip_address: myIpAdd
      });
      if(field==='email') localStorage.setItem('email', editData[field])
      setFormData((prev) => ({ ...prev, [field]: editData[field] }));
      setMessage(`${field.charAt(0).toUpperCase() + field.slice(1)} updated successfully.`);
    } catch (error) {
      if(field==='email') localStorage.setItem('email', currData[fieldVal[field]])
      console.error(`Error updating ${field}:`, error);
      setMessage(`Failed to update ${field}.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom right, #f5f7fa, #c3cfe2)",
        borderRadius: 3,
        p: 3,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ color: "#00796b" }}>
        Your Profile
      </Typography>
      {message && (
        <Typography color="error" sx={{ mb: 2 }}>
          {message}
        </Typography>
      )}
      <Grid container spacing={3} justifyContent="center">
        {/* Email Section */}
        <SnackBarComponent openSnackbar={openSnackbar} setOpenSnackbar={setOpenSnackbar} content={snackbarContent.passwordFailed}/>
        <SnackBarComponent openSnackbar={openSnackbar1} setOpenSnackbar={setOpenSnackbar1} content={snackbarContent.passwordSuccess}/>
        <Grid item xs={12} sm={6}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              background: "white",
              "&:hover": { transform: "scale(1.02)", transition: "0.3s" },
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                sx={{ color: "#37474f", fontWeight: "bold", mb: 2 }}
              >
                Email
              </Typography>
              <TextField
                fullWidth
                label="New Email"
                value={editData.email}
                name="email"
                onChange={handleInputChange}
                helperText={`Current: ${formData.email}`}
                sx={{ mt: 1 }}
              />
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  backgroundColor: "#00796b",
                  "&:hover": { backgroundColor: "#004d40" },
                }}
                onClick={() => handleUpdate("email")}
                disabled={loading}
              >
                {/* {loading ? <CircularProgress size={24} /> : `Update Email`} */}
                {`Update Email`}
              </Button>
            </CardContent>
          </Card>
        </Grid>


        {/* Phone Number Section */}
        <Grid item xs={12} sm={6}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              background: "white",
              "&:hover": { transform: "scale(1.02)", transition: "0.3s" },
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                sx={{ color: "#37474f", fontWeight: "bold", mb: 2 }}
              >
                Phone Number
              </Typography>
              <TextField
                fullWidth
                label="New Phone Number"
                value={editData.phoneNumber}
                name="phoneNumber"
                onChange={handleInputChange}
                helperText={`Current: ${formData.phoneNumber}`}
                sx={{ mt: 1 }}
              />
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  backgroundColor: "#00796b",
                  "&:hover": { backgroundColor: "#004d40" },
                }}
                onClick={() => handleUpdate("phoneNumber")}
                disabled={loading}
              >
                {/* {loading ? <CircularProgress size={24} /> : `Update Phone Number`} */}
                {`Update Phone Number`}
              </Button>
            </CardContent>
          </Card>
        </Grid>
        {/* Address Section (Moved here for more space) */}
        <Grid item xs={12} sm={6}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              background: "white",
              "&:hover": { transform: "scale(1.02)", transition: "0.3s" },
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                sx={{ color: "#37474f", fontWeight: "bold", mb: 2 }}
              >
                Address
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="New Address"
                value={editData.address}
                name="address"
                onChange={handleInputChange}
                helperText={`Current: ${formData.address}`}
                sx={{ mt: 1 }}
              />
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  backgroundColor: "#00796b",
                  "&:hover": { backgroundColor: "#004d40" },
                }}
                onClick={() => handleUpdate("address")}
                disabled={loading}
              >
                {`Update Address`}
              </Button>
            </CardContent>
          </Card>
        </Grid>
        {/* Change password */}
        <Grid item xs={12} sm={6}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              background: "white",
              "&:hover": { transform: "scale(1.02)", transition: "0.3s" },
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                sx={{ color: "#37474f", fontWeight: "bold", mb: 2 }}
              >
                Change Password
              </Typography>
              {/* <TextField
                fullWidth
                type="password"
                label="Current Password"
                value={currentPassword}
                name="currentPassword"
                onChange={handleCurrentPasswordChange}
                // helperText={`Current: ${formData.phoneNumber}`}
                sx={{ mt: 1, mb: 1.8 }}
              /> */}
              <PasswordInputWithEyeIcon textLabel={passwordVal.currPassword} password={currentPassword} handlePasswordChange={handleCurrentPasswordChange}/>
               {/* <TextField
                fullWidth
                label="New Password"
                value={newPassword}
                name="newPassword"
                onChange={handleNewPasswordChange}
                // helperText={`Current: ${formData.phoneNumber}`}
                sx={{ mt: 1, mb: 1}}
              /> */}
              <PasswordInputWithEyeIcon textLabel={passwordVal.newPassword} password={newPassword} handlePasswordChange={handleNewPasswordChange} />
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  backgroundColor: "#00796b",
                  "&:hover": { backgroundColor: "#004d40" },
                }}
                onClick={handleUpdatePassword}
                disabled={loading}
              >
                {/* {loading ? <CircularProgress size={24} /> : `Update Phone Number`} */}
                {`Update Password`}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

    </Box>
  );
};

export default UserDashboard
