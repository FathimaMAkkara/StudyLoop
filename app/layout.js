import './globals.css';
import { StudyProvider } from '../context/StudyContext';

export const metadata = {
  title: 'StudyLoop | Your study space',
  description: 'Plan, revise and track your learning in one calm workspace.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body><StudyProvider>{children}</StudyProvider></body>
    </html>
  );
}
