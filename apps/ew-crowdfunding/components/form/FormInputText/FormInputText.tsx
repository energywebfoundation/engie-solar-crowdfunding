/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

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
}) => {
  return (
    <Controller
      defaultValue={defaultValue || ''}
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <TextField
          fullWidth
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
        />
      )}
    />
  );
};
