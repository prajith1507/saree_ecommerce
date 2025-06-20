// ✅ No "use client" here
import { getCategories, getCategoryProducts } from "@/lib/api" // Adjust to your data source
import CategoryClient from "@/components/category-client"

interface Params {
  params: {
    slug: string
  }
}

// Server Component
export async function generateStaticParams() {
  const categories = await getCategories(); // Returns [{ slug: 'sarees' }, ...]
  return categories.map((cat: { slug: string }) => ({
    slug: cat.slug,
  }))
}

export default async function CategoryPage({ params }: Params) {
  const categoryProducts = await getCategoryProducts(params.slug)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 capitalize">{params.slug}</h1>

      {/* Server-rendered product data */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categoryProducts.map((product: any) => (
          <div key={product.id} className="border p-4 rounded">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded" />
            <h2 className="mt-2 font-semibold">{product.name}</h2>
            <p className="text-sm text-gray-500">₹{product.price}</p>
          </div>
        ))}
      </div>

      {/* Client-side filters or UI (optional) */}
      <CategoryClient />
    </div>
  )
}
