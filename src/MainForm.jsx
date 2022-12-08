import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import DisabledField from "./miniComponents/DisabledField.jsx";
import RequiredField from "./miniComponents/RequiredField.jsx";
import { InputField } from "@haninge-digit/digit-ui-package-formbuilder";
import { DefaultApp, LoadingIndicator } from "@haninge-digit/digit-ui-package-core";


import * as ApiService from "./ApiService.jsx";


const MainForm = () => {

	console.log("Render MainForm")

	const form = useForm(
		{
			defaultValues: {
				"personId": "",
				"fullName": "",
				"address": "",
				"zipcode": "",
				"city": "",
				"email": "",
				"mobile": "",
			}
		}
	)
	form.watch("personId");		// Any change in "personId" will rerender the whole form!

	const [isLoading, setIsLoading] = useState(false);			// true if loading indicator should be visible

	const initUserData = (userData) => {
		if (userData) {
			form.setValue("personId", userData.personId);
			form.setValue("fullName", userData.fullName);
			form.setValue("address", userData.address);
			form.setValue("zipcode", userData.zipcode);
			form.setValue("city", userData.city);
			form.setValue("email", userData.email);
			form.setValue("mobile", userData.mobile);
		}
		else {
			form.setValue("personId", "");
			form.setValue("fullName", "");
			form.setValue("address", "");
			form.setValue("zipcode", "");
			form.setValue("city", "");
			form.setValue("email", "");
			form.setValue("mobile", "");
		}
	};

	const fetchUserData = async () => {
		setIsLoading(true);
		await ApiService.workerGet("userinfo").then((response) => {
			console.log("Got user info");
			setIsLoading(false);
			initUserData(response.data.user);
		}).catch((error) => {
			setIsLoading(false);
			console.log("Error when retrieving user information")
		});
	}

	const patchUserData = async () => {
		const d = {}
		d.email = form.getValues("email")
		d.mobile = form.getValues("mobile")
		console.log(d)
		await ApiService.workerPatch("userinfo", d).then((response) => {
			console.log("PATCH OK")
		}).catch((error) => {
			console.log("Error when patching user information")
		});
	}

	const deleteUserData = async () => {
		await ApiService.workerDelete("userinfo").then((response) => {
			console.log("DELETE OK");
			initUserData();
		}).catch((error) => {
			console.log("Error when deleting user information")
		});
	}


	return (
		<>
			<div className="EPiServerForms">
				<div className="Form__MainBody">
					<section className="Form__Element FormStep ">
						<h2>Information</h2>
						<div>
							<DisabledField label="Personnummer" value={form.getValues("personId")} />
							<DisabledField label="För och efternamn" value={form.getValues("fullName")} />
							<DisabledField label="Address" value={form.getValues("address")} />
							<DisabledField label="Postnummer och ort" value={form.getValues("zipcode") + " " + form.getValues("city")} />
							<InputField label="E-postadress" name="email" rules={{ required: false }} register={form.register} errors={{}} errorMessages={{}} />
							<InputField label="Mobiltelefon" name="mobile" rules={{ required: false }} register={form.register} errors={{}} errorMessages={{}} />
						</div>
						<div>
							<button aria-label="Hämta" type="button" onClick={(e) => initUserData()}>
								Rensa
							</button>
							<p></p>
							{isLoading && (
								<div className="loader"></div>
							)}
							<button aria-label="Hämta" type="button" onClick={(e) => fetchUserData()}>
								Hämta
							</button>
							<button aria-label="Uppdatera" type="button" onClick={(e) => patchUserData()}>
								Uppdatera
							</button>
							<button aria-label="Radera" type="button" onClick={(e) => deleteUserData()}>
								Radera
							</button>
						</div>
					</section>
				</div>
			</div>
		</>
	);
};

export default MainForm;