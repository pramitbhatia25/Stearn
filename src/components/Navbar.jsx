import { Navbar, NavbarContent, NavbarItem, Link, NavbarBrand, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { Layers } from "lucide-react";
import { RiTelegramLine } from "react-icons/ri";
import { AiOutlineDiscord } from "react-icons/ai";
import { IoIosApps } from "react-icons/io";
import StearnLogo from '/src/assets/Stearn Logo Kit SVG/title.svg';
import { RxLinkedinLogo } from "react-icons/rx";
import { FaSquareXTwitter } from "react-icons/fa6";
import { ImMail } from "react-icons/im";

export default function CustomNavbar() {
  const navigate = useNavigate();

  const SideBarButtonImg = () => (
    <button style={{height: '100%'}}>
      <img
        src={StearnLogo}
        alt=""
        style={{
          height: '100%',
          background: 'transparent',
          transform: 'scale(2.4)',
          zIndex: -1
        }}
      />
    </button>
  )
  
  return (
    <Navbar className="z-[2] h-[10dvh] w-[90dvw] md:w-[96dvw] max-h-[70px] my-[2dvh] mx-[5dvw] md:mx-[2dvw] bg-white/10 backdrop-blur-md shadow-lg rounded-xl border border-white/20" maxWidth="xl">

      <NavbarContent justify="start">
        <SideBarButtonImg/>
      </NavbarContent>

      <NavbarContent justify="end">
        <a href="https://x.com/stearnswap">
          <FaSquareXTwitter className="w-6 h-6 cursor-pointer hover:scale-[1.1] transition-transform duration-200 ease-in-out" />      
        </a>
        <a href="https://www.linkedin.com/company/stearncrypto/">
          <RxLinkedinLogo className='w-6 h-6 cursor-pointer hover:scale-[1.1] transition-transform duration-200 ease-in-out' />
        </a>
        <a href="mailto:hello@stearn.link">
        <ImMail className="w-6 h-6 cursor-pointer hover:scale-[1.1] transition-transform duration-200 ease-in-out" />
        </a>
      </NavbarContent>
    </Navbar>
  );
}

// <IoIosApps className="w-6 h-6 cursor-pointer hover:scale-[1.1] transition-transform duration-200 ease-in-out" onClick={() => { navigate("/dashboard") }} />

// <Layers color="white" />
// <div className="cursor-pointer m-0 p-0 hover:scale-[1.05] transition-transform duration-200 ease-in-out px-2 font-bold text-white text-2xl" onClick={() => { navigate("/") }} >Stearn</div>
