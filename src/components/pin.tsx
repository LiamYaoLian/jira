import React from 'react';
import {Rate} from 'antd';

interface PinProps extends React.ComponentProps<typeof Rate> {
    checked: boolean;
    onCheckedChange?: (checked: boolean) => void
}

/**
 * Pin component
 * @param checked
 * @param onCheckedChange
 * @param restProps
 * @constructor
 */
export const Pin = ({checked, onCheckedChange, ...restProps}: PinProps) => {
    return <Rate
        count={1}
        value={checked? 1 : 0}
        onChange={num => onCheckedChange?.(!!num)}
        {...restProps}
    />
}