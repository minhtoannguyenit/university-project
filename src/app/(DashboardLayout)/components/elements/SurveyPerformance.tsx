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
  Rating,
} from "@mui/material";
import BaseCard from "../shared/DashboardCard";
import Link from "next/link";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from "next/navigation";
import SurveyService from "@/app/services/SurveyService";

export interface Event {
  id: number;
  title: string;
  description: string;
  rate: number;
  comment: string;
  name: string;

};

const EventPerformance = (props: any) => {
  const [surveys, setEvents] = React.useState<Event[]>([]);
  const getEventList = async () => {
    const resp = await SurveyService.list();
    console.log('resp:', resp);
    if (resp) {
      setEvents(resp || []);
    }
  }
  useEffect(() => {
    getEventList();
  }, []);

  const deleteEventClicked = async (id: number) => {
    await SurveyService.delete(id);
    getEventList();
  }

  const router = useRouter();
  return (
    <BaseCard title="Events">
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
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Comment</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {surveys.map((survey) => (
              <TableRow key={survey.id}>
                <TableCell>{survey.id}</TableCell>
                <TableCell>{survey.title}</TableCell>
                <TableCell>{survey.description}</TableCell>
                <TableCell><Rating name="half-rating-read" defaultValue={survey.rate} readOnly /></TableCell>
                <TableCell>{survey.comment}</TableCell>
                <TableCell>{survey.name}</TableCell>
                <TableCell>
                  {/* <IconButton color="secondary" aria-label="edit" onClick={() => router.push('/admin/surveys/edit/' + survey.id)}>
                    <EditIcon />
                  </IconButton> */}
                  <IconButton aria-label="delete" onClick={() => {deleteEventClicked(survey.id)}}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </BaseCard>
  );
};

export default EventPerformance;