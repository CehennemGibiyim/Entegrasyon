"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Banknote,
  BarChart3,
  CalendarClock,
  CalendarDays,
  ClipboardCheck,
  ClipboardList,
  Clock,
  Coffee,
  DatabaseBackup,
  DoorOpen,
  Fingerprint,
  LayoutTemplate,
  Megaphone,
  Repeat,
  Scale,
  ScanFace,
  Settings,
  Settings2,
  ShieldAlert,
  ShieldCheck,
  Siren,
  UserCheck,
  Users,
  Wallet,
} from "lucide-react";
import { LiveClock } from "@/components/live-clock";
import { cn } from "@/components/ui";
import { withBasePath } from "@/lib/asset-path";

type NavEntry = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  exact?: boolean;
};

const FACE_NAV: NavEntry[] = [
  { href: "/", label: "Canlı Panel", icon: Activity, exact: true },
  { href: "/terminal", label: "Yüz Terminali", icon: ScanFace },
  { href: "/personel", label: "Personel & Biyometri", icon: Users },
  { href: "/kapilar", label: "Kapılar", icon: DoorOpen },
  { href: "/yetkiler", label: "Kapı Yetkileri", icon: ShieldCheck },
  { href: "/imza", label: "İmza Defteri", icon: ClipboardCheck },
  { href: "/kapi-imza", label: "Kapı İmza", icon: ClipboardCheck },
  { href: "/istirahat", label: "İstirahat", icon: Coffee },
  { href: "/vardiyalar", label: "Vardiyalar", icon: Clock },
  { href: "/izinler", label: "İzin & Devamsızlık", icon: CalendarDays },
  { href: "/ziyaretciler", label: "Ziyaretçiler", icon: UserCheck },
  { href: "/guvenlik", label: "Güvenlik Merkezi", icon: ShieldAlert },
  { href: "/acil-durum", label: "Acil Durum Yoklaması", icon: Siren },
  { href: "/bordro", label: "PDKS Bordro Özeti", icon: Wallet },
  { href: "/raporlar", label: "Raporlar", icon: BarChart3 },
  { href: "/ayarlar", label: "Sistem & KVKK", icon: Settings },
];

const PUANTAJ26_NAV: NavEntry[] = [
  { href: "/puantaj26", label: "Puantaj Cetveli", icon: ClipboardList, exact: true },
  { href: "/puantaj26/nobet", label: "Nöbet Çizelgesi", icon: CalendarClock },
  { href: "/puantaj26/bordro", label: "Maaş Bordro (Resmi)", icon: Banknote },
  { href: "/puantaj26/sablon", label: "Vardiya Şablonları", icon: LayoutTemplate },
  { href: "/puantaj26/personel", label: "Servis & Kadro Yönetimi", icon: Users },
  { href: "/puantaj26/izin", label: "Resmi İzin Onayları", icon: CalendarDays },
  { href: "/puantaj26/degisim", label: "Nöbet Değişimi (Takas)", icon: Repeat },
  { href: "/puantaj26/analiz", label: "Adalet Analizi", icon: Scale },
  { href: "/puantaj26/uyarilar", label: "Mevzuat Uyarıları", icon: ShieldAlert },
  { href: "/puantaj26/duyuru", label: "Servis Duyuruları", icon: Megaphone },
  { href: "/puantaj26/yedek", label: "Veri Yedekleme", icon: DatabaseBackup },
  { href: "/puantaj26/ayarlar", label: "Kurum & Sistem Ayarları", icon: Settings2 },
  { href: "/personel-sorgu", label: "TC Personel Sorgu", icon: Fingerprint },
];

const ALL_NAV = [...FACE_NAV, ...PUANTAJ26_NAV];

function isRouteActive(pathname: string, item: NavEntry): boolean {
  const clean = pathname.replace(/\/$/, "") || "/";
  const target = item.href.replace(/\/$/, "") || "/";
  if (item.exact) return clean === target;
  return clean === target || clean.startsWith(`${target}/`);
}

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isP26 = pathname === "/puantaj26" || pathname.startsWith("/puantaj26/");

  return (
    <div className="screen-root orion-grid min-h-screen">
      <div className="flex min-h-screen">
        <aside className="sticky top-0 hidden h-screen w-[274px] shrink-0 flex-col border-r border-white/8 bg-black/35 px-4 py-5 backdrop-blur-xl lg:flex">
          <Link href="/" className="mb-6 flex items-center gap-3 px-2">
            <img
              src={withBasePath("/brand/orion-mark.png")}
              alt="ORION"
              className="h-12 w-12 rounded-2xl object-cover ring-1 ring-amber-200/30"
            />
            <div>
              <div className="font-display text-lg leading-none tracking-[0.18em] text-amber-200">
                ORION
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-cyan-300/80">
                FaceGate × Puantaj26
              </div>
            </div>
          </Link>

          <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto pr-1">
            <div className="mb-1 px-2.5 pt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300/70">
              FaceGate Biyometrik PDKS
            </div>
            {FACE_NAV.map((item) => {
              const active = isRouteActive(pathname, item);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2 text-[13px] transition",
                    active
                      ? "bg-cyan-400/12 font-medium text-cyan-200 ring-1 ring-cyan-400/25"
                      : "text-slate-400 hover:bg-white/5 hover:text-white",
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}

            <div className="mt-4 mb-1 border-t border-amber-200/12 px-2.5 pt-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-200/85">
              Puantaj26 Resmi Sistem
            </div>
            {PUANTAJ26_NAV.map((item) => {
              const active = isRouteActive(pathname, item);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2 text-[13px] transition",
                    active
                      ? "bg-amber-200/14 font-medium text-amber-200 ring-1 ring-amber-200/30"
                      : "text-slate-400 hover:bg-white/5 hover:text-white",
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-3 rounded-2xl border border-white/8 bg-white/3 p-3">
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
              Entegre Platform
            </p>
            <p className="mt-1 text-sm font-medium text-white">Anadolu Endüstri & Sağlık</p>
            <p className="text-xs text-slate-500">Tek Veritabanı · Canlı Biyometri + Resmi Puantaj</p>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-white/8 bg-[#06080f]/85 px-4 py-3 backdrop-blur-xl md:px-8">
            <div className="lg:hidden">
              <div className="font-display tracking-[0.2em] text-amber-200">ORION × P26</div>
            </div>
            <div className="hidden text-sm text-slate-400 lg:block">
              {isP26
                ? "Puantaj26 resmi nöbet, aylık çalışma cetveli, bordro ve onay modülleri"
                : "Yüz tanımalı giriş-çıkış, biyometrik kadro, imza ve kapı yetki platformu"}
            </div>
            <LiveClock className="text-right" />
          </header>

          <div className="flex gap-2 overflow-x-auto border-b border-white/5 px-3 py-2 lg:hidden">
            {ALL_NAV.map((item) => {
              const active = isRouteActive(pathname, item);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "whitespace-nowrap rounded-full px-3 py-1 text-xs",
                    active
                      ? "bg-cyan-400/15 font-medium text-cyan-200"
                      : "bg-white/5 text-slate-400",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <main className={isP26 ? "p-0" : "px-4 py-6 md:px-8 md:py-8"}>{children}</main>
        </div>
      </div>
    </div>
  );
}
