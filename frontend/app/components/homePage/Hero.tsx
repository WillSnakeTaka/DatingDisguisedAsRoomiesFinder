// components/Hero.js

import React from 'react';
import Image from 'next/image';

interface HeroProps {
    imageUrl: string;
    imageAlt: string;
    heading: string;
}

const Hero = (props: HeroProps) => {
    return (
        <section className="relative w-full h-[400px] sm:h-[600px]">
            {/* Hero Image */}
            <Image
                src={props.imageUrl}
                alt={props.imageAlt}
                fill
                style={{ objectFit: 'cover' }}
            />

            {/* Hero Text/Description */}
            <div className='container flex justify-center items-center absolute inset-0 text-white'>

                <div className=''>

                </div>
            </div>

        </section>
    );
};

export default Hero;
