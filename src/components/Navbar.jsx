import { Navbar, NavbarContent } from "@nextui-org/react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaSquareXTwitter } from "react-icons/fa6";
import { RxLinkedinLogo } from "react-icons/rx";
import { ImMail } from "react-icons/im";
import StearnLogo from '/src/assets/Stearn Logo Kit SVG/title.svg';
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";

export default function CustomNavbar({ widget = false }) {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location/path

  const SideBarButtonImg = () => (
    <button style={{ height: '100%' }}>
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

  // Check if we are on the homepage ('/'), if so, hide the links
  const isHomePage = location.pathname === "/";

  return (
    <Navbar className="z-[2] h-[10dvh] w-[90dvw] md:w-[96dvw] my-[2dvh] mx-[5dvw] md:mx-[2dvw] bg-white/10 backdrop-blur-md shadow-lg rounded-xl border border-white/20 overflow-hidden" maxWidth="full">

      <NavbarContent justify="start" onClick={() => { navigate("/") }}>
        <SideBarButtonImg />
      </NavbarContent>

      {/* Conditionally render links based on the current page */}
      {!isHomePage && (
        <NavbarContent justify="center">
          <div className="cursor-pointer hover:underline" onClick={() => { navigate("/") }}>Home</div>
          <div className="cursor-pointer hover:underline" onClick={() => { navigate("/research") }}>Research</div>
          <div className="cursor-pointer hover:underline" onClick={() => { navigate("/trade") }}>Trade</div>
        </NavbarContent>
      )}

      <NavbarContent justify="end">
        {widget &&
          <div className="flex justify-center" >
            <DynamicWidget innerButtonComponent={<div >Connect Wallet</div>} />
          </div>
        }

        {!widget &&
          <>
            <a href="https://x.com/stearnswap">
              <FaSquareXTwitter className="w-6 h-6 cursor-pointer hover:scale-[1.1] transition-transform duration-200 ease-in-out" />
            </a>
            <a href="https://www.linkedin.com/company/stearncrypto/">
              <RxLinkedinLogo className='w-6 h-6 cursor-pointer hover:scale-[1.1] transition-transform duration-200 ease-in-out' />
            </a>
            <a href="mailto:hello@stearn.link">
              <ImMail className="w-6 h-6 cursor-pointer hover:scale-[1.1] transition-transform duration-200 ease-in-out" />
            </a>
          </>
        }
      </NavbarContent>
    </Navbar>
  );
}

