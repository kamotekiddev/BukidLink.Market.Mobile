import { createTheme, ThemeProvider } from "@rneui/themed";
import { PropsWithChildren } from "react";

const theme = createTheme({
    lightColors: {
        background: "#0A400C",
        secondary: "#B4E50D",
        white: "#ffffff",
        primary: "#78C841",
    },
    darkColors: {},
    components: {
        Button: {
            titleStyle: {
                fontSize: 14,
            },
        },
    },
});

export default function ThemeContext({ children }: PropsWithChildren) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
