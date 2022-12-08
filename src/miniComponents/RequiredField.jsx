import { InputField, c } from "@haninge-digit/digit-ui-package-formbuilder";
// import { c } from "@haninge-digit/digit-ui-package-formbuilder";
// import InputField from "../components/InputField.jsx";


const RequiredField = ({
	label,
	name,
	disabled,
	form
}) => {


	return (
		<InputField label={label} name={name} rules={{required:true}} register={form.register} errors={form.formState.errors} errorMessages={{required:c.ERROR_FIELD_REQUIRED}} />
	)
}

export default RequiredField
