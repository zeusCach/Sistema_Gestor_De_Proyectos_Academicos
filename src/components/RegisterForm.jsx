//Importacion de nuestros componentes
import {SelectField} from './SelectField.jsx'
import {InputField} from './InputField.jsx'
import {Button} from './Button.jsx'

export const RegisterForm = () => {
  const roleOptions = [
    { value: 'publicador', label: 'Publicador de Proyectos' },
    { value: 'visitante', label: 'Visitante/Visualizador' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Registro de Usuario</h2>
          <p className="mt-2 text-sm text-gray-600">Sistema de Gestión de Proyectos Académicos</p>
        </div>
        
        <SelectField
          label="Tipo de Usuario"
          name="rol"
          options={roleOptions}
          required={true}
        />

        <InputField
          label="Nombre Completo"
          type="text"
          name="nombre"
          placeholder="Juan Pérez"
          required={true}
        />

        <InputField
          label="Correo Electrónico"
          type="email"
          name="email"
          placeholder="correo@ejemplo.com"
          required={true}
        />

        <InputField
          label="Contraseña"
          type="password"
          name="password"
          placeholder="Mínimo 6 caracteres"
          required={true}
        />

        <InputField
          label="Confirmar Contraseña"
          type="password"
          name="confirmPassword"
          placeholder="Repita la contraseña"
          required={true}
        />

        {/* Campos adicionales para publicador */}
        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <p className="text-sm text-blue-800 font-medium mb-3">Información adicional para publicadores</p>
          
          <InputField
            label="Institución"
            type="text"
            name="institucion"
            placeholder="Nombre de la institución"
            required={true}
          />

          <InputField
            label="Teléfono (Opcional)"
            type="tel"
            name="telefono"
            placeholder="999-999-9999"
          />
        </div>

        <Button variant="primary">Registrar Usuario</Button>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            ¿Ya tienes cuenta?{' '}
            <a href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
              Inicia sesión aquí
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
