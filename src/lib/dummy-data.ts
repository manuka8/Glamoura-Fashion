import { Truck, RotateCcw, Sparkles, Percent } from 'lucide-react';
import image1 from '@/app/assets/sales/Diamond_Stud_Earrings.png'
import imageAviators from '@/app/assets/product iamges/Titanium Aviators.png'
import imageBracelet from '@/app/assets/product iamges/rose_gold.png'
import imageSlateWatch from '@/app/assets/product iamges/minimalist_slate_watch.png'
import imageSneakers from '@/app/assets/product iamges/urban_street_sneakers.png'
import image2 from '@/app/assets/sales/Silver_Chronograph_Watch.png'
import image3 from '@/app/assets/sales/Silk_Evening_Gown.png'
import image4 from '@/app/assets/sales/Luxury_Leather_Belt.png'
import image5 from '@/app/assets/sales/Gold_Pendant_Necklace.png'
import image6 from '@/app/assets/sales/Midnight_Velvet_Clutch.png'
import image7 from '@/app/assets/sales/Rose_Gold_Bangle.png'
import image8 from '@/app/assets/sales/Titanium_Sport_Watch.png'
import image9 from '@/app/assets/product iamges/flow_dress.png'
import image10 from '@/app/assets/product iamges/1.png'
import image11 from '@/app/assets/product iamges/2.png'
import image12 from '@/app/assets/product iamges/3.png'
import image13 from '@/app/assets/product iamges/4.png'
import image14 from '@/app/assets/product iamges/5.png'
import image15 from '@/app/assets/product iamges/6.png'

import image16 from '@/app/assets/sales/sale1.png'
import image17 from '@/app/assets/sales/sale2.png'
import image18 from '@/app/assets/sales/sale3.png'
import image19 from '@/app/assets/sales/sale4.png'
import image20 from '@/app/assets/sales/sale5.png'
import women_category from '@/app/assets/categories/women.png'
import men_category from '@/app/assets/categories/men.png'
import frocks_category from '@/app/assets/categories/frocks.png'
export const dummyProducts = [
  {
    id: '1',
    name: 'Midnight Velvet Gown',
    description: 'An exquisite evening gown crafted from premium Italian velvet. Features a deep V-neckline, subtle side slit, and a floor-sweeping hem. Perfect for gala events and black-tie occasions.',
    price: 7500.00,
    image_urls: ['https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000'],
    categories: ['frocks', 'women'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Deep Blue', 'Emerald'],
    stock: 12
  },
  {
    id: '2',
    name: 'Silver Chrono Watch',
    description: 'Precision horology meets contemporary style. This chronograph features a stainless steel case, sapphire crystal glass, and a reliable Swiss movement. Water-resistant up to 50 meters.',
    price: 8500.00,
    image_urls: ['https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1000'],
    categories: ['watches', 'accessories', 'men'],
    sizes: ['One Size'],
    colors: ['Silver', 'Black Dial', 'Blue Dial'],
    stock: 45
  },
  {
    id: '3',
    name: 'Diamond Bloom Earrings',
    description: 'Radiant 18k white gold earrings set with brilliant-cut diamonds in a unique floral arrangement. Designed to capture and reflect light from every angle.',
    price: 15999.00,
    image_urls: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000'],
    categories: ['jewellery', 'accessories', 'women'],
    sizes: ['One Size'],
    colors: ['White Gold', 'Yellow Gold'],
    stock: 5
  },
  {
    id: '4',
    name: 'Oxford Leather Brogues',
    description: 'Classic men\'s dress shoes made from hand-burnished calfskin leather. Featuring traditional wingtip detailing and a durable Goodyear-welted sole.',
    price: 3200.00,
    image_urls: ['https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1000'],
    categories: ['men'],
    sizes: ['8', '9', '10', '11', '12'],
    colors: ['Brown', 'Black'],
    stock: 22
  },
  {
    id: '5',
    name: 'Rose Gold Bracelet',
    description: 'A delicate 14k rose gold chain bracelet featuring a minimalist bar design. Elegance in simplicity, perfect for layering or wearing alone.',
    price: 63000.00,
    image_urls: [imageBracelet],
    categories: ['jewellery', 'accessories', 'women'],
    sizes: ['One Size'],
    colors: ['Rose Gold'],
    stock: 18
  },
  {
    id: '6',
    name: 'Silk Floral Midi',
    description: 'A breezy midi dress made from 100% pure silk. Features a vintage-inspired floral print, ruffled sleeves, and an adjustable waist tie.',
    price: 4500.00,
    image_urls: ['https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1000'],
    categories: ['frocks', 'women'],
    sizes: ['S', 'M', 'L'],
    colors: ['Floral White', 'Peach Bloom'],
    stock: 30
  },
  {
    id: '7',
    name: 'Titanium Aviators',
    description: 'High-performance sunglasses with ultra-lightweight titanium frames and polarized lenses. Provides 100% UV protection with a timeless silhouette.',
    price: 9500.00,
    image_urls: [imageAviators],
    categories: ['men', 'accessories'],
    sizes: ['One Size'],
    colors: ['Grey Tint', 'Black'],
    stock: 50
  },
  {
    id: '8',
    name: 'Skeleton Automatic',
    description: 'An architectural masterpiece for the wrist. The open-heart dial reveals the intricate mechanical heartbeat of this automatic movement watch.',
    price: 162000.00,
    image_urls: ['https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=1000'],
    categories: ['watches', 'accessories', 'men'],
    sizes: ['One Size'],
    colors: ['Black Leather', 'Brown Leather'],
    stock: 10
  },
  {
    id: '9',
    name: 'Heavenly Lace Flow Dress',
    description: 'The White Heavenly Lace Flow Dress is a perfect blend of elegance and grace. Crafted from delicate lace with a soft, flowing silhouette, it offers a lightweight and breathable feel for all-day comfort. Its timeless white tone and intricate detailing make it ideal for special occasions, evening events, or a refined everyday look. Effortlessly feminine and sophisticated, this dress adds a touch of heavenly charm to your wardrobe.',
    price: 5000.00,
    image_urls: [image9],
    categories: ['frocks', 'women'],
    sizes: ['S', 'M', 'L'],
    colors: ['Royal Blue', 'Ruby Red'],
    stock: 8
  },
  {
    id: '10',
    name: 'Classic Gold Diver',
    description: 'A robust yet elegant diving watch finished in 18k gold plating. Features a unidirectional bezel and luminous markers for maximum visibility.',
    price: 1260.00,
    image_urls: ['https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=1000'],
    categories: ['watches', 'accessories', 'men'],
    sizes: ['One Size'],
    colors: ['Gold'],
    stock: 15
  },
  {
    id: '11',
    name: 'Boho Lace Maxi',
    description: 'Embrace free-spirited elegance with this delicate lace maxi dress. Features tiered skirts and intricate embroidery throughout.',
    price: 4350.00,
    image_urls: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000'],
    categories: ['frocks', 'women'],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Ivory', 'Sage'],
    stock: 25
  },
  {
    id: '12',
    name: 'Minimalist Slate Watch',
    description: 'A thin, lightweight timepiece for the minimalist. Features a matte slate finish and a breathable mesh strap.',
    price: 3300.00,
    image_urls: [imageSlateWatch],
    categories: ['watches', 'accessories'],
    sizes: ['One Size'],
    colors: ['Slate Grey'],
    stock: 35
  },
  {
    id: '13',
    name: 'Emerald Evening Clutch',
    description: 'A luxurious satin clutch adorned with crystal embellishments. Compact yet spacious enough for essentials, perfect for formal evenings.',
    price: 2850.00,
    image_urls: [image1],
    categories: ['accessories', 'women'],
    sizes: ['One Size'],
    colors: ['Emerald', 'Black', 'Champagne'],
    stock: 20
  },
  {
    id: '14',
    name: 'Cashmere Winter Coat',
    description: 'Stay warm in style with this premium cashmere coat. Features a tailored fit, double-breasted design, and soft inner lining.',
    price: 9600.00,
    image_urls: ['https://images.unsplash.com/photo-1542060748-10c28b62716f?q=80&w=1000'],
    categories: ['women'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Beige', 'Charcoal', 'Camel'],
    stock: 14
  },
  {
    id: '15',
    name: 'Urban Street Sneakers',
    description: 'Modern sneakers designed for comfort and everyday wear. Features breathable mesh, cushioned sole, and a sleek silhouette.',
    price: 3900.00,
    image_urls: [imageSneakers],
    categories: ['men'],
    sizes: ['7', '8', '9', '10', '11'],
    colors: ['White', 'Black', 'Grey'],
    stock: 40
  },
  {
    id: '16',
    name: 'Pearl Drop Necklace',
    description: 'Elegant freshwater pearl necklace with a minimalist drop design. Perfect for weddings and formal occasions.',
    price: 7800.00,
    image_urls: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000'],
    categories: ['jewellery', 'women'],
    sizes: ['One Size'],
    colors: ['White Pearl'],
    stock: 10
  },
  {
    id: '17',
    name: 'Slim Fit Linen Shirt',
    description: 'Lightweight linen shirt designed for breathable comfort. Ideal for warm climates with a clean, tailored look.',
    price: 2250.00,
    image_urls: ['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1000'],
    categories: ['men'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Sky Blue', 'Olive'],
    stock: 28
  },
  {
    id: '18',
    name: 'Crystal Heeled Sandals',
    description: 'Striking high-heeled sandals featuring crystal straps and a cushioned sole for comfort and glamour.',
    price: 4950.00,
    image_urls: ['https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000'],
    categories: ['women'],
    sizes: ['5', '6', '7', '8'],
    colors: ['Silver', 'Nude'],
    stock: 16
  },
  {
    id: '19',
    name: 'Leather Travel Duffel',
    description: 'Premium full-grain leather duffel bag designed for travel. Spacious interior with reinforced handles and detachable strap.',
    price: 82500.00,
    image_urls: ['https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1000'],
    categories: ['accessories', 'men'],
    sizes: ['One Size'],
    colors: ['Brown', 'Dark Tan'],
    stock: 12
  },
  {
    id: '20',
    name: 'Velvet Blazer Jacket',
    description: 'A statement velvet blazer with a tailored silhouette. Ideal for formal and semi-formal occasions.',
    price: 63000.00,
    image_urls: ['https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=1000'],
    categories: ['men'],
    sizes: ['M', 'L', 'XL'],
    colors: ['Midnight Blue', 'Black'],
    stock: 18
  },
  {
    id: '21',
    name: 'Chic Denim Jacket',
    description: 'Classic denim jacket with a modern twist. Features distressed detailing and a comfortable fit.',
    price: 36000.00,
    image_urls: ['https://images.unsplash.com/photo-1521336575822-6da63fb45455?q=80&w=1000'],
    categories: ['women'],
    sizes: ['S', 'M', 'L'],
    colors: ['Light Blue', 'Dark Blue'],
    stock: 22
  },
  {
    id: '22',
    name: 'Luxury Silk Scarf',
    description: 'Soft silk scarf with intricate patterns. Adds a touch of elegance to any outfit.',
    price: 25500.00,
    image_urls: ['https://images.unsplash.com/photo-1585386959984-a4155224a1ad?q=80&w=1000'],
    categories: ['accessories', 'women'],
    sizes: ['One Size'],
    colors: ['Multicolor', 'Red Pattern'],
    stock: 30
  },
  {
    id: '23',
    name: 'Diamond Stud Earrings',
    description: 'Classic 1ct diamond stud earrings in 14k white gold. A timeless piece of luxury.',
    price: 59700.00,
    image_urls: [image1],
    categories: ['jewellery', 'accessories', 'women'],
    sizes: ['One Size'],
    colors: ['White Gold'],
    stock: 15
  },
  {
    id: '24',
    name: 'Silver Chronograph',
    description: 'Precision engineered chronograph watch with stainless steel strap and sapphire glass.',
    price: 38700.00,
    image_urls: [image2],
    categories: ['watches', 'accessories', 'men'],
    sizes: ['One Size'],
    colors: ['Silver', 'Black Dial'],
    stock: 25
  },
  {
    id: '25',
    name: 'Silk Evening Gown',
    description: 'Flowing silk evening gown with a high slit and elegant draped neckline.',
    price: 74700.00,
    image_urls: [image3],
    categories: ['frocks', 'women'],
    sizes: ['S', 'M', 'L'],
    colors: ['Black', 'Wine Red', 'Champagne'],
    stock: 10
  },
  {
    id: '26',
    name: 'Luxury Leather Belt',
    description: 'Hand-stitched Italian leather belt with a polished silver buckle.',
    price: 14700.00,
    image_urls: [image4],
    categories: ['accessories', 'men'],
    sizes: ['S', 'M', 'L'],
    colors: ['Brown', 'Black'],
    stock: 35
  },
  {
    id: '27',
    name: 'Gold Pendant Necklace',
    description: '18k gold pendant necklace featuring a delicate chain and a minimalist sunburst design.',
    price: 47700.00,
    image_urls: [image5],
    categories: ['jewellery', 'accessories', 'women'],
    sizes: ['One Size'],
    colors: ['Gold'],
    stock: 20
  },
  {
    id: '28',
    name: 'Midnight Velvet Clutch',
    description: 'Premium velvet clutch with a detachable chain strap and silk lining.',
    price: 26700.00,
    image_urls: [image1],
    categories: ['accessories', 'women'],
    sizes: ['One Size'],
    colors: ['Black', 'Midnight Blue'],
    stock: 18
  },
  {
    id: '29',
    name: 'Rose Gold Bangle',
    description: 'Sleek rose gold bangle with subtle engraved details.',
    price: 33000.00,
    image_urls: [image5],
    categories: ['jewellery', 'accessories', 'women'],
    sizes: ['One Size'],
    colors: ['Rose Gold'],
    stock: 22
  },
  {
    id: '30',
    name: 'Titanium Sport Watch',
    description: 'Ultra-light titanium watch designed for active lifestyles.',
    price: 52500.00,
    image_urls: [image2],
    categories: ['watches', 'accessories', 'men'],
    sizes: ['One Size'],
    colors: ['Titanium Grey', 'Black'],
    stock: 28
  },
  {
    id: '31',
    name: 'Textured Flutter-Sleeve Midi',
    description: 'An elegant V-neck midi dress featuring a unique rippled texture and feminine flutter sleeves for a sophisticated silhouette.',
    price: 25500.00,
    image_urls: [image9],
    categories: ['dresses', 'women', 'formal'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Sand', 'Taupe'],
    stock: 45
  },
  {
    id: '32',
    name: 'Botanical Leaf Print Maxi',
    description: 'Relaxed-fit maxi dress with a bold green leaf motif, featuring a cinched drawstring waist and wide short sleeves for ultimate comfort.',
    price: 27600.00,
    image_urls: [image13],
    categories: ['dresses', 'women', 'casual'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Cream/Green'],
    stock: 32
  },
  {
    id: '33',
    name: 'Polka Dot Tea Dress',
    description: 'Classic vintage-inspired midi dress with a neat collar and puffed sleeves, finished in a charming black-on-mauve polka dot print.',
    price: 23400.00,
    image_urls: [image11],
    categories: ['dresses', 'women', 'vintage'],
    sizes: ['S', 'M', 'L'],
    colors: ['Mauve', 'Dusty Rose'],
    stock: 15
  },
  {
    id: '34',
    name: 'Tropical Palm Shift Dress',
    description: 'A lightweight shift dress featuring a notched neckline and ruffled 3/4 sleeves, adorned with a soft pink tropical palm illustration.',
    price: 19500.00,
    image_urls: [image12],
    categories: ['dresses', 'women', 'resort'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Blush/White'],
    stock: 50
  },
  {
    id: '35',
    name: 'Damask Print Smocked Midi',
    description: 'A high-contrast midi dress with a traditional damask pattern, featuring a smocked waist and tie-neck detail for a tailored yet comfortable fit.',
    price: 33000.00,
    image_urls: [image10],
    categories: ['dresses', 'women', 'evening'],
    sizes: ['S', 'M', 'L'],
    colors: ['Cream/Black'],
    stock: 22
  }
  ,
  {
    id: '36',
    name: "Floral Mandarin Blouse",
    description: "Elegant long-sleeve blouse featuring a soft floral print and a sophisticated mandarin collar. Crafted from premium breathable rayon.",
    price: 7900.00,
    image_urls: [image16],
    categories: ['dresses', 'women', 'evening'],
    sizes: ['S', 'M', 'L'],
    colors: ['Cream/Black'],
    stock: 22
  },
  {
    id: '37',
    name: "Pastel Button-Down Kurta",
    description: "Versatile 3/4 sleeve tunic with detailed button placket and pleated cuff accents. Ideal for both office and casual ethnic wear.",
    price: 3500.00,
    image_urls: [image17],
    categories: ['dresses', 'women', 'resort'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Blush/White'],
    stock: 50
  },
  {
    id: '38',
    name: "Peach Oxford Shirt",
    description: "Premium 100% cotton-blend button-down shirt in a soft peach hue, tailored for a clean, slim-fit silhouette.",
    price: 7200.00,
    image_urls: [image18],
    categories: ['dresses', 'men', 'resort'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Blush/White'],
    stock: 50
  },
  {
    id: '39',
    name: "Botanical Silk-Blend Blouse",
    description: "Luxe v-neck top featuring a deep teal base with oversized cream floral illustrations. Smooth, lightweight finish.",
    price: 1050.00,
    image_urls: [image19],
    categories: ['dresses', 'women', 'resort'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Blush/White'],
    stock: 50
  },
  {
    id: '40',
    name: "Tiered Garden Midi",
    description: "Flowy camisole-style midi dress with a tiered skirt and a classic forest green botanical pattern. Perfect for summer events.",
    price: 1610.00,
    image_urls: [image20],
    categories: ['dresses', 'women', 'resort'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Blush/White'],
    stock: 50
  }
];




export const categories = [
  { name: 'Women\'s Collection', image: women_category, count: '10 Items', link: '/products?category=women', gradient: 'from-pink-500/20 to-rose-500/20' },
  { name: 'Elegant Frocks', image: frocks_category, count: '15 Items', link: '/products?category=frocks', gradient: 'from-pink-500/20 to-purple-500/20' },
  { name: 'Luxury Watches', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1000', count: '13 Items', link: '/products?category=watches', gradient: 'from-blue-500/20 to-cyan-500/20' },
  { name: 'Fine Jewellery', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000', count: '12 Items', link: '/products?category=jewellery', gradient: 'from-amber-500/20 to-yellow-500/20' },
  { name: 'Men\'s Style', image: men_category, count: '12 Items', link: '/products?category=men', gradient: 'from-gray-500/20 to-slate-500/20' },
  { name: 'Accessories', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000', count: '15 Items', link: '/products?category=accessories', gradient: 'from-green-500/20 to-emerald-500/20' },
];


export const features = [
  { icon: Truck, title: "Free Shipping", desc: "On all orders over Rs. 5,000", color: "blue" },
  { icon: RotateCcw, title: "30-Day Returns", desc: "Easy exchanges and returns", color: "green" },
  { icon: Sparkles, title: "Premium Quality", desc: "Sourced from best craftsmen", color: "purple" },
  { icon: Percent, title: "Seasonal Offers", desc: "Up to 50% off on collections", color: "orange" }
];
