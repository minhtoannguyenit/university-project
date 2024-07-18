'use client';
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Stack, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import BaseCard from '@/app/(DashboardLayout)/components/shared/BaseCard';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import EventService from "../../../../../services/EventService";

export default function EditEvent(props: any) {
  const { id } = useParams();
  
  const router = useRouter();
  const [event, setEvent] = useState({} as any);
  const getEvent = async () => {
      const resp = await EventService.getId(id);
      if (resp) {
        setEvent(resp);
      }
  }

  useEffect(() => {
    getEvent();
  }, [props.params.id]);

  return (
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
        <Button variant="outlined" onClick={() => router.push('/admin/events')}>
          Cancel
        </Button>
      </Grid>
        <Grid item xs={12} lg={12}>
          <BaseCard title="Edit New Event:">
            <>
            <Stack spacing={3}>
            <label htmlFor="name">Name</label>
              <TextField
                id="name"
                variant="outlined"
                value={event?.name}
                onChange={(e) => setEvent({...event, name: e.target.value})}
              />
              <label htmlFor="description">Description</label>
              <TextField
                id="description"
                multiline
                rows={4}
                value={event?.description}
                onChange={(e) => setEvent({...event, description: e.target.value})}
              />
              <label htmlFor="location">Location</label>
              <TextField
                id="location"
                variant="outlined"
                value={event?.location}
                onChange={(e) => setEvent({...event, location: e.target.value})}
              />
              <label htmlFor="startdate">StartDate</label>
              <TextField
                id="startdate"
                variant="outlined"
                value={event?.startDate}
                defaultValue={event?.startDate}
                onChange={(e) => setEvent({...event, startDate: e.target.value})}
              />
               <label htmlFor="enddate">EndDate</label>
               <TextField
                id="enddate"
                variant="outlined"
                value={event?.endDate}
                onChange={(e) => setEvent({...event, endDate: e.target.value})}
              />
              <Table>
              <TableHead> <h2>Attendess:</h2>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {event && event?.attendees ? event?.attendees.map((attendee: any | []) => (
                  <TableRow key={attendee.id}>
                    <TableCell>{attendee.id}</TableCell>
                    <TableCell>{attendee.firstName} {attendee.lastName}</TableCell>
                    <TableCell>{attendee.email}</TableCell>
                    <TableCell>{attendee.role}</TableCell>
                  </TableRow>
                )) : null}
              </TableBody>
            </Table>
            </Stack>
            <br />
            <Button variant="contained" href="#contained-buttons">
              Submit
            </Button>
            </>
          </BaseCard>
        </Grid>
      </Grid>
    );
};
