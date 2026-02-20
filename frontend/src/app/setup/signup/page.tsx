"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import StickyFooter from "../../../components/StickyFooter";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

export default function SignUpPage() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: Basic Info & Password, 2: OTP Verification
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [department, setDepartment] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all required fields.");
      return;
    }
    
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    
    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
      setError("Password must contain uppercase, lowercase, and number.");
      return;
    }
    
    if (!email.endsWith("@khwopa.edu.np")) {
      setError("Please use your Khwopa College email (@khwopa.edu.np).");
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password,
          phoneNumber: phoneNumber.trim() || undefined,
          department: department.trim() || undefined,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Failed to send OTP");
      }
      
      alert("OTP sent to your email! Check your inbox.");
      setStep(2);
    } catch (err: any) {
      setError(err.message || "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }
    
    if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await fetch(`${API_URL}/auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          otp: otp.trim(),
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Invalid OTP");
      }
      
      // Store tokens in localStorage
      localStorage.setItem("accessToken", data.data.accessToken);
      localStorage.setItem("refreshToken", data.data.refreshToken);
      localStorage.setItem("user", JSON.stringify(data.data.user));
      
      alert("Email verified! Welcome to Khwopa College Portal 🎉");
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "OTP verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setError("");
    setLoading(true);
    
    try {
      const response = await fetch(`${API_URL}/auth/resend-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Failed to resend OTP");
      }
      
      alert("OTP resent successfully! Check your email.");
    } catch (err: any) {
      setError(err.message || "Failed to resend OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    border: "1.5px solid #E0D5C8",
    borderRadius: "10px",
    fontSize: "15px",
    fontFamily: "'Nunito', sans-serif",
    color: "#5C4033",
    background: "#FFFAF5",
    outline: "none",
    boxSizing: "border-box" as const,
    transition: "border-color 0.2s, box-shadow 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "13px",
    color: "#9E8572",
    fontWeight: 600,
    marginBottom: "6px",
    display: "block",
    fontFamily: "'Nunito', sans-serif",
    letterSpacing: "0.3px",
  };

  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(145deg, #FBF0E3 0%, #F5E6D3 50%, #EDD9C4 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Nunito', sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Animated glassy floating bubbles */}
        <style>{`
          @keyframes float {
            0% { transform: translateY(0) scale(1); opacity: 0.7; }
            50% { transform: translateY(-40px) scale(1.08); opacity: 1; }
            100% { transform: translateY(0) scale(1); opacity: 0.7; }
          }
          .bubble {
            position: absolute;
            border-radius: 50%;
            background: linear-gradient(135deg, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.10) 100%);
            box-shadow:
              0 8px 32px 0 rgba(180,140,100,0.18),
              0 2.5px 16px 0 rgba(255,255,255,0.22) inset,
              0 1.5px 8px 0 rgba(255,255,255,0.18) inset,
              0 0 0 2px rgba(255,255,255,0.18) inset;
            backdrop-filter: blur(16px) saturate(1.4);
            border: 2.5px solid rgba(255,255,255,0.35);
            pointer-events: none;
            z-index: 0;
            transition: box-shadow 0.3s, background 0.3s, border 0.3s;
          }
          .bubble::after {
            display: block;
            position: absolute;
            left: 18%;
            top: 16%;
            width: 38%;
            height: 32%;
            border-radius: 50%;
            background: rgba(255,255,255,0.45);
            filter: blur(2.5px);
            opacity: 0.7;
          }
        `}</style>
        <div className="bubble" style={{ width: 90, height: 90, left: '8%', top: '12%', animation: 'float 5s ease-in-out infinite', animationDelay: '0s' }} />
        <div className="bubble" style={{ width: 48, height: 48, left: '18%', top: '22%', animation: 'float 6s ease-in-out infinite', animationDelay: '1s' }} />
        <div className="bubble" style={{ width: 70, height: 70, right: '10%', bottom: '18%', animation: 'float 7s ease-in-out infinite', animationDelay: '0.5s' }} />
        <div className="bubble" style={{ width: 36, height: 36, right: '15%', top: '60%', animation: 'float 4.5s ease-in-out infinite', animationDelay: '1.5s' }} />
        <div className="bubble" style={{ width: 60, height: 60, left: '12%', bottom: '25%', animation: 'float 6.5s ease-in-out infinite', animationDelay: '2s' }} />
        <div className="bubble" style={{ width: 28, height: 28, left: '5%', top: '40%', animation: 'float 5.5s ease-in-out infinite', animationDelay: '2.5s' }} />

        {/* Main card container */}
        <div style={{
          position: "relative",
          width: 420,
          maxWidth: "90vw",
        }}>
          {/* Whiteboard shadow/frame */}
          <div style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            borderRadius: "32px",
            background: "#FFF",
            boxShadow: "0 8px 32px rgba(139,94,60,0.13)",
            zIndex: 1,
          }} />
          {/* Image character */}
          <div style={{ position: "absolute", left: -280, bottom: -20, zIndex: 2 }}>
            <Image
              src={showPassword ? "/4.png" : "/2.png"}
              alt="Character"
              width={showPassword ? 60 : 420}
              height={showPassword ? 90 : 630}
              style={{
                filter: "drop-shadow(4px 4px 6px rgba(0,0,0,0.15))",
                objectFit: "cover",
                position: "absolute",
                left: 0,
                top: 0
              }}
            />
          </div>
          {/* Sign Up form */}
          <div style={{ position: "relative", zIndex: 3, padding: "48px 36px 36px 80px" }}>
            <h2 style={{ fontWeight: 800, fontSize: 28, color: "#8B5E3C", marginBottom: 8, letterSpacing: 1 }}>
              {step === 1 ? "Sign Up" : "Verify OTP"}
            </h2>
            
            {/* Error/Info messages */}
            {error && (
              <div style={{
                padding: "12px",
                marginBottom: "16px",
                background: "#FFF0F0",
                border: "1.5px solid #FFB4B4",
                borderRadius: "8px",
                color: "#D32F2F",
                fontSize: "13px",
                fontWeight: 600
              }}>
                {error}
              </div>
            )}
            
            {/* Step 1: Registration Form */}
            {step === 1 && (
              <form onSubmit={handleSendOTP}>
                <label style={labelStyle} htmlFor="name">Full Name *</label>
                <input
                  id="name"
                  type="text"
                  style={inputStyle}
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  disabled={loading}
                />
                <div style={{ height: 16 }} />
                
                <label style={labelStyle} htmlFor="email">College Email *</label>
                <input
                  id="email"
                  type="email"
                  style={inputStyle}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your-email@khwopa.edu.np"
                  autoComplete="email"
                  disabled={loading}
                />
                <div style={{ height: 16 }} />
                
                <label style={labelStyle} htmlFor="password">Password *</label>
                <div style={{ position: "relative" }}>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    style={inputStyle}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Min 8 chars, 1 upper, 1 lower, 1 number"
                    autoComplete="new-password"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    style={{
                      position: "absolute",
                      right: 12,
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      color: "#8B5E3C",
                      fontWeight: 700,
                      cursor: "pointer",
                      fontSize: 13,
                    }}
                    onClick={() => setShowPassword(v => !v)}
                    tabIndex={-1}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <div style={{ height: 16 }} />
                
                <label style={labelStyle} htmlFor="confirmPassword">Confirm Password *</label>
                <div style={{ position: "relative" }}>
                  <input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    style={inputStyle}
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter your password"
                    autoComplete="new-password"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    style={{
                      position: "absolute",
                      right: 12,
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      color: "#8B5E3C",
                      fontWeight: 700,
                      cursor: "pointer",
                      fontSize: 13,
                    }}
                    onClick={() => setShowPassword(v => !v)}
                    tabIndex={-1}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <div style={{ height: 16 }} />
                
                <label style={labelStyle} htmlFor="phoneNumber">Phone Number (Optional)</label>
                <input
                  id="phoneNumber"
                  type="tel"
                  style={inputStyle}
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                  placeholder="+977-9812345678"
                  autoComplete="tel"
                  disabled={loading}
                />
                <div style={{ height: 16 }} />
                
                <label style={labelStyle} htmlFor="department">Department (Optional)</label>
                <input
                  id="department"
                  type="text"
                  style={inputStyle}
                  value={department}
                  onChange={e => setDepartment(e.target.value)}
                  placeholder="e.g., Computer Engineering"
                  disabled={loading}
                />
                <div style={{ height: 16 }} />
                
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    marginTop: 6,
                    padding: "13px 0",
                    width: "100%",
                    marginBottom: 12,
                    minWidth: 180,
                    background: loading ? "#CCC" : "linear-gradient(135deg, #c9936a, #b58f76)",
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                    fontSize: "16px",
                    fontWeight: 800,
                    fontFamily: "'Nunito', sans-serif",
                    cursor: loading ? "not-allowed" : "pointer",
                    letterSpacing: "1.5px",
                    boxShadow: "0 4px 14px rgba(158, 111, 80, 0.35)",
                    transition: "transform 0.15s, box-shadow 0.15s",
                  }}
                  onMouseDown={(e) => {
                    if (!loading) (e.target as HTMLButtonElement).style.transform = "scale(0.97)";
                  }}
                  onMouseUp={(e) => {
                    if (!loading) (e.target as HTMLButtonElement).style.transform = "scale(1)";
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) (e.target as HTMLButtonElement).style.boxShadow = "0 6px 20px rgba(107,66,38,0.45)";
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) {
                      (e.target as HTMLButtonElement).style.boxShadow = "0 4px 14px rgba(107,66,38,0.35)";
                      (e.target as HTMLButtonElement).style.transform = "scale(1)";
                    }
                  }}
                >
                  {loading ? "SENDING..." : "SEND OTP"}
                </button>
              </form>
            )}

            {/* Step 2: OTP Verification */}
            {step === 2 && (
              <form onSubmit={handleVerifyOTP}>
                <p style={{ fontSize: "14px", color: "#9E8572", marginBottom: "20px", textAlign: "center" }}>
                  We&apos;ve sent a 6-digit OTP to<br />
                  <strong style={{ color: "#8B5E3C" }}>{email}</strong>
                </p>
                
                <label style={labelStyle} htmlFor="otp">Enter OTP</label>
                <input
                  id="otp"
                  type="text"
                  style={{
                    ...inputStyle,
                    textAlign: "center",
                    letterSpacing: "8px",
                    fontSize: "20px",
                    fontWeight: "bold"
                  }}
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                  placeholder="000000"
                  maxLength={6}
                  autoComplete="one-time-code"
                  disabled={loading}
                />
                <div style={{ height: 24 }} />
                
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    marginTop: 6,
                    padding: "13px 0",
                    width: "100%",
                    marginBottom: 12,
                    minWidth: 180,
                    background: loading ? "#CCC" : "linear-gradient(135deg, #c9936a, #b58f76)",
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                    fontSize: "16px",
                    fontWeight: 800,
                    fontFamily: "'Nunito', sans-serif",
                    cursor: loading ? "not-allowed" : "pointer",
                    letterSpacing: "1.5px",
                    boxShadow: "0 4px 14px rgba(158, 111, 80, 0.35)",
                    transition: "transform 0.15s, box-shadow 0.15s",
                  }}
                  onMouseDown={(e) => {
                    if (!loading) (e.target as HTMLButtonElement).style.transform = "scale(0.97)";
                  }}
                  onMouseUp={(e) => {
                    if (!loading) (e.target as HTMLButtonElement).style.transform = "scale(1)";
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) (e.target as HTMLButtonElement).style.boxShadow = "0 6px 20px rgba(107,66,38,0.45)";
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) {
                      (e.target as HTMLButtonElement).style.boxShadow = "0 4px 14px rgba(107,66,38,0.35)";
                      (e.target as HTMLButtonElement).style.transform = "scale(1)";
                    }
                  }}
                >
                  {loading ? "VERIFYING..." : "VERIFY OTP"}
                </button>
                
                <div style={{ textAlign: "center", marginTop: 8 }}>
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={loading}
                    style={{
                      background: "none",
                      border: "none",
                      color: loading ? "#CCC" : "#8B5E3C",
                      fontSize: "13px",
                      fontWeight: 700,
                      cursor: loading ? "not-allowed" : "pointer",
                      textDecoration: "none",
                      marginRight: "16px"
                    }}
                    onMouseEnter={(e) => !loading && ((e.target as HTMLButtonElement).style.textDecoration = "underline")}
                    onMouseLeave={(e) => (e.target as HTMLButtonElement).style.textDecoration = "none"}
                  >
                    Resend OTP
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    disabled={loading}
                    style={{
                      background: "none",
                      border: "none",
                      color: loading ? "#CCC" : "#8B5E3C",
                      fontSize: "13px",
                      fontWeight: 700,
                      cursor: loading ? "not-allowed" : "pointer",
                      textDecoration: "none"
                    }}
                    onMouseEnter={(e) => !loading && ((e.target as HTMLButtonElement).style.textDecoration = "underline")}
                    onMouseLeave={(e) => (e.target as HTMLButtonElement).style.textDecoration = "none"}
                  >
                    ← Back to Registration
                  </button>
                </div>
              </form>
            )}

            {/* Footer links */}
            <div style={{ textAlign: "center", marginTop: 4 }}>
              <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#9E8572" }}>
                Already have an account?{" "}
                <a href="/setup/login" style={{ color: "#8B5E3C", textDecoration: "none", fontWeight: 700 }}
                  onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.textDecoration = "underline"}
                  onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.textDecoration = "none"}
                >Login</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    {/* StickyFooter component at the bottom */}
    <StickyFooter />
    </>
  );
}