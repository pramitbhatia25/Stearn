import CustomNavbar from "../../components/Navbar";
import "./index.css";
import { Accordion, AccordionItem, Button, Card, CardBody, CardFooter, Image, CardHeader, Input, Skeleton, Spacer } from '@nextui-org/react';
import { useEffect, useState } from "react";
import { MailIcon } from "../../components/MailIcon";
import register from "../../components/register";
import { SquareArrowOutUpRight, CircleChevronDown } from "lucide-react"

function Home() {

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

            <div className="h-auto bg-image-landing">
                <div className="flex flex-col md:flex-row max-w-[1800px] mx-auto">
                    <div className="flex flex-col items-center md:items-start justify-center w-full md:w-[65%] mx-auto md:pl-10 min-h-[90vh] md:min-h-[100vh]">


                        <div className="text-4xl text-white md:text-5xl w-5/5 font-bold flex flex-wrap justify-center text-center md:justify-start md:text-left">
                            Swap and stake crypto on <span className="text-purple-400 mx-3">any</span> chain,
                            <span className="text-purple-400 mx-3">any</span> protocol,
                            <span className="text-purple-400 mx-3">any</span>time
                        </div>

                        <Spacer y={5} />

                        <div className="text-white text-lg  w-4/5 md:w-1/2  justify-center text-center md:justify-start md:text-left w-4/5">
                            Empowering developers with a robust suite of APIs, SDKs, and tools to create seamless single-chain and cross-chain solutions.
                        </div>

                        <Spacer y={5} />

                        <div className="light flex flex-col sm:flex-row gap-4 max-w-[500px]">
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
                                    <Button color="secondary" auto className="mb-5 py-3 px-8" onClick={registerUser}>
                                        Join Waitlist
                                    </Button>
                                </div>
                            </>}
                        </div>
                        {registerMessage}

                    </div>

                </div>
            </div>
            <Spacer y={5} id="products" />

            <div id="products" className="flex flex-col items-center justify-center w-screen mx-auto m-10">

                <div className="text-3xl md:text-4xl w-5/5 md:w-1/2 font-bold flex flex-wrap items-center justify-center text-center">
                    Product Suite <CircleChevronDown className="ml-2" size={30} />
                </div>

                <Spacer y={5} />
            </div>

            <Spacer y={5} id="features" />

            <div className="flex flex-col items-center justify-center w-screen mx-auto m-10">

                <div className="text-3xl md:text-4xl w-5/5 md:w-1/2 font-bold flex flex-wrap items-center justify-center text-center">
                    Features
                </div>
                <Spacer y={5} />

                <div className="max-w-[1200px] mx-auto flex flex-col gap-10">

                </div>

            </div>

            <Spacer y={5} />

            <Spacer id="faq" y={5} />

            <div className="flex flex-col items-center justify-center w-screen mx-auto m-10">

                <div className="text-3xl md:text-4xl w-5/5 md:w-1/2 font-bold flex flex-wrap items-center justify-center text-center">
                    Frequently Asked Questions
                </div>

                <div className="text-1xl md:text-2xl w-5/5 md:w-1/2 mt-3 m-2 flex flex-wrap items-center justify-center text-center">
                    Can&apos;t find what you&apos;re looking for? Contact us for more information.
                </div>

                <Spacer y={5} />

                <div className="w-[90%] md:w-[70%]">
                    <Accordion variant="splitted">
                        <AccordionItem key="1" aria-label="Accordion 1" title="What is Stearn, and how does it work?">
                            {defaultContent}
                        </AccordionItem>
                        <AccordionItem key="2" aria-label="Accordion 2" title="How is Stearn different to integrating THORChain, Chainflip, Maya Protocol or other Aggregators directly?">
                            {defaultContent}
                        </AccordionItem>
                        <AccordionItem key="3" aria-label="Accordion 3" title="Can I integrate Stearn with my existing product?">
                            {defaultContent}
                        </AccordionItem>
                        <AccordionItem key="4" aria-label="Accordion 4" title="What routes/blockchains are supported?">
                            {defaultContent}
                        </AccordionItem>
                        <AccordionItem key="5" aria-label="Accordion 5" title="Can I earn affiliate fees for swaps?">
                            {defaultContent}
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>

            <Spacer y={5} />

            <div className="flex flex-col items-center justify-center w-screen mx-auto m-10">

                <div className="text-3xl md:text-4xl w-5/5 md:w-1/2 font-bold flex flex-wrap items-center justify-center text-center">
                    Try Stearn today!
                </div>

                <div className="text-1xl md:text-2xl w-5/5 md:w-1/2 mt-3 m-2 flex flex-wrap items-center justify-center text-center">
                    Use the API or our WebApp to swap, stake and earn!
                </div>

                <div className="light flex flex-col sm:flex-row gap-4 max-w-[500px]">
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
                        <Button color="secondary" auto className="mb-5 py-3 px-8" onClick={registerUser}>
                            Join Waitlist
                        </Button>
                    </div>
                </>}
            </div>
            {registerMessage}


                <Spacer y={5} />

            </div>
        </div>
    );
}

export default Home;
