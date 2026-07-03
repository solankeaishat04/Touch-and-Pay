import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-white text-neutral-900 font-sans border-t border-neutral-100 px-6 py-16 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        
        {/* Main Links Grid */}
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:grid-cols-4 lg:gap-12">
          
          {/* Column 1: Why TAP & Company stacked directly underneath */}
          <div className="flex flex-col gap-12">
            <div>
              <h3 className="text-sm font-bold text-neutral-900 tracking-tight">Why TAP</h3>
              <ul className="mt-4 space-y-3">
                <li><Link href="/company/why-tap" className="text-xs text-neutral-500 hover:text-neutral-900 transition">Why Choose TAP</Link></li>
                <li><Link href="#" className="text-xs text-neutral-500 hover:text-neutral-900 transition">For Government Agencies</Link></li>
                <li><Link href="#" className="text-xs text-neutral-500 hover:text-neutral-900 transition">For Schools</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-neutral-900 tracking-tight">Company</h3>
              <ul className="mt-4 space-y-3">
                <li><Link href="/company/about" className="text-xs text-neutral-500 hover:text-neutral-900 transition">About Us</Link></li>
                <li><Link href="/company/careers" className="text-xs text-neutral-500 hover:text-neutral-900 transition">Careers</Link></li>
              </ul>
            </div>
          </div>

          {/* Column 2: Resources */}
          <div>
            <h3 className="text-sm font-bold text-neutral-900 tracking-tight">Resources</h3>
            <ul className="mt-4 space-y-3">
              <li><Link href="#" className="text-xs text-neutral-500 hover:text-neutral-900 transition">Blog</Link></li>
              <li><Link href="#" className="text-xs text-neutral-500 hover:text-neutral-900 transition">FAQs</Link></li>
              <li><Link href="#" className="text-xs text-neutral-500 hover:text-neutral-900 transition">Media kit</Link></li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h3 className="text-sm font-bold text-neutral-900 tracking-tight">Support</h3>
            <ul className="mt-4 space-y-3">
              <li><Link href="#" className="text-xs text-neutral-500 hover:text-neutral-900 transition">Help Desk</Link></li>
              <li><Link href="#" className="text-xs text-neutral-500 hover:text-neutral-900 transition">Contact Us</Link></li>
              <li><Link href="/legal/data-protection" className="text-xs text-neutral-500 hover:text-neutral-900 transition">Data Protection Policy</Link></li>
              <li><Link href="#" className="text-xs text-neutral-500 hover:text-neutral-900 transition">FAQ</Link></li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h3 className="text-sm font-bold text-neutral-900 tracking-tight">Legal</h3>
            <ul className="mt-4 space-y-3">
              <li><Link href="/legal/terms" className="text-xs text-neutral-500 hover:text-neutral-900 transition">Terms and Condition</Link></li>
              <li><Link href="/legal/privacy" className="text-xs text-neutral-500 hover:text-neutral-900 transition">Privacy Policy</Link></li>
              <li><Link href="/legal/information-security" className="text-xs text-neutral-500 hover:text-neutral-900 transition">Information Security Policy</Link></li>
              <li><Link href="/legal/qms-policy" className="text-xs text-neutral-500 hover:text-neutral-900 transition">Quality Management System Policy</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Section: Contact, Address & Copyright Grid */}
        <div className="mt-20 grid grid-cols-1 gap-10 border-t border-neutral-100 pt-12 sm:grid-cols-2 md:grid-cols-4">
          
          {/* Contact & Social Matrix */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold text-neutral-900 tracking-tight">Contact</h3>
            <a href="mailto:ask@touchandpay.me" className="text-xs font-medium text-[#EC7C30] hover:underline">
              ask@touchandpay.me
            </a>
            
            {/* Inline SVG Social Row matching image_09ae82.png */}
            <div className="flex items-center gap-3.5 text-neutral-400 mt-1">
              {/* X / Twitter */}
              <a href="#" className="hover:text-neutral-600 transition">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              {/* Facebook */}
              <a href="#" className="hover:text-neutral-600 transition">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
              </a>
              {/* WhatsApp */}
              <a href="#" className="hover:text-neutral-600 transition">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.503-5.714-1.458L0 24zm6.242-4.135c1.654.982 3.511 1.501 5.411 1.502 5.534 0 10.037-4.502 10.04-10.04.002-2.684-1.04-5.207-2.93-7.099-1.889-1.891-4.407-2.934-7.087-2.935C6.151 3.292 1.65 7.794 1.647 13.332c-.001 1.905.496 3.766 1.442 5.41l-.994 3.63 3.712-.973z"/></svg>
              </a>
              {/* Telegram */}
              <a href="#" className="hover:text-neutral-600 transition">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M11.944 0C5.344 0 0 5.344 0 11.944c0 5.6 3.856 10.304 9.12 11.592.448.08.616-.192.616-.432v-1.536c-3.696.8-4.464-1.776-4.464-1.776-.608-1.536-1.488-1.952-1.488-1.952-1.208-.824.088-.8.088-.8 1.336.096 2.04 1.376 2.04 1.376 1.184 2.04 3.12 1.448 3.88 1.112.12-.856.464-1.448.84-1.784-2.952-.336-6.048-1.472-6.048-6.56 0-1.448.52-2.632 1.368-3.56-.136-.336-.6-1.696.128-3.52 0 0 1.112-.36 3.648 1.36a12.64 12.64 0 0 1 6.64 0c2.528-1.72 3.64-1.36 3.64-1.36.728 1.824.264 3.184.128 3.52.856.928 1.36 2.112 1.36 3.56 0 5.104-3.104 6.216-6.064 6.544.48.416.904 1.224.904 2.464v3.656c0 .24.16.52.624.432 5.264-1.296 9.112-6 9.112-11.584C23.888 5.344 18.544 0 11.944 0z"/></svg>
              </a>
              {/* Instagram */}
              <a href="#" className="hover:text-neutral-600 transition">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              {/* YouTube */}
              <a href="#" className="hover:text-neutral-600 transition">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>

          {/* Location & Address */}
          <div className="flex flex-col gap-4 sm:col-span-1 md:col-span-2">
            <h3 className="text-sm font-bold text-neutral-900 tracking-tight">Lagos, Nigeria</h3>
            <p className="text-xs text-neutral-500 leading-relaxed max-w-[220px]">
              62, Shipeolu Streeet,<br />
              Palmgroove, Somolu,<br />
              Lagos, Nigeria
            </p>
          </div>

        </div>

        {/* Legal Corporate Registry Bottom Tag */}
        <div className="mt-12 text-[10px] font-bold text-neutral-400 tracking-wider uppercase">
          © 2026 TOUCH AND PAY TECHNOLOGIES LIMITED
        </div>

      </div>
    </footer>
  );
}