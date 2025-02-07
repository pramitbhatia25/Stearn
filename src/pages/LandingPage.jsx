import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import CustomNavbar from "../components/Navbar";
import "./index.css";
import { Button, Spacer } from '@nextui-org/react';


function LandingPage() {

    const navigate = useNavigate()

    return (

        <div className="landingpage">

            <div className="fixed w-full top-0 z-[50]">
                <CustomNavbar />
            </div>

            <div className="h-auto bg-image-landing">
                <div className="pt-[14dvh] flex flex-col items-start max-w-[1800px] mx-auto h-[100dvh]">
                    <div className="flex flex-col items-center justify-center w-[90%] md:w-[65%] mx-auto h-full">

                        <div className="z-[3] text-4xl text-white md:text-5xl w-full font-bold flex flex-wrap justify-center text-center">
                            Join the <span className="text-purple-400 mx-3">BTC <span className="text-white mx-0">Revolution</span> </span> today! Earn points
                            on every swap.
                        </div>

                        <Spacer y={5} />

                        <div className="z-[3] text-white text-lg justify-center text-center w-4/5">
                            Empowering developers with a robust suite of APIs, SDKs, and tools to create seamless single-chain and cross-chain solutions.
                        </div>

                        <Spacer y={5} />

                        <div className="z-[3] light flex flex-col sm:flex-row gap-4 max-w-[500px]">
                            <div className="flex gap-4 m-auto">
                                <Button auto className="mb-5 py-3 px-8 custom_btn" onClick={() => { navigate("/app") }}>
                                    Launch App
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />

            </div>
        </div>
    );
}

export default LandingPage;
