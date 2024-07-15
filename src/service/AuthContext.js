import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

	useEffect(() => {
		// Update localStorage when user changes
		localStorage.setItem('user', JSON.stringify(user));
	}, [user]);

	const login = (userDetails) => {
		console.log('User details in Auth:', userDetails);
		setUser(userDetails);
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem('user'); // Clear user from storage on logout
	};

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};