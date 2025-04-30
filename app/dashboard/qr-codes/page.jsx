"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Download, Share2, MoreVertical, Edit, Trash, QrCode, Copy } from "lucide-react"

export default function QRCodes() {
  // Sample QR codes data
  const initialQRCodes = [
    {
      id: 1,
      name: "Main Menu",
      url: "https://digidine.com/menu/johns-restaurant",
      scans: 1245,
      created: "2023-06-15",
      color: "#205781",
    },
    {
      id: 2,
      name: "Lunch Specials",
      url: "https://digidine.com/menu/johns-restaurant/lunch",
      scans: 856,
      created: "2023-07-02",
      color: "#4f959d",
    },
    {
      id: 3,
      name: "Dinner Menu",
      url: "https://digidine.com/menu/johns-restaurant/dinner",
      scans: 932,
      created: "2023-07-10",
      color: "#98d2c0",
    },
    {
      id: 4,
      name: "Desserts",
      url: "https://digidine.com/menu/johns-restaurant/desserts",
      scans: 421,
      created: "2023-08-05",
      color: "#205781",
    },
    {
      id: 5,
      name: "Drinks Menu",
      url: "https://digidine.com/menu/johns-restaurant/drinks",
      scans: 678,
      created: "2023-08-20",
      color: "#4f959d",
    },
    {
      id: 6,
      name: "Weekend Brunch",
      url: "https://digidine.com/menu/johns-restaurant/brunch",
      scans: 345,
      created: "2023-09-01",
      color: "#98d2c0",
    },
  ]

  const [qrCodes, setQRCodes] = useState(initialQRCodes)
  const [searchTerm, setSearchTerm] = useState("")

  // Filter QR codes based on search term
  const filteredQRCodes = qrCodes.filter((qrCode) => {
    return qrCode.name.toLowerCase().includes(searchTerm.toLowerCase())
  })

  // Delete QR code
  const deleteQRCode = (id) => {
    if (confirm("Are you sure you want to delete this QR code?")) {
      setQRCodes(qrCodes.filter((qrCode) => qrCode.id !== id))
    }
  }

  // Copy URL to clipboard
  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url)
    alert("URL copied to clipboard!")
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">QR Codes</h1>
          <p className="text-muted-foreground">Generate and manage QR codes for your restaurant menus.</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Link href="/dashboard/qr-codes/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Generate New QR Code
            </Button>
          </Link>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search QR codes..."
            className="pl-8 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredQRCodes.map((qrCode, index) => (
          <motion.div key={qrCode.id} variants={fadeIn}>
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle>{qrCode.name}</CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Link href={`/dashboard/qr-codes/${qrCode.id}/edit`} className="flex w-full items-center">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => copyToClipboard(qrCode.url)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy URL
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600" onClick={() => deleteQRCode(qrCode.id)}>
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardDescription>Created on {new Date(qrCode.created).toLocaleDateString()}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div
                  className="w-40 h-40 flex items-center justify-center mb-4 rounded-lg"
                  style={{ backgroundColor: `${qrCode.color}20` }}
                >
                  <QrCode size={120} color={qrCode.color} />
                </div>
                <div className="w-full text-center">
                  <p className="text-sm text-gray-500 truncate mb-2">{qrCode.url}</p>
                  <Badge variant="secondary" className="mb-2">
                    {qrCode.scans} scans
                  </Badge>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-0">
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {filteredQRCodes.length === 0 && (
        <div className="text-center py-12">
          <QrCode className="h-12 w-12 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No QR codes found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm ? "Try a different search term" : "Create your first QR code to get started"}
          </p>
          {!searchTerm && (
            <Link href="/dashboard/qr-codes/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Generate New QR Code
              </Button>
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
