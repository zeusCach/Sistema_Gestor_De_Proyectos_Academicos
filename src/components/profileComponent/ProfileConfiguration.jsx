import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  fetchUserProfile,
  updateUserProfile,
  saveProfilePhoto,
  getProfilePhoto,
  deleteProfilePhoto,
} from "../../services/profileService";
import "./../../styles/App.css";

export default function ProfileConfiguration() {
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    name: "",
    institution: "",
  });
  
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  // Cargar datos del perfil al montar el componente
  useEffect(() => {
    if (user?.id) {
      loadProfileData();
    }
  }, [user]);

  const loadProfileData = async () => {
    try {
      setLoading(true);
      
      // Cargar nombre e institución desde Supabase
      const profileData = await fetchUserProfile(user.id);
      setFormData({
        name: profileData.name || "",
        institution: profileData.institution || "",
      });

      // Cargar foto SOLO desde localStorage (no está en BD)
      const savedPhoto = getProfilePhoto(user.id);
      if (savedPhoto) {
        setPhotoPreview(savedPhoto);
      }
    } catch (error) {
      showMessage("Error al cargar el perfil", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      // Validar tamaño (máximo 2MB)
      if (file.size > 2 * 1024 * 1024) {
        showMessage("La imagen debe ser menor a 2MB", "error");
        return;
      }

      // Validar tipo
      if (!file.type.startsWith("image/")) {
        showMessage("Solo se permiten archivos de imagen", "error");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setProfilePhoto(base64String);
        setPhotoPreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    deleteProfilePhoto(user.id);
    setProfilePhoto(null);
    setPhotoPreview(null);
    showMessage("Foto eliminada correctamente", "success");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      showMessage("El nombre es obligatorio", "error");
      return;
    }

    try {
      setSaving(true);

      // Actualizar nombre e institución en Supabase (BD)
      await updateUserProfile(user.id, {
        name: formData.name,
        institution: formData.institution,
      });

      // Guardar foto SOLO en localStorage si hay una nueva
      if (profilePhoto) {
        saveProfilePhoto(user.id, profilePhoto);
        setProfilePhoto(null); // Limpiar estado temporal
      }

      showMessage("Perfil actualizado correctamente", "success");
    } catch (error) {
      console.error("Error completo:", error);
      showMessage("Error al actualizar el perfil", "error");
    } finally {
      setSaving(false);
    }
  };

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="spinner"></div>
        <p>Cargando perfil...</p>
      </div>
    );
  }

  return (
    <div className="profile-configuration">
      <div className="profile-header">
        <h2>Configuración de Perfil</h2>
        <p>Actualiza tu información personal</p>
      </div>

      {message && (
        <div className={`profile-message ${message.type}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="profile-form">
        {/* Sección de foto de perfil - SOLO LOCALSTORAGE */}
        <div className="profile-photo-section">
          <label className="section-label">
            Foto de Perfil
          </label>
          
          <div className="photo-container">
            <div className="photo-preview">
              {photoPreview ? (
                <img src={photoPreview} alt="Foto de perfil" />
              ) : (
                <div className="photo-placeholder">
                  <svg
                    width="60"
                    height="60"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
              )}
            </div>

            <div className="photo-actions">
              <input
                type="file"
                id="photoInput"
                accept="image/*"
                onChange={handlePhotoChange}
                style={{ display: "none" }}
              />
              
              <button
                type="button"
                onClick={() => document.getElementById("photoInput").click()}
                className="btn-upload"
              >
                {photoPreview ? "Cambiar foto" : "Subir foto"}
              </button>

              {photoPreview && (
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="btn-remove"
                >
                  Eliminar foto
                </button>
              )}
              
              <p className="photo-hint">
                📍 Se guarda en tu dispositivo (localStorage)<br/>
                Tamaño máximo: 2MB • Formatos: JPG, PNG, GIF
              </p>
            </div>
          </div>
        </div>

        {/* Sección de datos personales - BASE DE DATOS */}
        <div className="form-section">
          <h3 className="section-title">Información Personal</h3>
          
          <div className="form-group">
            <label htmlFor="name">
              Nombre Completo <span className="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Ingresa tu nombre completo"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="institution">Institución</label>
            <input
              type="text"
              id="institution"
              name="institution"
              value={formData.institution}
              onChange={handleInputChange}
              placeholder="Ingresa tu institución"
            />
          </div>

          {/* Email (solo lectura) */}
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              value={user?.email || ""}
              disabled
              className="input-disabled"
            />
            <p className="field-hint">
              El correo electrónico no se puede modificar
            </p>
          </div>
        </div>

        {/* Botón de guardar */}
        <div className="form-actions">
          <button
            type="submit"
            className="btn-save"
            disabled={saving}
          >
            {saving ? (
              <>
                <span className="spinner-small"></span>
                Guardando...
              </>
            ) : (
              "Guardar Cambios"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}