import Range from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useState } from 'react';

export default ({setMinPrice, setMaxPrice, minPrice, maxPrice}: {setMinPrice: any, setMaxPrice: any, minPrice: number, maxPrice: number}) => {
    const [val, setVal] = useState([0,1000])
    const valueChange = (values: number | number[]) => {
        if(typeof(values) === 'object') {
            setMinPrice(values[0])
            setMaxPrice(values[1])
        }
    }
    

    return (
        <>
            <input type={'number'} value={minPrice} onChange={e => setVal([Number(e.target.value), maxPrice])}></input>
            <input type={'number'} value={maxPrice} onChange={e => setVal([minPrice, Number(e.target.value)])}></input>
            <Range min={0} max={1000} defaultValue={[0,1000]} range={true} onChange={value => valueChange(value)} allowCross={false} value={[minPrice, maxPrice]}/>
         </>
)
}