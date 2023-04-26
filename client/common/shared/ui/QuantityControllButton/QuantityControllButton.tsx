import React, { useState } from "react";
import cls from "./QuantityControllButton.module.scss"

interface Props {
    id: string;
    quantity: number;
    onQuantityChange: (id: string, newCount: number) => void;
    className?: string;
}

const QuantityControl: React.FC<Props> = ({className, id, quantity, onQuantityChange }) => {
    const [currentQuantity, setCurrentQuantity] = useState<number>(quantity);

    const handleIncrement = () => {
        const newQuantity = currentQuantity + 1;
        setCurrentQuantity(newQuantity);
        onQuantityChange(id, newQuantity);
    };

    const handleDecrement = () => {
        if (currentQuantity > 1) {
            const newQuantity = currentQuantity - 1;
            setCurrentQuantity(newQuantity);
            onQuantityChange(id, newQuantity);
        }
    };

    return (
        <div className={`${cls.quantityButtonBlock}${className? className: ''}`}>
            <button className={`${cls.quantityButton} ${cls.quantityButtonDecrement}`} onClick={handleDecrement}>-</button>
            <span className={cls.quantityCounter}>{currentQuantity}</span>
            <button className={`${cls.quantityButton} ${cls.quantityButtonIncrement}`} onClick={handleIncrement}>+</button>
        </div>
    );
};

export default QuantityControl;

