import React, { createContext, useContext, useState, useCallback } from "react";

import { getBuyer, setBuyer, removeBuyer } from "../utils/storage.utils";

const initialState = { isAuthBuyer: false };

export const AuthContextBuyer = createContext(initialState);

const AuthProviderBuyer = ({ children }) => {
	const [authState, setauthState] = useState(getBuyer());

	const setAuthBuyer = useCallback((user = {}) => {
		console.log(user)
		setauthState(user);
		setBuyer(user);
	}, []);

	const logOut = useCallback(() => {
		setauthState({ isAuthBuyer: false });
		removeBuyer();
	}, []);

	const value = {
		...authState,
		setAuthBuyer,
		logOut,
	};

	return <AuthContextBuyer.Provider value={value}>{children}</AuthContextBuyer.Provider>;
};

export default AuthProviderBuyer;

export const useAuthBuyer = () => useContext(AuthContextBuyer);



