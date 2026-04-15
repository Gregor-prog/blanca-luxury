export type Category = 'ALL' | 'FURNITURE' | 'DECOR' | 'DRAPERY' | 'FRAGRANCES' | 'OFFICE';

export interface Product {
  id: string;
  name: string;
  category: Category;
  origin: string;
  price: number;
  imageUrl: string;
  imageAlt: string;
  images: string[];
  description: string;
  materials: string;
  dimensions: string;
  leadTime: string;
  tagline: string;
}

const defaultGalleryImages = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAzDvMTUqp90zEKI98H5UGKnMj66A2Wxu_HkbqivwqiMzchveCoQK4RqNkRphTOzdOjij46R7rPSnXDBx9IWy08i43UMXNBYENay38p68v27eDfX2fNxlVPKy7smdNnTwHbflpV-sD7YDLZaek2RLSSW4JutxWfpSethNIadKRiZVYzNbCwtVwKu4oG6tlrG5SqQCM_9q3S3yinHIGjlZll-dOYydMdsD4rGWOAXtdoEqxGGqHRA8R862nqU8tf_WWhVbGELwnbOFyM",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA3qivZaP5S9PYlK7-oTAYMf4xMuWHXSlUVCa34CWBCkRnpeXgkRVYcGlwwbn1Di1bL1l_VC2u5oCNPSslLexNJRQNJhA5yVdi-lLhJa_2dA57vXbS6jvU-ZSmu_yzxZSZ9QIg96S4sFEE7_S1Jf9-YstNNTc1VL9a23MaW657t_a9tgbfIsQte-oBZ2T5FTwZQcw-_JfptMOvs5v5NYCGXwaKCj0pzpzfUFPtgFUoh-JNU8CNDvuFPs55wHu6SZMM8Igxxtgtsjc-_",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCKWgAUcaiNzEMhRRNNjyEJlwRxLbPl68gG6BWiEYRKDI2dbU-tHATcsuCyXW0JOaUBj_HR4b-bi6gyYL5JPzGlKQbjH8kYUxzNLj5BDdZMjHbsRynpj0QldLcrumJyq35nireZvDL_n6fJ7kmoyD1bYWskoK8J19HusBI9tjfTMuOUKvuWzBdbX0Ksu12e4Hb77qwqjzMV1YgDhBCkHB-szNz-7n61YM5wySaEonY4Mo9Z0JUIRKjW2paGwdIG9bjskcD1h1Ex0SlC",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAQFOPzpIYSmZXk8UWTssvSW0uRaOqTo_HEYlywacjHLo2Vdh7XObldbR_95Om4B46lnWmUyCdWYwaZ8AM4nyY-uM6KaVPshCXnzoWRTXw173F3I_uuwxlTFg96Og6zaJcWMs1tL2ekEo0HLWYj9QehMBcXDSfgbSblmAclClCK6tMvjobRKIp9e8ywjiEC8LWfeWmkkuAt3t-VoZfj-PA5rLsNFAB9YTMkAJKCyLu9OvmIRdobse2GXBlMLB-WTW1OQ0Z_MMYLUFeG",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDfKXyixEpfk7hl51tH6bjjmt-NdnGsA6Nm-mxvYrrn32L9pRD2mBuYw6No832ggu10yRon6Ezqgh7bVaY0Mn83Sw4UdqHzpkINT7_8CYfO_n5UtyRs2s-s0s_f9p9UlWH8iVx_oCfcQnEP7RTDICrSZiFq9o362NHP67oWMtOo0m9gwS9nLLln3LFnfJXeLGwxTUxUrRRMKxtJkDNXMLZeuZiXBLjgwrGXzN0JNUvsm8r77lvEct74djv5xC4LXVDcZ7z9LpOJ32R8"
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'The Muse Armchair',
    category: 'FURNITURE',
    origin: 'Milano, Italy',
    price: 2850,
    imageUrl: defaultGalleryImages[0],
    imageAlt: 'luxury modern armchair with dark walnut frame',
    images: defaultGalleryImages,
    description: 'Designed as a meditation on form and comfort, The Muse represents a harmonious balance between organic curves and architectural precision. Each piece is carved from select European walnut, hand-finished with natural oils to preserve the living warmth of the grain.',
    materials: 'Walnut & Cognac Leather',
    dimensions: 'W 85cm x D 90cm x H 75cm',
    leadTime: '12-14 Weeks',
    tagline: 'A sculptural sanctuary handcrafted in solid walnut.'
  },
  {
    id: '2',
    name: 'Mouth-Blown Decanter',
    category: 'DECOR',
    origin: 'Florence, Italy',
    price: 890,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDi1JrD2Dmm0Gj-SKmGEyHoqeZaPpH-VVrNKL3b90U_c7_5G6JlrFqoCiKT-uPzFuU35KADJkfzxIeWSx64M0RK6dl5gL1L4NzpyAt7gpYAf9EX-7MDFe-pyehu8jPhRxdwoIXKZTmwhm83IJ8T9oXTompKBZc1ytT37Cb7LJeLc_7aZ2D6VPkClXyKxtc2rc6zM6FYttykuhBLreJ0vf-7zMUbN0hksGk5U1Ta6H_aFCgenEmX8KEk0L4X1OHQRrqHmeJO9n8vKmLx',
    imageAlt: 'luxury crystal glass carafe and matching tumblers set on a rough marble tray with dramatic evening shadows',
    images: defaultGalleryImages,
    description: 'Crafted by master artisans in Italy, this mouth-blown decanter elevates any dining experience.',
    materials: 'Lead-free Crystal',
    dimensions: 'H 30cm x W 15cm',
    leadTime: '4-6 Weeks',
    tagline: 'A statement of clarity and elegance.'
  },
  {
    id: '3',
    name: 'Belgian Linen Panels',
    category: 'DRAPERY',
    origin: 'Flanders, Belgium',
    price: 1400,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACU-8lgizSccPFF5G_OhLy6wgMN2dzCoaqhN2nlIOuSl-tNfTP08WwLlTWorypHPAY3kLNtbfVW7O9tDKez21ob_aLb0RpsGN7bbMdB-l7fzOpF8YZeLXX4uAyXTCy-JvtTIPcz1WuQxOKRjvVbtpToId9V9AE7qaKRxaOs9oOoSW-u202Q48Q9V5kktU-OFg006q7UIw_uQA7k2DhX-HsbBeeArIZXeZyXJJ36R-Ltw27pOGegGWO5aC2niT-jefl1JmO8ugxYIWN',
    imageAlt: 'thick natural linen curtains in oatmeal color hanging from a dark bronze rod in a bright airy room',
    images: defaultGalleryImages,
    description: 'Woven in the Flanders region, these Belgian linen panels offer unparalleled texture and light filtration.',
    materials: '100% Belgian Linen',
    dimensions: 'W 120cm x H 300cm',
    leadTime: '6-8 Weeks',
    tagline: 'Soft light, woven heritage.'
  },
  {
    id: '4',
    name: 'Nightfall in Grasse',
    category: 'FRAGRANCES',
    origin: 'Grasse, France',
    price: 215,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVaq5dK9GAf_hxElO4If9LNiNc2aelOCqWmojrgpBJDUJo7HHIkLkEMuZ7PVLWrUzFZzxoxffx9WFgzawRZ9o8RPCo5AYFU_wAhHhM0Q68_EdiJ7KMJpWWKdqKGAYrV51ZckZr7lvEsPdD2Bbmep1mwa1ZhZYuYEVVXQ9tvRZg9sRhjjhBOR83PChftF9er5qCOWc2n3OVk-M6GGuhXkDKJp8Ce19jjL-soEH1Q3Wh02RPxNtWamKJwPrfBrkymc1K3su5uuXg7Mic',
    imageAlt: 'luxury glass candle with amber liquid on a dark walnut shelf next to a stack of vintage books',
    images: defaultGalleryImages,
    description: 'Pure essential oils hand-poured in a luxury glass candle. A deep, woody fragrance that evokes evening falling over the French Riviera.',
    materials: 'Soy Wax & Essential Oils',
    dimensions: '300g (10.5oz)',
    leadTime: 'Ready to Ship',
    tagline: 'The essence of a Mediterranean evening.'
  }
];

export async function fetchProducts(category: Category): Promise<Product[]> {
  await new Promise(resolve => setTimeout(resolve, 1000));
  if (category === 'ALL') return mockProducts;
  return mockProducts.filter(p => p.category === category);
}

export async function fetchProductById(id: string): Promise<Product | undefined> {
  await new Promise(resolve => setTimeout(resolve, 800));
  return mockProducts.find(p => p.id === id);
}

export async function fetchRelatedProducts(currentId: string): Promise<Product[]> {
  await new Promise(resolve => setTimeout(resolve, 600));
  return mockProducts.filter(p => p.id !== currentId).slice(0, 4);
}

// ----- PORTFOLIO PROJECTS -----

export type ProjectCategory = 'ALL' | 'RESIDENTIAL' | 'COMMERCIAL' | 'GOVERNMENT' | 'HOSPITALITY' | 'MEDICAL';

export interface Project {
  id: string;
  title: string;
  location: string;
  year: string;
  category: ProjectCategory;
  imageUrl: string;
  imageAlt: string;
}

export const mockProjects: Project[] = [
  {
    id: 'p1',
    title: 'The River State Secretariat',
    location: 'Port Harcourt',
    year: '2024',
    category: 'GOVERNMENT',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRjZTqfNBGsOkW9ehCu47ndmWJy_JYuwQW5LEN-rZq1EAZap1ssYxESdBYcKz1zcq53Him_p8d4AYNXTFI5oBxDf0M0rUeGzDLl5Pk2W-Hef49xzvMGGLM0BRmnw98CZLxTXrOzvqEyjYsjpkXyf_ukK5vS-AFJaukjgi1Ja8CXDOOVcge96LpBy_2ydiBlWo2bTwgvEig5MG-zpP92gMvJ8G7hhQ-gxljlXT6Dp72krJErBS5_uHNrivBWNpoeFoKVOiROZmTQ6bJ',
    imageAlt: 'ultra-luxury architectural lobby with soaring ceilings'
  },
  {
    id: 'p2',
    title: 'Victoria Island Penthouse',
    location: 'Lagos',
    year: '2025',
    category: 'RESIDENTIAL',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbtl1rEYLSn_juZ7hC52qrPJ_58sHjbitEda-ArmEdz8l10RZ77FiygP4m8IM6fx70Kqf5CWJLzWKc2kAJwevWNt53YjPt6_RkGRVj_-XOw-twjSf1gQW0vlXoAFclv1ReegCfpaejtn7ewMZMW2qH0y7egoN5QpB7fbihz5ETl26mVhFezmAmtez2lMwONmmsGVO9tEGLzOkBU_M3-wy5rrD-lLerQJvCLUUNlwUV8HPJZU4LKMUfob7L1JJsmbkF7NxeY06Qlwpg',
    imageAlt: 'minimalist modern penthouse interior in Victoria Island'
  },
  {
    id: 'p3',
    title: 'Abuja Diplomatic Suite',
    location: 'Abuja',
    year: '2024',
    category: 'GOVERNMENT',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAK141oLCLCBAVLxX9BEtvxZG1PpMhyqykN2FanrUjAK65kfnWcumvAXz2Ym9z-EX--o7vYu3845CV7IT3YbtxxCv7pytwPqr2_oNQikHofB1aY2GNkDmTdQqie_ybyilAcEhVajkn_s-TCL3B9Xdxari4AxdBPq9Pz80uUcg94ikB9F2IZulgxNnZhr3LcotdCocsW0CdSukYHmZU3aUg3J_Tr6NBp8vwoLy4aoJ8xccgT6ANdtFOv46JpCg4M0SSM8gmwQ6ArPT0',
    imageAlt: 'luxurious diplomatic suite in Abuja'
  },
  {
    id: 'p4',
    title: 'Ikoyi Corporate Headquarters',
    location: 'Lagos',
    year: '2023',
    category: 'COMMERCIAL',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKWgAUcaiNzEMhRRNNjyEJlwRxLbPl68gG6BWiEYRKDI2dbU-tHATcsuCyXW0JOaUBj_HR4b-bi6gyYL5JPzGlKQbjH8kYUxzNLj5BDdZMjHbsRynpj0QldLcrumJyq35nireZvDL_n6fJ7kmoyD1bYWskoK8J19HusBI9tjfTMuOUKvuWzBdbX0Ksu12e4Hb77qwqjzMV1YgDhBCkHB-szNz-7n61YM5wySaEonY4Mo9Z0JUIRKjW2paGwdIG9bjskcD1h1Ex0SlC',
    imageAlt: 'sleek office building interior'
  },
  {
    id: 'p5',
    title: 'Eko Grand Hotel',
    location: 'Lagos',
    year: '2022',
    category: 'HOSPITALITY',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDi1JrD2Dmm0Gj-SKmGEyHoqeZaPpH-VVrNKL3b90U_c7_5G6JlrFqoCiKT-uPzFuU35KADJkfzxIeWSx64M0RK6dl5gL1L4NzpyAt7gpYAf9EX-7MDFe-pyehu8jPhRxdwoIXKZTmwhm83IJ8T9oXTompKBZc1ytT37Cb7LJeLc_7aZ2D6VPkClXyKxtc2rc6zM6FYttykuhBLreJ0vf-7zMUbN0hksGk5U1Ta6H_aFCgenEmX8KEk0L4X1OHQRrqHmeJO9n8vKmLx',
    imageAlt: 'grand hotel lobby with crystal chandeliers'
  }
];

export async function fetchProjects(category: ProjectCategory): Promise<Project[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  if (category === 'ALL') return mockProjects;
  return mockProjects.filter(p => p.category === category);
}
