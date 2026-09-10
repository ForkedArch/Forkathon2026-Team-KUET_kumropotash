import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Leaf,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  Utensils,
  UserRound,
} from "lucide-react";

const DEMO_ID = "1907001";
const DEMO_PASSWORD = "kuet1234";

export default function LoginPortal() {
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState("idle");
  const [error, setError] = useState("");

  const quickFill = () => {
    setStudentId(DEMO_ID);
    setPassword(DEMO_PASSWORD);
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (!studentId.trim() || !password) {
      setStage("error");
      setError("Please enter your Student ID and password.");
      return;
    }

    setLoading(true);
    setStage("loading");

    window.setTimeout(() => setStage("auth"), 700);
    window.setTimeout(() => setStage("sync"), 1400);

    window.setTimeout(() => {
      const accepted = password.length >= 6;

      if (!accepted) {
        setLoading(false);
        setStage("error");
        setError("Password must be at least 6 characters.");
        return;
      }

      localStorage.setItem(
        "lastPlateSession",
        JSON.stringify({
          studentId,
          remember,
          loggedInAt: new Date().toISOString(),
        })
      );

      setLoading(false);
      setStage("success");

      window.setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 650);
    }, 2100);
  };

  const stageText =
    stage === "auth"
      ? "Authenticating student profile..."
      : stage === "sync"
        ? "Syncing live cafeteria data..."
        : "Connecting to campus network...";

  return (
    <main className="login-page">
      <div className="login-orb login-orb-one" />
      <div className="login-orb login-orb-two" />
      <div className="login-grid" />

      <header className="login-topbar">
        <div className="brand-lockup">
          <div className="brand-symbol"><Utensils size={18} /></div>
          <div>
            <strong>THE LAST PLATE</strong>
            <span>Campus food, smarter.</span>
          </div>
        </div>
        <div className="topbar-status"><span className="pulse-dot" /> Campus network online</div>
      </header>

      <section className="login-layout">
        <div className="login-story">
          <div className="story-kicker"><Sparkles size={14} /> STUDENT MEAL PORTAL</div>
          <h1>One login.<br /><span>Less waste.</span><br />Better plates.</h1>
          <p>
            See today's food, reserve before the rush, rescue surplus meals,
            and keep your campus dining smarter from prediction to plate.
          </p>

          <div className="story-points">
            <div><div className="story-point-icon"><Leaf size={16} /></div><span><strong>Save meals, not waste.</strong><small>Every reservation improves preparation.</small></span></div>
            <div><div className="story-point-icon"><ShieldCheck size={16} /></div><span><strong>Built for campus access.</strong><small>One place for your dining activity.</small></span></div>
            <div><div className="story-point-icon"><CheckCircle2 size={16} /></div><span><strong>Track your impact.</strong><small>See rescued meals and food saved.</small></span></div>
          </div>

          <div className="story-statline">
            <div><strong>2,450+</strong><span>meals saved this month</span></div>
            <div><strong>96%</strong><span>forecast confidence</span></div>
            <div><strong>14m</strong><span>avg. rescue pickup</span></div>
          </div>
        </div>

        <div className={`login-card ${stage === "error" ? "login-card-error" : ""} ${stage === "success" ? "login-card-success" : ""}`}>
          <div className="login-card-head">
            <div className="login-icon"><Utensils size={22} /></div>
            <div>
              <span className="eyebrow">WELCOME BACK</span>
              <h2>Student sign in</h2>
              <p>Use your campus credentials to enter the meal portal.</p>
            </div>
          </div>

          <button type="button" className="demo-banner" onClick={quickFill}>
            <span className="demo-left"><ShieldCheck size={16} /><b>Hackathon demo ready</b></span>
            <span className="demo-action">Auto-fill</span>
          </button>

          {error && <div className="form-alert error"><span>!</span>{error}</div>}
          {stage === "success" && <div className="form-alert success"><CheckCircle2 size={16} /> Login successful. Opening your dashboard...</div>}

          <form className="login-form" onSubmit={handleSubmit}>
            <label>
              <span>Student ID / Campus email</span>
              <div className="input-wrap">
                <UserRound size={17} />
                <input
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="1907001 or roll@kuet.ac.bd"
                  autoComplete="username"
                  disabled={loading}
                />
              </div>
            </label>

            <label>
              <span className="password-label">
                Password
                <button type="button" className="forgot-link" onClick={() => setError("Password recovery will connect to the campus auth service.")}>
                  Forgot password?
                </button>
              </span>
              <div className="input-wrap">
                <LockKeyhole size={17} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  disabled={loading}
                />
                <button type="button" className="eye-btn" onClick={() => setShowPassword((v) => !v)} aria-label="Toggle password visibility">
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </label>

            <div className="login-options">
              <label className="checkbox-label">
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                <span className="fake-check">{remember ? "✓" : ""}</span>
                Remember me
              </label>
              <span className="secure-note"><LockKeyhole size={13} /> Secure campus access</span>
            </div>

            <button className="login-submit" type="submit" disabled={loading || stage === "success"}>
              {loading ? (
                <><span className="spinner" />{stageText}</>
              ) : stage === "success" ? (
                <>Authenticated <CheckCircle2 size={17} /></>
              ) : (
                <>Sign in to Meal Portal <ArrowRight size={17} /></>
              )}
            </button>
          </form>

          <div className="login-footer">
            <span>Need a student account?</span>
            <button type="button" onClick={() => setError("Registration will connect to the campus student directory.")}>
              Register student roll <ArrowRight size={14} />
            </button>
          </div>

          <div className="demo-note">
            Demo credentials: <b>1907001</b> / <b>kuet1234</b>
          </div>
        </div>
      </section>
    </main>
  );
}