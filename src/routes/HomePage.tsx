import React, { useContext, useEffect, useState } from "react";
import jobs from "../jobs.json";
import { Grid, Pagination, Typography } from "@mui/material";
import { Job } from "../types";
import { QueryContext } from "../App";
import JobDetail from "../components/JobDetail";
import { useLocation } from "react-router-dom";

function HomePage({ itemLimit }: { itemLimit: number }) {
  const [currentPage, setCurrentPage] = useState(1);
  const { searchParams, setSearchParams } = useContext(QueryContext);
  const location = useLocation();
  const backgroundQuery = new URLSearchParams(location.search);
  const page = searchParams.get("page") || backgroundQuery.get("page");
  const q = searchParams.get("q") || backgroundQuery.get("q");
  const filteredJobs = jobs.filter((job: Job) =>
    q
      ? job.title.includes(q) ||
        job.city.includes(q) ||
        job.description.includes(q) ||
        job.skills.includes(q) ||
        (parseInt(q) <= job.salaryHigh && parseInt(q) >= job.salaryLow)
      : true
  );

  useEffect(() => {
    setCurrentPage(page ? parseInt(page) : 1);
  }, [page]);

  const totalPages = Math.ceil(filteredJobs.length / itemLimit);
  const pageNum = page ? parseInt(page) : currentPage;
  const jobList = filteredJobs.slice(
    (pageNum - 1) * itemLimit,
    (pageNum - 1) * itemLimit + itemLimit
  );

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
    if (value === 1) {
      searchParams.delete("page");
    } else {
      searchParams.set("page", value.toString());
    }
    setSearchParams(searchParams);
  };

  return (
    <>
      {q && (
        <Typography variant="h5" ml={3} mt={2}>
          Search results for "{q}"
        </Typography>
      )}
      {filteredJobs.length ? (
        <>
          <Grid
            container
            spacing={2}
            sx={{ mx: "auto", maxWidth: "none", width: "100%" }}
          >
            {jobList.map((job: Job) => (
              <Grid key={job.id} item xs={12} md={6} lg={4}>
                <JobDetail job={job} />
              </Grid>
            ))}
          </Grid>
          {!!filteredJobs.length && (
            <Pagination
              sx={{ display: "flex", justifyContent: "center" }}
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
            />
          )}
        </>
      ) : (
        <Typography variant="h2" sx={{ my: 2 }}>
          No results found
        </Typography>
      )}
    </>
  );
}

export default HomePage;
