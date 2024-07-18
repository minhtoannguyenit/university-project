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
              <TextField
                id="name-basic"
                label="Name"
                variant="outlined"
                defaultValue={event?.name}
              />
              <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={4}
                defaultValue={event?.description}
              />
              <TextField
                id="outlined-multiline-static"
                label="Location"
                variant="outlined"
                defaultValue={event?.location}
              />
              <TextField
                id="outlined-multiline-static"
                label="StartDate"
                variant="outlined"
                defaultValue={event?.startDate}
              />
               <TextField
                id="outlined-multiline-static"
                label="EndDate"
                variant="outlined"
                defaultValue={event?.endDate}
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
