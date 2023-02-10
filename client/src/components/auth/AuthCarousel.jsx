import React from 'react';
import {Carousel} from "antd";

const AuthCarousel = ({img,text,title}) => {
    return (
        <div className={"!flex flex-col items-center justify-center h-full mb-10"}>
            <img className={"w-[550px] h-[400px]"} src={img} alt={"responsive"} />
            <h3 className={"text-5xl text-white text-center"}>{title}</h3>
            <p className={"mt-5 text-3xl text-center text-white"}>{text}</p>
        </div>
    );
};

export default AuthCarousel;
