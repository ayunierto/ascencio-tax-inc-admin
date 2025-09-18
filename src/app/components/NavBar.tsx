import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { LayoutDashboard, LogOut, Menu, X } from "lucide-react";
import React from "react";
import { Link } from "react-router";

import logo from "@/assets/blue-logo.png";
import { useAuthStore } from "@/auth/store/useAuthStore";
import { toast } from "sonner";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { authStatus, logout, isAdmin } = useAuthStore();

  const links = {
    mainNavLinks: [
      { name: "Home", href: "/" },
      { name: "My Bookings", href: "/appointments" },
    ],
    authNavLinks: [
      { name: "Dashboard", href: "/dashboard" },
      { name: "Sign In", href: "/auth/signin" },
      { name: "Sign Up", href: "/auth/signup", isPrimary: true },
    ],
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully", {
      description: "You have been logged out.",
      duration: 4000,
    });
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-3xl ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src={logo} alt="logo" className="h-10 w-10 rounded-2xl" />
            {/* <span className="text-xl font-bold text-white">
              Ascencio Tax Inc.
            </span> */}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                {links.mainNavLinks.map((link) => (
                  <NavigationMenuItem key={link.name}>
                    <NavigationMenuLink
                      className="px-4 hover:bg-accent/10 hover:text-white"
                      asChild
                    >
                      <Link to={link.href} className="text-white">
                        {link.name}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            {authStatus === "unauthenticated" ? (
              <>
                <Button
                  variant="ghost"
                  className="text-white hover:bg-accent/10 hover:text-white"
                  asChild
                >
                  <Link to="/auth/signin">Sign In</Link>
                </Button>

                <Button asChild>
                  <Link to={"/auth/signup"}>Sign Up</Link>
                </Button>
              </>
            ) : (
              <>
                {isAdmin() && (
                  <Button
                    variant="outline"
                    className="bg-transparent text-white"
                    asChild
                  >
                    <Link to="/admin">
                      <LayoutDashboard /> Dashboard
                    </Link>
                  </Button>
                )}

                <Button variant={"secondary"} onClick={handleLogout}>
                  <LogOut className="text-secondary-foreground" />
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative hover:bg-accent/10 hover:text-white"
            >
              <Menu
                color="white"
                className={`w-5 h-5 transition-all duration-300 ${
                  isMenuOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
                }`}
              />
              <X
                color="white"
                className={`w-5 h-5 absolute transition-all duration-300 ${
                  isMenuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
                }`}
              />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div
            className={`border-t border-gray-600 transform transition-all duration-300 ease-out ${
              isMenuOpen ? "translate-y-0" : "-translate-y-4"
            }`}
          >
            <div className="px-2 py-2 pb-3 space-y-2">
              <div className="py-2 space-y-1">
                {links.mainNavLinks.map((link) => (
                  <Button
                    key={link.name}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-white"
                    asChild
                  >
                    <Link
                      to={link.href}
                      className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors"
                    >
                      {link.name}
                    </Link>
                  </Button>
                ))}
              </div>

              <div className="py-4 border-t border-gray-600">
                <div className="space-y-2">
                  {/* Auth Links */}
                  {authStatus === "unauthenticated" ? (
                    <div className="flex flex-col gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="flex justify-start"
                      >
                        <Link
                          to="/auth/signin"
                          className="block px-3 py-2 text-base font-medium hover:text-primary hover:bg-accent rounded-md transition-colors text-white"
                        >
                          Sign In
                        </Link>
                      </Button>
                      <Button size="sm" asChild className="justify-start">
                        <Link
                          to="/auth/signup"
                          className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors"
                        >
                          Sign Up
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      {isAdmin() && (
                        <Button
                          variant="destructive"
                          size="sm"
                          asChild
                          className="justify-start "
                        >
                          <Link
                            to="/admin"
                            className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors"
                          >
                            <LayoutDashboard /> Dashboard
                          </Link>
                        </Button>
                      )}

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleLogout}
                        className="justify-start text-white"
                      >
                        <LogOut />
                        Sign Out
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
