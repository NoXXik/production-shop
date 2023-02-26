import Image from "next/image";
import React from "react";

export default function About() {
    return (
        <>
            About
            <div className="product__image">
                <a className="product__image-link">
                    <Image src={`http://smarthome16.ru:5000/productImages/25c472a7-81bd-41d4-a806-9666e4713ce6.jpeg`} fill
                           alt="" className="product__image-img"/>
                    <img className="product__image-img" src="http://smarthome16.ru:5000/productImages/25c472a7-81bd-41d4-a806-9666e4713ce6.jpeg" alt=""/>
                </a>
                <div className="product__image-labels">
                </div>
            </div>

        </>
    )
}
