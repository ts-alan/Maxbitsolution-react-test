import { Box, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export function NotFound() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: '#f5f5f5',
            }}
        >
            <Container maxWidth="md" sx={{ textAlign: 'center', p: 3 }}>
                <Typography
                    variant="h1"
                    component="h1"
                    sx={{
                        fontWeight: 'bold',
                        color: 'primary.main',
                        mb: 2,
                    }}
                >
                    404
                </Typography>
                <Typography variant="h4" component="h2" gutterBottom>
                    Page Not Found
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    Sorry, we couldn't find the page you're looking for.
                </Typography>
                <Button component={Link} to="/" variant="contained" size="large">
                    Go back to Home
                </Button>
            </Container>
        </Box>
    );
} 