export type Restaurant = {
  id: string;
  name: string;
  imageUrl: string;
  rating: number;
  categories: string[];
  priceLevel: string;
  description: string;
  distance: string;
  offer: string;
  deliveryTime: string;
};

export const restaurants: Restaurant[] = [
  {
    id: "1",
    name: "Mama's Kitchen",
    imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    categories: ["Italian", "Family-owned"],
    priceLevel: "$$",
    description: "Authentic Italian cuisine with homemade pasta and sauces, crafted with love.",
    distance: "0.8",
    offer: "Free delivery on $15+",
    deliveryTime: "30-45"
  },
  {
    id: "2",
    name: "Green Harvest",
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    rating: 4.6,
    categories: ["Healthy", "Vegetarian"],
    priceLevel: "$$$",
    description: "Farm-to-table restaurant with fresh, seasonal ingredients and organic options.",
    distance: "1.2",
    offer: "20% off first order",
    deliveryTime: "15-25"
  },
  {
    id: "3",
    name: "Taco Fiesta",
    imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    rating: 4.5,
    categories: ["Mexican", "Street Food"],
    priceLevel: "$",
    description: "Authentic Mexican tacos, burritos, and quesadillas with homemade salsas.",
    distance: "1.5",
    offer: "Free chips & salsa",
    deliveryTime: "20-35"
  },
  {
    id: "4",
    name: "Burger Joint",
    imageUrl: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    categories: ["American", "Burgers"],
    priceLevel: "$$",
    description: "Juicy, handcrafted burgers with gourmet toppings and homemade fries.",
    distance: "0.5",
    offer: "BOGO on Tuesdays",
    deliveryTime: "25-40"
  },
  {
    id: "5",
    name: "Sushi Express",
    imageUrl: "https://images.unsplash.com/photo-1526234362653-3b75a0c07438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    categories: ["Japanese", "Sushi"],
    priceLevel: "$$$",
    description: "Fresh, high-quality sushi rolls, sashimi, and Japanese specialties.",
    distance: "2.1",
    offer: "Free miso soup",
    deliveryTime: "35-50"
  },
  {
    id: "6",
    name: "The Pizza Place",
    imageUrl: "https://images.unsplash.com/photo-1567516364473-d7adc948aa70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    rating: 4.4,
    categories: ["Italian", "Pizza"],
    priceLevel: "$$",
    description: "Wood-fired pizzas with artisanal toppings and handmade dough.",
    distance: "1.7",
    offer: "30% off large pizzas",
    deliveryTime: "20-35"
  }
];
