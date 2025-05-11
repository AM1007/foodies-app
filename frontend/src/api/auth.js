export const setTokens = ({ accessToken, refreshToken }) => {
  localStorage.setItem('token', accessToken);
  if (refreshToken) {
    localStorage.setItem('refreshToken', refreshToken);
  }
};

export const clearTokens = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
};

export const getRefreshToken = () => localStorage.getItem('refreshToken');
