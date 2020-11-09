import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export default function LoginCarousel() {
    return (
        <div className='loginCarousel'>
            <Carousel
                showThumbs={false}
                showStatus={false}
                autoPlay={true}
                infiniteLoop={true}>
                <div>
                    <img src={require('../assets/mask_group.png')} />
                </div>
                <div>
                    <img src={require('../assets/mask_group.png')} />
                </div>
                <div>
                    <img src={require('../assets/mask_group.png')} />
                </div>
            </Carousel>
        </div>
    )
}


