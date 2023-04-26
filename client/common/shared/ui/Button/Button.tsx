import React, { ButtonHTMLAttributes, FC, memo } from 'react';
import cls from './Button.module.scss';
import {classNames, Mods} from "../../../utils/classNames";

export enum ButtonTheme {
    CLEAR = 'clear',
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    GRAY = 'gray'

}

export enum ButtonSize {
    L = 'size_l',
    M = 'size_m',
    XL = 'size_xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: ButtonTheme;
    square?: boolean;
    size?: ButtonSize;
    small?: boolean;
    disabled?: boolean;
    icon?: string;
}

export const Button = memo((props: ButtonProps) => {
    const {
        children,
        icon,
        className,
        theme = ButtonTheme.PRIMARY,
        square,
        disabled = false,
        small = false,
        size = ButtonSize.M,
        ...otherProps
    } = props;

    const mods: Mods = {
        [cls.square]: square,
        [cls[theme]]: true,
        [cls[size]]: true,
        [cls.disabled]: disabled,
        [cls.small]: small,
    };
    return (
        <button
            type="button"
            disabled={disabled}
            className={classNames(cls.Button, mods, [className])}
            {...otherProps}
        >
            {icon && <i className={`${cls.buttonicon} ${icon}`}></i>}
            {children}
        </button>
    );
});

