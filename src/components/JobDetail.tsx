import * as React from "react";
import Box from "@mui/material/Box";
import { Job } from "../types";
import { Button, Card, Chip, Divider, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

type jobProps = {
  job: Job;
};
export default function JobDetail({ job }: jobProps) {
  const location = useLocation();
  return (
    <Link
      to={`/jobs/${job.id}`}
      state={{ backgroundLocation: location }}
      style={{ textDecoration: "none" }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          border: "2px solid grey",
          height: "350px",
          width: "350px",
          my: 4,
          textAlign: "center",
          gap: 4,
          p: 2,
          mx: "auto",
          // bgcolor: "background.default",
          // color: "text.primary",
        }}
      >
        <Box>
          <Box>{job.title}</Box>
          <Divider variant="middle" sx={{ my: 1, borderColor: "red" }} />
          {job.skills.slice(0, 4).map((skill: string, index: number) => (
            <Chip key={index} label={skill} />
          ))}
          <Typography textAlign="justify">{job.description}</Typography>
        </Box>
        <Button variant="contained">More Info</Button>
      </Card>
    </Link>
  );
}
