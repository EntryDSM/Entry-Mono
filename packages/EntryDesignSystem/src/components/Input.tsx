import React, { InputHTMLAttributes, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Visible from '../style/icon/Visible';
import NotVisible from '../style/icon/NotVisible';
import { black400, black900, focus } from '../style/color';
import { marginCssType, marginToCss, marginType } from '../utils/margin';
import { theme } from '../style';
import { Icon, IconType } from './Icon';

type inputType = 'text' | 'password' | 'number' | 'tel' | 'veteransNumber';

export interface InputType extends marginCssType, InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    type: inputType;
    width: number | '100%';
    label?: string;
    unit?: string;
    icon?: IconType;
    value?: string | number;
    clickIcon?: () => void;
}

export const Input: React.FC<InputType> = ({
    className,
    type,
    width = 250,
    label,
    unit,
    icon,
    value,
    margin,
    clickIcon,
    ...props
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [telephoneNumber, setTelephoneNumber] = useState<string>('');
    const [veteransNumber, setVeteransNumber] = useState<string>('');
    useEffect(() => {
        setTelephoneNumber(
            String(value)
                .slice(0, 13)
                .replace(/[^0-9]/g, '')
                .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`),
        );
    }, [value]);
    useEffect(() => {
        setVeteransNumber(
            String(value)
                .slice(0, 9)
                .replace(/[^0-9]/g, '')
                .replace(/^(\d{2})(\d{6})$/, '$1-$2'),
        );
    }, [value]);
    return (
        <Container margin={margin} label={label} className={className}>
            <InputLabel>
                {label && <LabelText>{label}</LabelText>}
                <InputWrapper width={width}>
                    <InputBox
                        unit={unit}
                        icon={icon}
                        value={
                            type === 'tel'
                                ? telephoneNumber
                                : type === 'veteransNumber'
                                  ? veteransNumber
                                  : value
                        }
                        type={
                            (type === 'tel' && 'text') ||
                            (isOpen && 'text') ||
                            (type === 'veteransNumber' && 'text') ||
                            type
                        }
                        {...props}
                    />
                    {type === 'password' && (
                        <UnitText onClick={() => setIsOpen(!isOpen)}>
                            {isOpen ? <Visible /> : <NotVisible />}
                        </UnitText>
                    )}
                    {unit && <UnitText>{unit}</UnitText>}
                    {icon && (
                        <UnitText>
                            <Icon
                                onClick={clickIcon}
                                icon={icon}
                                color="black400"
                                size={20}
                                cursor="pointer"
                            />
                        </UnitText>
                    )}
                </InputWrapper>
            </InputLabel>
        </Container>
    );
};

const Container = styled.div<{ margin?: marginType | marginType[]; label?: string }>`
    ${({ margin }) => marginToCss({ margin })};
    height: ${({ label }) => (label ? 64 : 40)}px;
`;

const InputLabel = styled.label`
    font-size: 14px;
    line-height: 17px;
    color: ${black900};
`;

const LabelText = styled.div`
    margin-left: 5px;
    margin-bottom: 6px;
    ${theme.font.body5};
`;

const InputWrapper = styled.div<{ width: number | '100%' }>`
    position: relative;
    width: ${({ width }) => (width === '100%' ? '100%' : `${width}px`)};
    border: none;
`;

const InputBox = styled.input<{ unit?: string; icon?: IconType }>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 42px;
    border: 1px solid ${black400};
    border-radius: 5px;
    padding: 14px;
    outline: none;
    padding-right: ${({ unit, icon }) => (unit || icon) && '34px'};
    color: ${black900};
    &:focus {
        border-color: ${focus};
    }
    &::placeholder {
        color: ${black400};
        font-size: 16px;
    }
    &:disabled {
        cursor: not-allowed;
        background-color: ${theme.color.black100};
    }
    &::-webkit-inner-spin-button {
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
    }
`;

const UnitText = styled.div`
    position: absolute;
    right: 12px;
    margin-top: 12px;
    ${theme.font.body3};
`;
