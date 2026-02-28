import React from 'react';

const NotificationItem = ({ notification, onMarkRead, onDelete }) => {
  const handleMarkRead = () => {
    if (!notification.is_read) {
      onMarkRead(notification.id);
    }
  };

  const handleDelete = () => {
    onDelete(notification.id);
  };

  return (
    <li className={`notification-item ${notification.is_read ? 'read' : 'unread'}`}>
      <div className="notification-title">{notification.title}</div>
      <div className="notification-message">{notification.message}</div>
      <div className="notification-type">{notification.type}</div>
      <div className="notification-actions">
        {!notification.is_read && (
          <button className="mark-read-btn" onClick={handleMarkRead}>Mark as Read</button>
        )}
        <button className="delete-btn" onClick={handleDelete}>Delete</button>
      </div>
    </li>
  );
};

export default NotificationItem;
