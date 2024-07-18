'use client';
import { Button, Grid, Stack, TextField } from "@mui/material";
import BaseCard from '@/app/(DashboardLayout)/components/shared/BaseCard';
import { useEffect, useState } from "react";
import SurveyService from "@/app/services/SurveyService";
import { useRouter } from "next/navigation";

export default function CreateSurvey(props: any) {
  
  const router = useRouter();
  const [survey, setSurvey] = useState({} as any);
  const createSurvey = async () => {
      const resp = await SurveyService.create();
      if (resp) {
        setSurvey(resp);
      }
  }

  useEffect(() => {
    createSurvey();
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
              <TextField
                id="name-basic"
                label="Name"
                variant="outlined"
                value={survey?.name}
              />
              <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={4}
                value={survey?.description}
              />
              <TextField
                id="outlined-multiline-static"
                label="Location"
                variant="outlined"
                value={survey?.location}
              />
              <TextField
                id="outlined-multiline-static"
                label="StartDate"
                variant="outlined"
                value={survey?.startDate}
                defaultValue={survey?.startDate}
              />
               <TextField
                id="outlined-multiline-static"
                label="EndDate"
                variant="outlined"
                value={survey?.endDate}
                defaultValue={survey?.endDate}
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
