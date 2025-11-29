"use client";

import { useState, useCallback, useEffect } from "react";
import { useUser, SignInButton, UserButton } from "@clerk/nextjs";
import {
  Sparkles,
  BarChart3,
  Table,
  Loader2,
  Database,
  Coins,
  LogIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { FileUpload } from "@/components/file-upload";
import { DataTable } from "@/components/data-table";
import { DashboardView } from "@/components/charts/dashboard-view";
import { PricingModal } from "@/components/pricing-modal";
import { parseCSV } from "@/lib/parse-data";
import { analyzeDashboard, getCurrentUserData } from "./actions";
import { SAMPLE_CSV } from "@/lib/sample-data";
import type { Dataset, Dashboard } from "@/lib/types";
import type { User } from "@/lib/supabase/types";

type View = "data" | "dashboard";

export default function Home() {
  const { isLoaded, isSignedIn } = useUser();
  const [userData, setUserData] = useState<User | null>(null);
  const [data, setData] = useState<Dataset | null>(null);
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<View>("data");
  const [showPricing, setShowPricing] = useState(false);

  // Load user data when signed in
  useEffect(() => {
    if (isSignedIn) {
      getCurrentUserData().then(({ user }) => {
        setUserData(user);
      });
    } else {
      setUserData(null);
    }
  }, [isSignedIn]);

  // Check for success/canceled URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("success") === "true") {
      // Refresh user data after successful purchase
      getCurrentUserData().then(({ user }) => {
        setUserData(user);
      });
      // Clean URL
      window.history.replaceState({}, "", "/");
    }
  }, []);

  const handleFileLoaded = useCallback((content: string) => {
    const parsed = parseCSV(content);
    setData(parsed);
    setDashboard(null);
    setError(null);
    setView("data");
  }, []);

  const handleLoadSample = useCallback(() => {
    const parsed = parseCSV(SAMPLE_CSV);
    setData(parsed);
    setDashboard(null);
    setError(null);
    setView("data");
  }, []);

  const handleAnalyze = useCallback(async () => {
    if (!data) {
      setError("Please upload data first");
      return;
    }

    setIsLoading(true);
    setError(null);

    const result = await analyzeDashboard(data);

    if (result.requiresAuth) {
      setError("Please sign in to generate dashboards");
    } else if (result.requiresCredits) {
      setShowPricing(true);
      setError(result.error || null);
    } else if (result.error) {
      setError(result.error);
    } else if (result.dashboard) {
      setDashboard(result.dashboard);
      setView("dashboard");
      // Refresh user data to update credit count
      getCurrentUserData().then(({ user }) => {
        setUserData(user);
      });
    }

    setIsLoading(false);
  }, [data]);

  const handleClear = useCallback(() => {
    setData(null);
    setDashboard(null);
    setError(null);
    setView("data");
  }, []);

  const credits = userData?.credits ?? 0;
  const isAdmin = userData?.is_admin ?? false;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold">DataBooth</h1>
          </div>

          <div className="flex items-center gap-3">
            {isLoaded && isSignedIn ? (
              <>
                {/* Credits display */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPricing(true)}
                  className="gap-2"
                >
                  <Coins className="h-4 w-4" />
                  {isAdmin ? "∞" : credits} credits
                </Button>
                <UserButton afterSignOutUrl="/" />
              </>
            ) : isLoaded ? (
              <SignInButton mode="modal">
                <Button variant="outline" size="sm">
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </SignInButton>
            ) : null}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
            {error}
          </div>
        )}

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Panel - Upload & Controls */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Data Source</CardTitle>
                <CardDescription>
                  Upload a CSV file or try sample data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FileUpload
                  onFileLoaded={handleFileLoaded}
                  disabled={isLoading}
                />

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLoadSample}
                    disabled={isLoading}
                    className="flex-1"
                  >
                    <Database className="h-4 w-4 mr-2" />
                    Sample Data
                  </Button>
                  {data && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleClear}
                      disabled={isLoading}
                    >
                      Clear
                    </Button>
                  )}
                </div>

                {data && (
                  <div className="pt-4 border-t">
                    {isSignedIn ? (
                      <Button
                        onClick={handleAnalyze}
                        disabled={isLoading || !data}
                        className="w-full"
                        size="lg"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Sparkles className="h-4 w-4 mr-2" />
                            Generate Dashboard
                            {!isAdmin && credits > 0 && (
                              <span className="ml-2 text-xs opacity-75">
                                (1 credit)
                              </span>
                            )}
                          </>
                        )}
                      </Button>
                    ) : (
                      <SignInButton mode="modal">
                        <Button className="w-full" size="lg">
                          <LogIn className="h-4 w-4 mr-2" />
                          Sign in to Generate
                        </Button>
                      </SignInButton>
                    )}
                    <p className="text-xs text-muted-foreground text-center mt-2">
                      {data.length} rows loaded
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* View Toggle */}
            {data && (
              <Card>
                <CardContent className="pt-6">
                  <div className="flex gap-2">
                    <Button
                      variant={view === "data" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setView("data")}
                      className="flex-1"
                    >
                      <Table className="h-4 w-4 mr-2" />
                      Data
                    </Button>
                    <Button
                      variant={view === "dashboard" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setView("dashboard")}
                      disabled={!dashboard}
                      className="flex-1"
                    >
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Dashboard
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Panel - Display Area */}
          <div className="lg:col-span-2">
            {!data ? (
              <Card className="h-full min-h-[400px] flex items-center justify-center">
                <CardContent className="text-center">
                  <BarChart3 className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Data Loaded</h3>
                  <p className="text-muted-foreground text-sm max-w-sm">
                    Upload a CSV file or load sample data to get started. AI
                    will analyze your data and generate beautiful
                    visualizations.
                  </p>
                </CardContent>
              </Card>
            ) : view === "data" ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Data Preview</CardTitle>
                  <CardDescription>
                    {data.length} rows, {Object.keys(data[0] || {}).length}{" "}
                    columns
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DataTable data={data} />
                </CardContent>
              </Card>
            ) : dashboard ? (
              <DashboardView dashboard={dashboard} data={data} />
            ) : (
              <Card className="h-full min-h-[400px] flex items-center justify-center">
                <CardContent className="text-center">
                  <Sparkles className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    Ready to Analyze
                  </h3>
                  <p className="text-muted-foreground text-sm max-w-sm">
                    Click &quot;Generate Dashboard&quot; to let AI analyze your
                    data and create visualizations automatically.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          DataBooth v2.0 — AI-powered data visualization
        </div>
      </footer>

      {/* Pricing Modal */}
      <PricingModal isOpen={showPricing} onClose={() => setShowPricing(false)} />
    </div>
  );
}
