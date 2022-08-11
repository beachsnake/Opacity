import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [newUser, setNewUser] = useState(null);

	return (
		<UserContext.Provider
			value={{
				currentUser,
				setCurrentUser,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};
