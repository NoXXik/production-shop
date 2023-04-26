import React, {useEffect, useState} from 'react';
import cls from "./Galery.module.scss";
import {classNames} from "../../../utils/classNames";
interface GalleryProps {
    className?: string;
    alt?: string;
    images: string[]; // массив с путями к изображениям
}

const Gallery: React.FC<GalleryProps> = ({ images , alt}) => {
    const [mainImage, setMainImage] = useState<string>(images[0]); // основное изображение, начальное значение - первое изображение из массива

    const handleClick = (image: string) => {
        setMainImage(image); // обновляем основное изображение при клике на маленькое изображение
    };
    useEffect(() => {
        setMainImage(images[0])
    }, [images])

    return (
        <div className={classNames(cls.galleryContainer, {}, [])}>
            <div className={cls.smallImages}>
                {images.map((image,id) => ( id < 6 &&
                    <img
                        className={classNames(cls.smallImage, {[cls.selectedImage]: image === mainImage}, [])}
                        key={image}
                        src={`http://localhost:5000/productImages/${image}`}
                        alt={alt ? alt: "Small image"}
                        onMouseOver={() => handleClick(image)}
                    />
                ))}
            </div>
            <div className={cls.mainImage}>
                <img src={`http://localhost:5000/productImages/${mainImage}`} alt={alt ? alt: "Main image"} />
            </div>
        </div>
    );
};

export default Gallery;
