"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Menu,
  QrCode,
  Settings,
  ShoppingBag,
  BarChart3,
  Users,
  CreditCard,
  HelpCircle,
  LogOut,
  ChevronDown,
  Bell,
  Search,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Suspense } from "react"

export default function DashboardLayout({ children }) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [submenuStates, setSubmenuStates] = useState({})

  const sidebarItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Menu Management",
      href: "/dashboard/menu",
      icon: ShoppingBag,
      submenu: [
        { title: "All Items", href: "/dashboard/menu" },
        { title: "Categories", href: "/dashboard/menu/categories" },
        { title: "Special Offers", href: "/dashboard/menu/offers" },
      ],
    },
    {
      title: "QR Codes",
      href: "/dashboard/qr-codes",
      icon: QrCode,
    },
    {
      title: "Analytics",
      href: "/dashboard/analytics",
      icon: BarChart3,
    },
    {
      title: "Customers",
      href: "/dashboard/customers",
      icon: Users,
    },
    {
      title: "Billing",
      href: "/dashboard/billing",
      icon: CreditCard,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ]

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const toggleSubmenu = (index) => {
    setSubmenuStates((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }))
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <aside
        className={`fixed inset-y-0 z-50 flex flex-col bg-white border-r shadow-sm transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "w-64" : "w-20"
        } hidden md:flex`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <Link href="/dashboard" className="flex items-center gap-2">
            <QrCode className="h-6 w-6 text-primary" />
            {isSidebarOpen && <span className="text-xl font-bold text-primary accent-font">DigiDine</span>}
          </Link>
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="hidden md:flex">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {sidebarItems.map((item, index) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
              const isSubmenuOpen = submenuStates[index] || false

              return (
                <li key={index}>
                  {item.submenu ? (
                    <div className="space-y-1">
                      <button
                        onClick={() => toggleSubmenu(index)}
                        className={`flex items-center w-full px-3 py-2 rounded-md text-sm transition-colors ${
                          isActive ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                        } ${!isSidebarOpen && "justify-center"}`}
                      >
                        <item.icon className="h-5 w-5 mr-2 shrink-0" />
                        {isSidebarOpen && (
                          <>
                            <span className="flex-1 text-left">{item.title}</span>
                            <ChevronDown
                              className={`h-4 w-4 transition-transform ${isSubmenuOpen ? "rotate-180" : ""}`}
                            />
                          </>
                        )}
                      </button>
                      {isSidebarOpen && isSubmenuOpen && (
                        <ul className="pl-10 space-y-1">
                          {item.submenu.map((subitem, subindex) => {
                            const isSubActive = pathname === subitem.href
                            return (
                              <li key={subindex}>
                                <Link
                                  href={subitem.href}
                                  className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                                    isSubActive
                                      ? "bg-primary/10 text-primary font-medium"
                                      : "text-gray-700 hover:bg-gray-100"
                                  }`}
                                >
                                  {subitem.title}
                                </Link>
                              </li>
                            )
                          })}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`flex items-center px-3 py-2 rounded-md text-sm transition-colors ${
                        isActive ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                      } ${!isSidebarOpen && "justify-center"}`}
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                      {isSidebarOpen && <span className="ml-2">{item.title}</span>}
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="p-4 border-t">
          {isSidebarOpen ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="h-5 w-5 text-gray-500" />
              </div>
              <div>
                <p className="text-sm font-medium">John's Restaurant</p>
                <p className="text-xs text-gray-500">john@example.com</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="ml-auto">
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/dashboard/profile" className="w-full flex">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/dashboard/settings" className="w-full flex">
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/dashboard/help" className="w-full flex">
                      <HelpCircle className="mr-2 h-4 w-4" />
                      Help
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    <Link href="/logout" className="w-full flex">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="h-5 w-5 text-gray-500" />
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <div className="flex items-center h-16 px-4 border-b">
            <Link href="/dashboard" className="flex items-center gap-2">
              <QrCode className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-primary accent-font">DigiDine</span>
            </Link>
          </div>
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-2">
              {sidebarItems.map((item, index) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
                const isSubmenuOpen = submenuStates[index] || false

                return (
                  <li key={index}>
                    {item.submenu ? (
                      <div className="space-y-1">
                        <button
                          onClick={() => toggleSubmenu(index)}
                          className={`flex items-center w-full px-3 py-2 rounded-md text-sm transition-colors ${
                            isActive ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          <item.icon className="h-5 w-5 mr-2" />
                          <span className="flex-1 text-left">{item.title}</span>
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${isSubmenuOpen ? "rotate-180" : ""}`}
                          />
                        </button>
                        {isSubmenuOpen && (
                          <ul className="pl-10 space-y-1">
                            {item.submenu.map((subitem, subindex) => {
                              const isSubActive = pathname === subitem.href
                              return (
                                <li key={subindex}>
                                  <Link
                                    href={subitem.href}
                                    className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                                      isSubActive
                                        ? "bg-primary/10 text-primary font-medium"
                                        : "text-gray-700 hover:bg-gray-100"
                                    }`}
                                  >
                                    {subitem.title}
                                  </Link>
                                </li>
                              )
                            })}
                          </ul>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className={`flex items-center px-3 py-2 rounded-md text-sm transition-colors ${
                          isActive ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <item.icon className="h-5 w-5 mr-2" />
                        <span>{item.title}</span>
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>
          </nav>
          <div className="p-4 border-t">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="h-5 w-5 text-gray-500" />
              </div>
              <div>
                <p className="text-sm font-medium">John's Restaurant</p>
                <p className="text-xs text-gray-500">john@example.com</p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <Link href="/dashboard/profile">
                <Button variant="outline" className="w-full justify-start">
                  Profile
                </Button>
              </Link>
              <Link href="/logout">
                <Button variant="outline" className="w-full justify-start text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ease-in-out ${isSidebarOpen ? "md:ml-64" : "md:ml-20"}`}>
        {/* Top Navigation */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white px-4 md:px-6">
          <div className="flex flex-1 items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0">
                <div className="flex items-center h-16 px-4 border-b">
                  <Link href="/dashboard" className="flex items-center gap-2">
                    <QrCode className="h-6 w-6 text-primary" />
                    <span className="text-xl font-bold text-primary accent-font">DigiDine</span>
                  </Link>
                </div>
                <nav className="flex-1 overflow-y-auto py-4">
                  <ul className="space-y-1 px-2">
                    {sidebarItems.map((item, index) => {
                      const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
                      const isSubmenuOpen = submenuStates[index] || false

                      return (
                        <li key={index}>
                          {item.submenu ? (
                            <div className="space-y-1">
                              <button
                                onClick={() => toggleSubmenu(index)}
                                className={`flex items-center w-full px-3 py-2 rounded-md text-sm transition-colors ${
                                  isActive ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                                }`}
                              >
                                <item.icon className="h-5 w-5 mr-2" />
                                <span className="flex-1 text-left">{item.title}</span>
                                <ChevronDown
                                  className={`h-4 w-4 transition-transform ${isSubmenuOpen ? "rotate-180" : ""}`}
                                />
                              </button>
                              {isSubmenuOpen && (
                                <ul className="pl-10 space-y-1">
                                  {item.submenu.map((subitem, subindex) => {
                                    const isSubActive = pathname === subitem.href
                                    return (
                                      <li key={subindex}>
                                        <Link
                                          href={subitem.href}
                                          className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                                            isSubActive
                                              ? "bg-primary/10 text-primary font-medium"
                                              : "text-gray-700 hover:bg-gray-100"
                                          }`}
                                        >
                                          {subitem.title}
                                        </Link>
                                      </li>
                                    )
                                  })}
                                </ul>
                              )}
                            </div>
                          ) : (
                            <Link
                              href={item.href}
                              className={`flex items-center px-3 py-2 rounded-md text-sm transition-colors ${
                                isActive ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                              }`}
                            >
                              <item.icon className="h-5 w-5 mr-2" />
                              <span>{item.title}</span>
                            </Link>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                </nav>
                <div className="p-4 border-t">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">John's Restaurant</p>
                      <p className="text-xs text-gray-500">john@example.com</p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <Link href="/dashboard/profile">
                      <Button variant="outline" className="w-full justify-start">
                        Profile
                      </Button>
                    </Link>
                    <Link href="/logout">
                      <Button variant="outline" className="w-full justify-start text-red-600">
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input type="search" placeholder="Search..." className="w-full pl-8 md:w-[300px] bg-gray-50" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-600" />
              <span className="sr-only">Notifications</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="h-4 w-4 text-gray-500" />
                  </div>
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/dashboard/profile" className="w-full flex">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/dashboard/settings" className="w-full flex">
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/dashboard/help" className="w-full flex">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    Help
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                  <Link href="/logout" className="w-full flex">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1">
          <div className="container mx-auto py-6 px-4 md:px-6">
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          </div>
        </main>
      </div>
      {/* Floating mobile menu button */}
      <Button
        variant="outline"
        size="icon"
        className="md:hidden fixed bottom-4 right-4 z-50 rounded-full shadow-lg"
        onClick={toggleSidebar}
      >
        <Menu className="h-5 w-5" />
      </Button>
    </div>
  )
}
