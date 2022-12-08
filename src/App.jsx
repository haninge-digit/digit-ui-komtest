import "./App.css";

import ReactDOM from "react-dom/client";
import React, { useState, useEffect } from "react";
// import { AuthApp, ApiService, LoadingIndicator } from "@haninge-digit/digit-ui-package-core";
import { AuthApp, LoadingIndicator } from "@haninge-digit/digit-ui-package-core";

import MainForm from "./MainForm.jsx";
import * as ApiService from "./ApiService.jsx";

const App = () => {

	console.log("Render App")
	const [user, setUser] = useState({});

	// const [isLoggedIn, setIsLoggedIn] = useState(false);
	// useEffect(() => {
	// 	const fetchLoginState = () => {
	// 		ApiService.getAuth().then((response) => {
	// 			// alert(response.data)
	// 			console.log("User is logged in")
	// 			setIsLoggedIn(true);
	// 		}).catch((error) => {
	// 			setIsLoggedIn(false);
	// 			console.log("User is NOT logged in")
	// 		});
	// 	}
	// 	fetchLoginState();
	// }, []);

	return (
		<AuthApp
			requirement="eid"
			user={user}
			setUser={setUser}
		>
			<MainForm />
		</AuthApp>
	);
};

// ========================================

ReactDOM.createRoot(document.getElementById("js-container")).render(<App />);
