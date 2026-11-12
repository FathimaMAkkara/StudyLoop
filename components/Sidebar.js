'use client';
import { useStudy } from '../context/StudyContext';
const links = [ ['Dashboard','▦'], ['My Subjects','▤'], ['Flashcards','▣'], ['Study Planner','◷'], ['Progress','↗'] ];
export default function Sidebar() {
  const { activeTab, setActiveTab, studentName } = useStudy();
  const initials = studentName.trim() ? studentName.trim().split(/\s+/).slice(0,2).map(part => part[0].toUpperCase()).join('') : 'S';
  return <aside className="sidebar">
    <div className="brand"><span className="brand-mark">S</span><span>study<span className="brand-accent">loop</span><small>YOUR STUDY SPACE</small></span></div>
    <div className="nav-label">WORKSPACE</div>
    <nav>{links.map(([label, icon]) => <button key={label} onClick={() => setActiveTab(label)} className={`nav-link ${activeTab === label ? 'active' : ''}`}><span className="nav-icon">{icon}</span>{label}</button>)}</nav>
    <div className="sidebar-bottom"><div className="mini-avatar">{initials}</div><div><b>{studentName || 'Student workspace'}</b><small>Personal study space</small></div></div>
  </aside>;
}
