
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-stone-100 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          {/* Custom Logo Icon matching the image (Green Stack) */}
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
          <span className="text-xl font-bold font-sans tracking-tight text-stone-900">
            Mebel Indo
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-8 text-sm font-medium text-stone-600">
            <Link href="/home" className="hover:text-stone-900 transition-colors">
              Beranda
            </Link>
            <Link href="/katalog" className="hover:text-stone-900 transition-colors">
              Produk
            </Link>
            <Link href="#" className="hover:text-stone-900 transition-colors">
              Tentang Kami
            </Link>
            <Link href="#" className="hover:text-stone-900 transition-colors">
              Kontak
            </Link>
          </div>

          <Button className="bg-[#10B981] hover:bg-[#059669] text-black font-semibold rounded-lg px-6 shadow-none">
            Lihat Koleksi
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-stone-900">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader className="text-left">
                <SheetTitle className="font-bold flex items-center gap-3 text-xl">
                   <svg
                    width="28"
                    height="28"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-emerald-500"
                  >
                    <rect y="4" width="32" height="6" rx="3" fill="currentColor" />
                    <rect y="13" width="32" height="6" rx="3" fill="currentColor" />
                    <rect y="22" width="32" height="6" rx="3" fill="currentColor" />
                  </svg>
                  Mebel Indo
                </SheetTitle>
              </SheetHeader>
              
              <div className="mt-8 flex flex-col gap-4">
                <Link 
                  href="/home" 
                  className="text-base font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-50 py-3 px-4 rounded-lg transition-all"
                >
                  Beranda
                </Link>
                <Separator />
                <Link 
                  href="/katalog" 
                  className="text-base font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-50 py-3 px-4 rounded-lg transition-all"
                >
                  Produk
                </Link>
                <Separator />
                <Link 
                  href="#" 
                  className="text-base font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-50 py-3 px-4 rounded-lg transition-all"
                >
                  Tentang Kami
                </Link>
                <Separator />
                <Link 
                  href="#" 
                  className="text-base font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-50 py-3 px-4 rounded-lg transition-all"
                >
                  Kontak
                </Link>
                
                <div className="mt-6 px-4">
                  <Button className="w-full bg-[#10B981] hover:bg-[#059669] text-black font-semibold rounded-lg h-11 text-base shadow-none">
                    Lihat Koleksi
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};
