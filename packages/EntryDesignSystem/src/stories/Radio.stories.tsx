import React, { useState } from 'react';
import { ComponentMeta } from '@storybook/react';
import { Radio } from '../components/Radio';

export default {
    title: 'Component/Radio',
    component: Radio,
} as ComponentMeta<typeof Radio>;

export const Primary = () => {
    const [radioValue, setRadioValue] = useState('');
    const onClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        const { value } = e.currentTarget;
        setRadioValue(value);
        console.log(value);
    };
    return (
        <>
            <Radio
                checked={radioValue === 'asdf'}
                name="asdf"
                value="asdf"
                onClick={onClick}
                label="asdf"
            />
            <Radio
                checked={radioValue === 'hello'}
                name="asdf"
                value="hello"
                onClick={onClick}
                label="hello"
            />
        </>
    );
};
