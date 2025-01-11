import { useEffect, useState } from 'react';
import { Home, ArrowLeftRight, DollarSign, UsersRound, Replace, ChartArea, Wallet, CircleUserRound, MessageCircleQuestion } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { Button } from '@nextui-org/button';
import { useLocation } from 'react-router-dom';

const Sidebar = ({collapsed, setIsSidebarCollapsed, onToggleCollapse}) => {
  const [activeRoute, setActiveRoute] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const SidebarItem = ({ icon: Icon, label, to, collapsed }) => (
    <div
    >
      <Button
      onClick={() => navigate(to)}
        variant={activeRoute === to ? "solid" : "light"}
        size="sm"
        color="secondary"
        className={`w-[90%] justify-start text-gray-300 hover:text-white my-1 ${activeRoute === to ? "custom_btn": ""} ${collapsed ? "px-0 py-1 justify-center flex-col h-fit" : "px-2"
          }`}
      >
        <Icon className={`${collapsed ? "h-4 w-4" : "mr-3 h-5 w-5 "} ${activeRoute === to ? "text-purple" : "text-white"}`} />
          {!collapsed && <span>{label}</span>}
          {collapsed && <div className="text-xs">{label}</div>}
        </Button>
    </div>
  );


  useEffect(() => {
    const handleResizeAndRoute = () => {
      setIsSidebarCollapsed(window.innerWidth < 768);
  
      const currentPath = location.pathname;
      console.log(location)
      const routes = [
        "/dashboard",
        "/dashboard/",
        "/dashboard/transactions",
        "/dashboard/fees",
        "/dashboard/affiliate",
        "/dashboard/swap",
        "/dashboard/stake",
        "/dashboard/withdraw",
        "/dashboard/support",
      ];
  
      const matchedRoute = routes.find((route) =>
        currentPath === route
      );
  
      setActiveRoute(matchedRoute || "");
    };
  
    handleResizeAndRoute();
    window.addEventListener("resize", handleResizeAndRoute);
  
    return () => {
      window.removeEventListener("resize", handleResizeAndRoute);
    };
  }, [location]);
  
  return (
    <div
    >
      <div className={` h-[10dvh] max-h-[70px] flex items-center ${collapsed ? 'justify-center' : 'justify-between'} border-b border-gray-800`}>
      {!collapsed && (
        <div
        onClick={() => {window.location = "http://stearn.link/"}}
          className="cursor-pointer m-0 px-4 font-bold text-white text-xl hover:scale-[1.05] transition-transform duration-200 ease-in-out"
        >
          Stearn
        </div>
      )}
      {collapsed && (
        <div
        onClick={() => {window.location = "http://localhost:5173/"}}
          className="cursor-pointer m-0 p-0 font-bold text-white text-sm hover:scale-[1.05] transition-transform duration-200 ease-in-out"
        >
          Stearn
        </div>
      )}
      
      </div>
      <nav className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="py-3 text-center">
          {!collapsed && (
            <h3 className="mb-2 px-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Main
            </h3>
          )}
          <SidebarItem icon={Home} label="Dashboard" to="/dashboard" collapsed={collapsed} />
          <SidebarItem icon={ArrowLeftRight} label="Transactions" to="/dashboard/transactions" collapsed={collapsed} />
          <SidebarItem icon={DollarSign} label="Fees" to="/dashboard/fees" collapsed={collapsed} />
{/*          <SidebarItem icon={UsersRound} label="Affiliate" to="/dashboard/affiliate" collapsed={collapsed} />*/}
        </div>
        <div className="py-3 text-center">
          {!collapsed && (
            <h3 className="mb-2 px-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Components
            </h3>
          )}
          <SidebarItem icon={Replace} label="Swap" to="/dashboard/swap" collapsed={collapsed} />
          <SidebarItem icon={ChartArea} label="Stake" to="/dashboard/stake" collapsed={collapsed} />
          <SidebarItem icon={Wallet} label="Withdraw" to="/dashboard/withdraw" collapsed={collapsed} />
        </div>
        <div className="py-3 text-center">
          {!collapsed && (
            <h3 className="mb-2 px-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Settings
            </h3>
          )}
{/*          <SidebarItem icon={CircleUserRound} label="Account" to="/account" collapsed={collapsed} />*/}
          <SidebarItem icon={MessageCircleQuestion} label="Support" to="/dashboard/support" collapsed={collapsed} />
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
