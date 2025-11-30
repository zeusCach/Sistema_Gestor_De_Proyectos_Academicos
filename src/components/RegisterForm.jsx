//Importacion de nuestros componentes
import { InputField } from './InputField.jsx'
import { Button } from './Button.jsx'
import { Link } from "react-router-dom";
import { useState } from 'react';
import { registerUser } from '../services/auth.js';
import { useNavigate } from "react-router-dom";


export const RegisterForm = () => {

  const navigate = useNavigate();

  //Logica para registro

  //State principal, de nuestro formulario
  const [form, setForm] = useState(
    {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      institution: ""
    }
  )

  //Estado para manejo de mensajes de error en registros
  const [errorMsg, setErrorMsg] = useState("");

  //Estado para compropbbar si el registro se esta completando
  const [loading, setLoading] = useState(false);

  //Estado para validacion
  const [errors, setErrors] = useState("");
  

  //Funcion que maneja los cambios escritos en el input del form
  function handleChange(e) {

    //modificamos nuestros datos sin alterar los campos no seleccionados
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validateForm() {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "El nombre es obligatorio";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) newErrors.email = "Correo electrónico inválido";

    if (form.password.length < 6)
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";

    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Las contraseñas no coinciden";

    if (!form.institution.trim())
      newErrors.institution = "La institución es obligatoria";

    const phoneRegex = /^[0-9\s\-]{7,15}$/;
    if (form.phone_number && !phoneRegex.test(form.phone_number))
      newErrors.phone_number = "Formato de teléfono inválido";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  //
  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");

    if(!validateForm()) return;

    setLoading(true);

    const { success, error } = await registerUser({
      name: form.name,
      email: form.email,
      password: form.password,
      institution: form.institution
      
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Registro de Usuario</h2>
          <p className="mt-2 text-sm text-gray-600">Sistema de Gestión de Proyectos Académicos</p>
        </div>

        {errorMsg && (
           <p className="text-red-600 text-center mb-4">{errorMsg}</p>
        )}

        <form onSubmit={handleSubmit}>


          <InputField
            label="Nombre Completo"
            type="text"
            name="name"
            placeholder="Juan Pérez"
            required={true}
            value={form.name}
            onChange={handleChange}
            error={errors.name}
          />

          <InputField
            label="Correo Electrónico"
            type="email"
            name="email"
            placeholder="correo@ejemplo.com"
            required={true}
            value={form.email}
            onChange={handleChange}
            error={errors.email}
          />

          <InputField
            label="Contraseña"
            type="password"
            name="password"
            placeholder="Mínimo 6 caracteres"
            required={true}
            value={form.password}
            onChange={handleChange}
            error={errors.password}
          />

          <InputField
            label="Confirmar Contraseña"
            type="password"
            name="confirmPassword"
            placeholder="Repita la contraseña"
            required={true}
            value={form.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />

          {/* Campos adicionales para publicador */}
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="text-sm text-blue-800 font-medium mb-3">Información adicional para publicadores</p>

            <InputField
              label="Institución"
              type="text"
              name="institution"
              placeholder="Nombre de la institución"
              required={true}
              value={form.institution}
              onChange={handleChange}
              error={errors.institution}
            />

            <InputField
              label="Teléfono (Opcional)"
              type="tel"
              name="phone_number"
              placeholder="999-999-9999"
              value={form.phone_number}
              onChange={handleChange}
              error={errors.phone_number}
            />
          </div>

          <Button variant="primary" disabled={loading}>
            {loading ? "Registrando..." : "Registrar Usuario"}
          </Button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
