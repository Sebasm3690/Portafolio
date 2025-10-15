// src/components/Banner.jsx
import React, { useEffect, useState } from 'react';
import { Row, Container, Col } from 'react-bootstrap';
import { ArrowRightCircle, Download } from 'react-bootstrap-icons';
import headerImg from '../assets/img/foto.png';
import 'animate.css';
import { motion } from 'framer-motion';

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const toRotate = ['Web Developer', 'Frontend Developer', 'Backend Developer'];
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(100 - Math.random() * 50); // más rápido
  const period = 2000;
  const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

  const CV_PATH = '/Sebastián_Merino_CV.pdf';

  useEffect(() => {
    const ticker = setInterval(() => tick(), delta);
    return () => clearInterval(ticker);
  }, [text]); // eslint-disable-line react-hooks/exhaustive-deps

  const tick = () => {
    const i = loopNum % toRotate.length;
    const fullText = toRotate[i];
    const updateText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updateText);
    if (isDeleting) setDelta((prevDelta) => prevDelta / 2);

    if (!isDeleting && updateText === fullText) {
      setDelta(period);
      setIsDeleting(true);
    } else if (isDeleting && updateText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(100);
    }
  };

  return (
    <section
      id="home"
      className="banner text-white d-flex align-items-center"
      style={{
        minHeight: '100vh',
        backgroundColor: '#0f172a', // dark navy tone
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container>
        <Row className="align-items-center">
          <Col
            xs={12}
            md={6}
            className="d-flex flex-column justify-content-center"
          >
            <motion.div>
              <p
                className="mb-2 fw-semibold"
                style={{ color: '#22c55e', letterSpacing: '1px' }}
              >
                Hello, I’m
              </p>

              <h1
                className="fw-bold"
                style={{ fontSize: '3.5 rem', lineHeight: '1.2' }}
              >
                Sebastian <br />
                <span style={{ color: '#22c55e' }}> Merino </span>
              </h1>
            </motion.div>
            <span className="tagline">Welcome to my portafolio</span>
            <motion.p
              variants={item}
              className="text-sm font-medium text-emerald-500 mb-2"
            >
              Available / Ecuador
            </motion.p>

            <p>
              I am a{' '}
              <span style={{ color: '#22c55e' }}>
                Software Engineer Graduated
              </span>{' '}
              from ESPOCH, I am 24 years old, I am passionate about frontend and
              backend development. I have experience with technologies such as
              HTML, CSS and JavaScript, as well as modern frameworks like React
              and Angular for frontend and Djago and NestJS for the backend. I
              work with relational databases such as MySQL, PostgreSQL and SQL
              Server, which allow me to build robbust, scalable and well
              structured applications. I consider myself a person who is
              constantly learning, always seeking to improve my skills and
              provide efficient and innovate solutions in every project.
            </p>

            <div className="d-flex gap-3 flex-wrap">
              <a href={CV_PATH} download style={{ textDecoration: 'none' }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="btn btn-outline-light d-flex align-items-center gap-2 px-4 py-2"
                >
                  Download CV <Download size={22} />
                </motion.button>
              </a>
            </div>
          </Col>

          <Col
            xs={12}
            md={6}
            className="d-flex justify-content-center mt-5 mt-md-0"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <img
                src={headerImg}
                alt="Profile"
                className="img-fluid rounded-circle shadow-lg"
                style={{
                  width: '500px',
                  height: '500px',
                  objectFit: 'cover',
                  position: 'relative',
                  zIndex: 2,
                  border: '4px solid #22c55e',
                }}
              />
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
