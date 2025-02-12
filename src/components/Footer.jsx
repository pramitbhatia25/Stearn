import { Button } from "@nextui-org/button";
import { Input, Spacer } from "@nextui-org/react";
import { MailIcon } from "lucide-react";
import { useEffect, useState } from "react";
import register from "../components/register";

function Footer() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [registerLoading, setRegisterLoading] = useState(false);
    const [registerMessage, setRegisterMessage] = useState(false);
    const [value, setValue] = useState("");

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

    return <>
        <footer className="w-full ">
            <div className=" mx-auto px-4 py-10 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-center">
                    <div className="flex flex-col items-center justify-center w-[85%] px-5">

                        <div className="z-[3] text-white text-lg md:text-2xl text-center  w-full md:w-[80%]">
                            AI-powered analytics to help you spot the next big opportunity. <br /> Launching Soon 😉.
                        </div>

                        <Spacer y={5} />

                        <div className="z-[3] light flex flex-col md:flex-row gap-4 w-full md:w-[65%]">
                            <Input
                                type="email"
                                placeholder="you@example.com"
                                labelPlacement="outside"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                startContent={<MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
                            />
                            {registerLoading ? <>
                                <div className="flex gap-4 m-auto w-fit">
                                    <Button color="secondary" auto className="mx-auto md:mx-0 mb-5 py-3 px-8" >
                                        Loading...
                                    </Button>
                                </div>
                            </> : <>
                                <div className="flex gap-4 m-auto w-fit">
                                    <Button auto className="mx-auto md:mx-0 mb-5 py-3 px-8 custom_btn" onClick={registerUser}>
                                        Join Waitlist
                                    </Button>
                                </div>
                            </>}
                        </div>
                        <div className="z-[3] text-center w-full">
                            {registerMessage}
                        </div>

                    </div>

                </div>

                <div className="border-t border-gray-700 mt-8 pt-4 text-center">
                    <p className="text-sm">
                        &copy; {new Date().getFullYear()} Stearn. All rights reserved. <a href="https://calendly.com/prashanthkonda" className="underline">Contact Us</a>
                    </p>
                </div>
            </div>
        </footer>
    </>
}

export default Footer;