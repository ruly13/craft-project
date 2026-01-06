
import { Button } from "@/components/ui/button";

export const NewsletterSection = () => {
  return (
    <section className="py-20 px-6 bg-stone-900 text-white">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="max-w-md">
          <h2 className="text-2xl font-bold font-serif mb-2">Dapatkan Penawaran Eksklusif</h2>
          <p className="text-stone-400 text-sm">Berlangganan newsletter kami untuk info produk terbaru dan diskon spesial.</p>
        </div>
        <div className="flex w-full max-w-md gap-3">
          <input 
            type="email" 
            placeholder="Masukkan email Anda" 
            className="flex-1 bg-stone-800 border-none rounded-lg px-4 text-white text-sm focus:ring-1 focus:ring-emerald-500 outline-none"
          />
          <Button className="bg-emerald-500 hover:bg-emerald-600 text-stone-900 font-bold px-6 rounded-lg">
            Daftar
          </Button>
        </div>
      </div>
    </section>
  );
};
