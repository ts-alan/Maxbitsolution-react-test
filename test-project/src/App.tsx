import { useGetCocktailByNameQuery } from './store/app/apiSlice';
import { Box, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { SideMenu } from "./components/SideMenu";
import { CocktailDetails } from "./components/CocktailDetails";
import { useParams } from "react-router-dom";

const drawerWidth = 240;

const AppContainer = styled(Box)({
    display: 'flex',
});

const MainContentContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  width: `calc(100% - ${drawerWidth}px)`,
}));

function App() {
    const { cocktailName } = useParams<{ cocktailName: string }>();
    const {
        data,
        isFetching
    } = useGetCocktailByNameQuery(cocktailName || 'margarita');

    const drink = data?.drinks?.[0];

    return (
      <AppContainer>
        <SideMenu />
        <MainContentContainer>
            {isFetching ? (
                <p>Loading...</p>
            ) : drink ? (
                <CocktailDetails drink={drink} />
            ) : (
                <Typography variant="h5">Cocktail not found</Typography>
            )}
        </MainContentContainer>
    </AppContainer>
  )
}

export default App
