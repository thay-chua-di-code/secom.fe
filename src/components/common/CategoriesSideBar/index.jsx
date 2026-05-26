import {
  Smartphone,
  Shirt,
  House,
  HeartPulse,
  BookOpen,
  Dumbbell,
  Car,
  Gamepad2,
  Building2,
  Briefcase,
} from "lucide-react";

const categories = [
  {
    name: "Electronics",
    slug: "electronics",
    icon: Smartphone,
  },
  {
    name: "Fashion",
    slug: "fashion",
    icon: Shirt,
  },
  {
    name: "Home & Living",
    slug: "home-living",
    icon: House,
  },
  {
    name: "Beauty & Health",
    slug: "beauty-health",
    icon: HeartPulse,
  },
  {
    name: "Books & Stationery",
    slug: "books-stationery",
    icon: BookOpen,
  },
  {
    name: "Sports & Outdoors",
    slug: "sports-outdoors",
    icon: Dumbbell,
  },
  {
    name: "Vehicles",
    slug: "vehicles",
    icon: Car,
  },
  {
    name: "Toys & Games",
    slug: "toys-games",
    icon: Gamepad2,
  },
  {
    name: "Real Estate",
    slug: "real-estate",
    icon: Building2,
  },
  {
    name: "Services",
    slug: "services",
    icon: Briefcase,
  },
];

export default function CategorySidebar() {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <h2 className="mb-4 text-lg font-bold text-gray-800">
        Categories
      </h2>

      <div className="space-y-1">
        {categories.map((category) => {
          const Icon = category.icon;

          return (
            <button
              key={category.slug}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-sky-50 hover:text-sky-600"
            >
              <Icon size={20} />

              <span className="text-sm font-medium">
                {category.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}