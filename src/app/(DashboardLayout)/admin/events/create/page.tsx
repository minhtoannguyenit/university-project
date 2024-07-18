'use client';
import { Button, Grid, Stack, TextField } from "@mui/material";
import BaseCard from '@/app/(DashboardLayout)/components/shared/BaseCard';
import { useEffect, useState } from "react";
import EventService from "@/app/services/EventService";
import { useRouter } from "next/navigation";

export default function CreateEvent(props: any) {
  
  const router = useRouter();
  const [event, setEvent] = useState({} as any);
  const createEvent = async () => {
      const resp = await EventService.create();
      if (resp) {
        setEvent(resp);
      }
  }

  useEffect(() => {
    createEvent();
  }, [props.params.id]);
  
  const submitEvent = async (e: any) => {
    console.log('event:', e);
    await EventService.create(event);
    alert('Event created successfully');
  }

  return (
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
        <Button variant="outlined" onClick={() => router.push('/admin/events')}>
          Cancel
        </Button>
      </Grid>
        <Grid item xs={12} lg={12}>
          <BaseCard title="Create New Event:">
            <>
            <Stack spacing={3}>
              <TextField
                id="name-basic"
                label="Name"
                variant="outlined"
                value={event?.name}
              />
              <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={4}
                value={event?.description}
              />
              <TextField
                id="outlined-multiline-static"
                label="Location"
                variant="outlined"
                value={event?.location}
              />
              <TextField
                id="outlined-multiline-static"
                label="StartDate"
                variant="outlined"
                value={event?.startDate}
                defaultValue={event?.startDate}
              />
               <TextField
                id="outlined-multiline-static"
                label="EndDate"
                variant="outlined"
                value={event?.endDate}
                defaultValue={event?.endDate}
              />
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
