// components/CategoriesList.tsx

type Category = {
  id: number
  name: string
}

type Props = {
  categories: Category[]
}

export default function CategoriesList({ categories }: Props) {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Categories</h2>
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <span
            key={cat.id}
            className="bg-purple-100 text-purple-700 px-4 py-1 rounded-full text-sm font-medium"
          >
            {cat.name}
          </span>
        ))}
      </div>
    </section>
  )
}
