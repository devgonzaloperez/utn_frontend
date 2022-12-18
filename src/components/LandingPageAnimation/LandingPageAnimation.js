import Lottie from "lottie-react";
import LandingPageAnimationFile from '../../assets/Animations/LandingPageAnimationFile.json';

export const LandingPageAnimation = ({size}) => {

    const lottieLandingPageAnimationOptions = {
        animationData: LandingPageAnimationFile,
        autoplay: true,
        loop: true,
        style: {width: size}
    };
    
    return (
        <Lottie {...lottieLandingPageAnimationOptions}/>
    )
};