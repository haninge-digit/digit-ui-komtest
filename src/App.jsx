import "./App.css";

import ReactDOM from "react-dom/client";
import React, { useState, useEffect } from "react";
// import { AuthApp, ApiService, LoadingIndicator } from "@haninge-digit/digit-ui-package-core";
import { AuthApp, LoadingIndicator } from "@haninge-digit/digit-ui-package-core";

import MainForm from "./MainForm.jsx";

const App = () => {

	console.log("Render App")
	const [user, setUser] = useState({});

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

