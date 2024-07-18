import React, { useEffect, useState } from "react";
import {
  Box,
  Menu,
  Avatar,
  Typography,
  Divider,
  Button,
  IconButton,
  ListItemButton,
  List,
  ListItemText,
} from "@mui/material";

import {
  IconChevronDown,
} from "@tabler/icons-react";

export interface UserProfile {
  email: string;
  firstName: string;
  id: number;
  lastName: string;
}

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [loggedUser, setLoggedUser] = useState<UserProfile | null>(null);
  useEffect(() => {
    const currentUsers: UserProfile | null = JSON.parse(sessionStorage.getItem("current_user") || "{}");
    if (currentUsers) {
      setLoggedUser(currentUsers);
    }
  }, []);

  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  const loggoutClicked = () => {
    sessionStorage.removeItem("current_user");
    window.location.href = "/login";
  }

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="menu"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === "object" && {
            borderRadius: "9px",
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src={"/images/users/user2.jpg"}
          alt={"ProfileImg"}
          sx={{
            width: 30,
            height: 30,
          }}
        />
        <Box
          sx={{
            display: {
              xs: "none",
              sm: "flex",
            },
            alignItems: "center",
          }}
        >
          <Typography
            color="textSecondary"
            variant="h5"
            fontWeight="400"
            sx={{ ml: 1 }}
          >
            Hi,
          </Typography>
          <Typography
            variant="h5"
            fontWeight="700"
            sx={{
              ml: 1,
            }}
          >
            {loggedUser?.firstName} {loggedUser?.lastName}
          </Typography>
          <IconChevronDown width="20" height="20" />
        </Box>
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "360px",
            p: 2,
            pb: 2,
            pt:0
          },
        }}
      >

        <Box pt={0}>
          <List>
            <ListItemButton component="a" href="/admin/users/profile">
              <ListItemText primary="Edit Profile" />
            </ListItemButton>
          </List>

        </Box>
        <Divider />
        <Box mt={2}>
          <Button fullWidth variant="contained" color="primary" onClick={loggoutClicked}>
            Logout
          </Button>
        </Box>

      </Menu>
    </Box>
  );
};

export default Profile;
