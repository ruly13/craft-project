
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export const TestimonialsSection = () => {
  return (
    <section className="py-20 px-6 bg-stone-100/50">
      <div className="container mx-auto text-center mb-16">
        <span className="text-emerald-600 font-bold tracking-wider text-xs uppercase mb-2 block">Apa Kata Mereka</span>
        <h2 className="text-3xl font-bold font-serif text-stone-900">Testimoni Pelanggan</h2>
      </div>
      
      <div className="container mx-auto grid md:grid-cols-3 gap-8">
        {[
          { name: "Budi Santoso", role: "Jakarta Selatan", text: "Kualitas kayunya luar biasa, benar-benar jati tua. Finishingnya halus dan pengirimannya juga sangat hati-hati sampai ke Jakarta." },
          { name: "Siti Aminah", role: "Surabaya", text: "Suka banget sama desainnya yang modern tapi tetap ada sentuhan Indonesianya. Pelayanan CS juga sangat ramah di WhatsApp." },
          { name: "Andi Pratama", role: "Bandung", text: "Barang sampai tepat waktu dan dikemas sangat aman. Meja makannya kokoh dan warnanya sesuai ekspektasi." }
        ].map((item, i) => (
          <Card key={i} className="bg-white border-none shadow-sm p-2">
            <CardContent className="p-6 text-left">
              <div className="flex gap-1 text-yellow-400 mb-4">
                {[1,2,3,4,5].map(s => <Star key={s} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="text-stone-600 italic mb-6 text-sm leading-relaxed">&quot;{item.text}&quot;</p>
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full bg-stone-200 overflow-hidden">
                   {/* Random Avatar */}
                   <Image 
                     src={`https://i.pravatar.cc/150?u=${i}`} 
                     alt={item.name}
                     fill
                     className="object-cover"
                     sizes="40px"
                   />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">{item.name}</h4>
                  <p className="text-xs text-stone-500">{item.role}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
