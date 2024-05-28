import secureStorage from "react-secure-storage";

// added coporate and superadmin with their getters and setters
export const KEYS = {
	USER: "rentify@user",
	BUYER:"rentify@buyer",
};

export const getUser = () => {
	return secureStorage.getItem(KEYS.USER);
};

export const setUser = (user = {}) => {
	secureStorage.setItem(KEYS.USER, user);
};

export const removeUser = () => {
	secureStorage.removeItem(KEYS.USER);
};

export const getBuyer = () => {
	return secureStorage.getItem(KEYS.BUYER);
};

export const setBuyer = (user = {}) => {
	secureStorage.setItem(KEYS.BUYER, user);
};

export const removeBuyer = () => {
	secureStorage.removeItem(KEYS.BUYER);
};
