import { Project, EducationItem } from './types';
import Image from './assets/images/1img.jpg';


export const HEADER_LINKS = [
  { name: 'Home', href: '#' },
  { name: 'Projects', href: '#projects' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

export const PORTFOLIO_ITEMS: Project[] = [
  {
    id: 'featured-1',
    title: 'Nexus Branding',
    category: 'Logos & Identity',
    description: 'A structural identity system for a next-generation technology collective. The project explores the intersection of brutalist architecture and digital fluidity.',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1561070791-2dc6dbad5d7f?auto=format&fit=crop&q=80&w=1200'
    ],
    size: 'col-span-2 row-span-2',
    tags: ['Branding', 'Identity', 'System']
  },
  {
    id: 'featured-2',
    title: 'Social Pulsar',
    category: 'Social Media',
    description: 'High-energy social media sequences designed for a global electronic music festival. Focusing on rhythmic typography and high-contrast motion artifacts.',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&q=80&w=1200'
    ],
    size: 'col-span-1 row-span-1',
    tags: ['Motion', 'Social', 'Campaign']
  },
  {
    id: 'featured-3',
    title: 'Ether UI',
    category: 'UI/UX Design',
    description: 'A minimalist user interface for an experimental decentralized exchange. The design prioritizes clarity of data and architectural user flows.',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=1200'
    ],
    size: 'col-span-1 row-span-2',
    tags: ['UI/UX', 'Product', 'Digital']
  },
  {
    id: 'featured-4',
    title: 'Vivid Typography',
    category: 'Layouts',
    description: 'An exploration of contemporary editorial design in digital spaces. Leveraging bold grids and Swiss-inspired layout principles.',
    image: 'https://images.unsplash.com/photo-1561070791-2dc6dbad5d7f?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1561070791-2dc6dbad5d7f?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1554446422-d05db23719d2?auto=format&fit=crop&q=80&w=1200'
    ],
    size: 'col-span-1 row-span-1',
    tags: ['Typography', 'Editorial', 'Layout']
  },
];

export const SKILL_TAGS = [
  'Branding', 'UI/UX', '3D Modeling', 'Typography', 
  'Motion Graphics', 'Illustration', 'Brand Strategy', 
  'Iconography', 'Visual Design', 'Art Direction'
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    year: '2020 — 2024',
    title: 'Bachelor of Fine Arts in Graphic Design',
    institution: 'Royal Academy of Arts',
    description: 'Focused on visual communication, typography, and interactive media. Graduated with honors, specialized in sustainable branding systems.',
    tags: ['Graphic Design', 'Visual Arts', 'Theory']
  },
  {
    year: '2024',
    title: 'Advanced 3D & Spatial Design Certification',
    institution: 'Future Bauhaus Institute',
    description: 'Intensive program exploring the intersection of architectural principles and digital 3D environments using Cinema4D and Unreal Engine.',
    tags: ['3D Modeling', 'Spatial Design', 'VR/AR']
  },
  {
    year: '2023',
    title: 'UI/UX & Human-Centered Design',
    institution: 'Interaction Design Foundation',
    description: 'Specialization in accessibility, user psychology, and complex design systems for enterprise applications.',
    tags: ['UX Strategy', 'Accessibility', 'Systems']
  },
  {
    year: '2022',
    title: 'Motion Graphics Masterclass',
    institution: 'The Futur Studio',
    description: 'Workshop focused on digital storytelling through animation and rhythmic layout transitions.',
    tags: ['After Effects', 'Animation', 'Directing']
  }
];

export const CATEGORIES = ['Branding', 'SOCIAL CAMPAIGNS', 'PACKAGING', 'Typography', 'EDITORIAL DESIGN', 'VIDEO EDITING', 'Illustration', 'Art Direction'];
export const YEARS = ['2026', '2025', '2024', '2023', '2022'];

export const ARCHIVE_PROJECTS: Project[] = Array.from({ length: 50 }).map((_, i) => {
  const category = CATEGORIES[i % CATEGORIES.length];
  const year = YEARS[i % YEARS.length];
  const titles = [
    'Solaris Identity', 'Neon Nights', 'Pulse Fintech', 'Ethereal Exhibition', 'Chromatic Flow',
    'Apex Logistics', 'Lunar Coffee', 'Vanguard Security', 'Oasis Spa', 'Nebula OS',
    'Titan Sportswear', 'Velvet Bakery', 'Zephyr Aviation', 'Horizon Music', 'Cipher Crypto',
    'Aura Wellness', 'Prism Agency', 'Ignite Energy', 'Summit Outdoors', 'Flow State',
    'Mantle Real Estate', 'Drift Automotive', 'Spire Architecture', 'Aether Fragrance', 'Vector VR',
    'Origin Furniture', 'Kinetik Studio', 'Fable Publishing', 'Nova Fashion', 'Flux Media',
    'Stratos Cloud', 'Terra Agriculture', 'Helix Pharma', 'Quill Legal', 'Brio Beverage',
    'Nomad Travel', 'Orbit Aerospace', 'Saga Gaming', 'Dune Interior', 'Axis Consulting',
    'Rift Tech', 'Bloom Florist', 'Loom Textiles', 'Forge Jewelry', 'Echo Audio',
    'Glint Skincare', 'Crest Finance', 'Path Education', 'Spark Charity', 'Visions Studio'
  ];
  
  const descriptions = [
    'A comprehensive brand identity focused on organic growth and sustainability.',
    'A high-energy social media campaign blending cyberpunk aesthetics with modern layouts.',
    'Minimalist mobile interface prioritizing user flow and financial data visualization.',
    'Exploration of negative space and bold typography for contemporary art galleries.',
    'Experimental motion piece exploring fluid dynamics and procedural color palettes.',
    'Corporate rebranding for global logistics, emphasizing speed and connectivity.',
    'Artisanal coffee packaging design using handmade illustrations and recycled materials.',
    'UI design for a next-gen security platform featuring real-time data monitoring.',
    'Soft, tranquil visual identity for a luxury wellness retreat in the mountains.',
    'Futuristic operating system concept focusing on spatial computing and glass UI.',
    'Dynamic typography and bold grids for a performance-focused apparel brand.',
    'Elegant packaging using gold foil and pastel gradients for a boutique bakery.',
    'Clean, professional branding for a private jet charter company.',
    'Abstract visual identity for a music streaming service centered on rhythm.',
    'Crypto wallet interface design with complex data turned into simple visuals.',
    'Holistic wellness app UI focused on meditation and habit tracking.',
    'Minimalist creative agency portfolio highlighting white space and typography.',
    'High-voltage branding for an renewable energy startup targeting Gen Z.',
    'Rugged, nature-inspired visual systems for outdoor gear manufacturers.',
    'Experimental typography project exploring the fluidity of letterforms.',
    'Structured, professional branding for modern commercial real estate.',
    'Sleek, aerodynamic visual language for an electric vehicle manufacturer.',
    'Editorial design for a premier architecture and design magazine.',
    'Sensory-focused packaging for an artisanal fragrance line.',
    'Immersive UI design for a virtual reality workspace application.',
    'Clean, minimalist branding for a sustainable furniture manufacturer.',
    'Industrial-chic visual identity for an urban movement and dance studio.',
    'Story-driven book cover series for a collection of modern folklore.',
    'High-fashion editorial layout for a seasonal trend lookbook.',
    'Vibrant, data-driven visual system for a digital media conglomerate.',
    'Tech-forward UI design for an enterprise cloud management dashboard.',
    'Organic, earthy branding for a modern sustainable farming initiative.',
    'Precise, scientific visual identity for a biotechnology startup.',
    'Authoritative yet approachable branding for a boutique law firm.',
    'Playful, energetic packaging for a functional sparkling beverage.',
    'Adventure-focused visual identity for a boutique travel agency.',
    'Futuristic corporate identity for a space exploration venture.',
    'Immersive user interface for a competitive multiplayer gaming hub.',
    'Warm, tactile branding for a bespoke interior design studio.',
    'Professional, geometric visual system for a management consulting firm.',
    'High-tech visual language for a software development collective.',
    'Delicate, floral-inspired identity for a premier metropolitan florist.',
    'Textured, craft-focused branding for a sustainable textile manufacturer.',
    'Sophisticated, minimal identity for a high-end custom jewelry brand.',
    'Acoustic-inspired visual design for a professional audio equipment line.',
    'Ethereal, clean packaging for a high-performance skincare range.',
    'Trust-focused visual identity for a modern investment platform.',
    'Engaging, clear visual system for an online learning community.',
    'Heartfelt, community-driven branding for a global non-profit.',
    'The final evolution of this portfolio—representing the studio itself.'
  ];

  return {
    id: i + 1,
    title: titles[i % titles.length],
    category: category,
    year: year,
    description: descriptions[i % descriptions.length],
    image: `https://images.unsplash.com/photo-${[
      '1626785774573-4b799315345d', '1611162617474-5b21e879e113', '1558655146-d09347e92766', 
      '1561070791-2dc6dbad5d7f', '1618005182384-a83a8bd57fbe', '1554446422-d05db23719d2',
      '1581291518633-83b4ebd1d83e', '1559028012-481c04fa702d', '1605379399642-870262d3d051',
      '1531403009284-440f080d1e12'
    ][i % 10]}?auto=format&fit=crop&q=80&w=800`,
    gallery: [
      `https://images.unsplash.com/photo-${['1626785774573-4b799315345d', '1611162617474-5b21e879e113', '1558655146-d09347e92766', '1561070791-2dc6dbad5d7f'][(i + 1) % 4]}?auto=format&fit=crop&q=80&w=1200`,
      `https://images.unsplash.com/photo-${['1618005182384-a83a8bd57fbe', '1554446422-d05db23719d2', '1581291518633-83b4ebd1d83e', '1559028012-481c04fa702d'][(i + 2) % 4]}?auto=format&fit=crop&q=80&w=1200`,
      `https://images.unsplash.com/photo-${['1605379399642-870262d3d051', '1531403009284-440f080d1e12', '1626785774573-4b799315345d'][(i + 3) % 3]}?auto=format&fit=crop&q=80&w=1200`
    ],
    tags: [category.split(' ')[0], 'Digital', 'Creative']
  };
});
