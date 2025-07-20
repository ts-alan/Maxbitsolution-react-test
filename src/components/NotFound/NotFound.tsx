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

interface NotFoundProps {
  translations: {
    title: string;
    subtitle: string;
    description: string;
    goHome: string;
  };
}

export function NotFound({ translations }: NotFoundProps) {
  return (
    <StyledBox>
      <StyledContainer maxWidth="md">
        <TitleTypography variant="h1">{translations.title}</TitleTypography>
        <Typography variant="h4" component="h2" gutterBottom>
          {translations.subtitle}
        </Typography>
        <SubtitleTypography variant="body1" color="text.secondary">
          {translations.description}
        </SubtitleTypography>
        <Button component={Link} to="/" variant="contained" size="large">
          {translations.goHome}
        </Button>
      </StyledContainer>
    </StyledBox>
  );
}
