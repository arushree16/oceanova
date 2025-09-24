import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useI18n } from "@/i18n";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Link } from "react-router-dom";
import { 
  Camera, 
  MapPin, 
  AlertTriangle, 
  Upload, 
  Mic, 
  Shield, 
  Bell,
  Phone,
  Navigation,
  Eye,
  Clock,
  CheckCircle,
  FileText,
  Users,
  BookOpen
} from "lucide-react";

const CitizenApp = () => {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState("report");
  const [isRecording, setIsRecording] = useState(false);
  const [sosMode, setSosMode] = useState(false);

  const hazardTypes = [
    "Coastal Flooding",
    "Storm Surge", 
    "Coastal Erosion",
    "High Waves",
    "Debris Accumulation",
    "Oil Spill",
    "Marine Life Distress",
    "Infrastructure Damage",
    "Other"
  ];

  const myReports = [
    {
      id: 1,
      type: "Coastal Flooding",
      location: "Marina Bay Sands",
      status: "verified",
      trustScore: 92,
      timestamp: "2 hours ago",
      severity: "High"
    },
    {
      id: 2,
      type: "Debris Accumulation", 
      location: "East Coast Park",
      status: "pending",
      trustScore: 78,
      timestamp: "1 day ago",
      severity: "Medium"
    }
  ];

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
                <p className="text-sm text-muted-foreground">{t("citizen.title")}</p>
              </div>
            </Link>
            
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant={sosMode ? "destructive" : "outline"}
                onClick={() => setSosMode(!sosMode)}
                className={sosMode ? "animate-pulse-glow" : ""}
              >
                <Phone className="w-4 h-4 mr-2" />
                {sosMode ? "SOS ACTIVE" : "SOS"}
              </Button>
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <LanguageSwitcher className="w-28 h-8" />
            </div>
          </div>
        </div>
      </header>

      {/* SOS Banner */}
      {sosMode && (
        <div className="bg-destructive text-destructive-foreground p-4 animate-pulse-glow">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5" />
                <span className="font-medium">EMERGENCY MODE ACTIVE - Broadcasting location to authorities</span>
              </div>
              <Button variant="secondary" size="sm" onClick={() => setSosMode(false)}>
                Stop SOS
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="report">Report</TabsTrigger>
            <TabsTrigger value="map">Map View</TabsTrigger>
            <TabsTrigger value="my-reports">My Reports</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="learn">Learn</TabsTrigger>
          </TabsList>

          <TabsContent value="report" className="space-y-6 animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  {t("citizen.reportHazard")}
                </CardTitle>
                <CardDescription>
                  {t("citizen.description")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Quick Report Buttons */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  <Button variant="outline" className="h-auto p-4 flex-col gap-2">
                    <Camera className="w-6 h-6" />
                    <span className="text-xs">Photo Report</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex-col gap-2">
                    <Mic className={`w-6 h-6 ${isRecording ? 'text-destructive' : ''}`} />
                    <span className="text-xs">Voice Report</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex-col gap-2">
                    <FileText className="w-6 h-6" />
                    <span className="text-xs">Text Report</span>
                  </Button>
                </div>

                {/* Report Form */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">{t("citizen.hazardType")}</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder={t("citizen.hazardType")} />
                      </SelectTrigger>
                      <SelectContent>
                        {hazardTypes.map((type) => (
                          <SelectItem key={type} value={type.toLowerCase().replace(' ', '-')}> 
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">{t("citizen.location")}</label>
                    <div className="flex gap-2">
                      <Input placeholder={t("citizen.location")} className="flex-1" />
                      <Button variant="outline" size="icon">
                        <Navigation className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">{t("citizen.descriptionLabel")}</label>
                    <Textarea 
                      placeholder={t("citizen.descriptionPlaceholder")}
                      className="min-h-24"
                    />
                  </div>

                  <div className="border-2 border-dashed border-primary/20 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">
                      {t("citizen.uploadHint")}
                    </p>
                    <Button variant="outline" size="sm">Choose Files</Button>
                  </div>

                  <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                    <Shield className="w-5 h-5 text-success" />
                    <div className="text-sm">
                      <strong>Privacy Protected:</strong> AI automatically blurs faces, license plates, and sensitive information
                    </div>
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary/90" size="lg">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    {t("citizen.submit")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="map" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Live Hazard Map
                </CardTitle>
                <CardDescription>
                  View real-time coastal hazards in your area
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg border-2 border-dashed border-primary/20 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Interactive Hazard Map</h3>
                    <p className="text-muted-foreground">Real-time coastal hazard locations with trust scores and severity levels</p>
                    <div className="flex justify-center gap-2 mt-4">
                      <Badge variant="destructive">High Risk</Badge>
                      <Badge variant="warning">Medium Risk</Badge>
                      <Badge variant="secondary">Low Risk</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="my-reports" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  My Reports
                </CardTitle>
                <CardDescription>
                  Track the status and trust scores of your submitted reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myReports.map((report) => (
                    <div key={report.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <AlertTriangle className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">{report.type}</span>
                              <Badge variant={getStatusColor(report.status) as any}>{report.status}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{report.location} • {report.timestamp}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">Trust Score</div>
                          <div className="text-lg font-bold text-primary">{report.trustScore}%</div>
                        </div>
                      </div>
                      
                      {report.status === "verified" && (
                        <div className="mt-3 p-2 bg-success/10 border border-success/20 rounded">
                          <div className="flex items-center gap-2 text-success text-sm">
                            <CheckCircle className="w-4 h-4" />
                            <span>Verified by AI trust system and crowd validation</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="animate-fade-in">
            <div className="space-y-4">
              <Card className="border-destructive/50 bg-destructive/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-destructive">
                    <AlertTriangle className="w-5 h-5" />
                    Critical Alert
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-3">
                    <strong>High Tide Warning:</strong> Marina Bay area - Expected water levels 2.1m above mean sea level at 15:30 today
                  </p>
                  <div className="flex gap-2">
                    <Button variant="destructive" size="sm">View Details</Button>
                    <Button variant="outline" size="sm">Share</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Recent Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 border rounded">
                      <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">Coastal Flooding Risk - East Coast</p>
                        <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 border rounded">
                      <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">All Clear - Sentosa Beaches</p>
                        <p className="text-xs text-muted-foreground mt-1">4 hours ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="learn" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Preparedness Guide
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="w-4 h-4 mr-2" />
                      Coastal Flood Safety
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="w-4 h-4 mr-2" />
                      Emergency Evacuation Routes
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="w-4 h-4 mr-2" />
                      First Aid Basics
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="w-4 h-4 mr-2" />
                      Emergency Kit Checklist
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Community
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Shield className="w-4 h-4 mr-2" />
                      Become a Volunteer
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="w-4 h-4 mr-2" />
                      Local Response Teams
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Bell className="w-4 h-4 mr-2" />
                      Training Programs
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CitizenApp;