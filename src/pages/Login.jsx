import { Button, Card, CardFooter, Spacer } from "@nextui-org/react";
import CustomNavbar from "../components/Navbar";
import "./index.css";
import Lottie from 'react-lottie';
import animationData from '../assets/cor.json';
import animationData2 from '../assets/uni.json';


function Login() {
    const openInNewTab = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };  

      const defaultOptions2 = {
        loop: true,
        autoplay: true,
        animationData: animationData2,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };  

    return (
        <div className="login">
            <CustomNavbar />
            <div className="flex flex-col items-center justify-center p-4 w-4/5 mx-auto min-h-[60vh]">
                <Spacer y={1.5} />
                <div className="text-4xl font-bold mb-2 text-center w-full">
                    Login
                </div>
                <Spacer y={5} />
                <div className="flex flex-wrap gap-10 justify-center w-full">
                    <Card isFooterBlurred radius="lg" className="border-none max-w-[300px]">
                    <Lottie 
                    options={defaultOptions2}
                    height={250}
                    width={300}
                  />
            
                        <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                            <p className="text-lg text-white/100">Kapstone For University</p>
                            <Button onClick={() => {openInNewTab("https://kapstone-for-university.vercel.app/login")}} className="text-tiny text-white bg-black/50" variant="flat" color="default" radius="lg" size="sm">
                                Login
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card isFooterBlurred radius="lg" className="border-none max-w-[300px]">
                    <Lottie 
                    options={defaultOptions}
                    height={250}
                    width={300}
                  />
                        <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                            <p className="text-lg text-white/100">Kapstone For Corporate</p>
                            <Button onClick={() => {openInNewTab("https://kapstoneproject.vercel.app/login")}} className="text-tiny text-white bg-black/50" variant="flat" color="default" radius="lg" size="sm">
                                Login
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
                <Spacer y={2} />
            </div>
        </div>
    );
}

export default Login;
