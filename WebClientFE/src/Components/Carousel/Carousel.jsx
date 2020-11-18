import React, { Component } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import carousel1 from './../../Assets/Images/Carousel/Carousel1.jpg'
import carousel2 from './../../Assets/Images/Carousel/Carousel2.jpg'
import carousel3 from './../../Assets/Images/Carousel/Carousel3.jpg'
import carousel4 from './../../Assets/Images/Carousel/Carousel4.jpg'
import banner1 from './../../Assets/Images/Promotion/banner-1.png'
import banner2 from './../../Assets/Images/Promotion/banner-2.jpg'


export default class Carousel extends Component {
    render() {
        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true
        };
        return (
            <div className='My-Carousel container'>
                <div className="row carousel_content">
                    <div className="col-8 carousel_info">
                        <Slider {...settings}>
                            <div className='carousel-item'>
                                <img src={carousel1} alt="Error" />
                            </div>
                            <div className='carousel-item'>
                                <img src={carousel2} alt="Error"/>
                            </div>
                            <div className='carousel-item'>
                                <img src={carousel3} alt="Error"/>
                            </div>
                            <div className='carousel-item'>
                                <img src={carousel4} alt="Error"/>
                            </div>
                        </Slider>
                    </div>
                    <div className="col-4 carousel-promotion">
                        <div className="row">
                            <img src={banner1} alt="Error"/>
                        </div>
                        <div className="row pt-2">
                            <img src={banner2} alt="Error"/>
                        </div>
                        <div className="text">
                            <h4>Các chương trình khuyến mãi</h4>
                        </div>
                    </div>
                </div>


            </div>
        )
    }
}
