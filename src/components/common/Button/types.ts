export type ButtonType = 'button' | 'submit';

export type ButtonTheme = 'success' | 'error' | 'primary' | 'white' | 'ghost' | 'error-outline';

export interface ButtonProps {
  theme?: ButtonTheme;
  type?: ButtonType;
  block?: boolean;
  disabled?: boolean;
  classes?: string;
}
