import { Navbar, NavbarContent, NavbarItem, Link, NavbarBrand, Button} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { Layers } from "lucide-react";

export default function CustomNavbar() {
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
    <Navbar isBordered height="10dvh" maxWidth="xl">

        <NavbarContent justify="start">
          <Layers color="white" />
          <div className="cursor-pointer m-0 p-0 hover:scale-[1.05] transition-transform duration-200 ease-in-out" onClick={() => { navigate("/") }} style={styles.navbarBrand}>Stearn</div>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="#products">
              Product Suite
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#features">
              Features
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#faq">
              FAQ
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} color="secondary" href="dashboard" variant="flat">
            Login
          </Button>
        </NavbarItem>
      </NavbarContent>

    </Navbar>
  );
}
