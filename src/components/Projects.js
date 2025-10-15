// src/components/Projects.tsx
import React from 'react';
import { Container, Row, Col, Tab, Nav } from 'react-bootstrap';
import ProjectCard, { Project } from './ProjectCard';
import projImg1 from '../assets/img/gym.png';
import projImg2 from '../assets/img/ministerio.png';
import projImg3 from '../assets/img/party.png';

import colorSharp2 from '../assets/img/color-sharp2.png';
import TrackVisibility from 'react-on-screen';
import 'animate.css';

export const Projects = () => {
  const projects = [
    {
      title: 'App Gym (React + Django)',
      short: 'Web page to manage routes, exercises, users, and track calories.',
      image: projImg1,
      stack: ['React', 'Django', 'PostgreSQL', 'JWT', 'ReactBootstrap'],
      results: [
        '60% increase in training consistency',
        'Customized routines according to the goal and level',
        'Progress tracking and calorie monitoring',
      ],
      links: {
        live: 'https://app-gym-git-main-sebasm3690s-projects.vercel.app/',
        repo: 'https://github.com/Sebasm3690/AppGym.git',
      },
    },
    {
      title: 'Events Web application (Django + React)',
      short: 'System to sell party tickets for clients in a digital way.',
      context: 'Proyecto personal ',
      image: projImg3,
      stack: ['React', 'Django', 'PostgreSQL', 'JWT', 'Bootstrap'],
      results: [
        'Events and ticket management for organizers',
        'Digital ticket sales with QR code validation',
        'Security with JWT and role-based access',
      ],
      links: {
        live: 'https://bookmydrive.onrender.com/',
        repo: 'https://github.com/CspO6/BookMyDrive',
      },
    },
    {
      title: 'App Archivos (React + Django)',
      short: 'System to manage and share files with role-based permissions.',
      context: 'MAATE',
      image: projImg2,
      stack: ['React', 'Node', 'PostgreSQL'],
      results: [
        'Permissions by roles (admin, editor, viewer)',
        'Metadata search',
        'Deployed in Render',
      ],
      links: {
        live: 'https://apparchivos2024.onrender.com',
        repo: 'https://github.com/AppArchivos/AppArchivos2024',
      },
    },
  ];

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col xs={12}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? 'animate__animated animate__fadeIn' : ''
                  }
                >
                  {/* Encabezado con "Ver todos" a la derecha */}
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h2 className="mb-0">Main projects</h2>

                    <a
                      href="https://github.com/Sebasm3690"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="small text-success fw-semibold text-decoration-none"
                      aria-label="Ver todos mis proyectos en GitHub"
                      title="Ver todos mis proyectos en GitHub"
                    >
                      See all{' '}
                      <span className="ms-1" aria-hidden>
                        →
                      </span>
                    </a>
                  </div>

                  {/* Grid de tarjetas */}
                  <Row className="g-4">
                    {projects.map((proj, i) => (
                      <Col key={i} xs={12} sm={6} md={4} className="d-flex">
                        <div className="w-100">
                          <ProjectCard p={proj} />
                        </div>
                      </Col>
                    ))}
                  </Row>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>

      <img className="background-image-right" src={colorSharp2} alt="" />
    </section>
  );
};
