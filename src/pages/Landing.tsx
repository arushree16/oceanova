import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useI18n } from "@/i18n";
import { 
  Shield, 
  Users, 
  MapPin, 
  AlertTriangle, 
  TrendingUp,
  Bell,
  Camera,
  Mic,
  Brain,
  Globe,
  Phone,
  BookOpen,
  ArrowRight
} from "lucide-react";

const Landing = () => {
  const { t } = useI18n();
  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI Trust Scoring",
      description: "Advanced AI analyzes reports for credibility with transparent reasoning"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Rumor Detection",
      description: "Intelligent scanning prevents misinformation and panic-inducing posts"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Crowd Verification",
      description: "Community validation system for faster, more accurate hazard confirmation"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Predictive Modeling",
      description: "Forecast risks using historical data, sensors, and weather patterns"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "SOS Emergency Mode",
      description: "One-tap emergency broadcasting with live location to authorities"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Multi-language Support",
      description: "Voice reporting and interface in multiple local languages"
    }
  ];

  const stats = [
    { value: "50K+", label: "Active Citizens", icon: <Users className="w-5 h-5" /> },
    { value: "1.2M+", label: "Reports Processed", icon: <AlertTriangle className="w-5 h-5" /> },
    { value: "95%", label: "Accuracy Rate", icon: <Shield className="w-5 h-5" /> },
    { value: "24/7", label: "Monitoring", icon: <Bell className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-primary/5">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary-glow/10"></div>
        <div className="container mx-auto px-4 py-20 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-2xl flex items-center justify-center animate-pulse-glow">
                <Shield className="w-8 h-8 text-primary-foreground" />
              </div>
              <div className="text-left">
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  {t("app.name")}
                </h1>
                <p className="text-lg text-muted-foreground">Coastal Hazard Intelligence</p>
              </div>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
              AI-Powered Coastal Hazard Monitoring & Community Safety
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Empowering communities with real-time coastal hazard intelligence, AI-verified reporting, 
              and predictive analytics for safer coastal living.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">
                <Link to="/citizen">
                  <span className="inline-flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    {t("landing.citizenReporter")}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </span>
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 border-primary text-primary hover:bg-primary/10">
                <Link to="/dashboard">
                  <span className="inline-flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    {t("landing.officialDashboard")}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </span>
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-200 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      {stat.icon}
                      <span className="text-2xl font-bold text-primary">{stat.value}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-transparent to-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Core Features</Badge>
            <h3 className="text-3xl font-bold mb-4">Advanced Coastal Intelligence</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Cutting-edge AI and community-driven technology for comprehensive coastal hazard management
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-200 hover:scale-105 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-3">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">How It Works</Badge>
            <h3 className="text-3xl font-bold mb-4">Simple, Smart, Secure</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold mb-2">1. Report</h4>
              <p className="text-muted-foreground">
                Citizens capture hazards via photo, video, or voice. AI automatically protects privacy.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold mb-2">2. Verify</h4>
              <p className="text-muted-foreground">
                AI analyzes authenticity while crowd verification ensures accuracy and prevents misinformation.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold mb-2">3. Alert</h4>
              <p className="text-muted-foreground">
                Officials broadcast targeted alerts while predictive models forecast future risks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/5 to-primary-glow/5">
        <div className="container mx-auto px-4">
          <Card className="max-w-3xl mx-auto text-center border-primary/20">
            <CardContent className="pt-8">
              <Shield className="w-16 h-16 text-primary mx-auto mb-6" />
              <h3 className="text-3xl font-bold mb-4">Ready to Protect Your Coast?</h3>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of citizens and officials already using Oceanova for smarter coastal safety.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <Link to="/citizen">
                    <span className="inline-flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      {t("landing.startReporting")}
                    </span>
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Learn More
                </Button>
              </div>

              <div className="flex items-center justify-center gap-6 mt-8 pt-6 border-t">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="w-4 h-4 text-success" />
                  <span>Privacy Protected</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Globe className="w-4 h-4 text-success" />
                  <span>Multi-language</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Bell className="w-4 h-4 text-success" />
                  <span>24/7 Monitoring</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Landing;