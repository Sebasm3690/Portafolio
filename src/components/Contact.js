import React, { useEffect, useMemo, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import contactArt from '../assets/img/contact-illustration.svg';
import 'animate.css';
import TrackVisibility from 'react-on-screen';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import emailjs from 'emailjs-com';

const emailRe = /^\S+@\S+\.\S+$/;

const SERVICE_ID = 'service_ne91d0t';
const TEMPLATE_ID = 'template_h9jw1b8';
const PUBLIC_KEY = 'rhNpYvCmHZUxXAsye';

function useMediaQuery(query) {
  const get = () =>
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia(query).matches
      : false;
  const [matches, setMatches] = useState(get);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mql = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);
    if (mql.addEventListener) mql.addEventListener('change', handler);
    else mql.addListener(handler);
    setMatches(mql.matches);
    return () => {
      if (mql.removeEventListener) mql.removeEventListener('change', handler);
      else mql.removeListener(handler);
    };
  }, [query]);
  return matches;
}

const Contact = () => {
  const formInitialDetails = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  };
  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState('Enviar');

  const isMobile = useMediaQuery('(max-width: 576px)');
  const Toast = useMemo(
    () =>
      Swal.mixin({
        toast: true,
        position: isMobile ? 'bottom-end' : 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        customClass: { popup: 'swal2-dark-toast' },
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      }),
    [isMobile]
  );

  const onFormUpdate = (category, value) =>
    setFormDetails((prev) => ({ ...prev, [category]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formDetails.firstName.trim() ||
      !formDetails.email.trim() ||
      !formDetails.message.trim()
    ) {
      Toast.fire({ icon: 'error', title: 'Completa los campos requeridos' });
      return;
    }
    if (!emailRe.test(formDetails.email)) {
      Toast.fire({ icon: 'error', title: 'Email no válido' });
      return;
    }

    Swal.fire({
      toast: true,
      position: isMobile ? 'bottom-end' : 'top-end',
      title: 'Enviando...',
      showConfirmButton: false,
      allowOutsideClick: false,
      customClass: { popup: 'swal2-dark-toast' },
      didOpen: () => Swal.showLoading(),
    });

    setButtonText('Enviando...');
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, PUBLIC_KEY);
      Swal.close();
      Toast.fire({ icon: 'success', title: '¡Mensaje enviado!' });
      setFormDetails(formInitialDetails);
      e.target.reset();
    } catch (err) {
      console.error(err);
      Swal.close();
      Toast.fire({
        icon: 'error',
        title: 'No se pudo enviar. Inténtalo de nuevo.',
      });
    } finally {
      setButtonText('Enviar');
    }
  };

  return (
    <section className="contact" id="connect">
      <Container>
        <Row className="align-items-center gy-5">
          {/* Ilustración izquierda */}
          <Col xs={12} md={6} className="order-2 order-md-1">
            <TrackVisibility>
              {({ isVisible }) => (
                <figure
                  className={`contact-ill ${
                    isVisible ? 'animate__animated animate__fadeInLeft' : ''
                  }`}
                >
                  <img
                    src={contactArt}
                    alt="Ilustración de contacto: mensajes y envío"
                  />
                </figure>
              )}
            </TrackVisibility>
          </Col>

          {/* Card del formulario */}
          <Col xs={12} md={6} className="order-1 order-md-2">
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={`contact-card ${
                    isVisible ? 'animate__animated animate__fadeInUp' : ''
                  }`}
                >
                  <h2 className="mb-2">Contáctame</h2>
                  <p className="mb-4 text-muted-9">
                    ¿Tienes una idea o proyecto? Con gusto te leo.
                  </p>

                  <form onSubmit={handleSubmit} noValidate>
                    <Row className="g-3">
                      <Col xs={12} sm={6}>
                        <input
                          type="text"
                          name="firstName"
                          placeholder="Nombre"
                          onChange={(e) =>
                            onFormUpdate('firstName', e.target.value)
                          }
                          defaultValue={formDetails.firstName}
                          disabled={buttonText !== 'Enviar'}
                        />
                      </Col>
                      <Col xs={12} sm={6}>
                        <input
                          type="text"
                          name="lastName"
                          placeholder="Apellido"
                          onChange={(e) =>
                            onFormUpdate('lastName', e.target.value)
                          }
                          defaultValue={formDetails.lastName}
                          disabled={buttonText !== 'Enviar'}
                        />
                      </Col>
                      <Col xs={12} sm={6}>
                        <input
                          type="email"
                          name="email"
                          placeholder="Email"
                          onChange={(e) =>
                            onFormUpdate('email', e.target.value)
                          }
                          defaultValue={formDetails.email}
                          disabled={buttonText !== 'Enviar'}
                        />
                      </Col>
                      <Col xs={12} sm={6}>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="No. Teléfono"
                          onChange={(e) =>
                            onFormUpdate('phone', e.target.value)
                          }
                          defaultValue={formDetails.phone}
                          disabled={buttonText !== 'Enviar'}
                        />
                      </Col>
                      <Col xs={12}>
                        <textarea
                          rows="6"
                          name="message"
                          placeholder="Mensaje"
                          onChange={(e) =>
                            onFormUpdate('message', e.target.value)
                          }
                          defaultValue={formDetails.message}
                          disabled={buttonText !== 'Enviar'}
                        />
                      </Col>
                      <Col xs={12}>
                        <button
                          className="btn-gradient"
                          type="submit"
                          disabled={buttonText !== 'Enviar'}
                        >
                          <span>{buttonText}</span>
                        </button>
                      </Col>
                    </Row>
                  </form>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Contact;
export { Contact };
