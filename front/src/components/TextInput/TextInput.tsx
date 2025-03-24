import React, { HTMLInputTypeAttribute } from "react";
import clsx from "clsx";

import styles from "./textinput.module.scss";

export interface TextInputPropTypes {
  className?: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  label?: string;
  labelEnd?: string;
  errorMessage?: string;
  showError?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

export const TextInputComponent: React.FC<TextInputPropTypes> = ({
  className,
  type = "text",
  placeholder,
  label,
  labelEnd,
  errorMessage,
  showError,
  value,
  onChange,
}): React.ReactElement => {
  const [isFocus, setFocus] = React.useState<boolean>(false);

  const onFocus = () => setFocus(true);
  const abortFocus = () => setFocus(false);

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value;

    onChange?.(value);
  };

  return (
    <div
      className={clsx(
        styles.input,
        { [styles.isError]: showError, [styles.isFocus]: isFocus },
        className
      )}
    >
      <div className={styles.container}>
        {label && <span className={styles.label}>{label}</span>}
        <input
          type={type}
          placeholder={placeholder}
          className={styles.tag}
          onFocus={onFocus}
          onBlur={abortFocus}
          value={value}
          onChange={onChangeText}
        />
        {labelEnd && <span className={styles.label}>{labelEnd}</span>}
      </div>
      {showError && <span className={styles.errorMessage}>{errorMessage}</span>}
    </div>
  );
};
