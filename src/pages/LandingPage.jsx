import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaGraduationCap, FaChalkboardTeacher, FaUsers } from "react-icons/fa";
import "../App.css";

const LandingPage = () => {
  return (
    <div>
      <section className="hero text-white text-center py-5">
        <Container>
          <h1 className="display-3 fw-bold mb-4 animate__animated animate__fadeIn">
            Selamat Datang di SMK IT
          </h1>
          <p className="lead mb-4 animate__animated animate__fadeIn text-warning">
            Temukan Pendidikan Berkualitas yang Menyiapkan Masa Depan Anda
          </p>
          <Button
            variant="outline-light"
            size="lg"
            href="/register"
            className="cta-button animate__animated animate__fadeIn"
          >
            Daftar Sekarang
          </Button>
        </Container>
      </section>

      <section className="features py-5">
        <Container>
          <h2 className="text-center mb-5 fw-bold">Fitur Utama Kami</h2>
          <Row className="text-center">
            <Col md={4}>
              <FaGraduationCap size={50} className="feature-icon mb-3" />
              <h4>Pendidikan Berkualitas</h4>
              <p>
                Kurirulum yang selalu up-to-date dengan perkembangan industri
                dan teknologi terkini.
              </p>
            </Col>
            <Col md={4}>
              <FaChalkboardTeacher size={50} className="feature-icon mb-3" />
              <h4>Pengajaran Interaktif</h4>
              <p>
                Metode pengajaran inovatif dengan pengalaman belajar yang lebih
                menarik dan efektif.
              </p>
            </Col>
            <Col md={4}>
              <FaUsers size={50} className="feature-icon mb-3" />
              <h4>Komunitas Pelajar</h4>
              <p>
                Bergabunglah dengan komunitas pelajar yang penuh semangat dan
                mendukung satu sama lain.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="cta-section text-white text-center py-5">
        <Container>
          <h2 className="fw-bold mb-4">Mulailah Karier Anda Bersama Kami!</h2>
          <p className="lead mb-4">
            Daftar sekarang dan jadilah bagian dari generasi masa depan.
          </p>
          <Button
            variant="outline-light"
            size="lg"
            href="/register"
            className="cta-button"
          >
            Daftar Sekarang
          </Button>
        </Container>
      </section>

 
      <footer className="footer text-center py-4">
        <Container>
          <p className="mb-0">© 2025 SMK IT - Semua hak dilindungi.</p>
          <p>
            <a href="#">Kebijakan Privasi</a> |{" "}
            <a href="#">Syarat & Ketentuan</a>
          </p>
        </Container>
      </footer>
    </div>
  );
};

export default LandingPage;
