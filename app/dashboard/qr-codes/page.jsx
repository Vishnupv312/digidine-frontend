"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { QrCode, Download, Share2, Eye, RefreshCw } from "lucide-react";
import axios from "axios";
import Image from "next/image";

export default function QRCodes() {
  const [apiStatus, setApiStatus] = useState(null); // null = loading, 0 = no QR, 1 = has QR
  const [qrCodeData, setQrCodeData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const [formData, setFormData] = useState({
    foregroundColor: "#205781",
    backgroundColor: "#FFFFFF",
    size: 300,
    cornerRadius: 0,
  });

  // Simulate API call to check QR code status
  useEffect(() => {
    const fetchQRStatus = async () => {
      try {
        // Simulate API call
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}api/qr-code/fetch`,
          {
            withCredentials: true,
          }
        );

        // Simulate API response - change this to test different scenarios

        console.log("response is ", response);
        if (response.data.status == 1) {
          setQrCodeData({
            name: response.data.restaurant,
            slug: `${process.env.NEXT_PUBLIC_BASE_URL}menu/${response.data.data.slugUrl}`,
            url: `${response.data.data.qrImageUrl}`,
            foregroundColor: "#205781",
            backgroundColor: "#FFFFFF",
            size: 300,
          });
        }

        setApiStatus(1);
      } catch (error) {
        console.log("Error fetching QR status:", error.response.data.status);
        setApiStatus(0); // Default to no QR code on error
      }
    };

    fetchQRStatus();
  }, []);

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenerateQR = async (e) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      const payload = formData;
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/qr-code/generate`,
        payload,
        { withCredentials: true }
      );

      const qr = response.data.data;

      const newQRCode = {
        name: qr.restaurant,
        url: `${process.env.NEXT_PUBLIC_BASE_URL}${qr.qrImageUrl}`, // complete image URL
        scans: qr.scanCount,
        created: qr.createdAt,
        foregroundColor: qr.foregroundColor || formData.foregroundColor,
        backgroundColor: qr.backgroundColor || formData.backgroundColor,
        size: formData.size,
      };

      setQrCodeData(newQRCode);
      setApiStatus(1);
      alert("QR Code generated successfully!");
    } catch (error) {
      console.log("Error generating QR code:", error);
      alert("Failed to generate QR code. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {
    if (!qrCodeData?.url) return;

    try {
      const response = await fetch(qrCodeData.url);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;

      const timestamp = new Date().toISOString().split("T")[0];
      const filename = `${qrCodeData.name || "qr-code"}-${timestamp}.png`;

      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download QR code. Please try again.");
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Hey checkout this Menu QR of ${qrCodeData.slug} `,
        text: "Scan this QR code to view our menu",
        url: qrCodeData?.url,
      });
    } else {
      navigator.clipboard.writeText(qrCodeData?.url);
      alert("QR Code URL copied to clipboard!");
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Loading state
  if (apiStatus === null) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-500">Loading QR code status...</p>
        </div>
      </div>
    );
  }

  // Existing QR Code View (API Status = 1)
  if (apiStatus === 1 && qrCodeData) {
    return (
      <motion.div initial="hidden" animate="visible" variants={fadeIn}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Your QR Code</h1>
            <p className="text-muted-foreground">
              Your restaurant's QR code is ready to use.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>QR Code Preview</CardTitle>
              <CardDescription>
                Scan this code to view your restaurant menu
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div
                className="w-64 h-64 flex items-center justify-center mb-6 rounded-lg border-2 border-dashed border-gray-200"
                style={{ backgroundColor: `${qrCodeData.foregroundColor}10` }}
              >
                <Image
                  src={qrCodeData.url}
                  height={500}
                  width={300}
                  alt="qr"
                  objectFit="contain"
                  objectPosition="center"
                />
              </div>
              <div className="w-full text-center space-y-2">
                <p className="text-sm text-gray-500 break-all">
                  {qrCodeData.slug}
                </p>
                <Badge variant="secondary" className="text-sm">
                  <Eye className="w-3 h-3 mr-1" />
                  {qrCodeData.scans} scans
                </Badge>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center gap-4">
              <Button onClick={handleDownload} className="flex-1">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button
                variant="outline"
                onClick={handleShare}
                className="flex-1"
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>QR Code Details</CardTitle>
              <CardDescription>Information about your QR code</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Created
                  </Label>
                  <p className="text-sm">
                    {new Date(qrCodeData.created).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Total Scans
                  </Label>
                  <p className="text-sm font-semibold">{qrCodeData.scans}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Foreground Color
                  </Label>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded border"
                      style={{ backgroundColor: qrCodeData.foregroundColor }}
                    ></div>
                    <p className="text-sm">{qrCodeData.foregroundColor}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Background Color
                  </Label>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded border"
                      style={{ backgroundColor: qrCodeData.backgroundColor }}
                    ></div>
                    <p className="text-sm">{qrCodeData.backgroundColor}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-2">Usage Tips</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Place QR codes on tables for easy access</li>
                  <li>• Ensure good lighting for scanning</li>
                  <li>• Print at minimum 2x2 cm size</li>
                  <li>• Test scanning before printing</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    );
  }

  // Generate QR Code Form (API Status = 0)
  return (
    <motion.div initial="hidden" animate="visible" variants={fadeIn}>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Generate QR Code
          </h1>
          <p className="text-muted-foreground">
            Create a QR code for your restaurant menu.
          </p>
        </div>
      </div>

      <form onSubmit={handleGenerateQR}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>QR Code Design</CardTitle>
                <CardDescription>
                  Customize the appearance of your QR code
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="colors" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="colors">Colors</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced</TabsTrigger>
                  </TabsList>

                  <TabsContent value="colors" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="foregroundColor">Foreground Color</Label>
                      <div className="flex gap-2">
                        <div
                          className="w-10 h-10 rounded-md border cursor-pointer"
                          style={{ backgroundColor: formData.foregroundColor }}
                          onClick={() =>
                            document
                              .getElementById("foregroundColorPicker")
                              .click()
                          }
                        ></div>
                        <Input
                          id="foregroundColorPicker"
                          type="color"
                          value={formData.foregroundColor}
                          onChange={(e) =>
                            handleInputChange("foregroundColor", e.target.value)
                          }
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="backgroundColor">Background Color</Label>
                      <div className="flex gap-2">
                        <div
                          className="w-10 h-10 rounded-md border cursor-pointer"
                          style={{ backgroundColor: formData.backgroundColor }}
                          onClick={() =>
                            document
                              .getElementById("backgroundColorPicker")
                              .click()
                          }
                        ></div>
                        <Input
                          id="backgroundColorPicker"
                          type="color"
                          value={formData.backgroundColor}
                          onChange={(e) =>
                            handleInputChange("backgroundColor", e.target.value)
                          }
                          className="w-full"
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="advanced" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label>Size</Label>
                      <Slider
                        value={[formData.size]}
                        min={200}
                        max={500}
                        step={10}
                        onValueChange={(value) =>
                          handleInputChange("size", value[0])
                        }
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Small (200px)</span>
                        <span>Large (500px)</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Corner Radius</Label>
                      <Slider
                        value={[formData.cornerRadius]}
                        min={0}
                        max={20}
                        step={1}
                        onValueChange={(value) =>
                          handleInputChange("cornerRadius", value[0])
                        }
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Square</span>
                        <span>Rounded</span>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          <div className="flex justify-end gap-4 mt-8">
            <Button
              type="submit"
              disabled={isGenerating}
              className="min-w-[150px]"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <QrCode className="mr-2 h-4 w-4" />
                  Generate QR Code
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </motion.div>
  );
}
