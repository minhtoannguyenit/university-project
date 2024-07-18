'use client';
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Paper, Radio, RadioGroup, Stack, TextField } from "@mui/material";
import BaseCard from '@/app/(DashboardLayout)/components/shared/BaseCard';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ResourceService from "@/app/services/ResourceService";
import { useEffect, useState } from "react";

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export interface ResourceDTO {
  desc: string;
  file: File
}

const CreateResource = () => {
  const router = useRouter();

  const [resource, setResource] = useState({ desc: '', file: null } as unknown as ResourceDTO);
  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    setResource((prevResource: any) => ({
      ...prevResource,
      file: file
    }));
  };

  const submitEvent = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('desc', resource.desc);
    formData.append('file', resource.file);
  
    console.log('formData:', formData);
    console.log('resource:', resource);

    await ResourceService.create(formData);
    alert('Resource created successfully');
  }

  return (
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
        <Button variant="outlined" onClick={() => router.push('/admin/resources')}>
          Cancel
        </Button>
      </Grid>
        <Grid item xs={12} lg={12}>
          <BaseCard title="Create New Resource:">
            <>
            <Stack spacing={3}>
              <label htmlFor="description">Description</label>
              <TextField
                id="description"
                name="description"
                multiline
                rows={4}
                onChange={(e) => setResource({...resource, desc: e.target.value})}
              />
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <VisuallyHiddenInput type="file" name="file" onChange={handleFileChange} />
            </Button>
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

export default CreateResource;