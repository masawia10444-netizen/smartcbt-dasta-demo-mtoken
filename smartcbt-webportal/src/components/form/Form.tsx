import FormCheckbox from "./FormCheckbox";
import FormDropdown from "./FormDropdown";
import ImageInputForm from "./FormFileInput";
import FormFloatingLabelDropSearch from "./FormFloatingLabelDropSearch";
import { FormInput } from "./FormInput";
import FormNumberInput from "./FormNumberInput";
import FormSelectDropDown from "./FormSelectDropDown";
import { FormTextArea } from "./FormTextArea";

const Form = () => <form></form>;

export default Object.assign(Form, {
  Form: Form,
  Checkbox: FormCheckbox,
  Input: FormInput,
  NumberInput: FormNumberInput,
  SelectDropDown: FormSelectDropDown,
  FloatingDropSearch: FormFloatingLabelDropSearch,
  DropDownSearch: FormDropdown,
  ImageInput: ImageInputForm,
  TextArea: FormTextArea,
});
