import * as React from 'react';
import { AppRegistry } from 'react-native';
import 'react-native-gesture-handler';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import App from './App';
import { name as appName } from './app.json';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#00308F',
        secondary: '#0076CE',
        background: '#e5f3f3',
    },
};

export default function Main() {
    return (
        <PaperProvider theme={theme} >
            <App />
        </PaperProvider>
    );
}

AppRegistry.registerComponent(appName, () => Main);
