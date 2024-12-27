import CustomNavbar from "../components/Navbar";
import "./index.css";
import { Button, Input, Spacer } from '@nextui-org/react';
import { useEffect, useState } from "react";
import { MailIcon } from "../components/MailIcon";
import register from "../components/register";
import TradeDemo from "../components/TradeDemo";
import Spline from "@splinetool/react-spline";


function LandingPage() {

    const [isLoaded, setIsLoaded] = useState(false);
    const [registerLoading, setRegisterLoading] = useState(false);
    const [registerMessage, setRegisterMessage] = useState(false);
    const [value, setValue] = useState("");
    const defaultContent =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

    const toggleLoad = () => {
        setIsLoaded(!isLoaded);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            toggleLoad(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    async function registerUser() {
        setRegisterLoading(true)

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            setRegisterMessage("Please enter a valid email address.");
            setRegisterLoading(false);
            return;
        }

        const regres = await register(value);

        if (regres === "Success") {
            setRegisterMessage("You have been registered successfully!")
            setRegisterLoading(false)
        }
        else {
            setRegisterMessage("Error with registration, please try again!")
            setRegisterLoading(false)
        }

    }

    return (

        <div className="landingpage">

            <div className="fixed w-full top-0 z-[50]">
                <CustomNavbar />    
            </div>

            <main className="absolute z-[2] opacity-50 h-[100dvh] w-[100dvw]">
                <Spline
                    scene="https://draft.spline.design/7epTRhwlNQBo4Wa6/scene.splinecode"
                />
            </main>


            <div className="h-auto bg-image-landing">
                <div className="pt-[15dvh] pb-[5dvh] flex flex-col md:flex-row items-start max-w-[1800px] mx-auto">
                    <div className="flex flex-col items-center md:items-start justify-center w-full md:w-[65%] mx-auto md:pl-10 min-h-[90vh] md:min-h-[80vh]">
        
                        <div className="z-[3] text-4xl text-white md:text-5xl w-5/5 font-bold flex flex-wrap justify-center text-center md:justify-start md:text-left">
                            Join the <span className="text-purple-400 mx-3">BTC <span className="text-white mx-0">Revolution</span> </span> today! Earn points
                            on every swap.
                        </div>

                        <Spacer y={5} />

                        <div className="z-[3] text-white text-lg  w-4/5 md:w-1/2  justify-center text-center md:justify-start md:text-left w-4/5">
                            Empowering developers with a robust suite of APIs, SDKs, and tools to create seamless single-chain and cross-chain solutions.
                        </div>

                        <Spacer y={5} />

                        <div className="z-[3] light flex flex-col sm:flex-row gap-4 max-w-[500px]">
                            <Input
                                type="email"
                                placeholder="you@example.com"
                                labelPlacement="outside"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                startContent={<MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
                            />
                            {registerLoading ? <>
                                <div className="flex gap-4 m-auto">
                                    <Button color="secondary" auto className="mb-5 py-3 px-8" >
                                        Loading...
                                    </Button>
                                </div>
                            </> : <>
                                <div className="flex gap-4 m-auto">
                                    <Button auto className="mb-5 py-3 px-8 custom_btn" onClick={registerUser}>
                                        Join Waitlist
                                    </Button>
                                </div>
                            </>}
                        </div>
                        {registerMessage}

                    </div>
                    <div className="z-[3] light flex flex-col items-center justify-center w-full md:w-[35%] mx-auto min-h-[90vh] md:min-h-[80vh]">
                        <TradeDemo />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;