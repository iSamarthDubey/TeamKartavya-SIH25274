"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthForm({ onAuth }: { onAuth: (user: any) => void }) {
  const [tab, setTab] = useState<"admin" | "fpo">("admin");
  const [employeeId, setEmployeeId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fpoId, setFpoId] = useState("");
  const [fpoPassword, setFpoPassword] = useState("");
  const router = useRouter();

  function createAccount() {
    const user = {name: (firstName || "Admin") + " " + (lastName || ""), initials: getInitials(firstName || "A", lastName || ""), role: "admin"};
    window.localStorage?.setItem("kh_user", JSON.stringify(user));
    window.dispatchEvent(new Event("kh_user_change"));
    onAuth(user);
    router.push('/');
  }

  function loginFpo() {
    const user = { name: "FPO User", initials: getInitials("FPO", "User"), role: 'fpo'};
    window.localStorage?.setItem("kh_user", JSON.stringify(user));
    window.dispatchEvent(new Event("kh_user_change"));
    onAuth(user);
    router.push('/');
  }

  function getInitials(fn: string, ln: string) {
    const a = (fn || "").trim()[0] || "A";
    const b = (ln || "").trim()[0] || "";
    return (a + b).toUpperCase();
  }

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card">
        <div className="auth-brand">
          <div className="brand-badge">KH</div>
          <h1>Krishi Hedge Admin</h1>
          <p className="muted">Platform for forward contract management</p>
        </div>

        <div className="auth-tabs">
          <button className={`auth-tab ${tab === "admin" ? "active" : ""}`} onClick={() => setTab("admin")}> 
            <span style={{ marginRight: 8 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-3-3.87"></path><path d="M4 21v-2a4 4 0 0 1 3-3.87"></path><path d="M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" /></svg>
            </span>
            Admin Portal
          </button>
          <button className={`auth-tab ${tab === "fpo" ? "active" : ""}`} onClick={() => setTab("fpo")}> 
            <span style={{ marginRight: 8 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"></rect><path d="M8 7h8v6H8z"></path></svg>
            </span>
            FPO Profile
          </button>
        </div>

        {tab === 'admin' ? (
          <div className="auth-body">
            <label>NEW ADMIN ID</label>
            <div className="input-with-verify">
              <input value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} placeholder="Enter Employee ID" />
              {employeeId.length > 0 && <button className="btn btn-ghost" onClick={() => alert("ID verified")}>Verify ID</button>}
            </div>
            <div className="form-row">
              <div className="form-col">
                <label>FIRST NAME</label>
                <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="John" />
              </div>
              <div className="form-col">
                <label>LAST NAME</label>
                <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Doe" />
              </div>
            </div>
            <label>EMAIL ADDRESS</label>
            <div className="input-with-addon">
              <span className="input-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8.5v7A2.5 2.5 0 0 0 5.5 18h13A2.5 2.5 0 0 0 21 15.5v-7"/><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.5l-9 6-9-6"/></svg>
              </span>
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@krishihedge.com" />
            </div>

            <label>CREATE PASSWORD</label>
            <div className="input-with-addon">
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="*******" />
              <span className="addon-right">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              </span>
            </div>
            <small>Must be at least 8 characters</small>
            <button className="primary-action full" onClick={createAccount}>Create Account</button>
            <p className="muted">Already have an account? <a href="#" onClick={() => setTab('fpo')}>Sign In</a></p>
          </div>
        ) : (
          <div className="auth-body">
            <label>FPO PROFILE ID</label>
            <div className="input-with-verify">
              <input value={fpoId} onChange={(e) => setFpoId(e.target.value)} placeholder="FPO-XXXX-XXXX" />
              {fpoId.length > 0 && <button className="btn btn-ghost" onClick={() => alert("FPO ID verified")}>Verify ID</button>}
            </div>
            <label>PASSWORD</label>
            <div className="input-with-addon">
              <input type="password" value={fpoPassword} onChange={(e) => setFpoPassword(e.target.value)} placeholder="*******" />
              <span className="addon-right">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              </span>
            </div>
            <div className="row-between">
              <label className="muted"><input type="checkbox" /> Remember me</label>
              <a className="muted" href="#">Forgot password?</a>
            </div>
            <button className="primary-action full" onClick={loginFpo}>Sign In to Dashboard</button>
            <p className="muted">Don't have an account? <a href="#" onClick={() => setTab('admin')}>Sign up</a></p>
          </div>
        )}
      </div>
    </div>
  );
}
