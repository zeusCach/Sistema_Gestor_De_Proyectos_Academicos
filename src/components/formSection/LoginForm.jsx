
import { Checkbox } from './Checkbox.jsx';
import { InputField } from './InputField.jsx'
import { Button } from './Button.jsx'

import Logo_isc from "../../assets/Logo_isc.png"; // CORRECTO
import logo_TecNM from "../../assets/Logo_TecNM.png"; // CORRECTO
import logo_educacion from "../../assets/logo_educacion.png"; // CORRECTO

//react router
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { loginUser } from '../../services/auth.js';


export const LoginForm = () => {

  const navigate = useNavigate()

  // Estado del formulario
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Estado para mensajes de error o éxito
  const [message, setMessage] = useState("");

  // Funcion para actualizar los campo conforme el usuario escribe
  const handleChange = (e) => {
    setForm({
      ...form, // conserva lo que ya existe en el form
      [e.target.name]: e.target.value, // actualiza solo el campo que se está escribiendo
    });
  };

  // Manejo del login
  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("Ingresando...");

    const { user, error } = await loginUser(form.email, form.password);

    if (error) {
      setMessage("Error: " + error.message);
      return;
    }

    setMessage("¡Bienvenido!");

    // Redirección al dashboard
    navigate("/dashboard");
  };

  return (
    <>


      {/* Logos institucionales */}
      <div className="flex items-center gap-6">
        {/* Logo 1 - Instituto Tecnológico Felipe Carrillo Puerto */}
        <img
          src={logo_TecNM}
          alt="Instituto Tecnológico Felipe Carrillo Puerto"
          className="h-18 object-contain"
        />

        {/* Logo 2 - SEP */}
        <img
          src={logo_educacion}
          alt="Secretaría de Educación Pública"
          className="h-18 object-contain"
        />

        {/* Logo 3 - Ingeniería en Sistemas */}
        <img
          src={Logo_isc}
          alt="Ingeniería en Sistemas Computacionales"
          className="h-18 object-contain"
        />
      </div>

      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900">Iniciar Sesión</h2>
            <p className="mt-2 text-sm text-gray-600">Sistema de Gestión de Proyectos Académicos</p>
          </div>

          <form onSubmit={handleSubmit}>
            <InputField
              label="Correo Electrónico"
              type="email"
              name="email"
              placeholder="correo@ejemplo.com"
              required={true}
              value={form.email}
              onChange={handleChange}
            />

            <InputField
              label="Contraseña"
              type="password"
              name="password"
              placeholder="Ingresa tu contraseña"
              required={true}
              value={form.password}
              onChange={handleChange}
            />

            <div className="flex items-center justify-between mb-6">
              <Checkbox
                label="Recordarme"
                name="remember"
              />


            </div>

            <Button variant="primary">Iniciar Sesión</Button>

            {message && (
              <p className="text-center text-sm mt-4 text-gray-600">{message}</p>
            )}

          </form>




          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">O</span>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ¿No tienes cuenta?{' '}
              <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium">
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>
      </div>

    </>
  );
};

