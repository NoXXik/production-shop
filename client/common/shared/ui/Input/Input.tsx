import React, {useState} from 'react';
import {classNames} from "../../../utils/classNames";
import cls from './Input.module.scss';

type InputProps = {
    className?: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    validate?: (value: string) => boolean;
    errorMessage?: string;
    type?: string;
};

export const Input: React.FC<InputProps> = ({
                                         className,
                                         type,
                                         label,
                                         value,
                                         onChange,
                                         validate,
                                         errorMessage,
                                     }) => {
    const [error, setError] = useState<string | null>(null);
    const [isFocus, setIsFocus] = useState(false)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        if (validate && !validate(newValue)) {
            setError(errorMessage || 'Invalid input');
        } else {
            setError(null);
        }
        onChange(newValue);
    };

    const handleBlur = () => {
        if (validate && !validate(value)) {
            setError(errorMessage || 'Invalid input');
        } else {
            setError(null);
        }
        setIsFocus(false)
    }

    return (
        <div className={`${cls.inputblock} ${classNames('', {[cls.focused]: isFocus}, [className])}`}>
            <input onBlur={() => handleBlur()} onFocus={(event) => setIsFocus(true)} className={classNames(cls.Input, {}, [])} type={type} value={value} onChange={handleChange} placeholder={label}/>
            {error && <span className={cls.errorMessage}>{error}</span>}
        </div>
    );
};
