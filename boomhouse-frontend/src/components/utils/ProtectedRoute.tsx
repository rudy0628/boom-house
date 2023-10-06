import React from 'react';

import { Box, Spinner } from '@chakra-ui/react';

import { useAuth0 } from '@auth0/auth0-react';

const ProtectedRoute = ({
	isAuthenticated,
	children,
}: {
	isAuthenticated: boolean;
	children: React.ReactNode;
}) => {
	const { loginWithRedirect } = useAuth0();

	if (!isAuthenticated) {
		loginWithRedirect();
		return (
			<Box
				width="100%"
				height="100%"
				display="flex"
				justifyContent="center"
				alignItems="center"
				color="primary.500"
			>
				<Spinner />
			</Box>
		);
	}

	return children;
};

export default ProtectedRoute;
