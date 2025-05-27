import React, { useState } from 'react';
import './App.css';

/* Order Overview Panel */
function OrderOverviewPanel() {
  // Dummy stats; these could be props or state if used with real data
  const stats = {
    totalSales: '$2,340',
    ordersToday: 24,
    orders: [
      { id: 1243, status: 'completed', amount: '$41.50' },
      { id: 1242, status: 'pending', amount: '$29.00' },
      { id: 1241, status: 'cancelled', amount: '$0.00' }
    ]
  };

  // Helper for status icon (emoji + SVG for better distinction)
  const statusIcon = status => {
    if (status === 'completed') {
      return (
        <span title="Completed" style={{marginRight: 4}} aria-label="completed">
          {/* Green check SVG */}
          <svg width="18" height="18" viewBox="0 0 18 18" style={{verticalAlign: 'middle'}} fill="none">
            <circle cx="9" cy="9" r="9" fill="#43A047" opacity="0.12"/>
            <path d="M6.5 9.8l2.1 2.1 3-4" stroke="#43A047" strokeWidth="2" strokeLinecap="round" fill="none"/>
          </svg>
        </span>
      );
    }
    if (status === 'pending') {
      return (
        <span title="Pending" style={{marginRight: 4}} aria-label="pending">
          {/* Orange hourglass SVG */}
          <svg width="18" height="18" viewBox="0 0 18 18" style={{verticalAlign: 'middle'}} fill="none">
            <circle cx="9" cy="9" r="9" fill="#FF7043" opacity="0.09"/>
            <rect x="6" y="3.9" width="6" height="2" rx="1" fill="#FF7043"/>
            <rect x="6" y="12.1" width="6" height="2" rx="1" fill="#FF7043"/>
            <path d="M7 5.8l4 4-4 4" stroke="#FF7043" strokeWidth="1.3"/>
          </svg>
        </span>
      );
    }
    if (status === 'cancelled') {
      return (
        <span title="Cancelled" style={{marginRight: 4}} aria-label="cancelled">
          {/* Red X SVG */}
          <svg width="18" height="18" viewBox="0 0 18 18" style={{verticalAlign: 'middle'}} fill="none">
            <circle cx="9" cy="9" r="9" fill="#B71C1C" opacity="0.11"/>
            <line x1="6" y1="6" x2="12" y2="12" stroke="#B71C1C" strokeWidth="1.5"/>
            <line x1="12" y1="6" x2="6" y2="12" stroke="#B71C1C" strokeWidth="1.5"/>
          </svg>
        </span>
      );
    }
    return null;
  };

  // Mini bar chart (SVG, hardcoded dummy for illustration)
  const MiniBarChart = () => (
    <svg width="96" height="36" viewBox="0 0 96 36" style={{marginTop: 4}}>
      <rect x="9" y="14" width="10" height="16" fill="#FF7043" rx="2" />
      <rect x="25" y="18" width="10" height="12" fill="#43A047" rx="2" />
      <rect x="41" y="10" width="10" height="20" fill="#FF7043" rx="2" />
      <rect x="57" y="24" width="10" height="6" fill="#43A047" rx="2" />
      <rect x="73" y="8" width="10" height="22" fill="#FF7043" rx="2" />
    </svg>
  );

  return (
    <section className="dashboard-panel dashboard-orders">
      <div className="dashboard-panel-title">Order Overview</div>
      <div className="dashboard-panel-body">
        <div className="dashboard-metric">
          <span className="dashboard-metric-label">Total Sales</span>
          <span className="dashboard-metric-value">
            {stats.totalSales} <span style={{fontSize:"1.2em", verticalAlign:"middle"}}>💰</span>
          </span>
        </div>
        <div className="dashboard-metric">
          <span className="dashboard-metric-label">Orders Today</span>
          <span className="dashboard-metric-value">
            {stats.ordersToday} <span style={{fontSize:"1.1em",verticalAlign:"middle"}}>🛵</span>
          </span>
        </div>
        {/* Recent Orders List with status icons */}
        <div style={{marginTop: "2px", marginBottom: "3px"}}>
          <div style={{fontSize:".97rem", color:"var(--text-light)"}}>Recent Orders</div>
          <ul style={{margin:0,paddingLeft:0,listStyle:"none",fontSize:".97rem",display:"flex",gap:"12px",flexDirection:"column"}}>
            {stats.orders.map(o => (
              <li
                key={o.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  background: "#f6f6f6",
                  borderRadius: 6,
                  padding: "3px 10px 3px 3px",
                  fontWeight: o.status === "completed" ? 600 : 500,
                  color:
                    o.status === "completed"
                      ? "var(--accent)"
                      : o.status === "pending"
                      ? "var(--primary)"
                      : "#B71C1C"
                }}
              >
                {statusIcon(o.status)}
                #{o.id} – {o.amount}
              </li>
            ))}
          </ul>
        </div>
        {/* Inline SVG-based bar chart */}
        <div className="dashboard-mini-chart-placeholder" style={{background:"#fceee6"}}>
          <MiniBarChart />
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
    engagement: 80, // percent
    returning: 41,
    totalUsers: 132 + 24
  };

  // Inline SVG pie chart for engagement ratio
  function MiniPieChart({ percent, accent = "#43A047", rest="#DDD" }) {
    // Pie geometry for 80% (dummy)
    const r = 16;
    const cx = 20;
    const cy = 20;
    const circ = 2 * Math.PI * r;
    const dash = circ * percent / 100;
    return (
      <svg width="44" height="44" viewBox="0 0 44 44" style={{marginRight: 8}}>
        {/* background */}
        <circle cx={cx} cy={cy} r={r} stroke={rest} strokeWidth="8" fill="none"/>
        {/* foreground */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          stroke={accent}
          strokeWidth="8"
          fill="none"
          strokeDasharray={`${dash} ${circ - dash}`}
          strokeDashoffset={circ/4}
          style={{transition:"stroke-dasharray 0.3s"}}
        />
        {/* center circle */}
        <circle cx={cx} cy={cy} r="10" fill="#fff"/>
        {/* percent text */}
        <text x="20" y="25" textAnchor="middle" fontSize="11" fontWeight="700" fill="#263238">{percent}%</text>
      </svg>
    );
  }

  return (
    <section className="dashboard-panel dashboard-analytics">
      <div className="dashboard-panel-title">
        User Analytics <span role="img" aria-label="bar-chart" style={{fontSize:"1.1em",marginLeft:8}}>📊</span>
      </div>
      <div className="dashboard-panel-body">
        <div className="dashboard-metric">
          <span className="dashboard-metric-label">Active Users</span>
          <span className="dashboard-metric-value">
            {stats.activeUsers} <span aria-label="active-users" role="img">👥</span>
          </span>
        </div>
        <div className="dashboard-metric">
          <span className="dashboard-metric-label">Popular Dish</span>
          <span className="dashboard-metric-value">
            <span style={{marginRight:2}}>🍕</span>
            {stats.popularDish}
          </span>
        </div>
        <div className="dashboard-metric" style={{display:"flex",alignItems:"center"}}>
          <MiniPieChart percent={stats.engagement} />
          <span style={{color:"var(--text-light)",marginLeft:8}}>Engagement Rate</span>
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
      icon: null, // will use SVG
      svg: (
        // Alert bell SVG
        <svg width="20" height="20" viewBox="0 0 20 20" aria-label="alert" style={{verticalAlign:"middle"}}>
          <circle cx="10" cy="10" r="10" fill="#FF7043" opacity="0.15"/>
          <path d="M10 4a4 4 0 0 1 4 4v1.6c0 .4.2.8.6 1.1l.5.3a1 1 0 0 1 .46 1.04l-.07.65a.9.9 0 0 1-.89.78H5.4a.9.9 0 0 1-.89-.78l-.07-.65a1 1 0 0 1 .46-1.04l.5-.3A1.5 1.5 0 0 0 6 9.6V8a4 4 0 0 1 4-4Zm0 10.2a1.3 1.3 0 0 1-1.3-1h2.6a1.3 1.3 0 0 1-1.3 1Z" fill="#FF7043"/>
        </svg>
      ),
      text: 'New order placed! #1243',
      type: 'new'
    },
    {
      id: 2,
      icon: null,
      svg: (
        // Warning triangle SVG
        <svg width="19" height="19" viewBox="0 0 19 19" aria-label="warning" style={{verticalAlign:"middle"}}>
          <circle cx="9.5" cy="9.5" r="9.5" fill="#FFD600" opacity="0.15"/>
          <polygon points="9.5,4 16,16 3,16" fill="#FFD600"/>
          <rect x="8.7" y="7.2" width="1.6" height="4.2" rx=".7" fill="#9E8500"/>
          <rect x="8.7" y="12.2" width="1.6" height="1.6" rx="0.7" fill="#9E8500"/>
        </svg>
      ),
      text: 'Low stock: "Mozzarella Cheese"',
      type: 'warning'
    },
    {
      id: 3,
      icon: null,
      svg: (
        // Info SVG
        <svg width="19" height="19" viewBox="0 0 19 19" aria-label="info" style={{verticalAlign:"middle"}}>
          <circle cx="9.5" cy="9.5" r="9.5" fill="#43A047" opacity="0.11"/>
          <rect x="8.7" y="7.5" width="2" height="6" rx="1" fill="#12702C"/>
          <rect x="8.7" y="5" width="2" height="2" rx="1" fill="#12702C"/>
        </svg>
      ),
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
              {n.icon ? n.icon : n.svg}
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