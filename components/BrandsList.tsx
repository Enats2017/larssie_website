type Brand = {
  brand_id: number
  brand_name: string
  sort_order: number
}

type Props = {
  brands: Brand[]
}

export default function BrandsList({ brands }: Props) {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4 text-white">Brands</h2>
      <div className="rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm">
        {brands.map((brand) => (
          <div
            key={brand.brand_id}
            className="flex items-center justify-between px-4 py-3 border-b border-white/10
                       hover:bg-white/10 transition-colors last:border-b-0"
          >
            <span className="font-medium text-white">{brand.brand_name}</span>
            <span className="text-sm text-white/50">Sort: {brand.sort_order}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
