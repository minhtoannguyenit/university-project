'use client';
import { Button, Grid, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import BaseCard from '@/app/(DashboardLayout)/components/shared/BaseCard';
import { useEffect, useState } from "react";
import EventService from "@/app/services/EventService";
import { useRouter } from "next/navigation";
import { Label } from "@mui/icons-material";

export default function CreateEvent(props: any) {
  
  const router = useRouter();
  const [user, setUser] = useState({} as any);
  const createEvent = async () => {
      const resp = await EventService.create();
      if (resp) {
        setUser(resp);
      }
  }

  useEffect(() => {
    createEvent();
  }, [props.params.id]);

  const handleChange = (e: any) => {
    console.log('e:', e);
    const { id, value } = e.target;
    setUser((prevUser: any) => ({
      ...prevUser,
      [id]: value
    }));
  };

  const handleSelectStatus = (e: any) => {
    console.log('e:', e);
    const { value } = e.target;
    setUser((prevUser: any) => ({
      ...prevUser,
      status: value
    }));
  }

  const handleSelectRole = (e: any) => {
    console.log('e:', e);
    const { value } = e.target;
    setUser((prevUser: any) => ({
      ...prevUser,
      role: value
    }));
  }
  
  const submitEvent = async (e: any) => {
    console.log('user:', user);
    await EventService.create(user);
    alert('Event created successfully');
  }

  return (
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
        <Button variant="outlined" onClick={() => router.push('/admin/users')}>
          Cancel
        </Button>
      </Grid>
        <Grid item xs={12} lg={12}>
          <BaseCard title="Create New User:">
            <>
            <Stack spacing={3}>
              <label htmlFor="firstName">First Name</label>
              <TextField
                id="firstName"
                label="First Name"
                variant="outlined"
                value={user?.firstName}
                onChange={(e) => setUser({...user, firstName: e.target.value})}
              />
              <label htmlFor="lastName">Last Name</label>
              <TextField
                id="lastName"
                label="Last Name"
                variant="outlined"
                value={user?.lastName}
                onChange={(e) => setUser({...user, lastName: e.target.value})}
              />
              <label htmlFor="email">Email</label>
              <TextField
                id="email"
                label="Email"
                value={user?.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
              />
              <label htmlFor="username">Username</label>
              <TextField
                id="username"
                label="Username"
                value={user?.username}
                onChange={(e) => setUser({...user, username: e.target.value})}
              />
              <InputLabel id="role">User Role:</InputLabel>
              <Select
                labelId="role"
                id="role"
                value={user.role}
                label="role"
                onChange={e => setUser({...user, role: e.target.value})}
              >
                <MenuItem key={1} value="ADMIN">ADMIN</MenuItem>
                <MenuItem key={2} value="STUDENT">STUDENT</MenuItem>
                
              </Select>
              <InputLabel id="status">User Status</InputLabel>
              <Select
                labelId="status"
                id="status"
                value={user.status}
                label="status"
                onChange={e => setUser({...user, status: e.target.value})}
              >
                <MenuItem key={1} value="INACTIVE">INACTIVE</MenuItem>
                <MenuItem key={2} value="ACTIVE">ACTIVE</MenuItem>
                <MenuItem key={3} value="BLOCKED">BLOCKED</MenuItem>
              </Select>
            </Stack>
            <br />
            <Button variant="contained" href="#contained-buttons" onClick={submitEvent}>
              Submit
            </Button>
            </>
          </BaseCard>
        </Grid>
      </Grid>
    );
};
