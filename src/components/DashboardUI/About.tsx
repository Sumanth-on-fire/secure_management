import React from "react";
import { Box, Typography, Card, CardContent, Grid, Divider } from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import TimelineIcon from "@mui/icons-material/Timeline";
import SecurityIcon from "@mui/icons-material/Security";

const About: React.FC = () => {
  return (
    <Box
      sx={{
        p: 3,
        background: "linear-gradient(to bottom, #00796b, #e0f7fa)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "#1a237e",
      }}
    >
      <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold", color: "white" }}>
        About Our Platform
      </Typography>
      <Typography
        variant="body1"
        sx={{
          textAlign: "center",
          maxWidth: "800px",
          lineHeight: "1.8",
          mb: 5,
          color: "white",
        }}
      >
        Our platform is your digital fortress, empowering you with tools to manage
        your data securely while keeping privacy at the forefront.
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {/* Card 1 */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
              "&:hover": { transform: "scale(1.05)", transition: "0.3s" },
            }}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <VerifiedUserIcon sx={{ fontSize: 50, color: "#4caf50" }} />
              <Typography variant="h5" sx={{ mt: 2 }}>
                Data Sovereignty
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1">
                Your data is your identity. We don’t just protect it; we empower
                you to manage it seamlessly, ensuring it stays in your control.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Card 2 */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
              "&:hover": { transform: "scale(1.05)", transition: "0.3s" },
            }}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <TimelineIcon sx={{ fontSize: 50, color: "#ff9800" }} />
              <Typography variant="h5" sx={{ mt: 2 }}>
                Activity Insights
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1">
                Track every action in your account—from changes to logins—
                ensuring transparency and accountability like never before.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Card 3 */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
              "&:hover": { transform: "scale(1.05)", transition: "0.3s" },
            }}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <SecurityIcon sx={{ fontSize: 50, color: "#d32f2f" }} />
              <Typography variant="h5" sx={{ mt: 2 }}>
                Uncompromising Security
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1">
                Powered by advanced encryption and monitoring, your data remains
                secure against unauthorized access and breaches.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box
        sx={{
          mt: 5,
          background: "white",
          borderRadius: 3,
          p: 3,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          maxWidth: "800px",
        }}
      >
        <Typography variant="h4" sx={{ color: "#1a237e", mb: 2 }}>
          Why Security Matters
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: "1.8" }}>
          Imagine a world where your data is scattered across platforms, vulnerable
          to threats. Our platform is here to reclaim your control. With us, you
          enjoy:
          <ul>
            <li><strong>Peace of Mind:</strong> No more worrying about unauthorized access.</li>
            <li><strong>Simplicity:</strong> Manage your data effortlessly in a sleek, intuitive dashboard.</li>
            <li><strong>Innovation:</strong> Leverage the latest technologies to safeguard your future.</li>
          </ul>
        </Typography>
      </Box>
    </Box>
  );
};

export default About;
