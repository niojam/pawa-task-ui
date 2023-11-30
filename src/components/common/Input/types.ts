export interface InputProps {
  name: string;
  label?: string;
  labelVisible?: boolean;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  autocomplete?: string;
  modelValue?: string | number;
  rows?: number;
  type?: string;
  validationError?: string;
}
