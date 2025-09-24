import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/i18n";
import { Bot, MessageCircle, Send, X } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

function useMockResponder(locale: "en" | "hi") {
  return (text: string) => {
    const q = text.toLowerCase();
    const respond = (en: string, hi: string) => (locale === "hi" ? hi : en);

    if (q.includes("risk") || q.includes("flood") || q.includes("tide")) {
      return respond(
        "Current coastal risk is moderate. Forecast shows peaks around high tide in ~6 hours. Keep an eye on alerts.",
        "वर्तमान तटीय जोखिम मध्यम है। पूर्वानुमान ~6 घंटे में हाई टाइड के आसपास बढ़त दिखाता है। अलर्ट पर ध्यान रखें।"
      );
    }
    if (q.includes("report") || q.includes("hazard") || q.includes("photo")) {
      return respond(
        "Go to Citizen Reporter → Report tab. Add type, location, description, and upload photos/videos, then Submit.",
        "सिटिजन रिपोर्टर → रिपोर्ट टैब में जाएँ। प्रकार, स्थान, विवरण जोड़ें और फोटो/वीडियो अपलोड कर सबमिट करें।"
      );
    }
    if (q.includes("dashboard") || q.includes("analytics") || q.includes("alert")) {
      return respond(
        "Open Dashboard → use tabs for Overview, Reports, Analytics, and Alerts. You can adjust Alert Preferences in the header.",
        "डैशबोर्ड खोलें → ओवरव्यू, रिपोर्ट्स, एनालिटिक्स और अलर्ट के टैब देखें। हेडर में अलर्ट प्राथमिकताएँ बदली जा सकती हैं।"
      );
    }
    if (q.includes("language") || q.includes("hindi") || q.includes("english")) {
      return respond(
        "Use the language dropdown in the header to switch between English and Hindi.",
        "हेडर में भाषा ड्रॉपडाउन से अंग्रेज़ी और हिंदी के बीच स्विच करें।"
      );
    }
    return respond(
      "I can help with reports, alerts, analytics, and navigation. Ask me about risk forecast or how to submit a report.",
      "मैं रिपोर्ट, अलर्ट, एनालिटिक्स और नेविगेशन में मदद कर सकता/सकती हूँ। मुझसे जोखिम पूर्वानुमान या रिपोर्ट सबमिट करने के बारे में पूछें।"
    );
  };
}

export default function Chatbot() {
  const { t, locale } = useI18n();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem("chatbot_msgs");
    return saved ? JSON.parse(saved) : [];
  });
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const reply = useMockResponder(locale);

  useEffect(() => {
    localStorage.setItem("chatbot_msgs", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    const userMsg: Message = { role: "user", content: text };
    setMessages((m) => [...m, userMsg]);
    // mock assistant response
    setTimeout(() => {
      const assistantMsg: Message = { role: "assistant", content: reply(text) };
      setMessages((m) => [...m, assistantMsg]);
    }, 300);
  };

  const title = locale === "hi" ? "सहायक" : "Assistant";

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button size="lg" className="rounded-full shadow-lg h-12 w-12 p-0">
            <MessageCircle className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="p-0 sm:max-w-md w-[92vw]">
          <SheetHeader className="px-4 py-3 border-b bg-card/80 backdrop-blur">
            <SheetTitle className="flex items-center gap-2">
              <Bot className="w-4 h-4" /> {title}
              <Badge variant="secondary" className="ml-2">Beta</Badge>
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col h-full">
            <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-3">
                {messages.length === 0 && (
                  <div className="text-sm text-muted-foreground">
                    {locale === "hi"
                      ? "नमस्ते! मैं रिपोर्टिंग, अलर्ट और एनालिटिक्स में मदद कर सकता/सकती हूँ।"
                      : "Hi! I can help with reporting, alerts and analytics."}
                  </div>
                )}
                {messages.map((m, idx) => (
                  <div key={idx} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-lg px-3 py-2 text-sm border ${
                        m.role === "user" ? "bg-primary text-primary-foreground border-primary" : "bg-muted border-border"
                      }`}
                    >
                      {m.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-3 border-t bg-background/80 backdrop-blur">
              <div className="flex gap-2">
                <Input
                  placeholder={locale === "hi" ? "अपना संदेश लिखें..." : "Type your message..."}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                />
                <Button onClick={handleSend} className="shrink-0" aria-label="Send">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
