import { InputField } from "@haninge-digit/digit-ui-package-formbuilder";
// import InputField from "../components/InputField.jsx";


const DisabledField = ({
	label,
	value
}) => {

	const noop = () => {};

	return (
		<InputField label={label} name={value} inputValue={value} disabled={true} rules={{}} register={noop} errors={{}} />
	)
}

export default DisabledField
