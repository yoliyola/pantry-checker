export interface CategoryData {
  slug: string;
  icon: string;
  translations: Record<string, string>;
}

export const CATEGORIES: CategoryData[] = [
  { slug: "dairy", icon: "🥛", translations: { es: "Lácteos", en: "Dairy" } },
  { slug: "meat", icon: "🥩", translations: { es: "Carnes", en: "Meat" } },
  { slug: "deli", icon: "🥓", translations: { es: "Embutidos", en: "Deli meats" } },
  { slug: "fruits", icon: "🍎", translations: { es: "Frutas", en: "Fruits" } },
  { slug: "vegetables", icon: "🥦", translations: { es: "Verduras", en: "Vegetables" } },
  { slug: "sauces", icon: "🫙", translations: { es: "Salsas y condimentos", en: "Sauces & condiments" } },
  { slug: "beverages", icon: "🥤", translations: { es: "Bebidas", en: "Beverages" } },
  { slug: "grains", icon: "🌾", translations: { es: "Cereales y granos", en: "Grains & cereals" } },
  { slug: "canned", icon: "🥫", translations: { es: "Conservas y enlatados", en: "Canned goods" } },
  { slug: "bakery", icon: "🍞", translations: { es: "Panadería", en: "Bakery" } },
  { slug: "frozen", icon: "🧊", translations: { es: "Congelados", en: "Frozen" } },
  { slug: "snacks", icon: "🍿", translations: { es: "Snacks", en: "Snacks" } },
  { slug: "oils", icon: "🫒", translations: { es: "Aceites y vinagres", en: "Oils & vinegars" } },
  { slug: "baby-food", icon: "🍼", translations: { es: "Alimentación infantil", en: "Baby food" } },
  { slug: "seafood", icon: "🐟", translations: { es: "Pescados y mariscos", en: "Seafood" } },
  { slug: "eggs", icon: "🥚", translations: { es: "Huevos", en: "Eggs" } },
  { slug: "nuts", icon: "🥜", translations: { es: "Frutos secos", en: "Nuts & dried fruits" } },
  { slug: "spices", icon: "🌶️", translations: { es: "Especias y hierbas", en: "Spices & herbs" } },
  { slug: "sweets", icon: "🍫", translations: { es: "Dulces y postres", en: "Sweets & desserts" } },
  { slug: "pasta", icon: "🍝", translations: { es: "Pasta y arroces", en: "Pasta & rice" } },
];
