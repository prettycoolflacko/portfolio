import { useState } from 'react'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState('home')

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-brand">Anirveda</div>
        <div className="nav-links">
          {['home', 'about', 'projects', 'contact'].map(section => (
            <button
              key={section}
              className={`nav-link ${activeSection === section ? 'active' : ''}`}
              onClick={() => setActiveSection(section)}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">🚀 Portfolio</div>
          <h1>
            Hi, I'm <span className="highlight">Anirveda</span>
          </h1>
          <p className="hero-subtitle">
            Developer • Designer • Dreamer
          </p>
          <p className="hero-description">
            Building amazing things with code. This portfolio is under construction — 
            stay tuned for something awesome!
          </p>
          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">View Projects</a>
            <a href="#contact" className="btn btn-secondary">Get In Touch</a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="code-block">
            <div className="code-header">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
            <pre>
              <code>
{`const developer = {
  name: "Anirveda",
  skills: ["React", "Node.js", "Python"],
  passion: "Building cool stuff",
  status: "Open to opportunities",
  
  greet() {
    return "Hello, World! 👋";
  }
};`}
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section about">
        <h2>About Me</h2>
        <div className="about-grid">
          <div className="about-card">
            <div className="card-icon">💻</div>
            <h3>Development</h3>
            <p>Passionate about writing clean, efficient code and learning new technologies.</p>
          </div>
          <div className="about-card">
            <div className="card-icon">🎨</div>
            <h3>Design</h3>
            <p>Creating beautiful, user-friendly interfaces that make a difference.</p>
          </div>
          <div className="about-card">
            <div className="card-icon">🚀</div>
            <h3>Innovation</h3>
            <p>Always exploring new ideas and pushing the boundaries of what's possible.</p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="section projects">
        <h2>Featured Projects</h2>
        <div className="projects-grid">
          {[
            { title: 'Project Alpha', desc: 'A revolutionary web application', tech: ['React', 'Node.js', 'MongoDB'], icon: '🌐' },
            { title: 'Project Beta', desc: 'Mobile-first progressive app', tech: ['React Native', 'Firebase'], icon: '📱' },
            { title: 'Project Gamma', desc: 'AI-powered automation tool', tech: ['Python', 'TensorFlow', 'FastAPI'], icon: '🤖' },
          ].map((project, i) => (
            <div key={i} className="project-card">
              <div className="project-icon">{project.icon}</div>
              <h3>{project.title}</h3>
              <p>{project.desc}</p>
              <div className="project-tech">
                {project.tech.map((t, j) => (
                  <span key={j} className="tech-tag">{t}</span>
                ))}
              </div>
              <div className="project-placeholder">Coming Soon</div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="section contact">
        <h2>Get In Touch</h2>
        <p className="contact-subtitle">Let's build something amazing together!</p>
        <div className="contact-links">
          <a href="mailto:hello@anirveda.rocks" className="contact-item">
            <span className="contact-icon">📧</span>
            <span>hello@anirveda.rocks</span>
          </a>
          <a href="https://github.com/anirveda" target="_blank" rel="noopener noreferrer" className="contact-item">
            <span className="contact-icon">🐙</span>
            <span>GitHub</span>
          </a>
          <a href="https://linkedin.com/in/anirveda" target="_blank" rel="noopener noreferrer" className="contact-item">
            <span className="contact-icon">💼</span>
            <span>LinkedIn</span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 Anirveda. Crafted with ❤️ and ☕</p>
        <p className="footer-sub">portfolio.anirveda.rocks</p>
      </footer>
    </div>
  )
}

export default App
