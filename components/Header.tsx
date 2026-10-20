"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { Menu, Phone, X } from "lucide-react";
import { nav, site, waLink } from "@/lib/site";
import { CurrencyToggle } from "./Providers";
import { WhatsAppIcon } from "./Icons";

export function Logo() {
  return (
    <Link href="/" className="logo" aria-label="Kaizen Yard, home">
      <span className="logo__plate" aria-hidden="true">
        <i />KY
      </span>
      <span className="logo__word" translate="no">Kaizen Yard</span>
    </Link>
  );
}

export function Header() {
  const path = usePathname();
  const menu = useRef<HTMLDialogElement>(null);
  const active = (href: string) => (href === "/" ? path === "/" : path.startsWith(href.replace(/\/$/, "")));

  useEffect(() => menu.current?.close(), [path]);

  return (
    <header className="header">
      <div className="header__in">
        <Logo />
        <nav className="header__nav" aria-label="Main">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} aria-current={active(n.href) ? "page" : undefined}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="header__end">
          <div className="hide-sm">
            <CurrencyToggle />
          </div>
          <a className="btn btn--wa btn--sm" href={waLink("Hi Kaizen Yard, I'm looking for a car.")} target="_blank" rel="noopener">
            <WhatsAppIcon size={18} />
            <span className="hide-xs">Chat on </span>WhatsApp
          </a>
          <button className="icon-btn header__menu" aria-label="Open menu" onClick={() => menu.current?.showModal()}>
            <Menu size={22} aria-hidden="true" />
          </button>
        </div>
      </div>

      <dialog ref={menu} className="menu" aria-label="Menu">
        <div className="menu__head">
          <Logo />
          <form method="dialog">
            <button className="icon-btn" aria-label="Close menu">
              <X size={22} aria-hidden="true" />
            </button>
          </form>
        </div>
        <nav className="menu__nav" aria-label="Main">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} aria-current={active(n.href) ? "page" : undefined} onClick={() => menu.current?.close()}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="menu__foot">
          <p className="menu__label">Show prices in</p>
          <CurrencyToggle />
          <a className="btn btn--ghost btn--block" href={site.phoneHref}>
            <Phone size={18} aria-hidden="true" /> Call {site.phone}
          </a>
        </div>
      </dialog>
    </header>
  );
}
