import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  Bell,
  Check,
  ChevronRight,
  Clock3,
  Droplets,
  Flame,
  Leaf,
  LogOut,
  Menu,
  MoreHorizontal,
  PackageCheck,
  Recycle,
  Search,
  Sparkles,
  Ticket,
  Utensils,
  X,
} from "lucide-react";

const meals = [
  { id: 1, name: "Chicken Biryani", subtitle: "Basmati rice · egg · salad", price: 85, left: 36, time: "12:00–2:30 PM", tag: "Popular", tone: "amber", emoji: "🍛" },
  { id: 2, name: "Vegetable Khichuri", subtitle: "Lentils · seasonal vegetables", price: 60, left: 22, time: "12:00–2:30 PM", tag: "Low waste", tone: "sage", emoji: "🥣" },
  { id: 3, name: "Grilled Chicken Bowl", subtitle: "Chicken · greens · rice", price: 95, left: 14, time: "1:00–3:00 PM", tag: "High protein", tone: "blue", emoji: "🥗" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [active, setActive] = useState("Overview");
  const [reserved, setReserved] = useState([]);
  const [toast, setToast] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [eventMode, setEventMode] = useState(false);

  const showToast = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 3200);
  };

  const reserve = (meal) => {
    if (reserved.includes(meal.id)) {
      showToast(`${meal.name} is already reserved.`);
      return;
    }
    setReserved((items) => [...items, meal.id]);
    showToast(`${meal.name} reserved. Pickup token LP-${String(meal.id).padStart(3, "0")} is ready.`);
  };

  const logout = () => {
    localStorage.removeItem("lastPlateSession");
    navigate("/login", { replace: true });
  };

  return (
    <div className="dash-shell">
      {toast && (
        <div className="dash-toast">
          <div className="toast-check"><Check size={15} /></div>
          <div><b>Reservation updated</b><span>{toast}</span></div>
          <button onClick={() => setToast("")} aria-label="Close"><X size={15} /></button>
        </div>
      )}

      <aside className={`dash-sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="dash-brand">
          <div className="brand-symbol"><Utensils size={18} /></div>
          <div><strong>THE LAST PLATE</strong><span>Food. Smarter. Together.</span></div>
        </div>

        <div className="campus-switcher">
          <div className="campus-badge">KU</div>
          <div><b>KUET Campus</b><span>Student dining network</span></div>
          <MoreHorizontal size={16} />
        </div>

        <nav>
          <small>WORKSPACE</small>
          {[
            ["Overview", Sparkles],
            ["Today's Menu", Utensils],
            ["Special Event", Sparkles],
            ["Reservations", Ticket],
            ["Rescue Meals", Recycle],
            ["My Impact", Leaf],
          ].map(([label, Icon]) => (
            <button key={label} className={`dash-nav ${active === label ? "active" : ""}`} onClick={() => {
                setActive(label);
                setEventMode(label === "Special Event");
                setMobileOpen(false);
              }}>
              <Icon size={17} /><span>{label}</span>
              {label === "Reservations" && reserved.length > 0 && <b className="nav-count">{reserved.length}</b>}
            </button>
          ))}
        </nav>

        <div className="dash-bottom">
          <div className="sidebar-impact"><Leaf size={16} /><span><small>This month</small><b>18 meals rescued</b></span></div>
          <button className="user-row" onClick={logout}>
            <div className="user-avatar">SH</div>
            <span><b>Student 1907001</b><small>Sign out securely</small></span>
            <LogOut size={15} />
          </button>
        </div>
      </aside>

      <main className="dash-main">
        <header className="dash-topbar">
          <div className="dash-title">
            <button className="mobile-nav-btn" onClick={() => setMobileOpen(v => !v)}><Menu size={19} /></button>
            <div><small>STUDENT PORTAL · TODAY</small><h1>{active === "Overview" ? "Good morning, Sunzid." : active}</h1></div>
          </div>
          <div className="dash-actions">
            <div className="dash-search"><Search size={16} /><input placeholder="Search meals, stations..." /></div>
            <button className="notify-btn"><Bell size={18} /><i /></button>
          </div>
        </header>

        <div className="dash-content">
          <section className="dashboard-hero">
            <div className="dashboard-hero-copy">
              <span className="live-chip"><i /> LIVE CAFETERIA NETWORK</span>
              <h2>{eventMode ? <>Same meals.<br /><em>More plates.</em></> : <>Eat what you need.<br /><em>Save what you can.</em></>}</h2>
              <p>{eventMode ? "Special event mode is active: the menu stays the same while the cafeteria prepares a larger batch to match the expected crowd." : "Reserve your next meal, discover surplus food, and turn small dining decisions into measurable campus impact."}</p>
              <div className="hero-buttons">
                <button className="hero-primary" onClick={() => { setActive(eventMode ? "Special Event" : "Today's Menu"); setEventMode(eventMode); }}>
                  {eventMode ? "View event quantity" : "Explore today’s menu"} <ArrowUpRight size={16} />
                </button>
                <button className="hero-secondary" onClick={() => setActive("My Impact")}>View my impact <ChevronRight size={15} /></button>
              </div>
              <div className="hero-metrics">
                <span><b>{eventMode ? "690" : "412"}</b><small>{eventMode ? "plates prepared today" : "plates saved today"}</small></span>
                <span><b>96%</b><small>forecast confidence</small></span>
                <span><b>14m</b><small>avg. rescue pickup</small></span>
              </div>
            </div>
            <div className="hero-plate-scene">
              <div className="scene-orbit one" /><div className="scene-orbit two" />
              <div className="scene-glow" />
              <div className="food-plate"><div className="food-inner"><i className="food-rice" /><i className="food-curry" /><i className="food-greens" /></div></div>
              <div className="scene-card scene-card-top"><Leaf size={14} /><span><b>−28%</b><small>campus waste</small></span></div>
              <div className="scene-card scene-card-bottom"><Ticket size={14} /><span><b>Pickup ready</b><small>Reserve a meal to unlock</small></span></div>
            </div>
          </section>

          <section className="dashboard-grid-top">
            <div className="availability-card">
              <div className="section-title-row"><div><small>CENTRAL HALL</small><h3>Live availability</h3></div><span className="live-badge"><i /> Live</span></div>
              <div className="availability-big"><b>{eventMode ? "248" : "164"}</b><span>{eventMode ? "event portions active" : "portions active"}</span></div>
              <div className="availability-bar"><i style={{ width: "72%" }} /></div>
              <div className="availability-row"><span>{eventMode ? "88% event capacity" : "72% capacity"}</span><span>{eventMode ? "~22 min wait" : "~18 min wait"}</span></div>
              <div className="card-rule" />
              <div className="refill"><div><Clock3 size={15} /></div><span><b>Next refill</b><small>Vegetable khichuri · 12:45 PM</small></span><ChevronRight size={15} /></div>
            </div>
            <div className="rescue-banner">
              <div className="rescue-icon"><PackageCheck size={18} /></div>
              <div><small>RESCUE WINDOW</small><b>7 surplus meals nearby</b><p>Available for 25–40% less until 3:30 PM.</p></div>
              <button onClick={() => setActive("Rescue Meals")}><ArrowUpRight size={16} /></button>
            </div>
          </section>

          <section className="quick-stats">
            {[
              [Recycle, "Meals rescued", "18", ""],
              [Leaf, "Food waste avoided", "2.7", "kg"],
              [Flame, "Impact score", "840", ""],
            ].map(([Icon, label, value, suffix]) => (
              <div key={label}><div className="quick-icon"><Icon size={17} /></div><span><small>{label}</small><b>{value}<i>{suffix}</i></b></span><em>+12%</em></div>
            ))}
          </section>

          <section className="dashboard-main-grid">
            <div>
              <div className="section-heading"><div><small>{eventMode ? "SPECIAL EVENT · SAME MENU, MORE QUANTITY" : "TODAY · 12:00–3:00 PM"}</small><h3>{eventMode ? "Extra plates for the crowd" : "What’s on the plate?"}</h3></div><button onClick={() => setActive("Today's Menu")}>See full menu <ArrowUpRight size={14} /></button></div>
              <div className="meal-grid">
                {meals.map(meal => {
                  const isReserved = reserved.includes(meal.id);
                  return (
                    <article className="meal-card" key={meal.id}>
                      <div className={`meal-visual ${meal.tone}`}><span>{meal.emoji}</span><b>{meal.tag}</b><button><MoreHorizontal size={16} /></button></div>
                      <div className="meal-info-card">
                        <div className="meal-name-row"><span><b>{meal.name}</b><small>{meal.subtitle}</small></span><strong>৳{meal.price}</strong></div>
                        <div className="meal-details"><span><Clock3 size={13} /> {meal.time}</span><span><Droplets size={13} /> {eventMode ? Math.round(meal.left * 2.1) : meal.left} left</span></div>
                        <div className="meal-action-row">
                          <small>{eventMode ? "Same meal · larger batch" : "Freshly prepared today"}</small>
                          <button className={isReserved ? "is-reserved" : ""} onClick={() => reserve(meal)}>{isReserved ? <Check size={14} /> : <Ticket size={14} />}{isReserved ? "Reserved" : "Reserve"}</button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            <aside className="impact-card">
              <div className="section-title-row"><div><small>YOUR IMPACT</small><h3>Small habits, real change</h3></div><MoreHorizontal size={16} /></div>
              <div className="impact-dial"><div><b>840</b><span>impact pts</span></div></div>
              <div className="impact-level"><b>Gold plate status</b><span>160 pts to Platinum</span></div>
              <div className="impact-progress"><i style={{ width: "78%" }} /></div>
              <div className="impact-list">
                <div><span><Recycle size={14} /> Meals rescued</span><b>18</b></div>
                <div><span><Leaf size={14} /> Waste avoided</span><b>2.7 kg</b></div>
                <div><span><Flame size={14} /> Streak</span><b>6 days</b></div>
              </div>
              <button className="impact-button" onClick={() => setActive("My Impact")}>Open impact history <ChevronRight size={14} /></button>
            </aside>
          </section>

          <footer className="dash-footer"><span>THE LAST PLATE · Campus food, smarter.</span><span>Prototype UI · 2026</span></footer>
        </div>
      </main>
    </div>
  );
}