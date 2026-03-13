import { Home, MessageSquare } from 'lucide-react';
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

const Sidebar = () => {
  const { pathname } = useLocation()

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
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
              <li key={item.name} className={isActive ? 'nav-item active' : 'nav-item'}>
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
