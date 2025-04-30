"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft, Download, QrCode, Share2 } from "lucide-react"

export default function NewQRCode() {
  const [formData, setFormData] = useState({
    name: "",
    menuType: "full",
    customUrl: "",
    foregroundColor: "#205781",
    backgroundColor: "#FFFFFF",
    cornerRadius: 0,
    logoEnabled: false,
    size: 300,
  })

  const [activeTab, setActiveTab] = useState("design")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSliderChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value[0],
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real application, you would send this data to your backend
    console.log("Form submitted:", formData)
    // Redirect to QR codes page after successful submission
    window.location.href = "/dashboard/qr-codes"
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard/qr-codes">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Generate QR Code</h1>
          <p className="text-muted-foreground">Create a new QR code for your restaurant's menu</p>
        </div>
      </div>

      <motion.div initial="hidden" animate="visible" variants={fadeIn}>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>QR Code Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">QR Code Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="e.g. Main Menu QR Code"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="menuType">Menu Type</Label>
                    <Select value={formData.menuType} onValueChange={(value) => handleSelectChange("menuType", value)}>
                      <SelectTrigger id="menuType">
                        <SelectValue placeholder="Select menu type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full">Full Menu</SelectItem>
                        <SelectItem value="lunch">Lunch Menu</SelectItem>
                        <SelectItem value="dinner">Dinner Menu</SelectItem>
                        <SelectItem value="drinks">Drinks Menu</SelectItem>
                        <SelectItem value="desserts">Desserts Menu</SelectItem>
                        <SelectItem value="custom">Custom URL</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.menuType === "custom" && (
                    <div className="space-y-2">
                      <Label htmlFor="customUrl">Custom URL</Label>
                      <Input
                        id="customUrl"
                        name="customUrl"
                        placeholder="https://example.com/your-custom-menu"
                        value={formData.customUrl}
                        onChange={handleChange}
                        required={formData.menuType === "custom"}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>QR Code Design</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="design" onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger value="design">Design</TabsTrigger>
                      <TabsTrigger value="advanced">Advanced</TabsTrigger>
                    </TabsList>
                    <TabsContent value="design" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="foregroundColor">Foreground Color</Label>
                        <div className="flex gap-2">
                          <div
                            className="w-10 h-10 rounded-md border"
                            style={{ backgroundColor: formData.foregroundColor }}
                          ></div>
                          <Input
                            id="foregroundColor"
                            name="foregroundColor"
                            type="color"
                            value={formData.foregroundColor}
                            onChange={handleChange}
                            className="w-full"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="backgroundColor">Background Color</Label>
                        <div className="flex gap-2">
                          <div
                            className="w-10 h-10 rounded-md border"
                            style={{ backgroundColor: formData.backgroundColor }}
                          ></div>
                          <Input
                            id="backgroundColor"
                            name="backgroundColor"
                            type="color"
                            value={formData.backgroundColor}
                            onChange={handleChange}
                            className="w-full"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Size</Label>
                        <div className="pt-2">
                          <Slider
                            defaultValue={[formData.size]}
                            min={100}
                            max={500}
                            step={10}
                            onValueChange={(value) => handleSliderChange("size", value)}
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>Small</span>
                            <span>Medium</span>
                            <span>Large</span>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="advanced" className="space-y-4">
                      <div className="space-y-2">
                        <Label>Corner Radius</Label>
                        <div className="pt-2">
                          <Slider
                            defaultValue={[formData.cornerRadius]}
                            min={0}
                            max={50}
                            step={5}
                            onValueChange={(value) => handleSliderChange("cornerRadius", value)}
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>Square</span>
                            <span>Rounded</span>
                            <span>Circle</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Additional Settings</Label>
                        <p className="text-sm text-gray-500">
                          More advanced customization options will be available in future updates.
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <div
                    className="w-64 h-64 flex items-center justify-center mb-4 rounded-lg"
                    style={{ backgroundColor: `${formData.foregroundColor}20` }}
                  >
                    <QrCode
                      size={formData.size / 2}
                      color={formData.foregroundColor}
                      className="rounded-lg"
                      style={{ borderRadius: `${formData.cornerRadius}px` }}
                    />
                  </div>
                  <div className="w-full text-center">
                    <p className="text-sm text-gray-500 truncate mb-2">
                      {formData.menuType === "custom"
                        ? formData.customUrl
                        : `https://digidine.com/menu/your-restaurant/${formData.menuType}`}
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" disabled>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-1">How to use your QR code</h3>
                    <p className="text-sm text-gray-500">
                      After generating your QR code, you can download it and print it for display in your restaurant.
                      Place it on tables, at the entrance, or include it in your marketing materials.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">QR code best practices</h3>
                    <ul className="text-sm text-gray-500 list-disc pl-5 space-y-1">
                      <li>Ensure your QR code has sufficient contrast</li>
                      <li>Print at a size of at least 2 x 2 cm (0.8 x 0.8 in)</li>
                      <li>Test your QR code before distributing it</li>
                      <li>Include a call-to-action near the QR code</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-8">
            <Link href="/dashboard/qr-codes">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button type="submit">Generate QR Code</Button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
