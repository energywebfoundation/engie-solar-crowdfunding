/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { InputProps, TextField } from '@mui/material';

export interface FormInputTextProps {
  name: string;
  control: Control<any>;
  label: string;
  type: 'text' | 'number' | 'email' | 'password' | 'tel';
  whiteLabel?: boolean;
  className?: string;
  valueChanged?: () => void;
  defaultValue?: string | number;
  hint?: string;
  errorMessage?: string;
  inputProps?: InputProps;
  disabled?: boolean;
}

const checkMethod = (method: (() => void) | undefined): boolean | null => {
  if (typeof method === 'function') {
    method();
    return true;
  }
  return null;
};

export const FormInputText: FC<FormInputTextProps> = ({
  name,
  control,
  label,
  type,
  className,
  valueChanged,
  defaultValue,
  hint,
  errorMessage,
  inputProps,
  disabled = false,
}) => {
  return (
    <Controller
      defaultValue={defaultValue || ''}
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <TextField
          fullWidth
          disabled={disabled}
          label={label}
          value={value}
          type={type}
          variant='outlined'
          className={`${className}`}
          onBlur={onBlur}
          onChange={(e) => {
            onChange(e);
            checkMethod(valueChanged);
          }}
          error={!!error || !!errorMessage}
          helperText={error || errorMessage ? errorMessage || error.message : hint}
          InputProps={inputProps}
        />
      )}
    />
  );
};
