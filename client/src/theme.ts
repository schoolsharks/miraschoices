import { createTheme, Theme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface PaletteColor {
    accent?: string; 
    red?: string; 
    grey?:string;

  }

  interface SimplePaletteColorOptions {
    accent?: string; 
    red?: string; 
    grey?:string;
  }

  interface Palette {
    tertiary: PaletteColor; 
  }

  interface PaletteOptions {
    tertiary?: SimplePaletteColorOptions; 
  }
}

const theme: Theme = createTheme({
  palette: {
    primary: {
      main: '#01416A',
      red:"#FF3B30",
      grey:"#383838"
    },
    secondary: {
      main: "#F48274",
    },
    tertiary: {
      main: "#6A6464",
    },
    text: {
      primary: "#1A1A1A",
      secondary: "#444444",
    },
  },
  typography: {
    fontFamily: 'DM Sans, sans-serif',
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '1.25rem',
    },
  },
});

export default theme;
