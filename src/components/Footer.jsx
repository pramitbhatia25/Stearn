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
                <div className="flex flex-col md:flex-row justify-around">
                    <div className="flex flex-col items-center justify-center md:justify-start w-full px-5">

                        <div className="z-[3] text-white text-lg text-center md:text-left w-full">
                            Keep in touch with product updates and be the first one to know!
                        </div>

                        <Spacer y={5} />

                        <div className="z-[3] light flex flex-col md:flex-row gap-4 w-full">
                            <Input
                                type="email"
                                placeholder="you@example.com"
                                labelPlacement="outside"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                startContent={<MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
                            />
                            {registerLoading ? <>
                                <div className="flex gap-4 m-auto  w-full">
                                    <Button color="secondary" auto className="mx-auto md:mx-0 mb-5 py-3 px-8" >
                                        Loading...
                                    </Button>
                                </div>
                            </> : <>
                                <div className="flex gap-4 m-auto w-full">
                                    <Button auto className="mx-auto md:mx-0 mb-5 py-3 px-8 custom_btn" onClick={registerUser}>
                                        Join Waitlist
                                    </Button>
                                </div>
                            </>}
                        </div>
                        <div className="z-[3] text-center md:text-left w-full">
                            {registerMessage}
                        </div>

                    </div>

                    <div className="px-5 my-10 md:my-0 text-center md:text-left">
                        <h2 className="text-lg font-semibold text-white">Quick Links</h2>
                        <ul className="mt-2 space-y-2">
                            <li>
                                <a
                                    href="#"
                                    className="hover:underline hover:text-white transition"
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.linkedin.com/company/stearncrypto/"
                                    className="hover:underline hover:text-white transition"
                                >
                                    LinkedIn
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://x.com/stearnswap"
                                    className="hover:underline hover:text-white transition"
                                >
                                    X / Twitter
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:underline hover:text-white transition"
                                >
                                    Email: hello@stearn.link
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://calendly.com/prashanthkonda"
                                    className="underline"
                                >
                                    Book A Meeting
                                </a>
                            </li>

                        </ul>
                    </div>

                </div>

                <div className="border-t border-gray-700 mt-8 pt-4 text-center">
                    <p className="text-sm">
                        &copy; {new Date().getFullYear()} Kapstone. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    </>
}

export default Footer;