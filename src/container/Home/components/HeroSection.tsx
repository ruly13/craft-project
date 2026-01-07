
import { Button } from "@/components/ui/button";
import Image from "next/image";

export const HeroSection = () => {
  return (
    <section className="relative pt-24 lg:pt-32 pb-16 lg:pb-20 px-6">
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold font-serif text-stone-900 leading-[1.1]">
            Sentuhan Alam untuk Hunian <span className="text-emerald-600">Nyaman</span>
          </h1>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
            Pengrajin mebel lokal dengan kualitas ekspor. Membawa kehangatan kayu Jati asli ke dalam rumah Anda.
          </p>
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-8 h-12 text-base w-full sm:w-auto">
              Lihat Koleksi
            </Button>
            <Button variant="outline" size="lg" className="border-stone-200 text-stone-700 hover:bg-stone-50 rounded-full px-8 h-12 text-base w-full sm:w-auto">
              Hubungi Kami
            </Button>
          </div>
        </div>
        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
          {/* Placeholder for Hero Image */}
          <div className="absolute inset-0 bg-stone-200" />
          <Image 
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop" 
            alt="Living Room"
            fill
            className="object-cover hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>
      </div>
    </section>
  );
};
