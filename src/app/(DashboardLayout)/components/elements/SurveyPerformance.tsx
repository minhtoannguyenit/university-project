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
import EventService from "@/app/services/EventService";

export interface Event {
  id: number;
  name: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  attendees: [] | any;
};

const EventPerformance = (props: any) => {
  const [events, setEvents] = React.useState<Event[]>([]);
  const getEventList = async () => {
    const resp = await EventService.list();
    console.log('resp:', resp);
    if (resp) {
      setEvents(resp || []);
    }
  }
  useEffect(() => {
    getEventList();
  }, []);

  const deleteEventClicked = async (id: number) => {
    await EventService.delete(id);
    getEventList();
  }

  const router = useRouter();
  return (
    <BaseCard title="Events">
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
              <TableCell>Location</TableCell>
              <TableCell>Duration Date</TableCell>
              <TableCell>Attendees</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell>{event.id}</TableCell>
                <TableCell>{event.name}</TableCell>
                <TableCell>{event.description}</TableCell>
                <TableCell>{event.location}</TableCell>
                <TableCell>{event.startDate} - {event.endDate}</TableCell>
                <TableCell>{event.attendees.length || 0}</TableCell>
                <TableCell>
                  <IconButton color="secondary" aria-label="edit" onClick={() => router.push('/admin/events/edit/' + event.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={() => {deleteEventClicked(event.id)}}>
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

export default EventPerformance;