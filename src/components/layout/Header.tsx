import { Bell, Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <header className="header">
      <button className="menu-toggle-btn" onClick={onMenuClick}>
        <Menu size={24} />
      </button>
      <div className="header-actions">
        <button className="icon-btn">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
