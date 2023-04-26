import React, {useState} from 'react';
import {classNames} from "../../../utils/classNames";
import cls from './SearchInput.module.scss';
import {IProduct} from "../../../types/productTypes";
import {AppLink} from "../Link/Link";
import {Button, ButtonTheme} from "../Button/Button";

type InputProps = {
    className?: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    products: IProduct[];
    mobile?: boolean;
    focused: boolean;
    setFocus: React.Dispatch<React.SetStateAction<boolean>>
};

export const SearchInput: React.FC<InputProps> = ({
                                                      products,
                                                      className,
                                                      mobile = false,
                                                      label,
                                                      value,
                                                      onChange,
                                                      setFocus,
                                                      focused,
                                                  }) => {
    // const [isFocus, setIsFocus] = useState(false)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        onChange(newValue);
    };
    if (mobile) {
        return (
            <div className={classNames(className || '', {[cls.mobile]: mobile}, [])}>
                <div className={cls.inputBlock}>
                    <div className={`${cls.SearchInputBlock} ${classNames('', {}, [])}`}>
                        <div>
                            <Button className={cls.searchButton} icon={'_icon-search'}
                                    theme={ButtonTheme.CLEAR}></Button>
                            <input className={classNames(cls.SearchInput, {}, [])} type={'text'} value={value}
                                   onChange={handleChange}
                                   placeholder={label}/>
                        </div>
                    </div>
                    {mobile &&
                        <Button className={cls.mobileCloseBtn} onClick={() => setFocus(false)} icon={'_icon-close'}
                                theme={ButtonTheme.CLEAR}></Button>}
                </div>
                {(products && products.length > 0) &&
                    <div className={cls.searchProductListMobile}>
                        {products.map(product =>
                            <React.Fragment key={product.id}>
                                <AppLink className={cls.searchLink}
                                         href={`/catalog/${product.category_name}/${product.title_translit}`}>
                                    <span className={cls.searchLinkTitle}>{product.title}</span>
                                    {(product.discount && Date.parse(product.discount.expirationDate) > Date.now()) ?
                                        <span
                                            className={cls.searchLinkPrice}>{(product.currently_price * (product.discount.discount / 100)).toFixed(2)} ₽</span>
                                        : <span className={cls.searchLinkPrice}>{product.currently_price} ₽</span>
                                    }
                                </AppLink>
                            </React.Fragment>
                            )}
                    </div>
                }
            </div>
        );
    }
    // setFocus(true)
    return (
        <div className={`${cls.SearchInputBlock} ${classNames(className || '', {
            [cls.focused]: focused,
        }, [])}`}>
            <Button onClick={() => setFocus(true)} className={cls.searchButton} icon={'_icon-search'}
                    theme={ButtonTheme.CLEAR}></Button>
            <input className={classNames(cls.SearchInput, {}, [])} type={'text'} value={value} onChange={handleChange}
                   placeholder={label}/>
            {(products && products.length > 0 && focused) &&
                <div className={cls.searchProductList}>
                    {products.map(product =>
                        <AppLink className={cls.searchLink}
                                 href={`/catalog/${product.category_name}/${product.title_translit}`}>
                            <span className={cls.searchLinkTitle}>{product.title}</span>
                            {(product.discount && Date.parse(product.discount.expirationDate) > Date.now()) ? <span
                                    className={cls.searchLinkDiscountPrice}>{(product.currently_price * (product.discount.discount / 100)).toFixed(2)} ₽</span>
                                : <span className={cls.searchLinkPrice}>{product.currently_price} ₽</span>
                            }
                        </AppLink>)}
                </div>}
        </div>
    );
};
