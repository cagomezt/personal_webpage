import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import cvData from './data/cv.json'
import achievementsData from './data/achievements.json'
import './index.css'

function Navigation() {
  const location = useLocation()
  const isActive = (path: string) => location.pathname === path ? 'active' : ''

  return (
    <nav>
      <ul>
        <li><Link to="/" className={isActive('/')}>Home</Link></li>
        <li><Link to="/cv" className={isActive('/cv')}>CV</Link></li>
        <li><Link to="/achievements" className={isActive('/achievements')}>Achievements</Link></li>
        <li><Link to="/contact" className={isActive('/contact')}>Contact</Link></li>
      </ul>
    </nav>
  )
}

function HomePage() {
  return (
    <div className="container">
      <h1>{cvData.personalInfo.name}</h1>
      <h2 style={{fontSize: '1.5rem', color: '#646cff', marginBottom: '1.5rem'}}>
        {cvData.personalInfo.title}
      </h2>

      <div className="card">
        <h3>About Me</h3>
        <p>{cvData.personalInfo.summary}</p>
      </div>

      <div className="card">
        <h3>Quick Links</h3>
        <ul style={{listStyle: 'none', marginTop: '1rem'}}>
          <li style={{marginBottom: '0.5rem'}}>👉 <Link to="/cv">View my full CV</Link></li>
          <li style={{marginBottom: '0.5rem'}}>🏆 <Link to="/achievements">See my recent achievements</Link></li>
          <li style={{marginBottom: '0.5rem'}}>📧 <Link to="/contact">Get in touch</Link></li>
        </ul>
      </div>

      <div className="card">
        <h3>Key Highlights</h3>
        <ul style={{marginTop: '1rem', paddingLeft: '1.5rem'}}>
          <li style={{marginBottom: '0.5rem'}}>14+ years of experience in Data Engineering</li>
          <li style={{marginBottom: '0.5rem'}}>Shipped and maintained production Python + SQL platforms at scale</li>
          <li style={{marginBottom: '0.5rem'}}>Built test suite from 0 to 377 passing tests</li>
          <li style={{marginBottom: '0.5rem'}}>Reduced Snowflake costs by ~50% (compute) and 57% (storage)</li>
          <li style={{marginBottom: '0.5rem'}}>Single-handedly managed entire data department at Kixeye</li>
        </ul>
      </div>
    </div>
  )
}

function CVPage() {
  return (
    <div className="container">
      <div className="card">
        <h1>{cvData.personalInfo.name}</h1>
        <p style={{fontSize: '1.25rem', color: '#646cff', marginBottom: '1rem'}}>
          {cvData.personalInfo.title}
        </p>
        <p>{cvData.personalInfo.summary}</p>
      </div>

      <div className="card">
        <h3>Contact</h3>
        <div style={{marginTop: '1rem'}}>
          <div className="contact-item">
            <span>💼</span>
            <a href={`https://linkedin.com${cvData.personalInfo.contact.linkedin}`} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
          <div className="contact-item">
            <span>💻</span>
            <a href={`https://github.com${cvData.personalInfo.contact.github}`} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </div>
        </div>
      </div>

      <h2>Technical Skills</h2>
      <div className="card">
        <h3>Programming</h3>
        <div style={{marginTop: '0.5rem'}}>
          {cvData.skills.programming.map((skill, index) => (
            <span key={index} className="skill-tag">{skill}</span>
          ))}
        </div>

        <h3 style={{marginTop: '1.5rem'}}>Frameworks & Runtimes</h3>
        <div style={{marginTop: '0.5rem'}}>
          {cvData.skills.frameworks.map((skill, index) => (
            <span key={index} className="skill-tag">{skill}</span>
          ))}
        </div>

        <h3 style={{marginTop: '1.5rem'}}>Data & Storage</h3>
        <div style={{marginTop: '0.5rem'}}>
          {cvData.skills.dataStorage.map((skill, index) => (
            <span key={index} className="skill-tag">{skill}</span>
          ))}
        </div>

        <h3 style={{marginTop: '1.5rem'}}>Cloud & DevOps</h3>
        <div style={{marginTop: '0.5rem'}}>
          {cvData.skills.cloudDevops.map((skill, index) => (
            <span key={index} className="skill-tag">{skill}</span>
          ))}
        </div>
      </div>

      <h2>Professional Experience</h2>
      {cvData.experience.map((exp, index) => (
        <div key={index} className="card">
          <h3 style={{color: '#646cff'}}>{exp.title}</h3>
          <p style={{color: '#a1a1aa', marginBottom: '0.5rem'}}>
            {exp.company} · {exp.period}
          </p>
          <p style={{marginBottom: '1rem'}}>{exp.description}</p>

          <h4 style={{fontSize: '1.1rem', marginTop: '1rem', marginBottom: '0.5rem'}}>Key Achievements</h4>
          <ul style={{paddingLeft: '1.5rem'}}>
            {exp.achievements.map((achievement, i) => (
              <li key={i} style={{marginBottom: '0.5rem'}}>{achievement}</li>
            ))}
          </ul>

          <h4 style={{fontSize: '1.1rem', marginTop: '1rem', marginBottom: '0.5rem'}}>Tech Stack</h4>
          <div>
            {exp.tech.map((tech, i) => (
              <span key={i} className="skill-tag">{tech}</span>
            ))}
          </div>
        </div>
      ))}

      <h2>Education</h2>
      <div className="card">
        {cvData.education.map((edu, index) => (
          <div key={index} style={{marginBottom: '1rem'}}>
            <h3 style={{fontSize: '1.1rem', marginBottom: '0.25rem'}}>{edu.degree}</h3>
            <p style={{color: '#a1a1aa'}}>{edu.institution} · {edu.year}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function AchievementsPage() {
  return (
    <div className="container">
      <h1>Achievements & Impact</h1>
      <p style={{marginBottom: '2rem', fontSize: '1.1rem', color: '#a1a1aa'}}>
        A timeline of key accomplishments and the measurable impact delivered.
      </p>

      <div className="timeline">
        {achievementsData.map((yearData, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-year">{yearData.year}</div>
            <div className="card">
              <h3 style={{color: '#646cff'}}>{yearData.title}</h3>
              <ul style={{marginTop: '1rem', marginBottom: '1.5rem', paddingLeft: '1.5rem'}}>
                {yearData.highlights.map((highlight, i) => (
                  <li key={i} style={{marginBottom: '0.5rem'}}>{highlight}</li>
                ))}
              </ul>

              <div className="achievements-grid">
                {yearData.categories.map((category, catIndex) => (
                  <div key={catIndex} style={{background: '#2a2a2a', padding: '1rem', borderRadius: '4px', border: '1px solid #333'}}>
                    <h4 style={{fontSize: '1rem', marginBottom: '0.75rem', color: '#ffffff'}}>{category.name}</h4>
                    <ul style={{paddingLeft: '1.25rem', fontSize: '0.9rem'}}>
                      {category.items.map((item, itemIndex) => (
                        <li key={itemIndex} style={{marginBottom: '0.25rem', color: '#a1a1aa'}}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ContactPage() {
  return (
    <div className="container">
      <h1>Get In Touch</h1>

      <div className="card">
        <h3>Get In Touch</h3>
        <p style={{marginTop: '1rem', marginBottom: '1.5rem'}}>
          Connect with me through professional platforms below.
        </p>

        <div style={{marginTop: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
          <a
            href={`https://linkedin.com${cvData.personalInfo.contact.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="card"
            style={{
              padding: '1rem 1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              minWidth: '150px',
              justifyContent: 'center',
              background: '#0077b5',
              border: 'none',
              color: 'white'
            }}
          >
            <span>💼</span> LinkedIn
          </a>

          <a
            href={`https://github.com${cvData.personalInfo.contact.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="card"
            style={{
              padding: '1rem 1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              minWidth: '150px',
              justifyContent: 'center',
              background: '#333',
              border: 'none',
              color: 'white'
            }}
          >
            <span>💻</span> GitHub
          </a>
        </div>
      </div>

      <div className="card">
        <h3>About This Site</h3>
        <p style={{marginTop: '1rem', color: '#a1a1aa'}}>
          This personal webpage was built with React, TypeScript, and Vite. It showcases my professional experience,
          technical skills, and key achievements in data engineering and analytics platform development.
        </p>
        <p style={{marginTop: '1rem', color: '#a1a1aa'}}>
          The site is deployed on GitHub Pages and features a responsive design that works on all devices.
        </p>
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cv" element={<CVPage />} />
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App