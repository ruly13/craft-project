
import Link from "next/link";
import { Sofa } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-12 px-6 bg-white border-t border-stone-100">
      <div className="container mx-auto grid md:grid-cols-4 gap-8 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Sofa className="h-5 w-5 text-emerald-600" />
            <span className="text-lg font-bold font-serif text-stone-900">Mebel Indo</span>
          </div>
          <p className="text-sm text-stone-500 leading-relaxed">
            Menghadirkan keindahan alam Indonesia ke dalam setiap sudut rumah Anda dengan furnitur berkualitas tinggi.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-stone-900 mb-4 text-sm tracking-wider uppercase">Perusahaan</h4>
          <ul className="space-y-2 text-sm text-stone-500">
            <li><Link href="#" className="hover:text-emerald-600">Tentang Kami</Link></li>
            <li><Link href="#" className="hover:text-emerald-600">Karir</Link></li>
            <li><Link href="#" className="hover:text-emerald-600">Blog</Link></li>
            <li><Link href="#" className="hover:text-emerald-600">Kontak</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-stone-900 mb-4 text-sm tracking-wider uppercase">Produk</h4>
          <ul className="space-y-2 text-sm text-stone-500">
            <li><Link href="#" className="hover:text-emerald-600">Ruang Tamu</Link></li>
            <li><Link href="#" className="hover:text-emerald-600">Kamar Tidur</Link></li>
            <li><Link href="#" className="hover:text-emerald-600">Ruang Makan</Link></li>
            <li><Link href="#" className="hover:text-emerald-600">Aksesoris</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-stone-900 mb-4 text-sm tracking-wider uppercase">Bantuan</h4>
          <ul className="space-y-2 text-sm text-stone-500">
            <li><Link href="#" className="hover:text-emerald-600">FAQ</Link></li>
            <li><Link href="#" className="hover:text-emerald-600">Pengiriman</Link></li>
            <li><Link href="#" className="hover:text-emerald-600">Pengembalian</Link></li>
            <li><Link href="#" className="hover:text-emerald-600">Syarat & Ketentuan</Link></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto pt-8 border-t border-stone-100 flex flex-col md:flex-row justify-between items-center text-sm text-stone-400">
        <p>© 2025 Mebel Indo. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          {/* Social Icons Placeholder */}
          <div className="w-5 h-5 bg-stone-200 rounded-full" />
          <div className="w-5 h-5 bg-stone-200 rounded-full" />
        </div>
      </div>
    </footer>
  );
};
