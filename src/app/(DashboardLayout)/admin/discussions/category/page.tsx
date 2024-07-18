'use client';
import { Backdrop, Button, css, Fade, Grid, IconButton, Modal, Stack, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import BaseCard from '@/app/(DashboardLayout)/components/shared/BaseCard';
import { useEffect, useState } from "react";
import CategoryService from "@/app/services/CategoryService";
import { useRouter } from "next/navigation";
import React from "react";

export default function CreateCategory(props: any) {
  
  const router = useRouter();
  const [category, setCategory] = useState({} as any);

  const [threads, setThreads] = useState([] as any);
  
  const getAllThreads = async () => {
    const resp = await CategoryService.list();
    if (resp) {
      setThreads(resp);
    }
  }


  useEffect(() => {
    getAllThreads();
  }, [props.params.id]);
  
  const submitEvent = async (e: any) => {
    console.log('category:', e);
    await CategoryService.create(category);
    alert('Event created successfully');
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const blue = {
    200: '#99CCFF',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0066CC',
  };
  
  const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
  };
  
  const Modal2 = styled(Modal)`
    position: fixed;
    z-index: 1300;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  
  const StyledBackdrop = styled(Backdrop)`
    z-index: -1;
    position: fixed;
    inset: 0;
    background-color: rgb(0 0 0 / 0.5);
    -webkit-tap-highlight-color: transparent;
  `;
  
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
  };
  
  const ModalContent = styled('div')(
    ({ theme }) => css`
      font-family: 'IBM Plex Sans', sans-serif;
      font-weight: 500;
      text-align: start;
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 8px;
      overflow: hidden;
      background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
      border-radius: 8px;
      border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
      box-shadow: 0 4px 12px
        ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
      padding: 24px;
      color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};
  
      & .modal-title {
        margin: 0;
        line-height: 1.5rem;
        margin-bottom: 8px;
      }
  
      & .modal-description {
        margin: 0;
        line-height: 1.5rem;
        font-weight: 400;
        color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
        margin-bottom: 4px;
      }
    `,
  );
  
  const TriggerButton = styled(Button)(
    ({ theme }) => css`
      font-family: 'IBM Plex Sans', sans-serif;
      font-weight: 600;
      font-size: 0.875rem;
      line-height: 1.5;
      padding: 8px 16px;
      border-radius: 8px;
      transition: all 150ms ease;
      cursor: pointer;
      background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
      border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
      color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
      box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  
      &:hover {
        background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
        border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
      }
  
      &:active {
        background: ${theme.palette.mode === 'dark' ? grey[700] : grey[100]};
      }
  
      &:focus-visible {
        box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
        outline: none;
      }
    `,
  );
  
  return (
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <Button variant="outlined" onClick={() => router.push('/admin/discussions')}>
            Cancel
          </Button>
          <Button variant="outlined" onClick={handleOpen}>View Categories</Button>
          <Modal2
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: StyledBackdrop }}
          >
            <Fade in={open}>
              <ModalContent sx={style}>
                <BaseCard title="Categories">
                  <TableContainer
                    sx={{
                      width: {
                        xs: "274px",
                        sm: "100%",
                      },
                      height: {
                        xs: "274px",
                        sm: "300px",
                      },
                    }}
                  >
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>ID</TableCell>
                          <TableCell>Content</TableCell>
                          <TableCell>Number of Discussions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {threads.map((thread: any) => (
                          <TableRow key={thread.id}>
                            <TableCell>{thread.id}</TableCell>
                            <TableCell>{thread.title}</TableCell>
                            <TableCell>{thread.discussions.length || 0}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    </TableContainer>
                  </BaseCard>
              </ModalContent>
            </Fade>
          </Modal2>
        </Grid>
        <Grid item xs={12} lg={12}>
          <BaseCard title="Create New Category:">
            <>
            <Stack spacing={3}>
              <TextField
                id="title"
                label="title"
                variant="outlined"
                value={category?.title}
                onChange={(e) => setCategory({...category, title: e.target.value})}
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
