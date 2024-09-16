import { Typography } from "@mui/material";
import React from "react";

interface ErrorPageProps {
  description?: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({
  description = "Something went wrong",
}) => {
  return (
    <div className="container">
      <Typography fontWeight={"bold"} color={"error"}>
        {description}
      </Typography>
    </div>
  );
};

export default ErrorPage;
