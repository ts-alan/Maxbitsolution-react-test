import { useGetCocktailByNameQuery } from './store/app/apiSlice';
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { SideMenu } from "./components/SideMenu";
import { CocktailDetails } from "./components/CocktailDetails";

const drawerWidth = 240;

const AppContainer = styled(Box)({
    display: 'flex',
});

const MainContentContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  width: `calc(100% - ${drawerWidth}px)`,
}));

function App() {
    const [menuItem, setMenuItem] = useState('margarita');

    const {
        data,
        isFetching
    } = useGetCocktailByNameQuery(menuItem);

    const drink = data?.drinks?.[0];

    return (
      <AppContainer>
        <SideMenu onSelectItem={setMenuItem} activeItem={menuItem} />
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
