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
import ResourceService from "@/app/services/ResourceService";

export interface Resource {
  id: number;
  type: string;
  name: string;
  description: string;
  url: string;
  size: number;
  user: {
    id: number;
    email: string;
    role: string;
    status: string;
    firstName: string;
    lastName: string;
  };
};

const ResourcePerformance = (props: any) => {
  const [resources, setResources] = React.useState<Resource[]>([]);
  const getResourceList = async () => {
    const resp = await ResourceService.list();
    console.log('resp:', resp);
    if (resp) {
      setResources(resp?.content || []);
    }
  }
  useEffect(() => {
    getResourceList();
  }, []);

  const deleteResourceClicked = async (id: number) => {
    console.log('deleteResourceClicked:', id);
    await ResourceService.delete(id);
    alert('Resource deleted successfully');
    getResourceList();
  }

  const router = useRouter();
  return (
    <BaseCard title="Resources">
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
              <TableCell>Description</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resources.map((resource) => (
              <TableRow key={resource.id}>
                <TableCell>{resource.id}</TableCell>
                <TableCell><Link href={resource.url}>{resource.name}</Link></TableCell>
                <TableCell>{resource.description}</TableCell>
                <TableCell>{resource.size}</TableCell>
                <TableCell>{resource.user.firstName} {resource.user.lastName}</TableCell>
                <TableCell>
                  <IconButton color="secondary" aria-label="edit" onClick={() => router.push('/admin/resources/edit/' + resource.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={() => {deleteResourceClicked(resource.id)}}>
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

export default ResourcePerformance;