import { Box, Button, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  return (
    <StyledBox>
      <StyledContainer maxWidth="md">
        <TitleTypography variant="h1">{t("notFound.title")}</TitleTypography>
        <Typography variant="h4" component="h2" gutterBottom>
          {t("notFound.subtitle")}
        </Typography>
        <SubtitleTypography variant="body1" color="text.secondary">
          {t("notFound.description")}
        </SubtitleTypography>
        <Button component={Link} to="/" variant="contained" size="large">
          {t("notFound.goHome")}
        </Button>
      </StyledContainer>
    </StyledBox>
  );
}
