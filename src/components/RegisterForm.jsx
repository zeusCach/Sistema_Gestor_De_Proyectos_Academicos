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
      institution: "",
      phone_number: ""
    }
  )

  //Estado para manejo de mensajes de error en registros
  const [errorMsg, setErrorMsg] = useState("");

  //Estado para compropbbar si el registro se esta completando
  const [loading, setLoading] = useState(false);

  //Funcion que maneja los cambios escritos en el input del form
  function handleChange(e) {

    //modificamos nuestros datos sin alterar los campos no seleccionados
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  //
  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");

    if (form.password !== form.confirmPassword) {
      setErrorMsg("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);

    const { success, error } = await registerUser({
      name: form.name,
      email: form.email,
      password: form.password,
      institution: form.institution,
      phone_number: form.phone_number
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

        <form onSubmit={handleSubmit}>


          <InputField
            label="Nombre Completo"
            type="text"
            name="name"
            placeholder="Juan Pérez"
            required={true}
            value={form.name}
            onChange={handleChange}
          />

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
            placeholder="Mínimo 6 caracteres"
            required={true}
            value={form.password}
            onChange={handleChange}
          />

          <InputField
            label="Confirmar Contraseña"
            type="password"
            name="confirmPassword"
            placeholder="Repita la contraseña"
            required={true}
            value={form.confirmPassword}
            onChange={handleChange}
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
            />

            <InputField
              label="Teléfono (Opcional)"
              type="tel"
              name="phone_number"
              placeholder="999-999-9999"
              value={form.phone_number}
              onChange={handleChange}
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
