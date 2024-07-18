'use client';
import { Button, Grid, Stack, TextField } from "@mui/material";
import BaseCard from '@/app/(DashboardLayout)/components/shared/BaseCard';
import { useEffect, useState } from "react";
import EventService from "@/app/services/EventService";
import { useRouter } from "next/navigation";

export default function CreateEvent(props: any) {
  
  const router = useRouter();
  const [event, setEvent] = useState({} as any);
  
  useEffect(() => {
    // createEvent();
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
