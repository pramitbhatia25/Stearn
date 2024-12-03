import CustomNavbar from "../components/Navbar";
import "./index.css";
import Cookies from 'js-cookie';
import { Accordion, AccordionItem, Button, Card, CardBody, CardFooter, Image, CardHeader, Chip, CircularProgress, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Skeleton, Spacer, useDisclosure } from '@nextui-org/react';
import { useEffect, useState } from "react";
import features from "../data/features"
import { MailIcon } from "../components/MailIcon";
import register from "../components/register";
import ConfettiExplosion from 'react-confetti-explosion';
import { SquareArrowOutUpRight, CircleChevronDown } from "lucide-react"

function LandingPage() {

    const [isLoaded, setIsLoaded] = useState(false);
    const [isExploding, setIsExploding] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [registrationMessage, setRegistrationMessage] = useState("");
    const [registerLoading, setRegisterLoading] = useState(false);
    const [value, setValue] = useState("");
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const defaultContent =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

    const toggleLoad = () => {
        setIsLoaded(!isLoaded);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            toggleLoad(true);
        }, 1000);

        const registrationStatus = Cookies.get('registered');
        setIsRegistered(registrationStatus === 'true');

        return () => clearTimeout(timer);
    }, []);

    async function registerUser() {
        setRegisterLoading(true)

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            setRegistrationMessage("Please enter a valid email address.");
            setRegisterLoading(false);
            return;
        }

        const regres = await register(value);

        if (regres === "Success") {
            setIsExploding(true)
            setRegistrationMessage("You have been registered successfully!")
            Cookies.set('registered', 'true', { expires: 7 });
            setRegisterLoading(false)
            setIsRegistered(true);
        }
        else {
            setRegistrationMessage("Error with registration, please try again!")
            setRegisterLoading(false)
        }

    }

    return (

        <div className="landingpage">

            <CustomNavbar/>

            <div className="flex flex-col items-center justify-center w-screen mx-auto mb-10 min-h-[65dvh] bg-image-landing">

                <div className="flex m-5 gap-2 border border-black p-1 bg-[#1a1a1a] rounded-full items-center">
                    <Chip
                        variant="shadow"
                        classNames={{
                            base: "bg-gradient-to-br from-purple-500 to-purple-200 border-small border-white/50 shadow-purple-500/30",
                            content: "drop-shadow shadow-black text-black",
                        }}
                    >
                        New
                    </Chip>
                    <div className="flex justify-center items-center text-center px-2">
                        Launching Spring 2025
                    </div>
                </div>

                <Spacer y={5} />

                <div className="text-4xl md:text-5xl w-5/5 md:w-1/2 font-bold flex flex-wrap justify-center text-center">
                    Swap and stake crypto on <span className="text-purple-400 mx-3">any</span> chain,
                    <span className="text-purple-400 mx-3">any</span> protocol,
                    <span className="text-purple-400 mx-3">any</span>time
                </div>

                <Spacer y={5} />

                <div className="text-lg  w-4/5 md:w-1/2 text-center w-4/5">
                    Empowering developers with a robust suite of APIs, SDKs, and tools to create seamless single-chain and cross-chain solutions.
                </div>

                <Spacer y={5} />

                {isRegistered ? <>
                    <div className="flex gap-4">
                        <Button color="secondary" auto className="mb-5 py-3 px-8">
                            Thank you for registering!
                        </Button>
                    </div>
                </> : <>
                    <div className="flex gap-4">
                        <Button color="secondary" auto className="mb-5 py-3 px-8" onPress={onOpen}>
                            Join Waitlist
                        </Button>
                    </div>
                </>}

            </div>

            <Spacer y={5} />

            <div className="flex flex-col items-center justify-center w-screen mx-auto m-10">

                <div className="text-3xl md:text-4xl w-5/5 md:w-1/2 font-bold flex flex-wrap items-center justify-center text-center">
                    Product Suite <CircleChevronDown className="ml-2" size={30} />
                </div>

                <Spacer y={5} />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 p-10">
                    {features.map((feature, index) => (
                        <Skeleton classname="cursor-default" key={index} isLoaded={isLoaded} className="rounded-lg">
                            <Card className=" cursor-default max-w-[500px] hover:scale-[1.05] transition-transform duration-200 ease-in-out">
                                <CardHeader className="flex gap-3 items-center">
                                    <div style={{ height: "30px", width: "30px" }}>
                                        {feature.icon}
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-xl font-semibold">{feature.title}</p>
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    <p className="text-md text-ellipsis line-clamp-5">{feature.description}</p>
                                </CardBody>
                                <CardFooter className="flex flex-col items-center">
                                    <Image
                                        alt="Card background"
                                        className="w-full h-[200px] object-contain rounded-md"
                                        src="https://nextui.org/images/hero-card-complete.jpeg"
                                    />
                                    <div className="flex gap-2">
                                        <Button className="mt-5" radius="full" size="md">Learn More</Button>
                                        <Button className="mt-5" radius="full" size="md">Documentation <SquareArrowOutUpRight color="gray" size={20} /></Button>
                                    </div>
                                </CardFooter>
                            </Card>
                        </Skeleton>
                    ))}

                </div>


            </div>


            <Spacer y={5} />

            <div className="flex flex-col items-center justify-center w-screen mx-auto m-10">

                <div className="text-3xl md:text-4xl w-5/5 md:w-1/2 font-bold flex flex-wrap items-center justify-center text-center">
                    Frequently Asked Questions
                </div>

                <div className="text-1xl md:text-2xl w-5/5 md:w-1/2 mt-3 m-2 flex flex-wrap items-center justify-center text-center">
                    Can&apos;t find what you&apos;re looking for? Contact us for more information.
                </div>

                <Spacer y={5} />

                <div className="w-[90%] md:w-[70%]">
                    <Accordion variant="splitted" defaultExpandedKeys={["1"]}>
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

                <Spacer y={5} />

                <div className="flex gap-4">
                    <Button color="secondary" variant="flat" auto className="mb-5 py-3 px-8" onPress={onOpen}>
                        Learn More
                    </Button>
                </div>

                <div className="flex gap-4">
                    <Button color="secondary" auto className="mb-5 py-3 px-8" onPress={onOpen}>
                        Join Waitlist
                    </Button>
                </div>

            </div>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            {
                                isExploding && <ConfettiExplosion />
                            }

                            <ModalHeader>
                                <h3>Register for Early Access</h3>
                            </ModalHeader>
                            <ModalBody>
                                {!isRegistered && (
                                    <Input
                                        type="email"
                                        placeholder="you@example.com"
                                        labelPlacement="outside"
                                        value={value}
                                        onChange={(e) => setValue(e.target.value)}
                                        startContent={<MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
                                    />
                                )}
                                <p>{registrationMessage}</p>
                                {registerLoading && <>
                                    <CircularProgress className="mx-auto" size="sm" color="success" aria-label="Loading..." />
                                </>}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="default" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                {!isRegistered && (
                                    <Button color="secondary" auto onClick={registerUser}>
                                        Register
                                    </Button>
                                )}
                            </ModalFooter>
                        </>)}
                </ModalContent>
            </Modal>

        </div>
    );
}

export default LandingPage;
