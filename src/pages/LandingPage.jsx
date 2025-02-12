import Footer from "../components/Footer";
import CustomNavbar from "../components/Navbar";
import "./index.css";
import { Spacer } from '@nextui-org/react';


function LandingPage() {

    return (

        <div className="landingpage">

            <div className="fixed w-full top-0 z-[50]">
                <CustomNavbar />
            </div>

            <div className="pt-[20dvh] h-fit min-h-[100dvh] bg-image-landing flex flex-col justify-between items-start max-w-[1800px] mx-auto h-fit">
                <div className="flex flex-col items-center justify-center w-[90%] md:w-[65%] mx-auto h-full">

                    <div className="z-[3] text-4xl text-white md:text-7xl w-full font-bold flex flex-wrap justify-center text-center">
                        The best time to buy Bitcoin was 10 years ago.
                    </div>

                    <Spacer y={5} />

                    <div className="z-[3] text-white text-2xl md:text-4xl justify-center text-center w-4/5">
                        The second best time? Right now.
                    </div>
                    
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default LandingPage;
