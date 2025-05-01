import React from "react";
import Image from "next/image";

interface AboutProps {
    imageUrl: string;
    imageAlt: string;
    heading: string;
}


const About = (props: AboutProps) => {
    return (
        <section className="bg-white py-20 px-6 md:px-12 border-t border-gray-200">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
                        Redefining Shared Living with RooMe
                    </h2>
                    <p className="text-gray-600 text-lg mb-4">
                        RooMe is a smart, intuitive platform that connects like-minded people looking for
                        shared living spaces. We help you find not just a place to stay, but the right people
                        to live with.
                    </p>
                    <p className="text-gray-600 text-lg mb-4">
                        Whether you're a student, remote worker, or just relocating to a new city, RooMe lets
                        you browse curated listings, filter by hobbies and lifestyle, and discover potential
                        flatmates that actually vibe with you.
                    </p>
                    <p className="text-gray-600 text-lg">
                        Say goodbye to endless scrolling. RooMe makes shared housing simple, smart, and social.
                    </p>
                </div>

                <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200">
                    <Image
                        src={props.imageUrl}
                        width={500}
                        height={500}
                        alt="People in shared living space"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </section>
    );
};

export default About;
