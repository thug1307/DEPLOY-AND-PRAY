import React from 'react';

const teamMembers = [
  {
    name: 'Lakshya Mankani',
    role: 'Team Lead + GIS Mapping',
    icon: 'leaderboard',
    description:
      'Leads the project team and handles GIS mapping, spatial data processing, and geographic visualization of landslide-prone regions.',
    technologies: ['QGIS'],
  },
  {
    name: 'Advait Sinha',
    role: 'ML Engineer',
    icon: 'psychology',
    description:
      'Develops and manages the machine learning pipeline for landslide risk prediction using terrain, rainfall, and other geospatial features.',
    technologies: ['XGBoost'],
  },
  {
    name: 'Ishan Anand',
    role: 'Backend Developer',
    icon: 'dns',
    description:
      'Develops backend services and APIs responsible for processing requests, handling application logic, and communicating with the ML and GIS systems.',
    technologies: ['FastAPI'],
  },
  {
    name: 'Manami Sarkar',
    role: 'Frontend Developer',
    icon: 'web',
    description:
      'Builds the user interface and interactive dashboards for monitoring landslide risk, alerts, maps, and emergency response information.',
    technologies: ['React'],
  },
  {
    name: 'Yashika Panda',
    role: 'Frontend Developer',
    icon: 'dashboard',
    description:
      'Works on frontend components, page layouts, visual presentation, and interactive elements of the LandslideGuard platform.',
    technologies: ['React'],
  },
  {
    name: 'Arvindh Shivakumar',
    role: 'Integration + Backend Developer',
    icon: 'integration_instructions',
    description:
      'Integrates the frontend, backend, GIS services, and machine learning model into a unified working system.',
    technologies: ['FastAPI'],
  },
];

const technologies = [
  {
    name: 'React',
    icon: 'web',
    description: 'Frontend development and interactive user interface',
  },
  {
    name: 'FastAPI',
    icon: 'api',
    description: 'Backend API and service integration',
  },
  {
    name: 'XGBoost',
    icon: 'psychology',
    description: 'Machine learning based landslide risk prediction',
  },
  {
    name: 'QGIS',
    icon: 'map',
    description: 'GIS mapping and geospatial data processing',
  },
];

const SettingsPage = () => {
  return (
    <div className="flex-1 overflow-y-auto w-full">

      {/* =====================================================
          CONTENT CANVAS
      ===================================================== */}

      <div className="p-4 md:p-8 max-w-7xl mx-auto w-full flex flex-col gap-8">

        {/* =====================================================
            PAGE HEADER
        ===================================================== */}

        <div className="border-b border-white/10 pb-6">

          <div className="flex items-center gap-2 mb-2">

            <span className="material-symbols-outlined text-primary-fixed-dim">
              groups
            </span>

            <span className="font-label-caps text-label-caps text-primary-fixed-dim">
              Project Team
            </span>

          </div>

          <h1 className="font-headline-lg text-headline-lg-mobile md:text-display-lg text-on-surface">
            Team Details
          </h1>

          <p className="font-body-lg text-body-lg text-on-surface-variant mt-2 max-w-3xl">
            Meet the six-member team behind LandslideGuard, responsible for
            GIS mapping, machine learning, backend services, frontend
            development, and system integration.
          </p>

        </div>


        {/* =====================================================
            TEAM OVERVIEW
        ===================================================== */}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          <div className="bg-surface-container/50 backdrop-blur-xl border border-white/10 rounded-xl p-5">

            <div className="text-xs text-on-surface-variant tracking-widest uppercase">
              Team Members
            </div>

            <div className="text-3xl font-bold text-primary-fixed-dim mt-2">
              06
            </div>

          </div>


          <div className="bg-surface-container/50 backdrop-blur-xl border border-white/10 rounded-xl p-5">

            <div className="text-xs text-on-surface-variant tracking-widest uppercase">
              Core Technologies
            </div>

            <div className="text-3xl font-bold text-on-surface mt-2">
              04
            </div>

          </div>


          <div className="bg-surface-container/50 backdrop-blur-xl border border-white/10 rounded-xl p-5">

            <div className="text-xs text-on-surface-variant tracking-widest uppercase">
              Project
            </div>

            <div className="text-xl font-bold text-tertiary-fixed-dim mt-3">
              LandslideGuard
            </div>

          </div>

        </div>


        {/* =====================================================
            TEAM MEMBERS
        ===================================================== */}

        <div>

          <div className="flex items-center gap-3 mb-4">

            <span className="material-symbols-outlined text-primary-fixed-dim">
              group
            </span>

            <div>

              <h2 className="font-headline-md text-headline-md text-on-surface">
                Development Team
              </h2>

              <p className="text-sm text-on-surface-variant mt-1">
                Roles and responsibilities across the project
              </p>

            </div>

          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

            {teamMembers.map((member, index) => (

              <div
                key={member.name}
                className="group bg-surface-container/40 backdrop-blur-xl border border-white/10 rounded-xl p-5 hover:border-primary-fixed-dim/40 hover:bg-surface-container/60 transition-all duration-300"
              >

                {/* Member Header */}

                <div className="flex items-start gap-4">

                  <div className="w-12 h-12 shrink-0 rounded-xl bg-primary-container/20 border border-primary-fixed-dim/30 flex items-center justify-center">

                    <span className="material-symbols-outlined text-primary-fixed-dim text-[26px]">
                      {member.icon}
                    </span>

                  </div>


                  <div className="min-w-0">

                    <div className="text-[10px] text-primary-fixed-dim tracking-widest uppercase mb-1">
                      MEMBER 0{index + 1}
                    </div>

                    <h3 className="font-bold text-lg text-on-surface truncate">
                      {member.name}
                    </h3>

                    <p className="text-sm text-tertiary-fixed-dim font-semibold mt-1">
                      {member.role}
                    </p>

                  </div>

                </div>


                {/* Divider */}

                <div className="border-t border-white/10 my-4" />


                {/* Responsibility */}

                <div>

                  <div className="text-[10px] text-on-surface-variant tracking-widest uppercase mb-2">
                    Responsibility
                  </div>

                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    {member.description}
                  </p>

                </div>


                {/* Technology */}

                <div className="mt-4">

                  <div className="text-[10px] text-on-surface-variant tracking-widest uppercase mb-2">
                    Technology
                  </div>

                  <div className="flex flex-wrap gap-2">

                    {member.technologies.map((technology) => (

                      <span
                        key={technology}
                        className="px-2.5 py-1 rounded-md bg-primary-fixed-dim/10 border border-primary-fixed-dim/20 text-xs text-primary-fixed-dim font-semibold"
                      >
                        {technology}
                      </span>

                    ))}

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>


        {/* =====================================================
            TECHNOLOGY STACK
        ===================================================== */}

        <div>

          <div className="flex items-center gap-3 mb-4">

            <span className="material-symbols-outlined text-primary-fixed-dim">
              terminal
            </span>

            <div>

              <h2 className="font-headline-md text-headline-md text-on-surface">
                Technology Stack
              </h2>

              <p className="text-sm text-on-surface-variant mt-1">
                Core technologies used to build LandslideGuard
              </p>

            </div>

          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

            {technologies.map((technology) => (

              <div
                key={technology.name}
                className="bg-surface-container/40 backdrop-blur-xl border border-white/10 rounded-xl p-5 hover:border-primary-fixed-dim/30 transition-all"
              >

                <div className="w-10 h-10 rounded-lg bg-primary-container/20 border border-primary-fixed-dim/20 flex items-center justify-center mb-4">

                  <span className="material-symbols-outlined text-primary-fixed-dim">
                    {technology.icon}
                  </span>

                </div>

                <h3 className="font-bold text-lg text-on-surface">
                  {technology.name}
                </h3>

                <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                  {technology.description}
                </p>

              </div>

            ))}

          </div>

        </div>


        {/* =====================================================
            PROJECT FOOTER
        ===================================================== */}

        <div className="rounded-xl border border-primary-fixed-dim/20 bg-primary-fixed-dim/5 p-5">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>

              <div className="text-[10px] tracking-widest text-primary-fixed-dim uppercase">
                LandslideGuard
              </div>

              <h3 className="font-bold text-lg text-on-surface mt-1">
                Integrated Landslide Risk Monitoring System
              </h3>

              <p className="text-sm text-on-surface-variant mt-1">
                GIS + Machine Learning + Emergency Response
              </p>

            </div>


            <div className="flex flex-wrap gap-2">

              <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-on-surface-variant">
                React
              </span>

              <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-on-surface-variant">
                FastAPI
              </span>

              <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-on-surface-variant">
                XGBoost
              </span>

              <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-on-surface-variant">
                QGIS
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default SettingsPage;