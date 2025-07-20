import { Box, CircularProgress, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const LoadingContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "200px",
  gap: theme.spacing(2),
}));

export function LoadingSpinner() {
  return (
    <LoadingContainer>
      <CircularProgress size={60} />
      <Typography variant="h6" color="text.secondary">
        Loading cocktail...
      </Typography>
    </LoadingContainer>
  );
}
