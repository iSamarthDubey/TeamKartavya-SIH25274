"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Overview", href: "/" },
  { label: "Contracts", href: "/contracts" },
  { label: "Exposures", href: "/exposures" },
  { label: "Settings", href: "/settings" },
];

export default function TopNav() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userInitials, setUserInitials] = useState('AD');
  const [userName, setUserName] = useState('Admin');
  const [authed, setAuthed] = useState<boolean>(() => {
    try {
      if (typeof window === "undefined") return false;
      return !!window.localStorage?.getItem("kh_user");
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  useEffect(() => {
    try {
      const raw = window.localStorage?.getItem('kh_user');
      if (raw) {
        const user = JSON.parse(raw);
        if (user?.initials) setUserInitials(user.initials);
        else if (user?.name) {
          const parts = user.name.split(' ');
          setUserInitials((parts[0][0] || 'A') + (parts[1]?.[0] || ''));
        }
        if (user?.name) setUserName(user.name);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      const raw = window.localStorage?.getItem("kh_user");
      setAuthed(!!raw);
    } catch (e) {
      setAuthed(false);
    }
  }, []);

  // Also listen to storage events so TopNav updates when login state changes in other tabs
  useEffect(() => {
    function onStorage() {
      try {
        const raw = window.localStorage?.getItem("kh_user");
        setAuthed(!!raw);
      } catch (e) {
        setAuthed(false);
      }
    }
    function onKHUserChange() {
      onStorage();
    }
    window.addEventListener("storage", onStorage);
    window.addEventListener("kh_user_change", onKHUserChange);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("kh_user_change", onKHUserChange);
    };
  }, []);

  if (authed === false) return null;

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className="admin-topnav">
        <div className="admin-topnav__inner">
          <div className="admin-left">
            <Link href="/" className="admin-brand">
              <span className="brand-badge">KH</span>
              <div className="brand-text">
                <span>Krishi Hedge</span>
                <strong>Admin</strong>
              </div>
            </Link>
          </div>

          <nav className="admin-nav-links">
            {NAV_LINKS.map((item) => (
              <Link key={item.href} href={item.href} className={`admin-nav-link ${isActive(item.href) ? "active" : ""}`}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="admin-actions">
            <Link href="/notifications" aria-label="Notifications" className="icon-button">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.657a2 2 0 11-3.714 0M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9" />
              </svg>
            </Link>
            <Link href="/account" className="avatar-pill" aria-label="Account">
              {userInitials}
            </Link>
            {/* Mobile menu toggle moved into the actions so it sits right after the icons on small screens */}
            <button className="mobile-menu-toggle" aria-label="Open navigation" onClick={() => setDrawerOpen(true)}>
              <span />
              <span />
              <span />
            </button>
            <Link href="/contracts/new" className="primary-action desktop-only">
              <span>+</span> New Contract
            </Link>
          </div>
        </div>
      </header>

      {authed !== false && drawerOpen && (
        <div className="mobile-drawer" role="dialog" aria-modal="true">
          <button className="mobile-drawer__overlay" onClick={() => setDrawerOpen(false)} aria-label="Close menu" />
          <div className="mobile-drawer__panel">
            <div className="mobile-drawer__header">
              <Link href="/" className="admin-brand">
                <span className="brand-badge">KH</span>
                <div className="brand-text">
                  <span>Krishi Hedge</span>
                  <strong>Admin</strong>
                </div>
              </Link>
              <button className="close-drawer" onClick={() => setDrawerOpen(false)} aria-label="Close menu">
                ×
              </button>
            </div>
            <div className="mobile-drawer__body">
              {NAV_LINKS.map((item) => (
                <Link key={item.href} href={item.href} className={`drawer-link ${isActive(item.href) ? "active" : ""}`}>
                  {item.label}
                </Link>
              ))}
              <Link href="/contracts/new" className="primary-action">
                <span>+</span> New Contract
              </Link>
            </div>
            <div className="mobile-drawer__footer">
              <div className="avatar-pill">{userInitials}</div>
              <div>
                <p className="drawer-name">{userName}</p>
                <p className="drawer-tag">View Profile</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
/*
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TopNav() {
  const pathname = usePathname() || "/";
  const items = [
    { href: "/", label: "Overview" },
    { href: "/contracts", label: "Contracts" },
    { href: "/exposures", label: "Exposures" },
    { href: "/settings", label: "Settings" },
  ];

  return (
    <nav className="kh-nav">
      {items.map((i) => {
        const active = pathname === i.href || (i.href !== "/" && pathname.startsWith(i.href));
        return (
          <Link key={i.href} href={i.href} className={`text-sm ${active ? "active" : ""}`}>
            {i.label}
          </Link>
        );
      })}
    </nav>
  );
}
*/