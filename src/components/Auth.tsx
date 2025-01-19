export const failedAuth = (): void => {
	localStorage.removeItem('authToken');
	localStorage.removeItem('admin');
	window.location.reload();
};


export const isAuthenticated = (): boolean => {
	console.log('global isAuthenticated');

	return !!localStorage.getItem('authToken');

};



export const logout = () => {
    console.log("Logout");
    localStorage.removeItem("authToken");
    localStorage.removeItem("admin");
    window.location.reload();
  };

