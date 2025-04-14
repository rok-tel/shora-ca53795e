
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, Bell } from "lucide-react";
import { useState, useEffect } from "react";

const WhatsAppSection = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();

  // Prevent hydration mismatch by only rendering after client-side mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This is where you would integrate with your WhatsApp service
    toast({
      title: "Success!",
      description: "You'll receive WhatsApp notifications for your selected stocks.",
    });
  };

  // Return null during server-side rendering and initial client render
  if (!isMounted) {
    return <div className="py-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg" />;
  }

  return (
    <section className="py-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <MessageSquare className="w-10 h-10 text-green-500 mr-2" />
            <Bell className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Instant Stock Alerts via WhatsApp</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Get real-time WhatsApp notifications for your selected stocks. Stay informed about price changes, market trends, and important updates.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="max-w-sm mx-auto">
              <Input
                type="tel"
                placeholder="Enter your WhatsApp number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="mb-4"
              />
              <Button type="submit" className="w-full bg-green-500 hover:bg-green-600">
                <MessageSquare className="w-4 h-4 mr-2" />
                Activate WhatsApp Alerts
              </Button>
            </div>
          </form>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-4">
              <h3 className="font-semibold mb-2">Instant Updates</h3>
              <p className="text-gray-600 dark:text-gray-400">Receive notifications within seconds of significant stock movements</p>
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-2">Customizable Alerts</h3>
              <p className="text-gray-600 dark:text-gray-400">Set your own price thresholds and notification preferences</p>
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-2">Easy Setup</h3>
              <p className="text-gray-600 dark:text-gray-400">Start receiving alerts with just your WhatsApp number</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsAppSection;
