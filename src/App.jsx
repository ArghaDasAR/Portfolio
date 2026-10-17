import { useState, useCallback } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import ScreenViewer from './ScreenViewer'

/*
  Screen definitions — maps nav labels to the Stitch-generated HTML files.
  The actual HTML content is served from public/screens/ and loaded via iframe
  to preserve the original UI/UX exactly as designed in Stitch.
*/
const SCREENS = [
  {
    id: 'home',
    label: 'HOME',
    title: 'Home — Overview',
    file: '/screens/1_home_overview.html',
    path: '/',
  },
  {
    id: 'projects',
    label: 'PROJECTS',
    title: 'Projects & Works',
    file: '/screens/3_projects_works.html',
    path: '/projects',
  },
  {
    id: 'resume',
    label: 'RESUME',
    title: 'Resume & Experience',
    file: '/screens/2_resume_experience.html',
    path: '/resume',
  },
  {
    id: 'contact',
    label: 'CONTACT',
    title: 'About & Contact',
    file: '/screens/4_about_contact.html',
    path: '/contact',
  },
]

export default function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const currentPath = location.pathname

  const handleNav = useCallback((path) => {
    navigate(path)
    setMobileMenuOpen(false)
  }, [navigate])

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev)
  }, [])

  return (
    <div className="app-shell">
      {/* ── Navigation Bar ── */}
      <nav className="nav-bar">
        <div className="nav-inner">
          {/* Brand */}
          <a
            className="nav-brand"
            href="#/"
            onClick={(e) => { e.preventDefault(); handleNav('/') }}
          >
            <img
              src="/images/logo.png"
              alt="Argha Das"
              className="nav-brand-logo"
            />
            <span className="nav-brand-text">ARGHA DAS</span>
          </a>

          {/* Desktop Tabs */}
          <div className={`nav-tabs${mobileMenuOpen ? ' mobile-open' : ''}`}>
            {SCREENS.map((screen) => (
              <button
                key={screen.id}
                className={`nav-tab${currentPath === screen.path ? ' active' : ''}`}
                onClick={() => handleNav(screen.path)}
              >
                {screen.label}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="nav-actions">
            <button className="nav-mobile-toggle" onClick={toggleMobileMenu}>
              <span className="material-symbols-outlined">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
            <div className="nav-icon-links">
              <a className="nav-icon-btn" href="https://github.com/ArghaDasAR" target="_blank" rel="noopener noreferrer" title="GitHub Profile">
                <svg className="nav-svg-icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <a className="nav-icon-btn" href="https://www.linkedin.com/in/arghadasar" target="_blank" rel="noopener noreferrer" title="LinkedIn Profile">
                <svg className="nav-svg-icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.63 1.63 0 0 0 0-3.26 1.63 1.63 0 0 0 0 3.26M7.86 18.5v-8.37H5.07v8.37h2.79z" />
                </svg>
              </a>
              <a className="nav-icon-btn" href="https://x.com/im_ArghaDas" target="_blank" rel="noopener noreferrer" title="X (Twitter) Profile">
                <svg className="nav-svg-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
            <a className="nav-cta" href="https://github.com/ArghaDasAR" target="_blank" rel="noopener noreferrer">
              <svg className="nav-svg-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>GitHub</span>
            </a>
            <img
              className="nav-avatar"
              alt="Profile"
              src="https://avatars.githubusercontent.com/u/312813327?v=4"
            />
          </div>
        </div>
      </nav>

      {/* ── Content Area ── */}
      <div className="content-area">
        <Routes>
          {SCREENS.map((screen) => (
            <Route
              key={screen.id}
              path={screen.path}
              element={<ScreenViewer src={screen.file} title={screen.title} />}
            />
          ))}
          {/* Fallback to Home */}
          <Route path="*" element={<ScreenViewer src={SCREENS[0].file} title={SCREENS[0].title} />} />
        </Routes>
      </div>
    </div>
  )
}
