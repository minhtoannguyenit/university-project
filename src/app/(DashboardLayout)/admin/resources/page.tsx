'use client';
import { Button, Grid, Paper, Stack } from "@mui/material";
import BaseCard from '@/app/(DashboardLayout)/components/shared/BaseCard';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { useRouter } from 'next/navigation';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body1,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: '60px',
  }));

  const BootstrapButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#0063cc',
    borderColor: '#0063cc',
    margin: '0 0px 15px 10px',
    float: 'right',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      backgroundColor: '#0069d9',
      borderColor: '#0062cc',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#0062cc',
      borderColor: '#005cbf',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  });

import ResourcePerformance from "@/app/(DashboardLayout)/components/elements/ResourcePerformance";
import { AddCircle } from "@mui/icons-material";

const Tables = () => {
  const router = useRouter()

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <BootstrapButton variant="contained" endIcon={<AddCircle />} onClick={() => router.push('/admin/resources/create')}>Create Resource</BootstrapButton>
      </Grid>
      <Grid item xs={12} lg={12}>
        <ResourcePerformance />
      </Grid>
    </Grid>
  );
};

export default Tables;