import React, {memo, useEffect, useState} from "react";
import {Mods} from "../../../utils/classNames";
import {Button, ButtonTheme} from "../Button/Button";
import {IProduct} from "../../../types/productTypes";
import {Swiper, SwiperSlide, useSwiper,} from "swiper/react";
import 'swiper/swiper-bundle.min.css';
import ProductItem from "../../../components/ProductList/ProductItem/ProductItem";
// import 'swiper/swiper.scss';
// import "../../../../styles/variables.scss"
// import "./ProductSlider.scss"
import {Pagination, Navigation} from "swiper";

interface ProductSliderProps {
    className?: string;
    products?: IProduct[];
}

export const ProductSlider = memo((props: ProductSliderProps) => {
    const [slideCount, setSlideCount] = useState(3)
    const [spaMode, setSpaMode] = useState(false)
    // const {slidePrev, slideNext, } = useSwiper();

    // const { width } = useResize();
    const {
        className,
        products
    } = props;
    const mods: Mods = {

    };

    useEffect(() => {
        if(window.innerWidth <= 480) {
            setSlideCount(1)
        } else if(window.innerWidth <= 780) {
            setSlideCount(2)
        } else if(window.innerWidth <= 992) {
            setSlideCount(3)
        } else {
            setSlideCount(4)
        }
    }, [])
    if(spaMode) {
        if(window.innerWidth <= 480) {
            setSlideCount(1)
        } else if(window.innerWidth <= 780) {
            setSlideCount(2)
        } else if(window.innerWidth <= 992) {
            setSlideCount(3)
        } else {
            setSlideCount(4)
        }
    }
    return (
        <>
            {/*<Button theme={ButtonTheme.GRAY} className={'slider__prev_button'} square={true} icon={'_icon-small-arrow'}></Button>*/}
            {/*<Button theme={ButtonTheme.GRAY} className={'slider__next_button'} square={true} icon={'_icon-small-arrow'}></Button>*/}
            <Swiper
                modules={[Pagination, Navigation]}
                spaceBetween={50}
                navigation
                pagination={{clickable: true}}
                slidesPerView={slideCount}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                {products && products.map(product => <SwiperSlide key={product.id}>
                    <ProductItem product={product} />
                </SwiperSlide>)}
            </Swiper>
        </>

    );
});

// function SlideNextButton() {
//     const swiper = useSwiper();
//
//     return (
//         <img onClick={() => swiper.slideNext()} className={cls.slider__next_button} src="/swiper-right-arrow.svg" alt={'right arrow'}/>
//     );
// }
//
// function SlidePrevButton() {
//     const swiper = useSwiper();
//
//     return (
//         <img onClick={() => swiper.slidePrev()} className={cls.slider__prev_button} src="/swiper-left-arrow.svg" alt={'left arrow'}/>
//     );
// }
