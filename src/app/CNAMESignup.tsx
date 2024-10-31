"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Settings } from "lucide-react";
import React, { useState } from "react";

export default function CNAMESignup() {
  const [domain, setDomain] = useState("example.com");

  const cnameKey = `_acme-challenge.${domain}`;
  const cnameValue = `${domain}.1713250923c52146.dcv.cloudflare.com`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        // You could add a toast notification here
        console.log("Copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };
  return (
    <div className="flex justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <Settings className="h-12 w-12 text-green-600 mb-4 mx-auto" />
        <h4 className="text-xl font-bold mb-2 text-center">
          Quick CNAME Setup
        </h4>
        <p className="text-gray-600 mb-4 text-center">
          Enter your domain to generate your CNAME record:
        </p>
        <Input
          type="text"
          placeholder="example.com"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          className="mb-4"
        />
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded flex justify-between items-center">
            <code className="text-sm break-all">{cnameKey}</code>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => copyToClipboard(cnameKey)}
              title="Copy CNAME key"
            >
              <Copy className="h-4 w-4" />
              <span className="sr-only">Copy CNAME key</span>
            </Button>
          </div>
          <div className="bg-gray-100 p-4 rounded flex justify-between items-center">
            <code className="text-sm break-all">{cnameValue}</code>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => copyToClipboard(cnameValue)}
              title="Copy CNAME value"
            >
              <Copy className="h-4 w-4" />
              <span className="sr-only">Copy CNAME value</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
