import { Home, MessageSquare, X } from 'lucide-react';
import { routerObject } from '../../constants/routerObject';
import type { SidebarMenu } from '../../types/layout';
import { useLocation } from 'react-router';

const sidebarMenus: SidebarMenu[] = [
  {
    name: "Home",
    icon: Home,
    path: routerObject.HOME.path,
  },
  {
    name: "Chat",
    icon: MessageSquare,
    path: routerObject.CHAT.path,
  }
]

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const { pathname } = useLocation()

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-logo">
        <button className="sidebar-close-btn" onClick={() => setIsOpen(false)}>
          <X size={24} />
        </button>
        <img
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
          alt="User Avatar"
          className="user-avatar"
        />
        <h2>Dany Le</h2>
      </div>

      <nav className="sidebar-nav">
        <ul className="nav-list">
          {sidebarMenus.map(item => {
            const path = `/${item.path}`
            const isActive = pathname === path
            return (
              <li key={item.name} className={isActive ? 'nav-item active' : 'nav-item'} onClick={() => setIsOpen(false)}>
                <a href={path} className="nav-link">
                  <item.icon size={20} />
                  <span>{item.name}</span>
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
