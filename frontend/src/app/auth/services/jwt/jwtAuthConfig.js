const jwtAuthConfig = {
	tokenStorageKey: 'access',
	getUserUrl: '/api/users/me/',
	signInUrl: '/api/jwt/create/',
	signUpUrl: '/api/users/',
	signOutUrl: '/api/logout/',
	tokenRefreshUrl: '/api/jwt/refresh/',
	tokenVerifyUrl: '/api/jwt/verify/',
	updateUserUrl: 'mock-api/auth/user',
	updateTokenFromHeader: true,
	activateUrl: '/api/users/activation/',
	forgotPasswordUrl: '/api/users/reset_password/',
	resetPasswordUrl: '/api/users/reset_password_confirm/',
};
export default jwtAuthConfig;
