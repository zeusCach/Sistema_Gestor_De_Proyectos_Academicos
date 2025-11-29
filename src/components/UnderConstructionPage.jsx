import { useState, useEffect } from 'react';
import { Wrench, Rocket, CheckCircle, Clock, Mail } from 'lucide-react';

const UnderConstructionPage = () => {
  const [progress] = useState(75);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Fecha estimada de lanzamiento (ajusta esta fecha)
  const launchDate = new Date('2025-01-15T00:00:00');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = launchDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: CheckCircle,
      title: 'Gestión de Proyectos',
      description: 'Sistema completo para administrar proyectos académicos',
      status: 'Completado',
      color: '#28A745'
    },
    {
      icon: CheckCircle,
      title: 'Dashboard Interactivo',
      description: 'Panel de control con métricas en tiempo real',
      status: 'Completado',
      color: '#28A745'
    },
    {
      icon: Clock,
      title: 'Estadísticas Avanzadas',
      description: 'Gráficas y análisis detallados de proyectos',
      status: 'En Desarrollo',
      color: '#007BFF'
    },
    {
      icon: Clock,
      title: 'Sistema de Reportes',
      description: 'Generación automática de informes',
      status: 'Próximamente',
      color: '#FFC107'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-[#1A386A] text-white py-4 px-6 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-2xl">🎓</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">Sistema Gestor de Proyectos</h1>
              <p className="text-xs text-blue-200">Plataforma Académica Institucional</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6 animate-bounce">
            <Wrench size={40} className="text-blue-600" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Estamos Mejorando Para Ti
          </h2>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Nuestro sistema está siendo actualizado con nuevas funcionalidades para brindarte 
            una mejor experiencia en la gestión de proyectos académicos.
          </p>

          {/* Progress Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Progreso del Desarrollo</span>
              <span className="text-sm font-bold text-blue-600">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-2"
                style={{ width: `${progress}%` }}
              >
                <Rocket size={16} className="text-white" />
              </div>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto mb-12">
            <p className="text-sm font-semibold text-gray-600 mb-4 uppercase tracking-wide">
              Lanzamiento Estimado
            </p>
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
                <div className="text-3xl font-bold text-blue-600">{timeLeft.days}</div>
                <div className="text-xs text-gray-600 uppercase mt-1">Días</div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
                <div className="text-3xl font-bold text-blue-600">{timeLeft.hours}</div>
                <div className="text-xs text-gray-600 uppercase mt-1">Horas</div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
                <div className="text-3xl font-bold text-blue-600">{timeLeft.minutes}</div>
                <div className="text-xs text-gray-600 uppercase mt-1">Minutos</div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
                <div className="text-3xl font-bold text-blue-600">{timeLeft.seconds}</div>
                <div className="text-xs text-gray-600 uppercase mt-1">Segundos</div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            ¿Qué estamos construyendo?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow border-l-4"
                style={{ borderLeftColor: feature.color }}
              >
                <div className="flex items-start space-x-4">
                  <div 
                    className="p-3 rounded-lg flex-shrink-0"
                    style={{ backgroundColor: `${feature.color}15` }}
                  >
                    <feature.icon size={24} style={{ color: feature.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-gray-900">{feature.title}</h4>
                      <span 
                        className="text-xs font-semibold px-2 py-1 rounded-full"
                        style={{ 
                          backgroundColor: `${feature.color}20`,
                          color: feature.color
                        }}
                      >
                        {feature.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-2xl p-8 md:p-12 text-center text-white">
          <Mail size={48} className="mx-auto mb-4 opacity-90" />
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            ¿Quieres ser notificado del lanzamiento?
          </h3>
          <p className="text-blue-100 mb-6 max-w-xl mx-auto">
            Déjanos tu correo y te avisaremos cuando el sistema esté completamente disponible
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="tu-correo@institucion.edu"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-300"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors whitespace-nowrap">
              Notificarme
            </button>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="text-3xl mb-3">🎯</div>
            <h4 className="font-bold text-gray-900 mb-2">Objetivo</h4>
            <p className="text-sm text-gray-600">
              Facilitar la gestión y seguimiento de proyectos académicos institucionales
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="text-3xl mb-3">⚡</div>
            <h4 className="font-bold text-gray-900 mb-2">Velocidad</h4>
            <p className="text-sm text-gray-600">
              Optimizado para ofrecer un rendimiento superior y respuesta inmediata
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="text-3xl mb-3">🔒</div>
            <h4 className="font-bold text-gray-900 mb-2">Seguridad</h4>
            <p className="text-sm text-gray-600">
              Protección de datos con los más altos estándares de seguridad
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-6 mt-16">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-gray-400">
            © 2025 Sistema Gestor de Proyectos Académicos. Todos los derechos reservados.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Desarrollado por el Equipo de Tecnología Institucional
          </p>
        </div>
      </footer>
    </div>
  );
};

export default UnderConstructionPage;