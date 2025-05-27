import React from 'react';
import './App.css';

// PUBLIC_INTERFACE
function App() {
  // Placeholder user and logo; in production, sources would be dynamic
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
        {/* Sidebar for notifications */}
        <aside className="dashboard-sidebar">
          <div className="dashboard-sidebar-title">Notifications</div>
          <ul className="dashboard-notification-list">
            <li className="dashboard-notification dashboard-notification--new">
              <span className="dashboard-notification-icon" role="img" aria-label="order">🛎️</span>
              New order placed! #1243
            </li>
            <li className="dashboard-notification">
              <span className="dashboard-notification-icon" role="img" aria-label="stock">⚠️</span>
              Low stock: "Mozzarella Cheese"
            </li>
            <li className="dashboard-notification">
              <span className="dashboard-notification-icon" role="img" aria-label="info">ℹ️</span>
              Today's special updated.
            </li>
          </ul>
        </aside>

        {/* Main dashboard content */}
        <main className="dashboard-main-content">
          <div className="dashboard-panel-grid">
            {/* Order Overview Panel */}
            <section className="dashboard-panel dashboard-orders">
              <div className="dashboard-panel-title">Order Overview</div>
              <div className="dashboard-panel-body">
                <div className="dashboard-metric">
                  <span className="dashboard-metric-label">Total Sales</span>
                  <span className="dashboard-metric-value">$2,340</span>
                </div>
                <div className="dashboard-metric">
                  <span className="dashboard-metric-label">Orders Today</span>
                  <span className="dashboard-metric-value">24</span>
                </div>
                {/* Example: could include a mini-bar, pie, or line icon/chart */}
                <div className="dashboard-mini-chart-placeholder">[Chart]</div>
              </div>
            </section>

            {/* Menu Management Panel */}
            <section className="dashboard-panel dashboard-menu">
              <div className="dashboard-panel-title">Menu Management</div>
              <div className="dashboard-panel-body">
                <ul className="dashboard-menu-list">
                  <li>
                    <span>Margherita Pizza</span>
                    <button className="dashboard-menu-btn">Edit</button>
                  </li>
                  <li>
                    <span>Vegan Burger</span>
                    <button className="dashboard-menu-btn">Edit</button>
                  </li>
                  <li>
                    <span>Truffle Fries</span>
                    <button className="dashboard-menu-btn">Edit</button>
                  </li>
                </ul>
                <button className="dashboard-menu-btn dashboard-menu-btn-accent">Add New Item</button>
              </div>
            </section>

            {/* User Analytics Panel */}
            <section className="dashboard-panel dashboard-analytics">
              <div className="dashboard-panel-title">User Analytics</div>
              <div className="dashboard-panel-body">
                <div className="dashboard-metric">
                  <span className="dashboard-metric-label">Active Users</span>
                  <span className="dashboard-metric-value">132</span>
                </div>
                <div className="dashboard-metric">
                  <span className="dashboard-metric-label">Popular Dish</span>
                  <span className="dashboard-metric-value">Margherita Pizza</span>
                </div>
                <div className="dashboard-mini-chart-placeholder">[Analytics Chart]</div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;