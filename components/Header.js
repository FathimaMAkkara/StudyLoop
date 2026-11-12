'use client';
import { useEffect, useState } from 'react';
import { useStudy } from '../context/StudyContext';

export default function Header() {
 const { activeTab, studentName, setStudentName } = useStudy();
 const [open, setOpen] = useState(false);
 const [theme, setTheme] = useState('light');
 useEffect(() => {
  const savedTheme = localStorage.getItem('studyloop-theme');
  const initialTheme = savedTheme === 'dark' ? 'dark' : 'light';
  setTheme(initialTheme);
  document.documentElement.dataset.theme = initialTheme;
 }, []);
 const toggleTheme = () => {
  const nextTheme = theme === 'light' ? 'dark' : 'light';
  setTheme(nextTheme);
  document.documentElement.dataset.theme = nextTheme;
  localStorage.setItem('studyloop-theme', nextTheme);
 };
 const initials = studentName.trim() ? studentName.trim().split(/\s+/).slice(0,2).map(part => part[0].toUpperCase()).join('') : 'S';
 return <>
  <header className="topbar"><div><span className="breadcrumb">Workspace</span><span className="crumb-divider">/</span><b>{activeTab}</b></div><div className="topbar-right"><span className="today-pill">✦ Keep your learning in motion</span><button className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`} title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>{theme === 'light' ? '☾ Dark mode' : '☀ Light mode'}</button><button className="profile-avatar" aria-label="Open profile settings" onClick={()=>setOpen(true)}>{initials}</button></div></header>
  {open && <div className="modal-backdrop" onClick={()=>setOpen(false)}><section className="profile-modal" onClick={e=>e.stopPropagation()}><div className="panel-heading"><div><h3>Student profile</h3><p>Personalise your study workspace</p></div><button className="icon-close" onClick={()=>setOpen(false)} aria-label="Close">×</button></div><label className="field-label" htmlFor="student-name">Your name</label><input id="student-name" className="profile-input" autoFocus value={studentName} onChange={e=>setStudentName(e.target.value)} placeholder="Enter your name"/><p className="profile-help">Your initials will appear in the profile circles. This stays saved in this browser.</p><button className="primary-btn" onClick={()=>setOpen(false)}>Save profile</button></section></div>}
 </>;
}
