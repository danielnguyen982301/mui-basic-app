import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Card, Chip, Divider } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import jobs from "../jobs.json";
import { Job } from "../types";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  height: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 1,
};

export default function JobDetailModal() {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const { jobId } = useParams();
  const job = jobs.find((job: Job) => job.id === jobId);
  if (job === undefined) return null;

  const handleClose = () => {
    setOpen(false);
    navigate(-1);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              cursor: "pointer",
            }}
            onClick={handleClose}
          >
            <CloseIcon />
          </Box>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              border: "2px solid grey",
              height: "90%",
              width: "90%",
              textAlign: "center",
              gap: 4,
              p: 2,
              mx: "auto",
              // bgcolor: "background.default",
              // color: "text.primary",
            }}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box>{job.title}</Box>
              <Divider variant="middle" sx={{ my: 1, borderColor: "red" }} />
              <Box my={2}>
                {job.skills.map((skill: string, index: number) => (
                  <Chip key={index} label={skill} />
                ))}
              </Box>
              <Typography textAlign="justify" my={3}>
                {job.description}
              </Typography>
            </Box>
            <Box textAlign="justify">
              <Typography>
                Salary: {job.salaryLow} - {job.salaryHigh}
              </Typography>
              <Typography>Location: {job.city}</Typography>
              <Typography>Experience: {job.yrsXPExpected} years</Typography>
              <Typography>Date posted: {job.postedDate}</Typography>
            </Box>
            <Button variant="contained">Apply Now</Button>
          </Card>
        </Box>
      </Modal>
    </div>
  );
}
