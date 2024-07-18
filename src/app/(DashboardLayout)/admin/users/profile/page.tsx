'use client';
import { Button, Grid, Select, Stack, TextField } from "@mui/material";
import BaseCard from '@/app/(DashboardLayout)/components/shared/BaseCard';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import UserService from "@/app/services/UserService";

export default function UserProfle(props: any) {
  const sesson = sessionStorage.getItem('current_user') || '{}';
  console.log('sesson:', sesson, JSON.parse(sesson).id);
  const { id } = sesson ? (JSON.parse(sesson)) : { id: 0 };
  
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
  }, [id]);

  const submitEvent = (e: any) => {
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
        <BaseCard title="Create New User:">
          <>
          <Stack spacing={3}>
            <TextField
              id="firstName"
              label="First Name"
              variant="outlined"
              value={user?.firstName}
            />
            <TextField
              id="lastName"
              label="Last Name"
              variant="outlined"
              value={user?.lastName}
            />
            <TextField
              id="email"
              label="Email"
              value={user?.email}
            />
            <TextField
              id="username"
              label="Username"
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
