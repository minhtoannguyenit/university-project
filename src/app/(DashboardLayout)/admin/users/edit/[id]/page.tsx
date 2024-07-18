'use client';
import { Button, Grid, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import BaseCard from '@/app/(DashboardLayout)/components/shared/BaseCard';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import UserService from "../../../../../services/UserService";


export default function EditUser(props: any) {
  const { id } = useParams();
  
  const router = useRouter();
  const [user, setUser] = useState({} as any);
  const getEvent = async () => {
      const resp = await UserService.getId(id);
      if (resp) {
        setUser(resp);
      }
  }

  useEffect(() => {
    getEvent();
  }, [props.params.id]);

  const submitEvent = (e: any) => {
    console.log('user:', e);
    const resp = UserService.edit(id, user);
    if (resp) {
      setUser(resp);
    }
  }

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

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={12}>
      <Button variant="outlined" onClick={() => router.push('/admin/users')}>
        Cancel
      </Button>
    </Grid>
      <Grid item xs={12} lg={12}>
        <BaseCard title="Update User:">
          <>
          <Stack spacing={3}>
            <label htmlFor="firstName">First name</label>
            <TextField
              id="firstName"
              // label="First Name"
              variant="outlined"
              value={user?.firstName}
              onChange={(e) => setUser({...user, firstName: e.target.value})}
            />
            <label htmlFor="lastName">Last name</label>
            <TextField
              id="lastName"
              // label="Last Name"
              variant="outlined"
              value={user?.lastName}
              onChange={(e) => setUser({...user, lastName: e.target.value})}
            />
            <label htmlFor="email">Email</label>
            <TextField
              id="email"
              // label="Email"
              value={user?.email}
              onChange={(e) => setUser({...user, email: e.target.value})}
            />
            <label htmlFor="username">Username</label>
            <TextField
              id="username"
              // label="Username"
              value={user?.username}
              onChange={(e) => setUser({...user, username: e.target.value})}
            />
            <InputLabel id="role">User Role:</InputLabel>
              <Select
                labelId="role"
                id="role"
                value={user.role}
                label="role"
                defaultValue={user.role}
                onChange={handleSelectRole}
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
                defaultValue={user.status}
                onChange={handleSelectStatus}
              >
                <MenuItem key={1} value="INACTIVE">INACTIVE</MenuItem>
                <MenuItem key={2} value="ACTIVE">ACTIVE</MenuItem>
                <MenuItem key={3} value="BLOCKED">BLOCKED</MenuItem>
              </Select>
          </Stack>
          <br />
          <Button variant="contained" onClick={submitEvent}>
            Submit
          </Button>
          </>
        </BaseCard>
      </Grid>
    </Grid>
  );
};
