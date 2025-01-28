import CustomNavbar from "../components/Navbar";
import "./index.css";
import { Button, Input, Spacer } from '@nextui-org/react';
import { useEffect, useState } from "react";
import register from "../components/register";
import msfs from "../assets/msfspng.png"
import sx from "../assets/sx.webp"
import gt from "../assets/gt.png"
import btcslr from "../assets/btcsl.jpg"
import Footer from "../components/Footer";
import { MailIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";


function LandingPage() {

    const [isLoaded, setIsLoaded] = useState(false);
    const [registerLoading, setRegisterLoading] = useState(false);
    const [registerMessage, setRegisterMessage] = useState(false);
    const [value, setValue] = useState("");
    const navigate = useNavigate()

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
                                <Button auto className="mb-5 py-3 px-8 custom_btn" onClick={() => {navigate("/app")}}>
                                    Launch App
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center w-[90%] md:w-[65%] mx-auto h-fit ">

                    <Spacer y={5} />

                    <div className="z-[3] text-white text-lg justify-center text-center w-4/5">
                        Keep in touch with product updates and be the first one to know!
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
                    <div className="z-[3]">
                        {registerMessage}
                    </div>

                </div>
                <Footer />

            </div>
        </div>
    );
}

export default LandingPage;
