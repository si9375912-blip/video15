import React, { useState } from 'react';
import { X, Shield, Eye, EyeOff, Lock, User, Home, ArrowLeft, Sparkles, KeyRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

interface AdminLoginProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AdminLogin({ isOpen, onClose, onSuccess }: AdminLoginProps) {
  const { login } = useAdmin();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate loading for better UX
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (login(username, password)) {
      setUsername('');
      setPassword('');
      setIsLoading(false);
      onSuccess();
    } else {
      setError('Usuario o contraseña incorrectos');
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setUsername('');
    setPassword('');
    setError('');
    setShowPassword(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-black/80 via-indigo-900/50 to-purple-900/50 backdrop-blur-md flex items-center justify-center z-50 p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in duration-500 transform scale-100 border border-white/20">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/95 via-purple-600/95 to-pink-600/95"></div>
          
          {/* Animated sparkles */}
          <div className="absolute inset-0">
            <Sparkles className="absolute top-4 right-16 h-4 w-4 text-white/60 animate-pulse" />
            <Sparkles className="absolute bottom-6 left-8 h-3 w-3 text-white/40 animate-pulse delay-700" />
            <Sparkles className="absolute top-8 left-1/3 h-2 w-2 text-white/50 animate-pulse delay-300" />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl mr-4 shadow-lg border border-white/30 animate-pulse">
                  <Shield className="h-8 w-8 animate-bounce" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                    Acceso Administrativo
                  </h2>
                  <p className="text-sm opacity-90 font-medium">Panel de Control del Sistema</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Link
                  to="/"
                  className="p-2 hover:bg-white/20 rounded-full transition-all duration-300 hover:scale-110 group"
                  title="Ir a la página de inicio"
                >
                  <Home className="h-5 w-5 group-hover:animate-pulse" />
                </Link>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-white/20 rounded-full transition-all duration-300 hover:scale-110 group"
                  title="Cerrar"
                >
                  <X className="h-6 w-6 group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full animate-spin-slow"></div>
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white/5 rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 -right-8 w-16 h-16 bg-white/5 rounded-full animate-bounce"></div>
        </div>

        {/* Form */}
        <div className="p-8 bg-gradient-to-b from-white to-gray-50">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-3 flex items-center">
                <User className="h-4 w-4 mr-2 text-indigo-600" />
                Usuario
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-indigo-400" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-300 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:border-indigo-300 text-gray-800 font-medium"
                  placeholder="Ingrese su usuario"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-3 flex items-center">
                <KeyRound className="h-4 w-4 mr-2 text-purple-600" />
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-purple-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-300 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:border-purple-300 text-gray-800 font-medium"
                  placeholder="Ingrese su contraseña"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center hover:scale-110 transition-transform duration-200"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-purple-400 hover:text-purple-600 transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-purple-400 hover:text-purple-600 transition-colors" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl p-4 animate-shake">
                <div className="flex items-center">
                  <div className="bg-red-100 p-2 rounded-xl mr-3 animate-pulse">
                    <X className="h-4 w-4 text-red-600" />
                  </div>
                  <p className="text-sm text-red-800 font-semibold">{error}</p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !username || !password}
              className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-4 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center transform hover:scale-105 disabled:hover:scale-100 shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                  <span className="animate-pulse">Verificando acceso...</span>
                </>
              ) : (
                <>
                  <Shield className="h-6 w-6 mr-3 animate-pulse" />
                  <span>Acceder al Panel de Control</span>
                </>
              )}
            </button>
          </form>

          {/* Navigation Section */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <Link
              to="/"
              className="w-full bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center transform hover:scale-105 shadow-sm hover:shadow-md border border-gray-300"
            >
              <ArrowLeft className="h-5 w-5 mr-3" />
              Volver a la Página Principal
            </Link>
          </div>

          {/* Info Section */}
          <div className="mt-6 p-5 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl border-2 border-blue-200 shadow-inner">
            <div className="flex items-center mb-2">
              <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-2 rounded-xl mr-3 shadow-sm">
                <Shield className="h-4 w-4 text-blue-600 animate-pulse" />
              </div>
              <h4 className="font-bold text-blue-900">🔒 Acceso Restringido</h4>
            </div>
            <p className="text-sm text-blue-800 ml-11 font-medium leading-relaxed">
              Solo los administradores autorizados pueden acceder al panel de control del sistema. 
              Este acceso permite gestionar precios, catálogos y configuraciones avanzadas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}