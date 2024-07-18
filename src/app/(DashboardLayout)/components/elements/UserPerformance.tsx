import React, { useEffect } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  TableContainer,
  Fab,
  styled,
  IconButton,
} from "@mui/material";
import BaseCard from "../shared/DashboardCard";
import Link from "next/link";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from "next/navigation";
import UserService from "@/app/services/UserService";

export interface Resource {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  role: string;
  status: string;
  avatar: string;
  loginAttempts: number;
  createdAt: string;
};

const UserPerformance = (props: any) => {
  const [users, setUsers] = React.useState<Resource[]>([]);
  const getResourceList = async () => {
    const resp = await UserService.list();
    console.log('resp:', resp);
    if (resp) {
      setUsers(resp || []);
    }
  }
  useEffect(() => {
    getResourceList();
  }, []);

  const deleteResourceClicked = async (id: number) => {
    await UserService.delete(id);
    alert('User deleted successfully');
    getResourceList();
  }

  const router = useRouter();
  return (
    <BaseCard title="Users">
      <TableContainer
        sx={{
          width: {
            xs: "274px",
            sm: "100%",
          },
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>LoginAttempts</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Avatar</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>{user.loginAttempts}</TableCell>
                <TableCell>{user.createdAt}</TableCell>
                <TableCell>{user.avatar}</TableCell>
                <TableCell>
                  <IconButton color="secondary" aria-label="edit" onClick={() => router.push('/admin/users/edit/' + user.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={() => {deleteResourceClicked(user.id)}}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </BaseCard>
  );
};

export default UserPerformance;