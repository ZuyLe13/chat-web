import { Bell } from 'lucide-react';

const Header = () => {
  return (
    <header className="header">
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
