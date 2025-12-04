"use client";

import { useState } from "react";
import { X, Zap, Sparkles, Users, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CREDIT_PACKS, type CreditPackId } from "@/lib/stripe/config";

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const packIcons = {
  starter: Zap,
  pro: Sparkles,
  team: Users,
};

export function PricingModal({ isOpen, onClose }: PricingModalProps) {
  const [loading, setLoading] = useState<CreditPackId | null>(null);

  if (!isOpen) return null;

  const handlePurchase = async (packId: CreditPackId) => {
    setLoading(packId);

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packId }),
      });

      const { url, error } = await response.json();

      if (error) {
        alert(error);
        return;
      }

      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to start checkout");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-background rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold">Get Credits</h2>
            <p className="text-sm text-muted-foreground">
              Choose a credit pack to continue generating dashboards
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6 grid sm:grid-cols-3 gap-4">
          {(Object.entries(CREDIT_PACKS) as [CreditPackId, typeof CREDIT_PACKS[CreditPackId]][]).map(
            ([id, pack]) => {
              const Icon = packIcons[id];
              const isPopular = id === "pro";

              return (
                <Card
                  key={id}
                  className={isPopular ? "border-primary shadow-lg" : ""}
                >
                  {isPopular && (
                    <div className="bg-primary text-primary-foreground text-xs font-medium text-center py-1 rounded-t-xl">
                      Most Popular
                    </div>
                  )}
                  <CardHeader className="text-center pb-2">
                    <div className="mx-auto mb-2 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{pack.name}</CardTitle>
                    <CardDescription>{pack.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="mb-4">
                      <span className="text-3xl font-bold">
                        ${pack.priceCents / 100}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground mb-4">
                      {pack.credits} credits
                      <br />
                      <span className="text-xs">
                        ${(pack.priceCents / 100 / pack.credits).toFixed(2)} per generation
                      </span>
                    </div>
                    <Button
                      onClick={() => handlePurchase(id)}
                      disabled={loading !== null}
                      className="w-full"
                      variant={isPopular ? "default" : "outline"}
                    >
                      {loading === id ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        "Buy Now"
                      )}
                    </Button>
                  </CardContent>
                </Card>
              );
            }
          )}
        </div>

        <div className="px-6 pb-6 text-center text-xs text-muted-foreground">
          Secure payment powered by Stripe. Credits never expire.
        </div>
      </div>
    </div>
  );
}
