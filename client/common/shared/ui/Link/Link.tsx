import React, {ButtonHTMLAttributes, memo} from "react";
import {classNames, Mods} from "../../../utils/classNames";
import cls from "./Link.module.scss";
import Link, {LinkProps} from "next/link";


interface AppLinkProps extends LinkProps {
    className?: string;
    children: React.ReactNode;
    href: string;
    theme?: AppLinkTheme;
    disabled?: boolean;
    icon?: string;
    itemProp?:string;
    target?: string | null;
}
export enum AppLinkTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    BUTTON = 'buttonLink',
    MOBILE = 'mobile'
}

export const AppLink = memo((props: AppLinkProps) => {
    const {
        children,
        icon,
        href,
        className,
        theme = AppLinkTheme.PRIMARY,
        disabled = false,
        itemProp,
        target = null,
        ...otherProps
    } = props;

    const mods: Mods = {
        [cls[theme]]: true,
        [cls.disabled]: disabled,
    };
    return (
        <Link
            href={href}
            itemProp={itemProp}
            target={target ? target: ''}
            className={classNames(cls.Link, mods, [className, cls[theme]])}
            {...otherProps}
        >
            {icon && <i className={`${cls.linkicon} ${icon}`}></i>}
            {children}
        </Link>
    );
});
