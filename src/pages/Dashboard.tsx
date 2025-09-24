import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, AlertTriangle, Shield, TrendingUp, Users, Bell, Filter, Eye, CheckCircle, Clock, Settings2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, AreaChart, Area } from "recharts";
import { useI18n } from "@/i18n";
import { Link } from "react-router-dom";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { t } = useI18n();
  const [prefsOpen, setPrefsOpen] = useState(false);
  const [prefs, setPrefs] = useState(() => {
    const saved = localStorage.getItem("alertPrefs");
    return saved
      ? JSON.parse(saved)
      : { threshold: 60, push: true, sms: false, whatsapp: false };
  });

  useEffect(() => {
    localStorage.setItem("alertPrefs", JSON.stringify(prefs));
  }, [prefs]);

  const forecastData = useMemo(
    () => {
      // Mock next-24h data points hourly
      const now = new Date();
      return Array.from({ length: 24 }).map((_, i) => {
        const t = new Date(now.getTime() + i * 60 * 60 * 1000);
        const label = t.toLocaleTimeString([], { hour: '2-digit' });
        // Simple tide-like sine wave + noise
        const tide = 1.2 + Math.sin((i / 24) * Math.PI * 2) * 0.8 + (Math.random() - 0.5) * 0.1;
        const riskBase = Math.max(0, Math.min(100, 50 + Math.sin((i / 24) * Math.PI * 2) * 35 + (Math.random() - 0.5) * 6));
        const ciLow = Math.max(0, riskBase - 8);
        const ciHigh = Math.min(100, riskBase + 8);
        return { time: label, tide: Number(tide.toFixed(2)), risk: Math.round(riskBase), ciLow, ciHigh };
      });
    },
    []
  );

  const mockReports = [
    {
      id: 1,
      type: "Flooding",
      location: "Marina Bay",
      severity: "High",
      status: "verified",
      trustScore: 92,
      timestamp: "2 hours ago",
      reporter: "Anonymous Citizen"
    },
    {
      id: 2,
      type: "Coastal Erosion",
      location: "East Coast Park",
      severity: "Medium",
      status: "pending",
      trustScore: 78,
      timestamp: "5 hours ago",
      reporter: "Beach Walker"
    },
    {
      id: 3,
      type: "Debris Accumulation",
      location: "Changi Beach",
      severity: "Low",
      status: "resolved",
      trustScore: 85,
      timestamp: "1 day ago",
      reporter: "Environmental Volunteer"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High": return "destructive";
      case "Medium": return "warning";
      case "Low": return "secondary";
      default: return "secondary";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified": return "success";
      case "pending": return "warning";
      case "resolved": return "secondary";
      default: return "secondary";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{t("app.name")}</h1>
                <p className="text-sm text-muted-foreground">{t("dashboard.title")}</p>
              </div>
            </Link>
            
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                {t("dashboard.alerts")}
                <Badge variant="destructive" className="ml-2 w-5 h-5 p-0 text-xs">3</Badge>
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                {t("dashboard.filter")}
              </Button>
              <Dialog open={prefsOpen} onOpenChange={setPrefsOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Settings2 className="w-4 h-4 mr-2" />
                    {t("dashboard.alertPreferences")}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{t("dashboard.alertPreferences")}</DialogTitle>
                    <DialogDescription>Customize when and how you receive alerts.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6 pt-2">
                    <div className="space-y-2">
                      <Label>{t("dashboard.threshold")} ({prefs.threshold}%)</Label>
                      <Slider
                        value={[prefs.threshold]}
                        onValueChange={(v) => setPrefs((p: any) => ({ ...p, threshold: v[0] }))}
                        min={0}
                        max={100}
                        step={5}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center justify-between border rounded-lg p-3">
                        <Label className="mr-2">{t("channel.push")}</Label>
                        <Switch checked={prefs.push} onCheckedChange={(c) => setPrefs((p: any) => ({ ...p, push: c }))} />
                      </div>
                      <div className="flex items-center justify-between border rounded-lg p-3">
                        <Label className="mr-2">{t("channel.sms")}</Label>
                        <Switch checked={prefs.sms} onCheckedChange={(c) => setPrefs((p: any) => ({ ...p, sms: c }))} />
                      </div>
                      <div className="flex items-center justify-between border rounded-lg p-3 col-span-2">
                        <Label className="mr-2">{t("channel.whatsapp")}</Label>
                        <Switch checked={prefs.whatsapp} onCheckedChange={(c) => setPrefs((p: any) => ({ ...p, whatsapp: c }))} />
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Alerts will trigger when predicted risk exceeds your threshold.
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <LanguageSwitcher className="w-32 h-8" />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="reports">Live Reports</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="alerts">Alert System</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 animate-fade-in">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="hover:shadow-lg transition-all duration-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,234</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Hazards</CardTitle>
                  <MapPin className="h-4 w-4 text-destructive" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-destructive">23</div>
                  <p className="text-xs text-muted-foreground">High priority: 8</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Citizens</CardTitle>
                  <Users className="h-4 w-4 text-success" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-success">8,921</div>
                  <p className="text-xs text-muted-foreground">+5% this week</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Trust Score</CardTitle>
                  <TrendingUp className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">87%</div>
                  <p className="text-xs text-muted-foreground">Quality improving</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Reports */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Recent Reports
                </CardTitle>
                <CardDescription>
                  Latest hazard reports requiring attention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockReports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <AlertTriangle className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{report.type}</span>
                            <Badge variant={getSeverityColor(report.severity) as any}>{report.severity}</Badge>
                            <Badge variant={getStatusColor(report.status) as any}>{report.status}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{report.location} • {report.timestamp}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm font-medium">Trust Score</div>
                          <div className="text-lg font-bold text-primary">{report.trustScore}%</div>
                        </div>
                        <Button size="sm" variant="outline">View Details</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>Live Hazard Map</CardTitle>
                <CardDescription>
                  Real-time coastal hazard monitoring across all regions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg border-2 border-dashed border-primary/20 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Interactive Map View</h3>
                    <p className="text-muted-foreground">Mapbox integration will show live hazard locations with severity markers</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t("dashboard.next24hRisk")}</CardTitle>
                  <CardDescription>{t("dashboard.next24hRisk.desc")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      risk: { label: "Risk", color: "hsl(var(--destructive))" },
                      tide: { label: "Tide (m)", color: "hsl(var(--primary))" },
                    }}
                    className="h-64"
                  >
                    <AreaChart data={forecastData} margin={{ left: 6, right: 6, top: 8, bottom: 0 }}>
                      <defs>
                        <linearGradient id="riskFill" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.35} />
                          <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0.05} />
                        </linearGradient>
                        <linearGradient id="tideFill" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.25} />
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.05} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" tickLine={false} axisLine={false} />
                      <YAxis yAxisId="left" orientation="left" tickLine={false} axisLine={false} domain={[0, 100]} />
                      <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} allowDecimals domain={[0, 'dataMax + 0.5']} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area type="monotone" dataKey="risk" yAxisId="left" stroke="hsl(var(--destructive))" fill="url(#riskFill)" strokeWidth={2} />
                      <Area type="monotone" dataKey="tide" yAxisId="right" stroke="hsl(var(--primary))" fill="url(#tideFill)" strokeWidth={2} />
                      {/* Threshold reference line via styled area */}
                    </AreaChart>
                  </ChartContainer>
                  <div className="text-xs text-muted-foreground mt-2">Threshold: {prefs.threshold}% • Channels: {[
                    prefs.push && 'Push',
                    prefs.sms && 'SMS',
                    prefs.whatsapp && 'WhatsApp',
                  ].filter(Boolean).join(', ') || 'None'}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Trust Score Distribution</CardTitle>
                  <CardDescription>Quality of citizen reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-br from-success/5 to-success/10 rounded-lg border-2 border-dashed border-success/20 flex items-center justify-center">
                    <div className="text-center">
                      <Shield className="w-12 h-12 text-success mx-auto mb-4" />
                      <p className="text-muted-foreground">Trust score analytics and distribution charts</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="alerts" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Emergency Alert System
                </CardTitle>
                <CardDescription>
                  Broadcast alerts to citizens and manage emergency communications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Button className="bg-destructive hover:bg-destructive/90">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Critical Alert
                  </Button>
                    <Button variant="outline" className="border-warning text-warning hover:bg-warning hover:text-warning-foreground">
                      <Bell className="w-4 h-4 mr-2" />
                      General Alert
                    </Button>
                  <Button variant="outline">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    All Clear
                  </Button>
                </div>
                
                <div className="p-4 border rounded-lg bg-muted/50">
                  <h4 className="font-medium mb-2">Recent Alerts</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-destructive">
                      <Clock className="w-4 h-4" />
                      <span>High tide warning - Marina Bay (30 min ago)</span>
                    </div>
                    <div className="flex items-center gap-2 text-warning">
                      <Clock className="w-4 h-4" />
                      <span>Coastal flooding risk - East Coast (2 hours ago)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;