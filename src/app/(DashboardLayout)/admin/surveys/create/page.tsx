'use client';
import { Button, Grid, Stack, TextField } from "@mui/material";
import BaseCard from '@/app/(DashboardLayout)/components/shared/BaseCard';
import { useEffect, useState } from "react";
import SurveyService from "@/app/services/SurveyService";
import { useRouter } from "next/navigation";

export default function CreateSurvey(props: any) {
  
  const router = useRouter();
  const [survey, setSurvey] = useState({} as any);
 

  useEffect(() => {
    // createSurvey();
  }, [props.params.id]);
  
  const submitSurvey = async (e: any) => {
    console.log('Survey:', e);
    await SurveyService.create(survey);
    alert('Survey created successfully');
  }

  return (
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
        <Button variant="outlined" onClick={() => router.push('/admin/surveys')}>
          Cancel
        </Button>
      </Grid>
        <Grid item xs={12} lg={12}>
          <BaseCard title="Create New Survey:">
            <>
            <Stack spacing={3}>
              <label htmlFor="title">Title</label>
              <TextField
                id="title"
                label="title"
                variant="outlined"
                value={survey?.title}
                onChange={(e) => setSurvey({...survey, title: e.target.value})}
              />
              <label htmlFor="description">Description</label>
              <TextField
                id="description"
                label="description"
                multiline
                rows={4}
                value={survey?.description}
                onChange={(e) => setSurvey({...survey, description: e.target.value})}
              />
              <label htmlFor="rate">Rate</label>
              <TextField
                id="rate"
                label="rate"
                variant="outlined"
                value={survey?.rate}
                type="number"
                onChange={(e) => setSurvey({...survey, rate: e.target.value})}
              />
               <label htmlFor="comment">Comment</label>
              <TextField
                id="comment"
                label="comment"
                variant="outlined"
                value={survey?.comment}
                defaultValue={survey?.comment}
                onChange={(e) => setSurvey({...survey, comment: e.target.value})}
              />
              <label htmlFor="name">Name</label>
               <TextField
                id="name"
                label="name"
                variant="outlined"
                value={survey?.name}
                defaultValue={survey?.name}
                onChange={(e) => setSurvey({...survey, name: e.target.value})}
              />
            </Stack>
            <br />
            <Button variant="contained" href="#contained-buttons" onClick={submitSurvey}>
              Submit
            </Button>
            </>
          </BaseCard>
        </Grid>
      </Grid>
    );
};
