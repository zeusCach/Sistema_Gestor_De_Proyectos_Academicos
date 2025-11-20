
import { Checkbox } from './Checkbox.jsx';
import {InputField} from './InputField.jsx'
import {Button} from './Button.jsx'

export const LoginForm = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Iniciar Sesión</h2>
          <p className="mt-2 text-sm text-gray-600">Sistema de Gestión de Proyectos Académicos</p>
        </div>
        
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
          placeholder="Ingresa tu contraseña"
          required={true}
        />

        <div className="flex items-center justify-between mb-6">
          <Checkbox 
            label="Recordarme"
            name="remember"
          />
          
          <a href="/recuperar-password" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            ¿Olvidaste tu contraseña?
          </a>
        </div>

        <Button variant="primary">Iniciar Sesión</Button>

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
            <a href="/registro" className="text-blue-600 hover:text-blue-700 font-medium">
              Regístrate aquí
            </a>
          </p>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-center text-gray-500">
            Al iniciar sesión, aceptas nuestros{' '}
            <a href="/terminos" className="text-blue-600 hover:text-blue-700">
              Términos de Servicio
            </a>{' '}
            y{' '}
            <a href="/privacidad" className="text-blue-600 hover:text-blue-700">
              Política de Privacidad
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

