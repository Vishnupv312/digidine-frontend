"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  Info,
  Clock,
  MapPin,
  Phone,
  Globe,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";

export default function DemoPage() {
  const params = useParams();
  const { slug } = params;

  // State for restaurant info
  const [restaurant, setRestaurant] = useState({
    name: "John's Restaurant",
    logo: "/placeholder.svg",
    coverImage: "/placeholder.svg?height=300&width=1000",
    description:
      "Serving delicious food since 2010. Our restaurant offers a variety of dishes made with fresh, locally-sourced ingredients.",
    address: "123 Main Street, New York, NY 10001",
    phone: "(555) 123-4567",
    website: "www.johnsrestaurant.com",
    hours: "Mon-Fri: 11am-10pm, Sat-Sun: 10am-11pm",
    social: {
      instagram: "johnsrestaurant",
      facebook: "johnsrestaurant",
      twitter: "johnsrestaurant",
    },
  });

  // State for menu categories and items
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Appetizers",
      items: [
        {
          id: 101,
          name: "Caesar Salad",
          description:
            "Fresh romaine lettuce, parmesan cheese, croutons, and our homemade Caesar dressing.",
          price: 12.99,
          image: "/placeholder.svg",
          tags: ["Vegetarian"],
          featured: false,
        },
        {
          id: 102,
          name: "Garlic Bread",
          description: "Freshly baked bread with garlic butter and herbs.",
          price: 6.99,
          image: "/placeholder.svg",
          tags: ["Vegetarian"],
          featured: false,
        },
        {
          id: 103,
          name: "Seasonal Soup",
          description: "Chef's special soup made with seasonal ingredients.",
          price: 7.99,
          image: "/placeholder.svg",
          tags: [],
          featured: true,
        },
      ],
    },
    {
      id: 2,
      name: "Main Course",
      items: [
        {
          id: 201,
          name: "Grilled Salmon",
          description:
            "Fresh salmon fillet grilled to perfection, served with seasonal vegetables and lemon butter sauce.",
          price: 24.99,
          image: "/placeholder.svg",
          tags: ["Gluten-Free"],
          featured: true,
        },
        {
          id: 202,
          name: "Beef Burger",
          description:
            "Juicy beef patty with lettuce, tomato, cheese, and our special sauce, served with fries.",
          price: 18.99,
          image: "/placeholder.svg",
          tags: [],
          featured: false,
        },
        {
          id: 203,
          name: "Pasta Carbonara",
          description:
            "Spaghetti with creamy sauce, bacon, and parmesan cheese.",
          price: 19.99,
          image: "/placeholder.svg",
          tags: [],
          featured: true,
        },
        {
          id: 204,
          name: "Vegetable Stir Fry",
          description:
            "Fresh vegetables stir-fried with tofu in a savory sauce, served with rice.",
          price: 16.99,
          image: "/placeholder.svg",
          tags: ["Vegetarian", "Vegan"],
          featured: false,
        },
      ],
    },
    {
      id: 3,
      name: "Desserts",
      items: [
        {
          id: 301,
          name: "Chocolate Lava Cake",
          description:
            "Warm chocolate cake with a molten center, served with vanilla ice cream.",
          price: 9.99,
          image: "/placeholder.svg",
          tags: ["Vegetarian"],
          featured: true,
        },
        {
          id: 302,
          name: "Cheesecake",
          description: "Creamy New York style cheesecake with berry compote.",
          price: 8.99,
          image: "/placeholder.svg",
          tags: ["Vegetarian"],
          featured: false,
        },
      ],
    },
    {
      id: 4,
      name: "Beverages",
      items: [
        {
          id: 401,
          name: "Mojito",
          description:
            "Refreshing cocktail with rum, mint, lime, and soda water.",
          price: 8.99,
          image: "/placeholder.svg",
          tags: [],
          featured: false,
        },
        {
          id: 402,
          name: "Iced Tea",
          description: "Freshly brewed tea served over ice with lemon.",
          price: 4.99,
          image: "/placeholder.svg",
          tags: ["Vegan"],
          featured: false,
        },
      ],
    },
  ]);

  // State for active category
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id);

  // State for search
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Handle search
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setIsSearching(false);
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    const results = [];
    categories.forEach((category) => {
      category.items.forEach((item) => {
        if (
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          results.push({
            ...item,
            category: category.name,
          });
        }
      });
    });
    setSearchResults(results);
  }, [searchTerm, categories]);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Restaurant Header */}
      <div
        className="relative h-48 md:h-64 bg-cover bg-center"
        style={{ backgroundImage: `url(${restaurant.coverImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {restaurant.name}
            </h1>
            <p className="text-sm md:text-base max-w-md mx-auto opacity-90">
              {restaurant.description}
            </p>
          </div>
        </div>
      </div>

      {/* Menu Container */}
      <div className="container mx-auto px-4 py-8 -mt-6 relative">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search menu items..."
              className="pl-10 py-6 text-lg bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Restaurant Info */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-8 pb-8 border-b">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden mr-4">
                <img
                  src={restaurant.logo || "/placeholder.svg"}
                  alt={restaurant.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold">{restaurant.name}</h2>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{restaurant.address}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="outline" size="sm" className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>{restaurant.hours.split(",")[0]}</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>{restaurant.phone}</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center">
                <Info className="h-4 w-4 mr-2" />
                <span>About</span>
              </Button>
            </div>
          </div>

          {/* Menu Content */}
          {isSearching ? (
            <div>
              <h3 className="text-xl font-bold mb-6">Search Results</h3>
              {searchResults.length > 0 ? (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={staggerContainer}
                  className="grid gap-6"
                >
                  {searchResults.map((item) => (
                    <motion.div
                      key={item.id}
                      variants={fadeIn}
                      className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="w-full md:w-24 h-24 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                          <div>
                            <h4 className="text-lg font-bold accent-font">
                              {item.name}
                            </h4>
                            <p className="text-sm text-gray-500">
                              Category: {item.category}
                            </p>
                          </div>
                          <div className="mt-2 md:mt-0">
                            <span className="text-lg font-bold text-primary">
                              ${item.price.toFixed(2)}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">
                          {item.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {item.tags.map((tag, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                          {item.featured && (
                            <Badge className="bg-secondary text-white text-xs">
                              Chef's Special
                            </Badge>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">
                    No items found matching "{searchTerm}"
                  </p>
                </div>
              )}
            </div>
          ) : (
            <Tabs
              defaultValue={categories[0]?.id.toString()}
              className="w-full"
            >
              <div className="overflow-x-auto">
                <TabsList className="mb-8 w-full justify-start">
                  {categories.map((category) => (
                    <TabsTrigger
                      key={category.id}
                      value={category.id.toString()}
                      onClick={() => setActiveCategory(category.id)}
                      className="px-6"
                    >
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {categories.map((category) => (
                <TabsContent key={category.id} value={category.id.toString()}>
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="grid gap-6"
                  >
                    {category.items.map((item) => (
                      <motion.div
                        key={item.id}
                        variants={fadeIn}
                        className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow"
                      >
                        <div className="w-full md:w-24 h-24 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                            <h4 className="text-lg font-bold accent-font">
                              {item.name}
                            </h4>
                            <span className="text-lg font-bold text-primary">
                              ${item.price.toFixed(2)}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">
                            {item.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {item.tags.map((tag, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                            {item.featured && (
                              <Badge className="bg-secondary text-white text-xs">
                                Chef's Special
                              </Badge>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </TabsContent>
              ))}
            </Tabs>
          )}
        </div>

        {/* Restaurant Footer */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-bold mb-2">Contact Information</h3>
              <div className="space-y-1 text-sm">
                <p className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-primary" />
                  {restaurant.phone}
                </p>
                <p className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-primary" />
                  {restaurant.address}
                </p>
                <p className="flex items-center">
                  <Globe className="h-4 w-4 mr-2 text-primary" />
                  {restaurant.website}
                </p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <h3 className="text-lg font-bold mb-2">Follow Us</h3>
              <div className="flex justify-center md:justify-end space-x-4">
                <a
                  href={`https://instagram.com/${restaurant.social.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80"
                >
                  <Instagram className="h-6 w-6" />
                </a>
                <a
                  href={`https://facebook.com/${restaurant.social.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80"
                >
                  <Facebook className="h-6 w-6" />
                </a>
                <a
                  href={`https://twitter.com/${restaurant.social.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80"
                >
                  <Twitter className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t text-center text-sm text-gray-500">
            <p>Powered by DigiDine - Digital Menu Solutions</p>
          </div>
        </div>
      </div>
    </div>
  );
}
