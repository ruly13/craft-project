import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";

interface Category {
  title: string;
  description?: string;
  desc?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any;
}

interface Props {
  categories?: Category[];
}

export const CategoriesSection = ({ categories }: Props) => {
  const defaultCategories: Category[] = [
    { title: "Ruang Tamu", image: "https://images.unsplash.com/photo-1567016432779-094069958ea5?q=80&w=1780&auto=format&fit=crop", desc: "Sofa, Meja Kopi, Rak TV" },
    { title: "Kamar Tidur", image: "https://images.unsplash.com/photo-1505693416388-b0346efee539?q=80&w=1780&auto=format&fit=crop", desc: "Tempat Tidur, Lemari, Meja Rias" },
    { title: "Ruang Makan", image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=1932&auto=format&fit=crop", desc: "Meja Makan, Kursi, Lemari Hias" }
  ];

  const itemsToRender = categories && categories.length > 0 ? categories : defaultCategories;

  return (
    <section className="py-20 px-6 bg-white">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold font-sans text-stone-900">Kategori Pilihan</h2>
          <Link href="/katalog" className="text-emerald-600 font-medium flex items-center gap-2 hover:gap-3 transition-all self-start sm:self-auto">
            Lihat Semua <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {itemsToRender.map((cat, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-stone-100">
                <Image 
                  src={cat.image?.asset ? urlFor(cat.image).url() : String(cat.image)} 
                  alt={cat.title} 
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-1">{cat.title}</h3>
              <p className="text-sm text-stone-500">{cat.description || cat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
