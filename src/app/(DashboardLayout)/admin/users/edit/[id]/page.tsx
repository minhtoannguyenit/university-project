'use client';
import { Button, Grid, Select, Stack, TextField } from "@mui/material";
import BaseCard from '@/app/(DashboardLayout)/components/shared/BaseCard';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import UserService from "../../../../../services/UserService";


export default function EditEvent(props: any) {
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
            />
            <label htmlFor="lastName">Last name</label>
            <TextField
              id="lastName"
              // label="Last Name"
              variant="outlined"
              value={user?.lastName}
            />
            <label htmlFor="email">Email</label>
            <TextField
              id="email"
              // label="Email"
              value={user?.email}
            />
            <label htmlFor="username">Username</label>
            <TextField
              id="username"
              // label="Username"
              value={user?.username}
            />
            <label htmlFor="role">
             User Role:
            </label>
            <Select defaultValue="STUDENT" id="role" name="role">
              <option value="ADMIN">ADMIN</option>
              <option value="STUDENT">STUDENT</option>
            </Select>
            <label htmlFor="status">
             User Status:
            </label>
            <Select defaultValue="INACTIVE" id="status" name="status">
              <option value="INACTIVE">INACTIVE</option>
              <option value="ACTIVE">ACTIVE</option>
              <option value="BLOCKED">BLOCKED</option>
            </Select>
          </Stack>
          <br />
          <Button variant="contained" onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => submitEvent(user)}>
            Submit
          </Button>
          </>
        </BaseCard>
      </Grid>
    </Grid>
  );
};
