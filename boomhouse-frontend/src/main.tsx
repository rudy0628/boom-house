import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';

// auth0
const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

// chakra UI
const theme = extendTheme({
	colors: {
		primary: {
			100: '#eef0f6',
			200: '#cbd1e5',
			300: '#a8b2d4',
			400: '#8593c2',
			500: '#5065a8',
			600: '#405186',
			700: '#303d65',
			800: '#202843',
			900: '#101422',
		},
	},
});

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Auth0Provider
			domain={domain!}
			clientId={clientId!}
			authorizationParams={{
				redirect_uri: window.location.origin,
				ui_locales: 'zh-TW',
				audience: 'https://dev-7qy67xolh5cn44qw.us.auth0.com/api/v2/',
			}}
		>
			<BrowserRouter>
				<ChakraProvider theme={theme}>
					<App />
				</ChakraProvider>
			</BrowserRouter>
		</Auth0Provider>
	</React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();
