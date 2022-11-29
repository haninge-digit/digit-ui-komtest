import "./App.css";

import ReactDOM from "react-dom/client";
import React, { useState, useEffect } from "react";

import * as ApiService from "./ApiService.jsx";

const App = () => {

	console.log("Render App")

	const [isResponding, setIsResponding] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	useEffect(() => {
		const getEcho = async () => {
			await ApiService.workerGet("echo").then((response) => {
				console.log("Got echo response")
				setIsResponding(true)
			}).catch((error) => {
				console.log("camunda is not responding!")
			});
		}
		const fetchLoginState = () => {
			ApiService.getAuth().then((response) => {
				// alert(response.data)
				console.log("User is logged in")
				setIsLoggedIn(true);
			}).catch((error) => {
				setIsLoggedIn(false);
				console.log("User is NOT logged in")
			});
		}
		getEcho();
		fetchLoginState();
	}, []);

	const [userName, setUserName] = useState("OKÄND");
	const fetchUserData = async () => {
		await ApiService.workerGet("userinfo").then((response) => {
			console.log("Got user info")
			console.log(response.data.user)
			setUserName(response.data.user.firstName)
		}).catch((error) => {
			console.log("Error when retrieving user information")
		});
	}

	if (!isResponding) {
		return (
			<>
				<div>Camunda svarar inte eller går inte att nå!</div>
			</>
		);
	}
	else if (!isLoggedIn) {
		return (
			<>
				<div>Du verkar inte vara inloggad, vänligen logga in för att använda denna e-tjänst.</div>
				<div className="EPiServerForms ng-pristine ng-valid">
					<button aria-label="Logga in" type="button" onClick={ApiService.authSignIn} >
						Logga in
					</button>
				</div>
			</>
		);
	}
	else {
		fetchUserData();
		return (
			<>
				<div> Hej {userName}</div >
			</>
		)
	}

};

// ========================================

ReactDOM.createRoot(document.getElementById("js-container")).render(<App />);
