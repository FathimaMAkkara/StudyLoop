'use client';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const StudyContext = createContext(null);
const STORAGE_KEY = 'studyloop-workspace-v2';
const dateOffset = (days) => { const d = new Date(); d.setDate(d.getDate() + days); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; };
const initialSubjects = [
  { id: 1, name: 'Mathematics', code: 'MAT201', color: 'violet' },
  { id: 2, name: 'Java Programming', code: 'CS202', color: 'blue' },
  { id: 3, name: 'Operating Systems', code: 'CS203', color: 'peach' },
  { id: 4, name: 'Computer Networks', code: 'CS204', color: 'green' }
];
const initialTasks = [
  { id: 1, title: 'Revise matrices and determinants', subject: 'Mathematics', dueDate: dateOffset(0), priority: 'Medium', done: false },
  { id: 2, title: 'Practise Java inheritance questions', subject: 'Java Programming', dueDate: dateOffset(0), priority: 'High', done: false },
  { id: 3, title: 'Read process scheduling notes', subject: 'Operating Systems', dueDate: dateOffset(1), priority: 'Low', done: true }
];
const initialCards = [
  { id: 1, subject: 'Java Programming', question: 'What is inheritance in Java?', answer: 'Inheritance allows one class to acquire fields and methods from another class.' },
  { id: 2, subject: 'Mathematics', question: 'What is a determinant?', answer: 'A scalar value calculated from a square matrix.' },
  { id: 3, subject: 'Operating Systems', question: 'What is a process?', answer: 'A program that is currently being executed.' }
];

export function StudyProvider({ children }) {
  const [subjects, setSubjects] = useState(initialSubjects);
  const [tasks, setTasks] = useState(initialTasks);
  const [cards, setCards] = useState(initialCards);
  const [studentName, setStudentName] = useState('');
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        if (Array.isArray(data.subjects)) setSubjects(data.subjects);
        if (Array.isArray(data.tasks)) setTasks(data.tasks);
        if (Array.isArray(data.cards)) setCards(data.cards);
        if (typeof data.studentName === 'string') setStudentName(data.studentName);
      }
    } catch (error) { console.error('Could not load StudyLoop data:', error); }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ subjects, tasks, cards, studentName })); }
    catch (error) { console.error('Could not save StudyLoop data:', error); }
  }, [ready, subjects, tasks, cards, studentName]);

  const completed = tasks.filter(t => t.done).length;
  const value = useMemo(() => ({
    subjects, tasks, cards, studentName, setStudentName, activeTab, setActiveTab, completed,
    addSubject(name) {
      const clean = name.trim(); if (!clean || subjects.some(s => s.name.toLowerCase() === clean.toLowerCase())) return;
      setSubjects(prev => [...prev, { id: Date.now(), name: clean, code: 'NEW', color: 'blue' }]);
    },
    addTask(title, subject, dueDate, priority) {
      if (!title.trim()) return;
      setTasks(prev => [...prev, { id: Date.now(), title: title.trim(), subject, dueDate, priority, done: false }]);
    },
    toggleTask(id) { setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t)); },
    addCard(subject, question, answer) {
      if (!question.trim() || !answer.trim()) return;
      setCards(prev => [...prev, { id: Date.now(), subject, question: question.trim(), answer: answer.trim() }]);
    }
  }), [subjects, tasks, cards, studentName, activeTab, completed]);
  return <StudyContext.Provider value={value}>{children}</StudyContext.Provider>;
}
export function useStudy() {
  const context = useContext(StudyContext);
  if (!context) throw new Error('useStudy must be used inside StudyProvider');
  return context;
}
