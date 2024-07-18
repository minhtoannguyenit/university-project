import React, { useEffect } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  TableContainer,
  Fab,
  styled,
  IconButton,
  Pagination,
} from "@mui/material";
import BaseCard from "../shared/DashboardCard";
import ViewAgenda from '@mui/icons-material/ViewAgenda';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from "next/navigation";
import DiscussionService from "@/app/services/DiscussionService";

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';

import Stack from '@mui/material/Stack';
import SnackbarContent from '@mui/material/SnackbarContent';

export interface Thread {
  id: number;
  comment: string;
};
export interface Discussion {
  id: number;
  content: string;
  threads: Thread[] | null;
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));


const DiscussionPerformance = (props: any) => {
  const [discussions, setDiscussion] = React.useState<Discussion[]>([]);
  const getDiscussionList = async () => {
    const resp = await DiscussionService.list();
    console.log('resp:', resp);
    if (resp) {
      setDiscussion(resp || []);
    }
  }
  useEffect(() => {
    getDiscussionList();
  }, []);

  const deleteDiscussionClicked = async (id: number) => {
    await DiscussionService.delete(id);
    getDiscussionList();
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const router = useRouter();
  return (
    <div title="Discussions">
      <TableContainer
        sx={{
          width: {
            xs: "274px",
            sm: "100%",
          },
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Content</TableCell>
              <TableCell>Number of Threads</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {discussions.map((discussion) => (
              <TableRow key={discussion.id}>
                <TableCell>{discussion.id}</TableCell>
                <TableCell>{discussion.content}</TableCell>
                <TableCell>{discussion?.threads?.length || 0 }</TableCell>
                <TableCell>
                  <IconButton color="secondary" aria-label="view" onClick={handleClickOpen}>
                    <ViewAgenda />
                  </IconButton>
                  <IconButton color="secondary" aria-label="edit" onClick={() => router.push('/admin/discussions/edit/' + discussion.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={() => {deleteDiscussionClicked(discussion.id)}}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Thread Detail:
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <Stack spacing={2} sx={{ maxWidth: 600 }}>
              <SnackbarContent message="I love snacks." />
              <SnackbarContent
                message={
                  'I love candy. I love cookies. I love cupcakes. \
                  I love cheesecake. I love chocolate.'
                }
              />
              <SnackbarContent
                message="I love candy. I love cookies. I love cupcakes."
                // action={action}
              />
              <SnackbarContent
                message={
                  'I love candy. I love cookies. I love cupcakes. \
                  I love cheesecake. I love chocolate.'
                }
                // action={action}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Close
            </Button>
          </DialogActions>
        </BootstrapDialog>``
      </TableContainer>
      <Pagination count={10} />
    </div>
  );
};

export default DiscussionPerformance;