import type { 
  User, 
  InsertUser, 
  Seller, 
  Workshop, 
  JewelryItem, 
  StateData 
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllSellers(): Promise<Seller[]>;
  getSellerById(id: string): Promise<Seller | undefined>;
  getSellersByState(stateId: string): Promise<Seller[]>;
  
  getWorkshopBySellerId(sellerId: string): Promise<Workshop | undefined>;
  
  getAllJewelryItems(): Promise<JewelryItem[]>;
  getJewelryItemById(id: string): Promise<JewelryItem | undefined>;
  getJewelryItemsByCategory(category: string): Promise<JewelryItem[]>;
  
  getAllStates(): Promise<StateData[]>;
  getStateById(id: string): Promise<StateData | undefined>;
}

const indianStates: StateData[] = [
  { id: "MH", name: "Maharashtra", sellerCount: 8, pathD: "M180,280 L220,260 L260,280 L280,320 L260,360 L220,380 L180,360 L160,320 Z" },
  { id: "GJ", name: "Gujarat", sellerCount: 6, pathD: "M100,240 L140,220 L180,240 L180,280 L160,320 L120,320 L80,300 L80,260 Z" },
  { id: "RJ", name: "Rajasthan", sellerCount: 7, pathD: "M120,140 L180,120 L240,140 L260,200 L220,260 L140,260 L100,220 L100,180 Z" },
  { id: "KA", name: "Karnataka", sellerCount: 5, pathD: "M200,380 L240,360 L280,380 L280,440 L240,480 L200,460 L180,420 Z" },
  { id: "TN", name: "Tamil Nadu", sellerCount: 6, pathD: "M240,480 L280,460 L320,480 L320,540 L280,560 L240,540 L220,520 Z" },
  { id: "KL", name: "Kerala", sellerCount: 4, pathD: "M200,480 L220,460 L240,480 L240,540 L220,560 L200,540 L190,520 Z" },
  { id: "AP", name: "Andhra Pradesh", sellerCount: 5, pathD: "M260,360 L320,340 L360,380 L340,440 L280,460 L240,420 Z" },
  { id: "TS", name: "Telangana", sellerCount: 4, pathD: "M260,300 L320,280 L360,320 L340,360 L280,360 L260,340 Z" },
  { id: "WB", name: "West Bengal", sellerCount: 5, pathD: "M380,200 L420,180 L440,220 L420,280 L380,300 L360,260 L360,220 Z" },
  { id: "UP", name: "Uttar Pradesh", sellerCount: 6, pathD: "M260,140 L340,120 L380,160 L380,220 L320,260 L260,240 L240,200 Z" },
  { id: "MP", name: "Madhya Pradesh", sellerCount: 4, pathD: "M200,220 L280,200 L340,220 L340,280 L280,320 L220,300 L200,260 Z" },
  { id: "BR", name: "Bihar", sellerCount: 3, pathD: "M360,180 L400,160 L420,200 L400,240 L360,240 L340,220 Z" },
  { id: "OR", name: "Odisha", sellerCount: 4, pathD: "M340,280 L400,260 L420,320 L380,360 L320,360 L300,320 Z" },
  { id: "PB", name: "Punjab", sellerCount: 4, pathD: "M180,80 L220,60 L260,80 L260,120 L220,140 L180,120 L160,100 Z" },
  { id: "HR", name: "Haryana", sellerCount: 3, pathD: "M200,120 L240,100 L280,120 L280,160 L240,180 L200,160 L180,140 Z" },
  { id: "DL", name: "Delhi", sellerCount: 5, pathD: "M240,140 L260,130 L280,140 L280,160 L260,170 L240,160 Z" },
  { id: "JH", name: "Jharkhand", sellerCount: 3, pathD: "M380,240 L420,220 L440,260 L420,300 L380,300 L360,280 Z" },
  { id: "CG", name: "Chhattisgarh", sellerCount: 2, pathD: "M320,280 L360,260 L400,300 L380,360 L320,360 L300,320 Z" },
  { id: "AS", name: "Assam", sellerCount: 3, pathD: "M440,140 L500,120 L540,160 L520,200 L460,200 L440,180 Z" },
  { id: "JK", name: "Jammu & Kashmir", sellerCount: 2, pathD: "M160,20 L220,10 L260,40 L260,80 L200,100 L160,80 L140,50 Z" },
  { id: "UK", name: "Uttarakhand", sellerCount: 2, pathD: "M260,80 L300,60 L340,80 L340,120 L300,140 L260,120 L240,100 Z" },
  { id: "HP", name: "Himachal Pradesh", sellerCount: 2, pathD: "M220,40 L260,30 L300,50 L300,80 L260,100 L220,80 L200,60 Z" },
  { id: "GA", name: "Goa", sellerCount: 2, pathD: "M180,400 L200,390 L210,410 L200,430 L180,420 Z" },
  { id: "NL", name: "Nagaland", sellerCount: 1, pathD: "M500,160 L530,150 L550,180 L530,200 L500,190 Z" },
  { id: "MN", name: "Manipur", sellerCount: 1, pathD: "M500,200 L530,190 L550,220 L530,250 L500,240 Z" },
  { id: "MZ", name: "Mizoram", sellerCount: 1, pathD: "M480,250 L510,240 L530,280 L510,300 L480,290 Z" },
  { id: "TR", name: "Tripura", sellerCount: 1, pathD: "M460,250 L490,240 L500,270 L480,290 L460,280 Z" },
  { id: "ML", name: "Meghalaya", sellerCount: 1, pathD: "M460,200 L500,190 L520,210 L500,230 L460,220 Z" },
  { id: "SK", name: "Sikkim", sellerCount: 1, pathD: "M400,140 L420,130 L430,150 L420,170 L400,160 Z" },
  { id: "AR", name: "Arunachal Pradesh", sellerCount: 1, pathD: "M480,100 L540,80 L580,120 L560,160 L500,160 L480,140 Z" },
];

const sellers: Seller[] = [
  {
    id: "s1",
    name: "Rajesh Zaveri",
    workshopName: "Zaveri & Sons",
    state: "MH",
    city: "Mumbai",
    address: "23, Zaveri Bazaar, Kalbadevi Road",
    phone: "+91 22 2342 5678",
    email: "contact@zaverisonsj.com",
    whatsapp: "+91 98765 43210",
    rating: 4.9,
    reviewCount: 342,
    specialties: ["Traditional", "Bridal", "Kundan"],
    thumbnailImage: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&h=400&fit=crop",
    yearsInBusiness: 75,
    verified: true,
  },
  {
    id: "s2",
    name: "Priya Jewellers",
    workshopName: "Priya Heritage Jewels",
    state: "MH",
    city: "Pune",
    address: "45, MG Road, Camp Area",
    phone: "+91 20 2567 8901",
    email: "info@priyajewels.com",
    whatsapp: "+91 98234 56789",
    rating: 4.7,
    reviewCount: 189,
    specialties: ["Contemporary", "Diamond", "Platinum"],
    thumbnailImage: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=400&fit=crop",
    yearsInBusiness: 25,
    verified: true,
  },
  {
    id: "s3",
    name: "Kantilal Chhotalal",
    workshopName: "KC Jewellers",
    state: "GJ",
    city: "Ahmedabad",
    address: "12, Manek Chowk, Relief Road",
    phone: "+91 79 2550 1234",
    email: "sales@kcjewellers.in",
    whatsapp: "+91 99786 54321",
    rating: 4.8,
    reviewCount: 256,
    specialties: ["Antique", "Jadau", "Meenakari"],
    thumbnailImage: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&h=400&fit=crop",
    yearsInBusiness: 90,
    verified: true,
  },
  {
    id: "s4",
    name: "Tribhovandas Bhimji",
    workshopName: "TBZ Creations",
    state: "GJ",
    city: "Surat",
    address: "78, Ring Road, Diamond Market",
    phone: "+91 261 234 5678",
    email: "tbz@tbzcreations.com",
    whatsapp: "+91 98250 12345",
    rating: 4.9,
    reviewCount: 421,
    specialties: ["Diamond", "Solitaire", "Modern"],
    thumbnailImage: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=400&fit=crop",
    yearsInBusiness: 45,
    verified: true,
  },
  {
    id: "s5",
    name: "Tanishq Heritage",
    workshopName: "Tanishq Workshop",
    state: "KA",
    city: "Bangalore",
    address: "101, Commercial Street",
    phone: "+91 80 2555 6789",
    email: "heritage@tanishq.co.in",
    whatsapp: "+91 97438 67890",
    rating: 4.8,
    reviewCount: 512,
    specialties: ["Bridal", "Temple", "Gold"],
    thumbnailImage: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&h=400&fit=crop",
    yearsInBusiness: 30,
    verified: true,
  },
  {
    id: "s6",
    name: "Jaipur Gems",
    workshopName: "Royal Jaipur Jewellers",
    state: "RJ",
    city: "Jaipur",
    address: "56, Johari Bazaar, Pink City",
    phone: "+91 141 256 7890",
    email: "royal@jaipurgems.com",
    whatsapp: "+91 94140 56789",
    rating: 4.9,
    reviewCount: 378,
    specialties: ["Polki", "Kundan", "Gemstone"],
    thumbnailImage: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=400&fit=crop",
    yearsInBusiness: 120,
    verified: true,
  },
  {
    id: "s7",
    name: "Senco Gold",
    workshopName: "Senco Artisan Studio",
    state: "WB",
    city: "Kolkata",
    address: "34, Park Street",
    phone: "+91 33 2229 0123",
    email: "studio@sencogold.com",
    whatsapp: "+91 98307 89012",
    rating: 4.7,
    reviewCount: 298,
    specialties: ["Bengali", "Filigree", "Nakshi"],
    thumbnailImage: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=400&fit=crop",
    yearsInBusiness: 85,
    verified: true,
  },
  {
    id: "s8",
    name: "GRT Jewellers",
    workshopName: "GRT Temple Collection",
    state: "TN",
    city: "Chennai",
    address: "89, T Nagar, Pondy Bazaar",
    phone: "+91 44 2434 5678",
    email: "temple@grtjewellers.com",
    whatsapp: "+91 98410 34567",
    rating: 4.8,
    reviewCount: 445,
    specialties: ["Temple", "Antique", "South Indian"],
    thumbnailImage: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=400&fit=crop",
    yearsInBusiness: 55,
    verified: true,
  },
  {
    id: "s9",
    name: "Kalyan Jewellers",
    workshopName: "Kalyan Artisans",
    state: "KL",
    city: "Thrissur",
    address: "12, Swaraj Round",
    phone: "+91 487 242 3456",
    email: "artisans@kalyanjewellers.net",
    whatsapp: "+91 94470 23456",
    rating: 4.9,
    reviewCount: 567,
    specialties: ["Kerala", "Traditional", "Bridal"],
    thumbnailImage: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=600&h=400&fit=crop",
    yearsInBusiness: 70,
    verified: true,
  },
  {
    id: "s10",
    name: "PC Chandra",
    workshopName: "PC Chandra Heritage",
    state: "WB",
    city: "Kolkata",
    address: "67, Bowbazar Street",
    phone: "+91 33 2236 7890",
    email: "heritage@pcchandra.com",
    whatsapp: "+91 98300 67890",
    rating: 4.6,
    reviewCount: 234,
    specialties: ["Traditional", "Wedding", "Gold"],
    thumbnailImage: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=600&h=400&fit=crop",
    yearsInBusiness: 100,
    verified: true,
  },
  {
    id: "s11",
    name: "Mangatrai Neeraj",
    workshopName: "Mangatrai Pearls",
    state: "TS",
    city: "Hyderabad",
    address: "23, Basheerbagh",
    phone: "+91 40 2323 4567",
    email: "pearls@mangatrai.com",
    whatsapp: "+91 99897 12345",
    rating: 4.8,
    reviewCount: 312,
    specialties: ["Pearl", "Nizami", "Antique"],
    thumbnailImage: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=400&fit=crop",
    yearsInBusiness: 80,
    verified: true,
  },
  {
    id: "s12",
    name: "Bhima Jewellers",
    workshopName: "Bhima Gold House",
    state: "KL",
    city: "Kochi",
    address: "45, MG Road, Ernakulam",
    phone: "+91 484 235 6789",
    email: "goldhouse@bhima.in",
    whatsapp: "+91 94470 56789",
    rating: 4.7,
    reviewCount: 389,
    specialties: ["Gold", "Diamond", "Platinum"],
    thumbnailImage: "https://images.unsplash.com/photo-1586878341523-7c198bb6e81c?w=600&h=400&fit=crop",
    yearsInBusiness: 95,
    verified: true,
  },
];

const workshops: Workshop[] = [
  {
    id: "w1",
    sellerId: "s1",
    name: "Zaveri & Sons Master Workshop",
    tagline: "Crafting Dreams in Gold Since 1948",
    description: "Established in 1948, Zaveri & Sons has been the cornerstone of Mumbai's legendary Zaveri Bazaar. Our workshop combines traditional craftsmanship passed down through four generations with modern precision techniques. Each piece that leaves our workshop carries the legacy of master artisans who have dedicated their lives to the art of jewelry making. We specialize in bridal collections, Kundan work, and bespoke designs that tell your unique story.",
    heroImage: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=1400&h=700&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop",
    ],
    establishedYear: 1948,
    teamSize: 35,
    certifications: ["BIS Hallmark", "IGI Certified", "GIA Partner"],
    specialties: ["Traditional", "Bridal", "Kundan", "Custom Design"],
  },
  {
    id: "w2",
    sellerId: "s3",
    name: "KC Jewellers Heritage Atelier",
    tagline: "Where Tradition Meets Timeless Elegance",
    description: "KC Jewellers has been a trusted name in Ahmedabad's jewelry landscape for over 90 years. Our heritage atelier is home to some of Gujarat's most skilled artisans, specializing in intricate Jadau and Meenakari work. We take pride in preserving the ancient art forms while creating pieces that resonate with modern sensibilities. Every creation is a testament to our commitment to excellence and the rich cultural heritage of Indian jewelry.",
    heroImage: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=1400&h=700&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=400&h=400&fit=crop",
    ],
    establishedYear: 1933,
    teamSize: 42,
    certifications: ["BIS Hallmark", "GJEPC Member", "ISO 9001"],
    specialties: ["Antique", "Jadau", "Meenakari", "Heirloom"],
  },
  {
    id: "w3",
    sellerId: "s6",
    name: "Royal Jaipur Jewellers Studio",
    tagline: "The Pink City's Crown Jeweler",
    description: "Nestled in the heart of Johari Bazaar, Royal Jaipur Jewellers continues a legacy spanning 120 years. Our studio is renowned worldwide for Polki and Kundan creations that have adorned royalty and celebrities alike. Each gemstone is hand-selected from the finest sources, and our master craftsmen employ techniques that have been perfected over centuries. We don't just create jewelry; we craft wearable art that tells stories of India's regal past.",
    heroImage: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1400&h=700&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop",
    ],
    establishedYear: 1903,
    teamSize: 55,
    certifications: ["GIA Certified", "BIS Hallmark", "Royal Warrant"],
    specialties: ["Polki", "Kundan", "Gemstone", "Royal Collection"],
  },
];

const jewelryItems: JewelryItem[] = [
  {
    id: "j1",
    name: "Kundan Bridal Necklace",
    category: "necklaces",
    price: 450000,
    material: "Gold 22K",
    weight: "45g",
    description: "Exquisite Kundan bridal necklace featuring intricate craftsmanship with uncut diamonds and precious gemstones. Perfect for the modern bride who values tradition.",
    imageUrl: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&h=800&fit=crop",
    inStock: true,
  },
  {
    id: "j2",
    name: "Diamond Solitaire Ring",
    category: "rings",
    price: 285000,
    material: "Platinum",
    weight: "8g",
    description: "A stunning 1.5 carat diamond solitaire set in platinum. Certified by GIA for exceptional clarity and brilliance.",
    imageUrl: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop",
    inStock: true,
  },
  {
    id: "j3",
    name: "Temple Gold Earrings",
    category: "earrings",
    price: 125000,
    material: "Gold 22K",
    weight: "18g",
    description: "Traditional South Indian temple jewelry earrings featuring Lakshmi motif with intricate granulation work.",
    imageUrl: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=800&fit=crop",
    inStock: true,
  },
  {
    id: "j4",
    name: "Polki Choker Set",
    category: "necklaces",
    price: 680000,
    material: "Gold 22K",
    weight: "75g",
    description: "Magnificent Polki choker set with matching earrings. Features uncut diamonds in traditional Rajasthani style.",
    imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop",
    inStock: true,
  },
  {
    id: "j5",
    name: "Meenakari Bangles Set",
    category: "bangles",
    price: 95000,
    material: "Gold 18K",
    weight: "32g",
    description: "Set of 4 exquisite Meenakari bangles with vibrant enamel work in traditional Rajasthani colors.",
    imageUrl: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&h=800&fit=crop",
    inStock: true,
  },
  {
    id: "j6",
    name: "Pearl Drop Pendant",
    category: "pendants",
    price: 45000,
    material: "Gold 18K",
    weight: "6g",
    description: "Elegant South Sea pearl pendant with diamond-studded bail. Perfect for both casual and formal occasions.",
    imageUrl: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=800&fit=crop",
    inStock: true,
  },
  {
    id: "j7",
    name: "Ruby Tennis Bracelet",
    category: "bracelets",
    price: 320000,
    material: "Gold 18K",
    weight: "22g",
    description: "Stunning tennis bracelet featuring Burmese rubies alternating with brilliant-cut diamonds.",
    imageUrl: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&h=800&fit=crop",
    inStock: true,
  },
  {
    id: "j8",
    name: "Antique Gold Jhumkas",
    category: "earrings",
    price: 78000,
    material: "Gold 22K",
    weight: "15g",
    description: "Handcrafted antique gold jhumkas with delicate filigree work and tiny gold bells.",
    imageUrl: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&h=800&fit=crop",
    inStock: true,
  },
  {
    id: "j9",
    name: "Diamond Cocktail Ring",
    category: "rings",
    price: 195000,
    material: "Gold 18K",
    weight: "12g",
    description: "Bold cocktail ring featuring a cluster of diamonds in a modern geometric setting.",
    imageUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop",
    inStock: true,
  },
  {
    id: "j10",
    name: "Jadau Wedding Set",
    category: "necklaces",
    price: 850000,
    material: "Gold 22K",
    weight: "120g",
    description: "Complete Jadau wedding set including necklace, earrings, and maang tikka. A masterpiece of Mughal craftsmanship.",
    imageUrl: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&h=800&fit=crop",
    inStock: true,
  },
  {
    id: "j11",
    name: "Emerald Chandbali",
    category: "earrings",
    price: 165000,
    material: "Gold 22K",
    weight: "20g",
    description: "Crescent-shaped chandbali earrings featuring Colombian emeralds and pearl drops.",
    imageUrl: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800&h=800&fit=crop",
    inStock: true,
  },
  {
    id: "j12",
    name: "Filigree Gold Bangles",
    category: "bangles",
    price: 145000,
    material: "Gold 22K",
    weight: "28g",
    description: "Pair of Bengali filigree bangles showcasing the delicate wire work technique of Kolkata artisans.",
    imageUrl: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=600&h=400&fit=crop",
    inStock: true,
  },
];

export class MemStorage implements IStorage {
  private users: Map<string, User>;

  constructor() {
    this.users = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllSellers(): Promise<Seller[]> {
    return sellers;
  }

  async getSellerById(id: string): Promise<Seller | undefined> {
    return sellers.find((s) => s.id === id);
  }

  async getSellersByState(stateId: string): Promise<Seller[]> {
    return sellers.filter((s) => s.state === stateId);
  }

  async getWorkshopBySellerId(sellerId: string): Promise<Workshop | undefined> {
    return workshops.find((w) => w.sellerId === sellerId);
  }

  async getAllJewelryItems(): Promise<JewelryItem[]> {
    return jewelryItems;
  }

  async getJewelryItemById(id: string): Promise<JewelryItem | undefined> {
    return jewelryItems.find((j) => j.id === id);
  }

  async getJewelryItemsByCategory(category: string): Promise<JewelryItem[]> {
    return jewelryItems.filter((j) => j.category === category);
  }

  async getAllStates(): Promise<StateData[]> {
    return indianStates;
  }

  async getStateById(id: string): Promise<StateData | undefined> {
    return indianStates.find((s) => s.id === id);
  }
}

export const storage = new MemStorage();
