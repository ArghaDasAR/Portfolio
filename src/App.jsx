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
    label: 'Home',
    title: 'Home — Overview',
    file: '/screens/1_home_overview.html',
    path: '/',
  },
  {
    id: 'projects',
    label: 'Projects',
    title: 'Projects & Works',
    file: '/screens/3_projects_works.html',
    path: '/projects',
  },
  {
    id: 'resume',
    label: 'Resume',
    title: 'Resume & Experience',
    file: '/screens/2_resume_experience.html',
    path: '/resume',
  },
  {
    id: 'contact',
    label: 'Contact',
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
            <div className="nav-brand-monogram">AD</div>
            <span className="nav-brand-text">Argha Das</span>
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
              <a className="nav-icon-btn" href="https://github.com/ArghaDasAR" target="_blank" rel="noopener noreferrer" title="Code Archive">
                <span className="material-symbols-outlined">terminal</span>
              </a>
              <a className="nav-icon-btn" href="https://www.linkedin.com/in/arghadasar" target="_blank" rel="noopener noreferrer" title="Professional Record">
                <span className="material-symbols-outlined">share</span>
              </a>
              <a className="nav-icon-btn" href="https://x.com/im_ArghaDas" target="_blank" rel="noopener noreferrer" title="Dispatches">
                <span className="material-symbols-outlined">alternate_email</span>
              </a>
            </div>
            <a className="nav-cta" href="https://github.com/ArghaDasAR" target="_blank" rel="noopener noreferrer">
              <span className="material-symbols-outlined">terminal</span>
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
