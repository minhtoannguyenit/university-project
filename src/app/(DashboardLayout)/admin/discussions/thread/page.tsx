'use client';
import { Button, Grid, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import BaseCard from '@/app/(DashboardLayout)/components/shared/BaseCard';
import { use, useEffect, useState } from "react";
import ThreadService from "@/app/services/ThreadService";
import DiscussionService from "@/app/services/DiscussionService";
import { useRouter } from "next/navigation";

export interface ThreadDTO {
  thread: {
    comment: string;
  },
  comment: string;
  discussion_id: number;
}

export default function CreateThread(props: any) {
  
  const router = useRouter();
  const [thread, setThread] = useState({thread: {comment: ''}} as ThreadDTO);
  const [discussions, setDiscussion] = useState([] as any);

  const handleSelectChange = (e: any) => {
    thread.discussion_id = e.target.value;
    setThread(thread);
  }

  const handleCommentChange = (e: any) => {
    thread.thread.comment = e.target.value;
    setThread(thread);
  }
  
  const getDiscussion = async () => {
    const resp = await DiscussionService.list();
    console.log('resp:', resp);
    if (resp) {
      setDiscussion(resp);
    }
  }

  useEffect(() => {
    getDiscussion();
  }, [props.params.id]);
  
  const submitEvent = async (e: any) => {
    console.log('thread:', e);
    await ThreadService.create(thread);
    alert('Event created successfully');
  }

  return (
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
        <Button variant="outlined" onClick={() => router.push('/admin/discussions')}>
          Cancel
        </Button>
      </Grid>
        <Grid item xs={12} lg={12}>
          <BaseCard title="Create New Thread:">
            <>
            <Stack spacing={3}>
              <TextField
                id="comment"
                label="comment"
                variant="outlined"
                value={thread.comment}
                onChange={handleCommentChange}
              />
              <InputLabel id="discusion">Select Discusion Topic</InputLabel>
              <Select
                labelId="discusion"
                id="discusion"
                value={thread?.discussion_id}
                label="discusion"
                onChange={handleSelectChange}
              >
                {discussions.map((discussion: any) => (<MenuItem key={discussion.id} value={discussion.id}>{discussion.content}</MenuItem>))}
              </Select>
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
