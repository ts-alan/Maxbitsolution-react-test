import { Box, Button, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

const StyledBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  backgroundColor: "#ffffff",
});

const StyledContainer = styled(Container)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(3),
}));

const TitleTypography = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
}));

const SubtitleTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

export function NotFound() {
  return (
    <StyledBox>
      <StyledContainer maxWidth="md">
        <TitleTypography variant="h1">404</TitleTypography>
        <Typography variant="h4" component="h2" gutterBottom>
          Page Not Found
        </Typography>
        <SubtitleTypography variant="body1" color="text.secondary">
          Sorry, we couldn't find the page you're looking for.
        </SubtitleTypography>
        <Button component={Link} to="/" variant="contained" size="large">
          Go back to Home
        </Button>
      </StyledContainer>
    </StyledBox>
  );
}
