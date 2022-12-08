import React, { useState } from "react";
import { useForm } from "react-hook-form";

import DisabledField from "./miniComponents/DisabledField.jsx";
import RequiredField from "./miniComponents/RequiredField.jsx";

import * as ApiService from "./ApiService.jsx";


const MainForm = () => {

	console.log("Render MainForm")

	const form = useForm()				// Main form that hold all input values. Validation will trigger on the blur event.

	if (form.getValues("userData") === undefined) {
		form.setValue("userData", userData)
		form.setValue("userData_email", userData.email)		// Set an extra parameter due to a bug in our component library
		form.setValue("userData_mobile", userData.mobile)		// Set an extra parameter due to a bug in our component library
	}

	const [userData, setUserData] = useState();
	const [familyInfo, setFamilyInfo] = useState();
	const [submitted, setSubmitted] = useState(false);

	const fixSendData = formData => {
		console.log(formData)
		const d = {}
		d.parent1 = formData.userData
		d.parent1.email = formData.userData_email
		d.parent1.mobile = formData.userData_mobile
		d.parent2 = formData.parent2Data
		d.parent2.email = formData.parent2Data_email
		d.children = []
		// for (var i = 0; i < formData.childSelect.length; i++) {
		// const child = formData.childSelecet[i]
		for (const child of formData.childSelect) {
			d.children.push({ pnum: `${child}`, name: `${familyInfo.children[child].fullName}` });
		};
		d.purpose = formData.purpose;
		d.ongoingDispute = formData.ongoingDispute;
		d.previousDialog = formData.previousDialog;

		const sendData = { samtalsData: d };
		return (sendData)
	}


	const submitForm = () => {
		console.log("SUBMITTING DATA:");
		const formData = form.getValues();
		console.log(formData);

		const sendData = fixSendData(formData)

		const parent1Mail = formData.userData_email;
		const parent2Mail = formData.parent2Data_email;
		const parent2Pnum = formData.parent2Data.personId;

		const call = `hakan_testar?approverMail=${parent2Mail}&approver=${parent2Pnum}&approvedMail=hakan@violaberg.nu`
		// ApiService.workflowStart(call, sendData)
		setSubmitted(true);
	}


	const fetchUserData = async () => {
		await ApiService.workerGet("userinfo").then((response) => {
			console.log("Got user info")
			setUserData(response.data.user)
		}).catch((error) => {
			console.log("Error when retrieving user information")
		});
	}

	return (
		<>
			<h2>Information om DIG</h2>
			<div>
				<DisabledField label="Personnummer" value={userData.personId} />
				<DisabledField label="För och efternamn" value={userData.fullName} />
				<DisabledField label="Address" value={userData.address} />
				<DisabledField label="Postnummer och ort" value={userData.zipcode + " " + userData.city} />
				<InputField label="E-postadress" name="userData_email" rules={{}} register={form.register}  />
				<RequiredField label="E-postadress" name="userData_email" form={form} />
				<RequiredField label="Mobiltelefon" name="userData_mobile" form={form} />
			</div>
		</>
	);
};

export default MainForm;