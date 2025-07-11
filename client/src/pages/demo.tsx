import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  User, 
  Mail, 
  Shield, 
  Clock, 
  Info,
  LayoutDashboard,
  CheckCircle,
  LogOut
} from "lucide-react";

export default function Demo() {
  const [, setLocation] = useLocation();
  const [showDashboard, setShowDashboard] = useState(false);

  // Mock user data for demo
  const mockUser = {
    id: 1,
    name: "Usuario Demo",
    email: "demo@gmail.com",
    googleId: "demo123456789",
    givenName: "Usuario",
    familyName: "Demo",
    picture: "https://lh3.googleusercontent.com/a/default-user=s96-c",
    emailVerified: true,
    createdAt: new Date(),
    lastLoginAt: new Date(),
  };

  const handleDemoLogin = () => {
    setShowDashboard(true);
  };

  const handleDemoLogout = () => {
    setShowDashboard(false);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (showDashboard) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo/Title */}
              <div className="flex items-center">
                <LayoutDashboard className="w-5 h-5 text-google-brand mr-2" />
                <h1 className="text-xl font-medium text-text-primary">Dashboard (Demo)</h1>
              </div>

              {/* User Menu */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <User className="w-8 h-8 p-1 rounded-full border-2 border-gray-200" />
                  <span className="text-sm font-medium text-text-primary">
                    {mockUser.name}
                  </span>
                </div>

                <Button
                  onClick={handleDemoLogout}
                  variant="outline"
                  size="sm"
                  className="text-text-secondary hover:text-text-primary"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  Cerrar sesión
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {/* Demo Warning */}
            <Alert className="mb-6 bg-blue-50 border-blue-200">
              <Info className="h-4 w-4 text-google-brand" />
              <AlertDescription>
                <h4 className="text-sm font-medium text-blue-900 mb-1">Modo Demo</h4>
                <p className="text-sm text-blue-700">
                  Esta es una simulación del dashboard. En producción, este contenido vendría directamente de Google OAuth.
                </p>
              </AlertDescription>
            </Alert>

            {/* Welcome Section */}
            <Card className="mb-6 shadow-lg">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-medium text-text-primary mb-2">
                  ¡Bienvenido, {mockUser.givenName}!
                </h2>
                <p className="text-text-secondary">
                  Has iniciado sesión exitosamente con tu cuenta de Google.
                </p>
              </CardContent>
            </Card>

            {/* User Profile Card */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Información del Perfil
                </CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-text-secondary mb-1">Nombre Completo</dt>
                    <dd className="text-sm text-text-primary">{mockUser.name}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-text-secondary mb-1">Email</dt>
                    <dd className="text-sm text-text-primary flex items-center">
                      <Mail className="w-4 h-4 mr-1" />
                      {mockUser.email}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-text-secondary mb-1">Google ID</dt>
                    <dd className="text-sm text-text-primary font-mono">{mockUser.googleId}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-text-secondary mb-1">Email Verificado</dt>
                    <dd className="text-sm text-text-primary">
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verificado
                      </Badge>
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            {/* Session Information */}
            <Alert className="mt-6 bg-blue-50 border-blue-200">
              <Info className="h-4 w-4 text-google-brand" />
              <AlertDescription>
                <h4 className="text-sm font-medium text-blue-900 mb-1">Información de Sesión</h4>
                <p className="text-sm text-blue-700">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Sesión iniciada: {formatDate(mockUser.lastLoginAt)}<br />
                  Sesión expira: {formatDate(new Date(Date.now() + 24 * 60 * 60 * 1000))}
                </p>
              </AlertDescription>
            </Alert>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md">
        {/* Demo Info Card */}
        <Alert className="mb-6 bg-yellow-50 border-yellow-200">
          <Info className="h-4 w-4 text-yellow-600" />
          <AlertDescription>
            <h4 className="text-sm font-medium text-yellow-900 mb-2">Estado del Login de Google</h4>
            <p className="text-sm text-yellow-800 mb-3">
              El login real de Google requiere configuración adicional en el entorno de producción. 
              En Replit, Google puede bloquear las conexiones por seguridad.
            </p>
            <div className="text-xs text-yellow-700">
              <strong>Para usar en producción:</strong><br />
              1. Configurar dominio en Google Cloud Console<br />
              2. Agregar URLs de redirect autorizadas<br />
              3. Desplegar en un servidor con dominio propio
            </div>
          </AlertDescription>
        </Alert>

        <Card className="bg-white shadow-lg border border-gray-200">
          <CardContent className="p-8">
            {/* Header Section */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-6">
                <User className="w-16 h-16 text-google-brand" />
              </div>
              <h1 className="text-2xl font-normal text-text-primary mb-2">Iniciar Sesión</h1>
              <p className="text-sm text-text-secondary">Usa tu cuenta de Google</p>
            </div>

            {/* Demo Google OAuth Button */}
            <div className="mb-6">
              <Button
                onClick={handleDemoLogin}
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-google-brand focus:border-transparent transition-all duration-200 hover:shadow-md text-text-secondary hover:text-text-primary"
                variant="outline"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-sm font-medium">
                  Continuar con Google (Demo)
                </span>
              </Button>
            </div>

            {/* Real OAuth Button */}
            <div className="mb-6">
              <Button
                onClick={() => window.location.href = '/api/auth/google'}
                variant="outline"
                className="w-full text-sm text-text-secondary hover:text-text-primary border-dashed"
              >
                Probar OAuth Real (puede fallar en Replit)
              </Button>
            </div>

            {/* Navigation */}
            <div className="text-center space-y-2">
              <Button
                onClick={() => setLocation("/")}
                variant="link"
                className="text-sm text-google-brand hover:underline"
              >
                ← Volver a Login Original
              </Button>
            </div>

            {/* Footer */}
            <div className="text-center mt-6">
              <p className="text-xs text-text-secondary">
                Al continuar, aceptas nuestros{" "}
                <a href="#" className="text-google-brand hover:underline">
                  Términos de Servicio
                </a>{" "}
                y{" "}
                <a href="#" className="text-google-brand hover:underline">
                  Política de Privacidad
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}