import React from 'react';
import './NotificationBell.css';

const NotificationBell = ({ unreadCount, onClick }) => {
  return (
    <div className="notification-bell" onClick={onClick}>
      <span className="bell-icon">🔔</span>
      {unreadCount > 0 && (
        <span className="unread-badge">{unreadCount}</span>
      )}
    </div>
  );
};

export default NotificationBell;
