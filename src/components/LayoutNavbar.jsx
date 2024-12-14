import { Navbar, NavbarContent, NavbarItem, Link, NavbarBrand, Button} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { Layers } from "lucide-react";
import {
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";

export default function LayoutNavbar() {
  const navigate = useNavigate();

  const styles = {
    secondaryButton: {
      backgroundColor: '#9542f6',
      color: '#fff',
      padding: '0.75rem 2rem',
    },
    navbarBrand: {
      padding: '0 0.5rem',
      fontWeight: 'bold',
      color: 'white',
      fontSize: '1.5rem',
    },
    navbarMenuToggle: {
      color: "white"
    },
    navbarContentCenter: {
      display: 'flex',
      gap: '1rem',
    },
    linkText: {
      fontSize: '0.875rem',
      color: 'inherit',
    },
    navbarMenu: {
      backgroundColor: '#201823',
    },
    navbarMenuItemLink: {
      color: 'white',
      width: '100%',
      fontSize: '1.125rem',
    }
  };

  return (
    <div className="relative sticky top-0 z-10 h-[10dvh] max-h-[70px] w-full border-b border-gray-800 bg-black flex justify-end items-center">
      <div className="w-fit mr-5">
        <DynamicWidget />      
      </div>
    </div>
  );
}
