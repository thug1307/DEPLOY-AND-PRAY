import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const StitchLayout = () => {
  const location = useLocation();

  const getLinkClass = (path) => {
    const isActive = location.pathname === path;

    if (isActive) {
      return "flex items-center gap-4 bg-primary-container/10 text-primary-fixed-dim border-l-4 border-primary-fixed-dim px-4 py-3 active:scale-95 transition-transform rounded-r-lg group";
    }

    return "flex items-center gap-4 text-on-surface-variant px-4 py-3 hover:bg-white/5 hover:text-primary transition-all active:scale-95 rounded-r-lg group border-l-4 border-transparent";
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen flex overflow-hidden font-body-md dark">

      {/* =====================================================
          DESKTOP SIDEBAR
      ===================================================== */}

      <aside className="hidden md:flex flex-col h-screen py-md bg-surface/30 backdrop-blur-xl border-r border-white/10 shadow-xl left-0 w-64 z-50 shrink-0">

        {/* Logo */}
        <div className="px-md mb-xl flex items-center gap-sm">

          <div className="w-10 h-10 rounded-full bg-primary-container/20 border border-primary-fixed-dim/50 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary-fixed-dim">
              radar
            </span>
          </div>

          <div>

            <h1 className="font-headline-md text-headline-md text-primary-fixed-dim tracking-tighter">
              LandslideGuard
            </h1>

            <p className="font-label-caps text-label-caps text-on-surface-variant">
              Command Center v4.2
            </p>

          </div>

        </div>


        {/* =================================================
            NAVIGATION
        ================================================= */}

        <nav className="flex-1 flex flex-col gap-xs px-sm">

          <Link
            className={getLinkClass("/")}
            to="/"
          >
            <span className="material-symbols-outlined">
              dashboard
            </span>

            <span className="font-label-caps text-label-caps group-hover:text-primary transition-colors">
              Dashboard
            </span>
          </Link>


          <Link
            className={getLinkClass("/monitoring")}
            to="/monitoring"
          >
            <span className="material-symbols-outlined">
              map
            </span>

            <span className="font-label-caps text-label-caps group-hover:text-primary transition-colors">
              Map View
            </span>
          </Link>


          <Link
            className={getLinkClass("/alerts")}
            to="/alerts"
          >
            <span className="material-symbols-outlined">
              warning
            </span>

            <span className="font-label-caps text-label-caps group-hover:text-primary transition-colors">
              Alerts
            </span>
          </Link>


          <Link
            className={getLinkClass("/report")}
            to="/report"
          >
            <span className="material-symbols-outlined">
              assessment
            </span>

            <span className="font-label-caps text-label-caps group-hover:text-primary transition-colors">
              Reports
            </span>
          </Link>


          <Link
            className={getLinkClass("/settings")}
            to="/settings"
          >
            <span className="material-symbols-outlined">
              settings
            </span>

            <span className="font-label-caps text-label-caps group-hover:text-primary transition-colors">
              Team Details
            </span>
          </Link>

        </nav>


        {/* =================================================
            BOTTOM SECTION
        ================================================= */}

        <div className="px-sm mt-auto flex flex-col gap-sm">

          {/* Emergency */}
          <Link
            to="/emergency/activation"
            className="w-full bg-error-container text-on-error-container font-label-caps text-label-caps py-3 rounded-lg border border-error/20 hover:bg-error/20 transition-colors flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">
              emergency
            </span>

            Emergency Protocol
          </Link>


          {/* Support */}
          <div className="flex flex-col gap-xs mt-4">

            <Link
              to="/support"
              className={`
                flex items-center gap-4
                text-on-surface-variant
                px-4 py-2
                hover:bg-white/5
                hover:text-primary
                transition-all
                rounded-r-lg
                group
                text-sm
                ${
                  location.pathname === "/support"
                    ? "text-primary bg-white/5"
                    : ""
                }
              `}
            >

              <span className="material-symbols-outlined text-[18px]">
                contact_support
              </span>

              <span className="font-label-caps text-label-caps">
                Support
              </span>

            </Link>


            {/* Logs */}
            <Link
              to="/logs"
              className={`
                flex items-center gap-4
                text-on-surface-variant
                px-4 py-2
                hover:bg-white/5
                hover:text-primary
                transition-all
                rounded-r-lg
                group
                text-sm
                ${
                  location.pathname === "/logs"
                    ? "text-primary bg-white/5"
                    : ""
                }
              `}
            >

              <span className="material-symbols-outlined text-[18px]">
                terminal
              </span>

              <span className="font-label-caps text-label-caps">
                Logs
              </span>

            </Link>

          </div>

        </div>

      </aside>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main className="flex-1 relative h-screen overflow-y-auto bg-[#0A0A0A] flex flex-col">

        {/* Mobile Header */}
        <header className="md:hidden flex justify-between items-center w-full px-gutter h-16 sticky top-0 z-50 bg-surface/30 backdrop-blur-xl border-b border-white/10 shadow-[0_0_15px_rgba(0,218,248,0.15)] transition-all duration-300 ease-in-out shrink-0">

          <div className="font-headline-md text-headline-md font-bold tracking-tighter text-primary-fixed-dim">
            LandslideGuard
          </div>

          <div className="flex items-center gap-4">

            <button className="text-on-surface-variant hover:text-primary-fixed hover:bg-white/5 transition-colors p-2 rounded-full">
              <span className="material-symbols-outlined">
                notifications
              </span>
            </button>

            <img
              alt="Profile"
              className="w-8 h-8 rounded-full border border-primary-fixed-dim/30 object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-_HSejjnuyrsWWYFI9lTuuQr5fVaz1ck09EK1QG-62Y23EMJ2zaJQtgQnBTMTZfJOTBSxHYML_3QPq4Ip5Xaf-Dw2Jw25I-ePXTS8DjsbAG2dqTFWcAmxu1djwmmx1p-6hT0ta2yrmS6aqE6tBwBgI3VbCjdtkNuhvQv7SciK2VUEwJfVGBaTGgOyMliyaxgYZkOinHfBUTGMdlqfy_CgGVMgWoB7458HNUwCiwoUSb22H6HqZVJpYM04pPExnwd1u7s2Sb-WILPP"
            />

          </div>

        </header>


        {/* Page Content */}
        <Outlet />

      </main>

    </div>
  );
};

export default StitchLayout;