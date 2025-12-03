import { Link } from "wouter";
import { Gem, MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="bg-card border-t border-card-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Gem className="h-7 w-7 text-primary" />
              <span className="font-serif text-xl font-semibold">Jewel India</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Connecting you with India's finest jewelry artisans. Discover authentic craftsmanship from master jewelers across the nation.
            </p>
            <div className="flex gap-2">
              <Button size="icon" variant="ghost" aria-label="Facebook" data-testid="link-social-facebook">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" aria-label="Instagram" data-testid="link-social-instagram">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" aria-label="Twitter" data-testid="link-social-twitter">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" aria-label="YouTube" data-testid="link-social-youtube">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-serif font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-explore">
                  Explore Map
                </Link>
              </li>
              <li>
                <Link href="/sellers" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-sellers">
                  All Sellers
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-catalog">
                  Jewelry Catalog
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-about">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif font-semibold mb-4">Popular States</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                  Maharashtra
                </span>
              </li>
              <li>
                <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                  Gujarat
                </span>
              </li>
              <li>
                <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                  Rajasthan
                </span>
              </li>
              <li>
                <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                  Tamil Nadu
                </span>
              </li>
              <li>
                <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                  Kerala
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif font-semibold mb-4">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to receive updates on new artisans and exclusive collections.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="email"
                placeholder="Your email"
                className="flex-1"
                data-testid="input-newsletter-email"
              />
              <Button type="submit" data-testid="button-newsletter-subscribe">
                Subscribe
              </Button>
            </form>
            <div className="mt-6 space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+91 1800 123 4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>support@jewelindia.com</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Jewel India. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-foreground transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-foreground transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-foreground transition-colors cursor-pointer">Cookie Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
