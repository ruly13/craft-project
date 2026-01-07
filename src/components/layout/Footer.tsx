
import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";


export const Footer = () => {
  return (
    <footer className="py-16 px-6 bg-white border-t border-stone-100">
      <div className="container mx-auto grid md:grid-cols-4 gap-12 mb-12">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
             <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-emerald-500"
              >
                <rect y="4" width="32" height="6" rx="3" fill="currentColor" />
                <rect y="13" width="32" height="6" rx="3" fill="currentColor" />
                <rect y="22" width="32" height="6" rx="3" fill="currentColor" />
              </svg>
            <span className="text-xl font-bold font-sans text-stone-900 tracking-tight">Mebel Indo</span>
          </div>
          <p className="text-sm text-stone-500 leading-relaxed max-w-xs">
            Menghadirkan keindahan alam Indonesia ke dalam setiap sudut rumah Anda dengan furnitur berkualitas tinggi dan desain yang tak lekang oleh waktu.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="w-10 h-10 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="#" className="w-10 h-10 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="#" className="w-10 h-10 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all">
              <Twitter className="h-5 w-5" />
            </Link>
          </div>
        </div>
        
        <div>
          <h4 className="font-bold text-stone-900 mb-6 text-sm tracking-wider uppercase">Perusahaan</h4>
          <ul className="space-y-4 text-sm text-stone-500">
            <li><Link href="#" className="hover:text-emerald-600 transition-colors">Tentang Kami</Link></li>
            <li><Link href="#" className="hover:text-emerald-600 transition-colors">Karir</Link></li>
            <li><Link href="#" className="hover:text-emerald-600 transition-colors">Blog</Link></li>
            <li><Link href="#" className="hover:text-emerald-600 transition-colors">Kontak</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold text-stone-900 mb-6 text-sm tracking-wider uppercase">Produk</h4>
          <ul className="space-y-4 text-sm text-stone-500">
            <li><Link href="#" className="hover:text-emerald-600 transition-colors">Ruang Tamu</Link></li>
            <li><Link href="#" className="hover:text-emerald-600 transition-colors">Kamar Tidur</Link></li>
            <li><Link href="#" className="hover:text-emerald-600 transition-colors">Ruang Makan</Link></li>
            <li><Link href="#" className="hover:text-emerald-600 transition-colors">Aksesoris</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold text-stone-900 mb-6 text-sm tracking-wider uppercase">Bantuan</h4>
          <ul className="space-y-4 text-sm text-stone-500">
            <li><Link href="#" className="hover:text-emerald-600 transition-colors">FAQ</Link></li>
            <li><Link href="#" className="hover:text-emerald-600 transition-colors">Pengiriman</Link></li>
            <li><Link href="#" className="hover:text-emerald-600 transition-colors">Pengembalian</Link></li>
            <li><Link href="#" className="hover:text-emerald-600 transition-colors">Syarat & Ketentuan</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto pt-8 border-t border-stone-100 flex flex-col md:flex-row justify-between items-center text-sm text-stone-500">
        <p>© 2025 Mebel Indo. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link href="#" className="hover:text-emerald-600 transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-emerald-600 transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};
