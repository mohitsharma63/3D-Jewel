import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Gem,
  MapPin,
  Users,
  Shield,
  Heart,
  Sparkles,
  ArrowRight,
  Quote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const values = [
  {
    icon: Shield,
    title: "Trust & Authenticity",
    description:
      "Every seller on our platform is verified. We ensure you connect only with genuine artisans who uphold the highest standards of craftsmanship.",
  },
  {
    icon: Gem,
    title: "Quality Craftsmanship",
    description:
      "We celebrate the art of jewelry making. Each piece featured represents generations of skill, dedication, and artistic excellence.",
  },
  {
    icon: Heart,
    title: "Supporting Artisans",
    description:
      "By connecting buyers directly with creators, we help preserve traditional crafts and support the livelihoods of master artisans.",
  },
  {
    icon: MapPin,
    title: "Pan-India Reach",
    description:
      "From the royal jewelers of Rajasthan to the temple artisans of Tamil Nadu, we bring India's diverse jewelry heritage to your fingertips.",
  },
];

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Delhi",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    quote:
      "I found my wedding jewelry through Jewel India. The ability to explore workshops from different states and see their craftsmanship was invaluable.",
  },
  {
    name: "Rajesh Kumar",
    location: "Bangalore",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    quote:
      "As a collector of antique jewelry, this platform has opened doors to artisans I never knew existed. The quality and authenticity are unmatched.",
  },
  {
    name: "Meera Patel",
    location: "Mumbai",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    quote:
      "The 3D viewer feature helped me make confident decisions. I could see every detail of the jewelry before visiting the workshop.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen pt-16">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Our Mission</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Preserving India's
              <br />
              <span className="text-primary">Jewelry Heritage</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Jewel India is a platform dedicated to connecting jewelry enthusiasts
              with master craftsmen across the nation. We believe in the power of
              authentic craftsmanship and the stories behind every piece of jewelry.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do at Jewel India
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover-elevate">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <value.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-serif text-lg font-semibold mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
                Why We Built <span className="text-primary">Jewel India</span>
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  India has been the heart of jewelry making for millennia. From the
                  intricate Kundan work of Rajasthan to the delicate filigree of
                  Bengal, each region has its unique style and heritage.
                </p>
                <p>
                  Yet, in the digital age, many of these master craftsmen remain
                  hidden from the world. Their workshops, often tucked away in
                  bazaars and lanes, hold treasures that deserve to be discovered.
                </p>
                <p>
                  Jewel India bridges this gap. We've created an interactive map
                  that lets you explore jewelry workshops across India, view their
                  collections in stunning 3D, and connect directly with artisans.
                </p>
              </div>
              <Link href="/" data-testid="link-explore-map-about">
                <Button className="mt-6">
                  Explore the Map
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=500&fit=crop"
                  alt="Jewelry crafting"
                  className="rounded-lg w-full h-64 object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&h=500&fit=crop"
                  alt="Traditional jewelry"
                  className="rounded-lg w-full h-64 object-cover mt-8"
                />
                <img
                  src="https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=400&h=500&fit=crop"
                  alt="Gold jewelry"
                  className="rounded-lg w-full h-64 object-cover -mt-8"
                />
                <img
                  src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=500&fit=crop"
                  alt="Pearl jewelry"
                  className="rounded-lg w-full h-64 object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { value: "29+", label: "States Covered" },
              { value: "500+", label: "Verified Artisans" },
              { value: "10,000+", label: "Unique Designs" },
              { value: "50,000+", label: "Happy Customers" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <p className="font-serif text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.value}
                </p>
                <p className="text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              What Our Users Say
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear from jewelry enthusiasts who have discovered their perfect pieces
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <Quote className="w-8 h-8 text-primary/30 mb-4" />
                    <p className="text-muted-foreground mb-6 italic">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={testimonial.image} alt={testimonial.name} />
                        <AvatarFallback>
                          {testimonial.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.location}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl p-12"
          >
            <Gem className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Ready to Discover?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Start your journey through India's rich jewelry heritage. Explore
              workshops, discover unique pieces, and connect with master artisans.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/" data-testid="link-explore-map-cta">
                <Button size="lg">
                  <MapPin className="w-4 h-4 mr-2" />
                  Explore the Map
                </Button>
              </Link>
              <Link href="/sellers" data-testid="link-view-sellers-cta">
                <Button size="lg" variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  View All Sellers
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
