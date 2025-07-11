import { useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { 
  LogOut, 
  User, 
  Mail, 
  Shield, 
  Clock, 
  Info,
  Loader2,
  LayoutDashboard,
  CheckCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Check authentication status
  const { data: authData, isLoading: authLoading } = useQuery({
    queryKey: ["/api/auth/user"],
    refetchOnWindowFocus: true,
  });

  // Get dashboard data
  const { data: dashboardData, isLoading: dashboardLoading } = useQuery({
    queryKey: ["/api/dashboard/profile"],
    enabled: authData?.isAuthenticated === true,
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/auth/logout"),
    onSuccess: () => {
      queryClient.clear();
      toast({
        title: "Signed out successfully",
        description: "You have been logged out of your account.",
      });
      setLocation("/");
    },
    onError: () => {
      toast({
        title: "Logout failed",
        description: "There was an error signing you out. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !authData?.isAuthenticated) {
      setLocation("/");
    }
  }, [authData, authLoading, setLocation]);

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const formatDate = (dateString: string | Date | null) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (authLoading || dashboardLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-google-brand" />
      </div>
    );
  }

  if (!authData?.isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  const user = dashboardData?.user || authData?.user;
  const session = dashboardData?.session;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Title */}
            <div className="flex items-center">
              <LayoutDashboard className="w-5 h-5 text-google-brand mr-2" />
              <h1 className="text-xl font-medium text-text-primary">Dashboard</h1>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                {user?.picture ? (
                  <img
                    src={user.picture}
                    alt="User avatar"
                    className="w-8 h-8 rounded-full border-2 border-gray-200"
                  />
                ) : (
                  <User className="w-8 h-8 p-1 rounded-full border-2 border-gray-200" />
                )}
                <span className="text-sm font-medium text-text-primary">
                  {user?.name || "User"}
                </span>
              </div>

              <Button
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
                variant="outline"
                size="sm"
                className="text-text-secondary hover:text-text-primary"
              >
                {logoutMutation.isPending ? (
                  <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                ) : (
                  <LogOut className="w-4 h-4 mr-1" />
                )}
                Sign out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Welcome Section */}
          <Card className="mb-6 shadow-lg">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-medium text-text-primary mb-2">
                Welcome, {user?.givenName || user?.name || "User"}!
              </h2>
              <p className="text-text-secondary">
                You have successfully signed in with your Google account.
              </p>
            </CardContent>
          </Card>

          {/* User Profile Card */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-text-secondary mb-1">Full Name</dt>
                  <dd className="text-sm text-text-primary">{user?.name || "N/A"}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-text-secondary mb-1">Email Address</dt>
                  <dd className="text-sm text-text-primary flex items-center">
                    <Mail className="w-4 h-4 mr-1" />
                    {user?.email || "N/A"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-text-secondary mb-1">Google ID</dt>
                  <dd className="text-sm text-text-primary font-mono">{user?.googleId || "N/A"}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-text-secondary mb-1">Email Verified</dt>
                  <dd className="text-sm text-text-primary">
                    {user?.emailVerified ? (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        <Shield className="w-3 h-3 mr-1" />
                        Unverified
                      </Badge>
                    )}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          {/* Session Information */}
          {session && (
            <Alert className="mt-6 bg-blue-50 border-blue-200">
              <Info className="h-4 w-4 text-google-brand" />
              <AlertDescription>
                <h4 className="text-sm font-medium text-blue-900 mb-1">Session Information</h4>
                <p className="text-sm text-blue-700">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Logged in at: {formatDate(session.loginTime)}<br />
                  Session expires: {formatDate(session.expiryTime)}
                </p>
              </AlertDescription>
            </Alert>
          )}
        </div>
      </main>
    </div>
  );
}
