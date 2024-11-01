import { Request, Response } from 'express';
import Product, { IProduct } from '../models/Product.model';

const productsdumb = [
  {
    "id": 1,
    "name": "Luxury Fragrance Gift Set",
    "brand": "Premium Scents",
    "category": "Fragrances",
    "description": "A premium collection of luxurious perfumes perfect for any occasion.",
    "price": 120.99,
    "currency": "ILS",
    "image": "luxury_fragrance.jpg",
    "additionalImages": [
      "luxury_fragrance_1.jpg",
      "luxury_fragrance_2.jpg",
      "luxury_fragrance_3.jpg"
    ],
    "tags": ["luxury", "fragrance", "perfume", "gift"],
    "occasion": ["Birthday", "Anniversary", "Corporate"],
    "personalization": true,
    "inStock": true,
    "type": "Accessories",
    "SKU": 70413,
    "productCode": "LFG-001",
    "salesCount": 4,
    "dateAdded": "Tue Oct 17 2024 17:06:55 GMT+0300",
    "rating": 3,
    "deliveryTime": "24 hours",
    "estimatedDeliveryDate": "Oct 20, 2024",
    "features": [
      "Set of 3 premium fragrances",
      "Long-lasting scent",
      "Elegant packaging"
    ],
    "peopleAlsoBuy": [
      { "name": "Gourmet Food Hamper", "price": 89.99 },
      { "name": "Customized Mug with Video Message", "price": 19.99 }
    ]
  },
  {
    "id": 2,
    "name": "Gourmet Food Hamper",
    "brand": "Deluxe Treats",
    "category": "Gourmet Hampers",
    "description": "An exquisite selection of gourmet treats including chocolates, nuts, and fine wines.",
    "price": 89.99,
    "currency": "ILS",
    "image": "gourmet_hamper.jpg",
    "additionalImages": [
      "gourmet_hamper_1.jpg",
      "gourmet_hamper_2.jpg",
      "gourmet_hamper_3.jpg"
    ],
    "tags": ["gourmet", "food", "hamper", "gift"],
    "occasion": ["Anniversary", "Corporate", "Just Because"],
    "personalization": true,
    "type": "Accessories",
    "SKU": 70414,
    "inStock": false,
    "productCode": "GFH-002",
    "salesCount": 3,
    "rating": 3,
    "dateAdded": "Tue Oct 17 2024 17:06:55 GMT+0300",
    "deliveryTime": "48 hours",
    "estimatedDeliveryDate": "Oct 21, 2024",
    "features": [
      "Assortment of premium chocolates",
      "Selection of gourmet nuts",
      "Bottle of fine wine"
    ],
    "peopleAlsoBuy": [
      { "name": "Luxury Fragrance Gift Set", "price": 120.99 },
      { "name": "Spa & Relaxation Experience", "price": 150.00 }
    ]
  },
  {
    "id": 3,
    "name": "Elegant Diamond Necklace",
    "brand": "Luxe Jewels",
    "category": "Jewelry",
    "description": "A stunning diamond necklace to add a touch of elegance to any special moment.",
    "price": 499.99,
    "rating": 3,
    "currency": "ILS",
    "image": "diamond_necklace.jpg",
    "additionalImages": [
      "diamond_necklace_1.jpg",
      "diamond_necklace_2.jpg",
      "diamond_necklace_3.jpg"
    ],
    "tags": ["jewelry", "necklace", "diamond", "luxury", "gift"],
    "occasion": ["Anniversary", "Birthday"],
    "personalization": false,
    "type": "Accessories",
    "SKU": 70415,
    "productCode": "EDN-003",
    "inStock": true,
    "salesCount": 110,
    "dateAdded": "Tue Oct 17 2024 17:06:55 GMT+0300",
    "deliveryTime": "72 hours",
    "estimatedDeliveryDate": "Oct 22, 2024",
    "features": [
      "0.5 carat diamond pendant",
      "18k white gold chain",
      "Secure clasp"
    ],
    "peopleAlsoBuy": [
      { "name": "Luxury Fragrance Gift Set", "price": 120.99 },
      { "name": "Spa & Relaxation Experience", "price": 150.00 }
    ]
  },
  {
    "id": 4,
    "name": "Spa & Relaxation Experience",
    "brand": "Serenity Spa",
    "category": "Experiences",
    "description": "A rejuvenating spa day experience to pamper yourself or a loved one.",
    "price": 150.00,
    "rating": 3,
    "currency": "ILS",
    "image": "spa_experience.jpg",
    "additionalImages": [
      "spa_experience_1.jpg",
      "spa_experience_2.jpg",
      "spa_experience_3.jpg"
    ],
    "tags": ["experience", "spa", "relaxation", "gift"],
    "occasion": ["Just Because", "Birthday", "Corporate"],
    "personalization": false,
    "type": "Experiences",
    "SKU": 70416,
    "inStock": true,
    "productCode": "SRE-004",
    "salesCount": 3,
    "dateAdded": "Tue Oct 17 2024 17:06:55 GMT+0300",
    "deliveryTime": "Instant E-Voucher",
    "estimatedDeliveryDate": "Immediate",
    "features": [
      "Full body massage",
      "Facial treatment",
      "Access to spa facilities"
    ],
    "peopleAlsoBuy": [
      { "name": "Luxury Fragrance Gift Set", "price": 120.99 },
      { "name": "Gourmet Food Hamper", "price": 89.99 }
    ]
  },
  {
    "id": 5,
    "name": "Customized Mug with Video Message",
    "brand": "Personal Touch",
    "category": "Personalized Gifts",
    "description": "A personalized mug with a custom design and a unique video message to show you care.",
    "price": 19.99,
    "rating": 3,
    "currency": "ILS",
    "image": "custom_mug.jpg",
    "additionalImages": [
      "custom_mug_1.jpg",
      "custom_mug_2.jpg",
      "custom_mug_3.jpg"
    ],
    "tags": ["personalized", "mug", "video", "gift"],
    "occasion": ["Just Because", "Birthday"],
    "personalization": true,
    "inStock": true,
    "type": "Accessories",
    "SKU": 70417,
    "productCode": "CMV-005",
    "salesCount": 0,
    "dateAdded": "Tue Oct 17 2024 17:06:55 GMT+0300",
    "deliveryTime": "5-7 business days",
    "estimatedDeliveryDate": "Oct 25, 2024",
    "features": [
      "Customizable mug design",
      "Embedded QR code for video message",
      "Dishwasher and microwave safe"
    ],
    "peopleAlsoBuy": [
      { "name": "Gourmet Food Hamper", "price": 89.99 },
      { "name": "Spa & Relaxation Experience", "price": 150.00 }
    ]
  },
  {
    "id": 6,
    "name": "Handmade Ceramic Vase",
    "brand": "Artisan Creations",
    "category": "Home Decor",
    "description": "A beautifully crafted ceramic vase with an elegant design, perfect for any room.",
    "price": 45.00,
    "currency": "ILS",
    "image": "ceramic_vase.jpg",
    "additionalImages": [
      "ceramic_vase_1.jpg",
      "ceramic_vase_2.jpg"
    ],
    "tags": ["home decor", "ceramic", "vase", "handmade"],
    "occasion": ["Housewarming", "Anniversary"],
    "personalization": false,
    "inStock": true,
    "type": "Decor",
    "SKU": 70418,
    "productCode": "HCV-006",
    "salesCount": 10,
    "rating": 4,
    "deliveryTime": "48 hours",
    "estimatedDeliveryDate": "Oct 21, 2024",
    "features": [
      "Handmade ceramic material",
      "Unique design",
      "Ideal for flowers or decorative use"
    ],
    "peopleAlsoBuy": [
      { "name": "Customized Mug with Video Message", "price": 19.99 },
      { "name": "Gourmet Food Hamper", "price": 89.99 }
    ]
  },
  {
    "id": 7,
    "name": "Wireless Earbuds",
    "brand": "SoundWave",
    "category": "Electronics",
    "description": "High-quality wireless earbuds with noise-cancellation and long battery life.",
    "price": 79.99,
    "currency": "ILS",
    "image": "wireless_earbuds.jpg",
    "additionalImages": [
      "wireless_earbuds_1.jpg",
      "wireless_earbuds_2.jpg"
    ],
    "tags": ["electronics", "audio", "wireless", "earbuds"],
    "occasion": ["Birthday", "Corporate"],
    "personalization": false,
    "inStock": true,
    "type": "Electronics",
    "SKU": 70419,
    "productCode": "SWE-007",
    "salesCount": 15,
    "rating": 5,
    "deliveryTime": "24 hours",
    "estimatedDeliveryDate": "Oct 20, 2024",
    "features": [
      "Noise-cancelling technology",
      "Bluetooth connectivity",
      "12-hour battery life"
    ],
    "peopleAlsoBuy": [
      { "name": "Elegant Diamond Necklace", "price": 499.99 },
      { "name": "Customized Mug with Video Message", "price": 19.99 }
    ]
  },
  {
    "id": 8,
    "name": "Organic Skincare Set",
    "brand": "Nature's Touch",
    "category": "Beauty & Health",
    "description": "A natural skincare set including cleanser, moisturizer, and serum.",
    "price": 99.99,
    "currency": "ILS",
    "image": "skincare_set.jpg",
    "additionalImages": [
      "skincare_set_1.jpg",
      "skincare_set_2.jpg"
    ],
    "tags": ["beauty", "health", "organic", "skincare"],
    "occasion": ["Birthday", "Anniversary"],
    "personalization": false,
    "inStock": true,
    "type": "Health",
    "SKU": 70420,
    "productCode": "OSS-008",
    "salesCount": 5,
    "rating": 4,
    "deliveryTime": "24 hours",
    "estimatedDeliveryDate": "Oct 20, 2024",
    "features": [
      "Made with organic ingredients",
      "No artificial chemicals",
      "Suitable for all skin types"
    ],
    "peopleAlsoBuy": [
      { "name": "Spa & Relaxation Experience", "price": 150.00 },
      { "name": "Luxury Fragrance Gift Set", "price": 120.99 }
    ]
  },
  {
    "id": 9,
    "name": "Portable Power Bank",
    "brand": "ChargeTech",
    "category": "Electronics",
    "description": "Compact and powerful power bank to charge devices on the go.",
    "price": 29.99,
    "currency": "ILS",
    "image": "power_bank.jpg",
    "additionalImages": [
      "power_bank_1.jpg",
      "power_bank_2.jpg"
    ],
    "tags": ["electronics", "charging", "portable"],
    "occasion": ["Just Because", "Corporate"],
    "personalization": false,
    "inStock": true,
    "type": "Accessories",
    "SKU": 70421,
    "productCode": "CPB-009",
    "salesCount": 25,
    "rating": 4,
    "deliveryTime": "24 hours",
    "estimatedDeliveryDate": "Oct 20, 2024",
    "features": [
      "10,000mAh capacity",
      "Fast charging",
      "Compact size"
    ],
    "peopleAlsoBuy": [
      { "name": "Wireless Earbuds", "price": 79.99 },
      { "name": "Gourmet Food Hamper", "price": 89.99 }
    ]
  },
  {
    "id": 10,
    "name": "Leather Travel Journal",
    "brand": "Wanderlust Essentials",
    "category": "Stationery",
    "description": "A high-quality leather-bound travel journal perfect for documenting adventures.",
    "price": 35.99,
    "currency": "ILS",
    "image": "travel_journal.jpg",
    "additionalImages": [
      "travel_journal_1.jpg",
      "travel_journal_2.jpg"
    ],
    "tags": ["stationery", "journal", "leather", "travel"],
    "occasion": ["Just Because", "Corporate", "Anniversary"],
    "personalization": true,
    "inStock": true,
    "type": "Stationery",
    "SKU": 70422,
    "productCode": "LTJ-010",
    "salesCount": 8,
    "rating": 5,
    "deliveryTime": "48 hours",
    "estimatedDeliveryDate": "Oct 21, 2024",
    "features": [
      "Leather cover",
      "Refillable pages",
      "Travel-friendly size"
    ],
    "peopleAlsoBuy": [
      { "name": "Portable Power Bank", "price": 29.99 },
      { "name": "Customized Mug with Video Message", "price": 19.99 }
    ]
  }
];


export const checkForUpdates = async (req: Request, res: Response) => {
    try {
      const since = new Date(parseInt(req.query.since as string));
      if (!since) {
        res.status(400).json({ error: 'Timestamp is required' });
        return
    }
      const updatedProducts: IProduct[] = await Product.find({ lastUpdated: { $gt: since } });
      if (updatedProducts.length > 0) {
        res.json({
            hasUpdates: true,
            products: updatedProducts,
        });
    } else {
      res.json({ hasUpdates: false });
        return
    }
    } catch (err) {
      res.status(500).json({ message: (err as Error).message });
    }
  };
  
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find().populate('category');
    res.status(200).json(productsdumb);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) {
      res.status(404).json({ message: 'Product not found' });
      return 
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      res.status(404).json({ message: 'Product not found' });
      return
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
};
export const checkout = (req: Request, res: Response) => {
  const { cartItems } = req.body;
  const total = cartItems.reduce((acc: number, item: any) => acc + item.price, 0);
  res.json({ message: 'Checkout successful', total });
};
