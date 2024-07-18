'use client';
import { Button, Grid, InputLabel, MenuItem, Stack, TextField } from "@mui/material";
import BaseCard from '@/app/(DashboardLayout)/components/shared/BaseCard';
import { useEffect, useState } from "react";
import DiscussionService from "@/app/services/DiscussionService";
import CategoryService from "@/app/services/CategoryService";
import { useRouter } from "next/navigation";
import Select from "@mui/material/Select";

export interface DiscussionDTO {
  discussion: {
    content: string;
  };
  content: string;
  category_id: number;

}

export default function CreateDiscussion(props: any) {
  
  const router = useRouter();
  const [discussion, setEvent] = useState({discussion: {content: ''}} as DiscussionDTO);
  const [categories, setCategories] = useState([] as any);
  const getCategories = async () => {
    const resp = await CategoryService.list();
    console.log('resp:', resp);
    if (resp) {
      setCategories(resp);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  const handleSelectChange = (e: any) => {
    discussion.category_id = e.target.value;
    setEvent(discussion);
  };

  const handleContentChange = (e: any) => {
    discussion.discussion.content = e.target.value;
    setEvent(discussion);
  }
  
  const submitEvent = async (e: any) => {
    console.log('discussion:', e, discussion);
    await DiscussionService.create(discussion);
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
          <BaseCard title="Create New Discussion:">
            <>
            <Stack spacing={3}>
              <TextField
                id="content"
                label="content"
                variant="outlined"
                value={discussion?.content}
                onChange={handleContentChange}
              />
              <InputLabel id="category">Select Category</InputLabel>
              <Select
                labelId="category"
                id="category"
                value={discussion.category_id}
                label="category"
                onChange={handleSelectChange}
              >
                {categories.map((category: any) => (<MenuItem key={category.id} value={category.id}>{category.title}</MenuItem>))}
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
