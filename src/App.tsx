import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import { Container, Card, Button, Row, Col, Alert, Badge } from 'react-bootstrap'
import cvData from './data/cv.json'
import achievementsData from './data/achievements.json'
import { downloadMarkdown, generatePDFCV } from './utils/cvGenerator'
import './index.css'

function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const isActive = (path: string) => location.pathname === path ? 'active' : ''

  const handleNavigate = (path: string) => {
    navigate(path)
    setOpen(false)
  }

  return (
    <>
      <button className="sidebar-toggle" onClick={() => setOpen(!open)}>
        <i className="fa-solid fa-bars"></i>
      </button>
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <img src="profile.jpg" alt="Carlos Gomez" className="sidebar-photo" />
        <div className="sidebar-name">{cvData.personalInfo.name}</div>
        <ul className="sidebar-menu">
          <li className="sidebar-menu-item">
            <a onClick={() => handleNavigate('/')} className={isActive('/')}>Home</a>
          </li>
          <li className="sidebar-menu-item">
            <a onClick={() => handleNavigate('/cv')} className={isActive('/cv')}>CV</a>
          </li>
          <li className="sidebar-menu-item">
            <a onClick={() => handleNavigate('/achievements')} className={isActive('/achievements')}>Achievements</a>
          </li>
          <li className="sidebar-menu-item">
            <a onClick={() => handleNavigate('/contact')} className={isActive('/contact')}>Contact</a>
          </li>
        </ul>
        <div className="sidebar-social">
          <a href={cvData.personalInfo.contact.linkedin} target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-square-linkedin"></i>
          </a>
          <a href={cvData.personalInfo.contact.github} target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-github"></i>
          </a>
        </div>
      </aside>
    </>
  )
}

function HomePage() {
  return (
    <Container>
      <Row className="mb-5">
        <Col>
          <h1 className="display-4 fw-bold mb-3">{cvData.personalInfo.name}</h1>
          <h2 className="text-primary mb-4">{cvData.personalInfo.title}</h2>
          <Alert variant="info">
            {cvData.personalInfo.summary}
          </Alert>
        </Col>
      </Row>

      <Card className="mb-4">
        <Card.Body>
          <Card.Title as="h3">Quick Links</Card.Title>
          <div className="d-grid gap-2 d-md-block mt-3">
            <Link to="/cv" className="btn btn-primary btn-lg me-2">
              📄 View my full CV
            </Link>
            <Link to="/achievements" className="btn btn-outline-primary btn-lg me-2">
              🏆 See my achievements
            </Link>
            <Link to="/contact" className="btn btn-outline-secondary btn-lg">
              📧 Get in touch
            </Link>
          </div>
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Body>
          <Card.Title as="h3">Key Highlights</Card.Title>
          <ul className="list-group list-group-flush mt-3">
            <li className="list-group-item">
              <strong>14+ years</strong> of experience in Data Engineering
            </li>
            <li className="list-group-item">
              Shipped and maintained production Python + SQL platforms at scale
            </li>
            <li className="list-group-item">
              Built test suite from <strong>0 to 377 tests</strong>
            </li>
            <li className="list-group-item">
              Reduced Snowflake costs by <strong>~50% (compute)</strong> and <strong>57% (storage)</strong>
            </li>
            <li className="list-group-item">
              Single-handedly managed entire data department at Kixeye
            </li>
          </ul>
        </Card.Body>
      </Card>
    </Container>
  )
}

function CVPage() {
  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">
                <div>
                  <h1 className="mb-1">{cvData.personalInfo.name}</h1>
                  <h3 className="text-primary">{cvData.personalInfo.title}</h3>
                </div>
                <div className="d-flex flex-column gap-2">
                  <Button variant="danger" size="sm" onClick={generatePDFCV}>
                    📄 Download PDF
                  </Button>
                  <Button variant="outline-secondary" size="sm" onClick={downloadMarkdown}>
                    📝 Download Markdown
                  </Button>
                </div>
              </div>
              <p className="lead mt-3">{cvData.personalInfo.summary}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="mb-4">
        <Card.Body>
          <Card.Title as="h3">Contact</Card.Title>
          <div className="mt-3">
            <div className="mb-2">
              <i className="fa-brands fa-square-linkedin me-2"></i>
              <a href={cvData.personalInfo.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary">
                LinkedIn
              </a>
            </div>
            <div className="mb-2">
              <i className="fa-brands fa-github me-2"></i>
              <a href={cvData.personalInfo.contact.github} target="_blank" rel="noopener noreferrer" className="text-primary">
                GitHub
              </a>
            </div>
          </div>
        </Card.Body>
      </Card>

      <h2 className="mt-5 mb-4">Technical Skills</h2>
      <Card className="mb-4">
        <Card.Body>
          <h4 className="mb-3">Programming</h4>
          <div className="mb-4">
            {cvData.skills.programming.map((skill, index) => (
              <Badge key={index} bg="secondary" className="me-2 mb-2">{skill}</Badge>
            ))}
          </div>

          <h4 className="mb-3">Frameworks & Runtimes</h4>
          <div className="mb-4">
            {cvData.skills.frameworks.map((skill, index) => (
              <Badge key={index} bg="secondary" className="me-2 mb-2">{skill}</Badge>
            ))}
          </div>

          <h4 className="mb-3">Data & Storage</h4>
          <div className="mb-4">
            {cvData.skills.dataStorage.map((skill, index) => (
              <Badge key={index} bg="secondary" className="me-2 mb-2">{skill}</Badge>
            ))}
          </div>

          <h4 className="mb-3">Cloud & DevOps</h4>
          <div>
            {cvData.skills.cloudDevops.map((skill, index) => (
              <Badge key={index} bg="secondary" className="me-2 mb-2">{skill}</Badge>
            ))}
          </div>
        </Card.Body>
      </Card>

      <h2 className="mt-5 mb-4">Professional Experience</h2>
      {cvData.experience.map((exp, index) => (
        <Card key={index} className="mb-4">
          <Card.Body>
            <Card.Title as="h3" className="text-primary">{exp.title}</Card.Title>
            <Card.Subtitle className="mb-3 text-muted">
              {exp.company} · {exp.period}
            </Card.Subtitle>
            <Card.Text className="mb-3">{exp.description}</Card.Text>

            <h5 className="mt-4 mb-2">Key Achievements</h5>
            <ul>
              {exp.achievements.map((achievement, i) => (
                <li key={i} className="mb-2">{achievement}</li>
              ))}
            </ul>

            <h5 className="mt-4 mb-2">Tech Stack</h5>
            <div>
              {exp.tech.map((tech, i) => (
                <Badge key={i} bg="light" text="dark" className="me-1 mb-1">{tech}</Badge>
              ))}
            </div>
          </Card.Body>
        </Card>
      ))}

      <h2 className="mt-5 mb-4">Education</h2>
      <Card>
        <Card.Body>
          {cvData.education.map((edu, index) => (
            <div key={index} className="mb-3">
              <h5 className="mb-1">{edu.degree}</h5>
              <p className="text-muted mb-0">{edu.institution} · {edu.year}</p>
            </div>
          ))}
        </Card.Body>
      </Card>
    </Container>
  )
}

function AchievementsPage() {
  return (
    <Container>
      <h1 className="mb-4">Achievements & Impact</h1>
      <p className="lead text-muted mb-5">
        A timeline of key accomplishments and the measurable impact delivered.
      </p>

      {achievementsData.map((yearData, index) => (
        <div key={index} className="mb-5">
          <h2 className="text-primary mb-4">{yearData.year}</h2>
          <Card>
            <Card.Body>
              <Card.Title as="h3">{yearData.title}</Card.Title>
              <ul className="mt-3 mb-4">
                {yearData.highlights.map((highlight, i) => (
                  <li key={i} className="mb-2">{highlight}</li>
                ))}
              </ul>

              <Row>
                {yearData.categories.map((category, catIndex) => (
                  <Col key={catIndex} md={6} lg={4} className="mb-3 d-flex">
                    <Card bg="light" text="dark" className="w-100 h-100">
                      <Card.Body className="d-flex flex-column">
                        <Card.Title as="h6">{category.name}</Card.Title>
                        <ul className="mb-0 ps-3 flex-grow-1" style={{fontSize: '0.9rem'}}>
                          {category.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="mb-1 text-muted">{item}</li>
                          ))}
                        </ul>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </div>
      ))}
    </Container>
  )
}

function ContactPage() {
  return (
    <Container>
      <h1 className="mb-4">Get In Touch</h1>

      <Card className="mb-4">
        <Card.Body>
          <Card.Title as="h3">Connect on Professional Platforms</Card.Title>
          <p className="mt-3">
            Connect with me through professional platforms below.
          </p>

          <div className="d-grid gap-3 d-md-block mt-4">
            <Button
              href={cvData.personalInfo.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="lg"
              className="me-2"
            >
              <i className="fa-brands fa-square-linkedin me-2"></i> LinkedIn Profile
            </Button>

            <Button
              href={cvData.personalInfo.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              variant="dark"
              size="lg"
            >
              <i className="fa-brands fa-github me-2"></i> GitHub Profile
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Card.Title as="h3">About This Site</Card.Title>
          <p className="mt-3 text-muted">
            This personal webpage was built with React, TypeScript, Vite, and Bootstrap. It showcases my professional experience,
            technical skills, and key achievements in data engineering and analytics platform development.
          </p>
          <p className="text-muted">
            The site is deployed on GitHub Pages and features a responsive design that works on all devices.
          </p>
        </Card.Body>
      </Card>
    </Container>
  )
}

function App() {
  return (
    <Router>
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cv" element={<CVPage />} />
            <Route path="/achievements" element={<AchievementsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App