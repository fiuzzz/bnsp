import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const Register = () => {
  const [formData, setFormData] = useState({
    Nm_pendaftar: "",
    Alamat: "",
    Jenis_kelamin: "",
    No_hp: "",
    Asal_sekolah: "",
    Jurusan: "",
    Tgl_lahir: "",
    NISN: "",
  });

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for tracking submit status

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const validateForm = () => {
    const errors = [];

    if (formData.Nm_pendaftar.trim().length < 3) {
      errors.push("Nama minimal 3 karakter");
    }

    if (!formData.Alamat.trim()) {
      errors.push("Alamat wajib diisi");
    }

    if (!formData.Jenis_kelamin) {
      errors.push("Jenis kelamin wajib dipilih");
    }

    if (!/^\d{10,}$/.test(formData.No_hp)) {
      errors.push("No HP minimal 10 digit angka");
    }

    if (!formData.Asal_sekolah.trim()) {
      errors.push("Asal sekolah wajib diisi");
    }

    if (!formData.Jurusan.trim()) {
      errors.push("Jurusan wajib diisi");
    }

    if (!formData.Tgl_lahir) {
      errors.push("Tanggal lahir wajib diisi");
    } else {
      const today = new Date().toISOString().split("T")[0];
      if (formData.Tgl_lahir > today) {
        errors.push("Tanggal lahir tidak valid");
      }
    }

    if (!/^\d{10}$/.test(formData.NISN)) {
      errors.push("NISN harus 10 digit angka");
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (errors.length > 0) {
      setMessage(errors.join(", "));
      return;
    }

    setIsSubmitting(true); // Set to true when submitting

    try {
      await axios.post("https://faiz.rikpetik.site/api/v1/pendaftar", formData);
      setMessage("Pendaftaran berhasil!");
      setFormData({
        Nm_pendaftar: "",
        Alamat: "",
        Jenis_kelamin: "",
        No_hp: "",
        Asal_sekolah: "",
        Jurusan: "",
        Tgl_lahir: "",
        NISN: "",
      });
    } catch (error) {
      setMessage("Terjadi kesalahan saat mendaftar.");
    } finally {
      setIsSubmitting(false); // Reset submitting state after the process is complete
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2 className="mb-4 text-center">Form Pendaftaran Siswa Baru</h2>
        {message && <div className="alert alert-info">{message}</div>}
        <form
          onSubmit={handleSubmit}
          className="mx-auto"
          style={{ maxWidth: "700px" }}
        >
          <div className="mb-3">
            <label className="form-label">Nama Lengkap</label>
            <input
              type="text"
              className="form-control"
              name="Nm_pendaftar"
              value={formData.Nm_pendaftar}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Alamat</label>
            <input
              type="text"
              className="form-control"
              name="Alamat"
              value={formData.Alamat}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Jenis Kelamin</label>
            <br />
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="Jenis_kelamin"
                value="Laki-laki"
                checked={formData.Jenis_kelamin === "Laki-laki"}
                onChange={handleChange}
                required
              />
              <label className="form-check-label">Laki-laki</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="Jenis_kelamin"
                value="Perempuan"
                checked={formData.Jenis_kelamin === "Perempuan"}
                onChange={handleChange}
              />
              <label className="form-check-label">Perempuan</label>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">No. HP</label>
            <input
              type="number"
              className="form-control"
              name="No_hp"
              value={formData.No_hp}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Asal Sekolah</label>
            <input
              type="text"
              className="form-control"
              name="Asal_sekolah"
              value={formData.Asal_sekolah}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Jurusan</label>
            <input
              type="text"
              className="form-control"
              name="Jurusan"
              value={formData.Jurusan}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Tanggal Lahir</label>
            <input
              type="date"
              className="form-control"
              name="Tgl_lahir"
              value={formData.Tgl_lahir}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">NISN</label>
            <input
              type="number"
              className="form-control"
              name="NISN"
              value={formData.NISN}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={isSubmitting} // Disable button while submitting
          >
            {isSubmitting ? "Mendaftar..." : "Daftar"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
