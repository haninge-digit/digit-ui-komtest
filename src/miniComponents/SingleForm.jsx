import PropTypes from "prop-types";


const SingleForm = (props) => {

	console.log("Render SingleForm")

	console.log("AllFormValues:")
	console.log(props.form.getValues())


	if (props.form.getValues("inputApproved") === undefined) {
		props.form.setValue("inputApproved", false)								// Set initially to False
	}
	const inputApproved = props.form.watch("inputApproved");		// Any change in "inputApproved" will rerender the whole form!


	const scrollToError = () => {
		const elements = document.getElementsByClassName('Form__Element__ValidationError')
		console.log(elements.length)
		if (elements.length > 0) {
			window.scrollTo({ left: 0, top: elements[0]['offsetTop'] - 100 })
		}
	}

	const validateAllFields = async () => {								// Called when user approves the entered values
		if (document.getElementById("singleFormInputApproved").checked) {
			const isValid = await props.form.trigger()				// Rerender and check all fields
			if (isValid) {																		// Hurray! Everything is OK!  :)
				console.log("Validation succeded!")
				props.form.setValue("inputApproved", true)			// Will lock all fields and enable the submit button
			}
			else {																						// Sorry! We have form errors...  :(
				console.log("Validation ERRORS:")
				console.log(props.form.formState.errors)
				document.getElementById("singleFormInputApproved").checked = false		// Uncheck
				// props.form.setFocus("parent1Data.email",{ shouldSelect: true })
				scrollToError()																	// Scroll to first error
			}
		}
		else {
			props.form.setValue("inputApproved", false)			// If unchecked again. Open up fields for changes and disable submit button
		}
	}


	const label = "Jag intygar att ovanstående uppgifter är korrekta."

	return (
		<div className="EPiServerForms">
			<div className="Form__MainBody">
				<section className="Form__Element FormStep ">

					<fieldset disabled={inputApproved}>
						{props.children}
					</fieldset>

					<div className="FormChoice mb-1">
						<label>
							<input type="checkbox" id="singleFormInputApproved" onChange={validateAllFields} className="FormChoice__Input FormChoice__Input--Checkbox" />{' '}
							{label}
						</label>
					</div>

					<button disabled={!inputApproved} className="Form__Element FormSubmitButton" type="button" onClick={props.onSubmit}>
						{props.submitButtonLabel}
					</button>

				</section>
			</div>
		</div>
	);
};



// 	return (
// 		<form className="EPiServerForms" onSubmit={props.onSubmit}>
// 			<div className="Form__MainBody">
// 				<section className="Form__Element FormStep ">

// 					<fieldset disabled={inputApproved}>
// 						{props.children}
// 					</fieldset>

// 					<div className="FormChoice mb-1">
// 						<label>
// 							<input type="checkbox" id="singleFormInputApproved" onChange={validateAllFields} className="FormChoice__Input FormChoice__Input--Checkbox" />{' '}
// 							{label}
// 						</label>
// 					</div>

// 					<button disabled={!inputApproved} className="Form__Element FormSubmitButton" type="submit">
// 						{props.submitButtonLabel}
// 					</button>

// 				</section>
// 			</div>
// 		</form>
// 	);
// };

SingleForm.defaultProps = {
	submitButtonLabel: "Skicka in"
}

SingleForm.propTypes = {
	children: PropTypes.any,
	onSubmit: PropTypes.func.isRequired,
	submitButtonLabel: PropTypes.string
};

export default SingleForm;
