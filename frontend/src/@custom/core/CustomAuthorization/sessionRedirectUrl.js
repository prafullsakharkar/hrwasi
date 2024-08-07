/**
 * Session redirect url
 */
const sessionStorageKey = 'customRedirectUrl';
/**
 * Get session redirect url
 */
export const getSessionRedirectUrl = () => {
	return window.sessionStorage.getItem(sessionStorageKey);
};
/**
 * Set session redirect url
 */
export const setSessionRedirectUrl = (url) => {
	window.sessionStorage.setItem(sessionStorageKey, url);
};
/**
 * Reset session redirect url
 */
export const resetSessionRedirectUrl = () => {
	window.sessionStorage.removeItem(sessionStorageKey);
};
