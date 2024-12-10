import { useState } from 'react';
import { ChevronLeft, ChevronRight, Home, ArrowLeftRight, DollarSign, UsersRound, Replace, ChartArea, Wallet, CircleUserRound, MessageCircleQuestion } from "lucide-react";
import { Link } from 'react-router-dom';
import { Button } from '@nextui-org/button';

const SidebarItem = ({ icon: Icon, label, to, collapsed }) => (
  <Link to={to}>
    <Button
      variant="light"
      size="sm"
      color='secondary'
      className={`w-[90%] justify-start text-gray-300 hover:text-white hover:bg-gray-800 my-1 ${
        collapsed ? 'px-0 justify-center mx-auto' : 'px-2'
      }`}
    >
      <Icon className={`h-5 w-5 ${collapsed ? '' : 'mr-3'}`} />
      {!collapsed && <span>{label}</span>}
    </Button>
  </Link>
);

const styles = {
    navbarBrand: {
      padding: '0 0.5rem',
      fontWeight: 'bold',
      color: 'white',
      fontSize: '1.5rem',
    }
}

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
    className={`flex flex-col h-screen transition-all duration-300 border-r border-gray-800 flex-shrink-0 ${
      collapsed ? 'w-[6dvw] min-w-[22px]' : 'w-[15dvw]'
    }`}
  >
        <div className={`h-[10dvh] max-h-[70px] flex items-center ${collapsed ? 'justify-center' : 'justify-between'} border-b border-gray-800`}>
        {!collapsed && <div className="cursor-pointer m-0 p-0 hover:scale-[1.05] transition-transform duration-200 ease-in-out" style={styles.navbarBrand}>Stearn</div>}
        <Button
        variant="light"
        color="secondary"
        size="sm"
        onClick={() => setCollapsed(!collapsed)}
        className="m-2 p-0 text-gray-300 hover:text-white"
      >
        {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
      </Button>

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
          <SidebarItem icon={UsersRound} label="Affiliate" to="/dashboard/affiliate" collapsed={collapsed} />
        </div>
        <div className="py-3 text-center">
          {!collapsed && (
            <h3 className="mb-2 px-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Components
            </h3>
          )}
          <SidebarItem icon={Replace} label="Swap" to="/dashboard/swap" collapsed={collapsed} />
          <SidebarItem icon={ChartArea} label="Stake" to="/dashboard/stake" collapsed={collapsed} />
          <SidebarItem icon={Wallet} label="Widthdraw" to="/dashboard/widthdraw" collapsed={collapsed} />
        </div>
        <div className="py-3 text-center">
          {!collapsed && (
            <h3 className="mb-2 px-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Settings
            </h3>
          )}
          <SidebarItem icon={CircleUserRound} label="Account" to="/account" collapsed={collapsed} />
          <SidebarItem icon={MessageCircleQuestion} label="Support" to="/support" collapsed={collapsed} />
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
