import React from 'react';
import { Raw } from 'types';
import { Select } from 'antd';

type SelectProps = React.ComponentProps<typeof Select>;

interface IdSelectProps
  extends Omit<SelectProps, 'value' | 'onChange' | 'options'> {
  value?: Raw | null | undefined;
  onChange?: (value?: number) => void;
  defaultOptionName?: string;
  options?: { name: string; id: number }[];
}

/**
 * Select component
 * Note: When Number(value) is not a number, toNumber(value) will be 0, will select defaultOptionName, may call onChange(undefined)
 * @param props
 * @constructor
 */
export const IdSelect = (props: IdSelectProps) => {
  const { value, onChange, defaultOptionName, options, ...restProps } = props;
  return (
    <Select
      // when waiting for the response, select the default option
      value={options?.length ? toNumber(value) : 0}
      onChange={(value) => onChange?.(toNumber(value) || undefined)}
      {...restProps}
    >
      {defaultOptionName ? (<Select.Option value={0}>{defaultOptionName}</Select.Option>) : null}
      {options?.map((option) => (
        <Select.Option key={option.id} value={option.id}>{option.name}</Select.Option>
      ))}
    </Select>
  );
};

const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value));
