import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [pendaftar, setPendaftar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false); // Flag untuk edit
  const [editData, setEditData] = useState({
    Id_pendaftar: "",
    Nm_pendaftar: "",
    Alamat: "",
    Jenis_kelamin: "",
    No_hp: "",
    Asal_sekolah: "",
    Jurusan: "",
    Tgl_lahir: "",
    NISN: "",
  });

  const fetchData = async () => {
    try {
      const res = await axios.get("https://faiz.rikpetik.site/api/v1/pendaftar");
      setPendaftar(res.data.data);
    } catch (error) {
      setMessage("Gagal memuat data pendaftar");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus data ini?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://faiz.rikpetik.site/api/v1/pendaftar/${id}`);
      setMessage("Data berhasil dihapus");
      fetchData(); 
    } catch (error) {
      setMessage("Gagal menghapus data");
    }
  };

  const handleEdit = (item) => {
    setIsEditing(true);
    setEditData(item);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const validateForm = () => {
   
    if (!editData.Nm_pendaftar) {
      setMessage("Nama Lengkap harus diisi");
      return false;
    }
    
  
    if (!editData.Alamat) {
      setMessage("Alamat harus diisi");
      return false;
    }
    
    
    if (!editData.Jenis_kelamin) {
      setMessage("Jenis Kelamin harus dipilih");
      return false;
    }

    
    if (!editData.No_hp || editData.No_hp.length < 10) {
      setMessage("No. HP harus berisi minimal 10 digit");
      return false;
    }

    
    if (!editData.Asal_sekolah) {
      setMessage("Asal Sekolah harus diisi");
      return false;
    }

  
    if (!editData.Jurusan) {
      setMessage("Jurusan harus diisi");
      return false;
    }

    if (editData.Tgl_lahir && isNaN(new Date(editData.Tgl_lahir).getTime())) {
      setMessage("Tanggal Lahir tidak valid");
      return false;
    }

    
    if (!editData.NISN || isNaN(editData.NISN)) {
      setMessage("NISN harus berupa angka");
      return false;
    }

    return true; 
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();

   
    if (!validateForm()) return;

    try {
      await axios.put(
        `https://faiz.rikpetik.site/api/v1/pendaftar/${editData.Id_pendaftar}`,
        editData
      );
      setMessage("Data berhasil diperbarui");
      setIsEditing(false);
      fetchData();
    } catch (error) {
      setMessage("Gagal memperbarui data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2 className="mb-4 text-center">Dashboard Admin - Data Pendaftar</h2>
        {message && <div className="alert alert-info">{message}</div>}

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {isEditing ? (
              <div className="mb-5">
                <h4>Edit Data Pendaftar</h4>
                <form onSubmit={handleSubmitEdit}>
                  <div className="mb-3">
                    <label className="form-label">Nama Lengkap</label>
                    <input
                      type="text"
                      className="form-control"
                      name="Nm_pendaftar"
                      value={editData.Nm_pendaftar}
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
                      value={editData.Alamat}
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
                        checked={editData.Jenis_kelamin === "Laki-laki"}
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
                        checked={editData.Jenis_kelamin === "Perempuan"}
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
                      value={editData.No_hp}
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
                      value={editData.Asal_sekolah}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Jurusan</label>
                    <select
                      className="form-select"
                      name="Jurusan"
                      value={editData.Jurusan}
                      onChange={handleChange}
                      required
                    >
                      <option value="">-- Pilih Jurusan --</option>
                      <option value="IPA">IPA</option>
                      <option value="IPS">IPS</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Tanggal Lahir</label>
                    <input
                      type="date"
                      className="form-control"
                      name="Tgl_lahir"
                      value={editData.Tgl_lahir}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">NISN</label>
                    <input
                      type="number"
                      className="form-control"
                      name="NISN"
                      value={editData.NISN}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Simpan Perubahan
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary ms-2"
                    onClick={() => setIsEditing(false)}
                  >
                    Batal
                  </button>
                </form>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-bordered table-hover">
                  <thead className="table-primary">
                    <tr>
                      <th>ID</th>
                      <th>Nama</th>
                      <th>Alamat</th>
                      <th>Jenis Kelamin</th>
                      <th>No HP</th>
                      <th>Asal Sekolah</th>
                      <th>Jurusan</th>
                      <th>Tgl Lahir</th>
                      <th>NISN</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendaftar.length === 0 ? (
                      <tr>
                        <td colSpan="10" className="text-center">
                          Belum ada data
                        </td>
                      </tr>
                    ) : (
                      pendaftar.map((item) => (
                        <tr key={item.Id_pendaftar}>
                          <td>{item.Id_pendaftar}</td>
                          <td>{item.Nm_pendaftar}</td>
                          <td>{item.Alamat}</td>
                          <td>{item.Jenis_kelamin}</td>
                          <td>{item.No_hp}</td>
                          <td>{item.Asal_sekolah}</td>
                          <td>{item.Jurusan}</td>
                          <td>
                            {item.Tgl_lahir
                              ? new Date(item.Tgl_lahir).toLocaleDateString()
                              : "-"}
                          </td>
                          <td>{item.NISN}</td>
                          <td>
                            <button
                              className="btn btn-warning btn-sm me-2"
                              onClick={() => handleEdit(item)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDelete(item.Id_pendaftar)}
                            >
                              Hapus
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
