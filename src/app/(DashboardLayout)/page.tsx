'use client'
import { Grid, Box, Alert } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';


const Dashboard = () => {

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
    <Box mt={3} >

      <Alert variant="outlined" severity="success">
        User Profile
      </Alert>
      <Alert variant="outlined" severity="success">
        Discussion Categories
      </Alert>
      <Alert variant="outlined" severity="success">
        Threaded Discussions
      </Alert>
      <Alert variant="outlined" severity="success">
        Resource Library
      </Alert>
      <Alert variant="outlined" severity="success">
        Event Management
      </Alert>
      <Alert variant="outlined" severity="success">
        Students Insights and Surveys
      </Alert>
      <Alert variant="outlined" severity="success">
        Students And Admin
      </Alert>
    </Box>
  </PageContainer>
  )
}

export default Dashboard;
