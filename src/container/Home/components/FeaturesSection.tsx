
import { Truck, Heart, Hand } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const FeaturesSection = () => {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <div className="mb-16 max-w-2xl">
          <h2 className="text-3xl font-bold font-serif text-stone-900 mb-4">Kualitas Terbaik Dari Pengrajin Lokal</h2>
          <p className="text-stone-600">Kami bangga menggunakan bahan lokal dan tenaga ahli dari Indonesia untuk menciptakan karya seni fungsional.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Hand, title: "100% Kayu Asli", desc: "Menggunakan kayu Jati dan Mahoni berkualitas tinggi yang tahan lama." },
            { icon: Heart, title: "Buatan Tangan", desc: "Dikerjakan dengan detail oleh pengrajin Jepara yang berpengalaman." },
            { icon: Truck, title: "Pengiriman Seluruh Indonesia", desc: "Layanan antar aman dan berasuransi ke seluruh pelosok negeri." }
          ].map((feature, i) => (
            <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow bg-white">
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-stone-900 mb-2">{feature.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
