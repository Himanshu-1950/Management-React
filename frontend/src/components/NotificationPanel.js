import React from 'react';
import NotificationItem from './NotificationItem';
import './NotificationPanel.css';

const NotificationPanel = ({ notifications, onMarkRead, onDelete, onClose }) => {
  return (
    <div className="notification-panel">
      <div className="notification-panel-header">
        <span>Notifications</span>
        <button 
          onClick={onClose} 
          style={{ float: 'right', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}
        >
          ✕
        </button>
      </div>
      {notifications.length === 0 ? (
        <div style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
          No notifications
        </div>
      ) : (
        <ul className="notification-list">
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onMarkRead={onMarkRead}
              onDelete={onDelete}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationPanel;
