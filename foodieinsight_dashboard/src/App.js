import React, { useState } from 'react';
import './App.css';

/* Order Overview Panel */
function OrderOverviewPanel() {
  // Dummy stats; these could be props or state if used with real data
  const stats = {
    totalSales: '$2,340',
    ordersToday: 24,
    chartHint: '[Order Trend Chart]'
  };
  return (
    <section className="dashboard-panel dashboard-orders">
      <div className="dashboard-panel-title">Order Overview</div>
      <div className="dashboard-panel-body">
        <div className="dashboard-metric">
          <span className="dashboard-metric-label">Total Sales</span>
          <span className="dashboard-metric-value">{stats.totalSales}</span>
        </div>
        <div className="dashboard-metric">
          <span className="dashboard-metric-label">Orders Today</span>
          <span className="dashboard-metric-value">{stats.ordersToday}</span>
        </div>
        <div className="dashboard-mini-chart-placeholder">
          {stats.chartHint}
        </div>
      </div>
    </section>
  );
}

/* Menu Management Panel */
function MenuManagementPanel() {
  // Use dummy menu and support add/edit/delete (UI only, static data)
  const initialMenu = [
    { id: 1, name: "Margherita Pizza" },
    { id: 2, name: "Vegan Burger" },
    { id: 3, name: "Truffle Fries" }
  ];
  const [menu, setMenu] = useState(initialMenu);
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newItemName, setNewItemName] = useState('');
  const [editValue, setEditValue] = useState('');

  // PUBLIC_INTERFACE
  function handleAddClick() {
    setAdding(true);
    setNewItemName('');
  }
  // PUBLIC_INTERFACE
  function handleSaveAdd() {
    if (newItemName.trim() !== '') {
      setMenu(prev =>
        [...prev, { id: Date.now(), name: newItemName.trim() }]
      );
    }
    setAdding(false);
    setNewItemName('');
  }
  // PUBLIC_INTERFACE
  function handleEditClick(id, currentName) {
    setEditingId(id);
    setEditValue(currentName);
  }
  // PUBLIC_INTERFACE
  function handleSaveEdit(id) {
    setMenu(prev => prev.map(item =>
      item.id === id ? { ...item, name: editValue } : item
    ));
    setEditingId(null);
    setEditValue('');
  }
  // PUBLIC_INTERFACE
  function handleDelete(id) {
    setMenu(prev => prev.filter(item => item.id !== id));
  }

  return (
    <section className="dashboard-panel dashboard-menu">
      <div className="dashboard-panel-title">Menu Management</div>
      <div className="dashboard-panel-body">
        <ul className="dashboard-menu-list">
          {menu.map(item => (
            <li key={item.id}>
              {editingId === item.id ? (
                <>
                  <input
                    type="text"
                    value={editValue}
                    style={{flex:1, minWidth:"100px"}}
                    onChange={e => setEditValue(e.target.value)}
                    className="dashboard-menu-input"
                  />
                  <button
                    className="dashboard-menu-btn"
                    style={{color: "var(--accent)"}}
                    onClick={() => handleSaveEdit(item.id)}
                  >
                    Save
                  </button>
                  <button
                    className="dashboard-menu-btn"
                    style={{color: "#aaa"}}
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span style={{flex: 1, minWidth:"100px"}}>{item.name}</span>
                  <button
                    className="dashboard-menu-btn"
                    onClick={() => handleEditClick(item.id, item.name)}
                  >
                    Edit
                  </button>
                  <button
                    className="dashboard-menu-btn"
                    style={{color: "#B71C1C"}}
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
        {adding ? (
          <div style={{display:"flex", alignItems:"center", gap:"8px"}}>
            <input
              type="text"
              className="dashboard-menu-input"
              value={newItemName}
              autoFocus
              onChange={e => setNewItemName(e.target.value)}
              placeholder="Menu Item Name"
              style={{flex: 1, minWidth:"140px"}}
            />
            <button
              className="dashboard-menu-btn"
              style={{color: "var(--accent)"}}
              onClick={handleSaveAdd}
            >
              Save
            </button>
            <button
              className="dashboard-menu-btn"
              style={{color: "#aaa"}}
              onClick={() => setAdding(false)}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            className="dashboard-menu-btn dashboard-menu-btn-accent"
            onClick={handleAddClick}
          >
            Add New Item
          </button>
        )}
      </div>
    </section>
  );
}

/* User Analytics Panel */
function UserAnalyticsPanel() {
  // Static values for dummy stats/visual
  const stats = {
    activeUsers: 132,
    popularDish: "Margherita Pizza",
    chartHint: "[User Engagement Chart]"
  };

  return (
    <section className="dashboard-panel dashboard-analytics">
      <div className="dashboard-panel-title">User Analytics</div>
      <div className="dashboard-panel-body">
        <div className="dashboard-metric">
          <span className="dashboard-metric-label">Active Users</span>
          <span className="dashboard-metric-value">{stats.activeUsers}</span>
        </div>
        <div className="dashboard-metric">
          <span className="dashboard-metric-label">Popular Dish</span>
          <span className="dashboard-metric-value">{stats.popularDish}</span>
        </div>
        <div className="dashboard-mini-chart-placeholder">
          {stats.chartHint}
        </div>
      </div>
    </section>
  );
}

/* Notifications Sidebar */
function NotificationsSidebar() {
  // Dummy notifications, static for now
  const notifications = [
    {
      id: 1,
      icon: "🛎️",
      text: 'New order placed! #1243',
      type: 'new'
    },
    {
      id: 2,
      icon: "⚠️",
      text: 'Low stock: "Mozzarella Cheese"',
      type: ''
    },
    {
      id: 3,
      icon: "ℹ️",
      text: "Today's special updated.",
      type: ''
    }
  ];
  return (
    <aside className="dashboard-sidebar">
      <div className="dashboard-sidebar-title">Notifications</div>
      <ul className="dashboard-notification-list">
        {notifications.map(n => (
          <li
            key={n.id}
            className={
              "dashboard-notification" +
              (n.type === 'new' ? " dashboard-notification--new" : "")
            }
          >
            <span className="dashboard-notification-icon" role="img" aria-label="note">
              {n.icon}
            </span>
            {n.text}
          </li>
        ))}
      </ul>
    </aside>
  );
}

// PUBLIC_INTERFACE
function App() {
  const user = {
    name: "Alex P.",
    avatar: null
  };

  return (
    <div className="app foodie-dashboard">
      <nav className="navbar dashboard-navbar">
        <div className="dashboard-navbar-inner">
          <div className="dashboard-logo">
            <span className="dashboard-logo-symbol" role="img" aria-label="logo">🍽️</span>
            <span className="dashboard-logo-name">FoodieInsight</span>
          </div>
          <div className="dashboard-user">
            <span className="dashboard-user-name">{user.name}</span>
            {user.avatar ? (
              <img src={user.avatar} alt="User Avatar" className="dashboard-user-avatar"/>
            ) : (
              <span className="dashboard-user-avatar dashboard-user-placeholder" aria-label="profile">👤</span>
            )}
          </div>
        </div>
      </nav>

      <div className="dashboard-main-wrapper">
        <NotificationsSidebar />
        <main className="dashboard-main-content">
          <div className="dashboard-panel-grid">
            <OrderOverviewPanel />
            <MenuManagementPanel />
            <UserAnalyticsPanel />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;