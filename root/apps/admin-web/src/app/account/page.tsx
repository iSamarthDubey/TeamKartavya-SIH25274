"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";

export default function AccountPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage?.getItem('kh_user');
      if (raw) setUser(JSON.parse(raw));
    } catch (e) {}
  }, []);

  function signOut() {
    window.localStorage?.removeItem("kh_user");
    window.dispatchEvent(new Event("kh_user_change"));
    window.location.href = "/";
  }

  return (
    <main className="space-y-6">
      <Header title="Account" subtitle="Manage admin profile, credentials and session preferences." />
      <section className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Profile overview</h2>
          <p className="text-sm text-gray-500 mt-1">Placeholder content – update once identity service connects.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-4 rounded-xl border border-gray-100 bg-gray-50">
            <p className="text-xs font-semibold text-gray-500 uppercase">Display name</p>
              <p className="mt-2 text-base font-medium text-gray-900">{user?.name || 'Admin Demo'}</p>
          </div>
          <div className="p-4 rounded-xl border border-gray-100 bg-gray-50">
            <p className="text-xs font-semibold text-gray-500 uppercase">Role</p>
            <p className="mt-2 text-base font-medium text-gray-900">{user?.role ? user.role : 'Super Admin'}</p>
          </div>
        </div>
        <div className="rounded-xl border border-dashed border-gray-200 p-5 text-sm text-gray-500">
          Account settings, session controls, and contact information will appear here after integration.
        </div>
        <div className="flex gap-2">
          <button className="btn btn-ghost" onClick={() => alert('Edit profile not implemented')}>Edit Profile</button>
          <button className="btn" onClick={signOut}>Sign Out</button>
        </div>
      </section>
    </main>
  );
}

