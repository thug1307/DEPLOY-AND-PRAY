import React from 'react';

const SettingsPage = () => {
  return (
    <div className="flex-1 flex flex-col p-gutter overflow-y-auto">
      <div className="glass-panel p-lg rounded-xl flex-1 flex flex-col items-center justify-center text-center">
        <span className="material-symbols-outlined text-[64px] text-on-surface-variant mb-4">settings</span>
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">System Settings</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md">
          Settings module is currently under development. Soon you will be able to manage user profiles, system preferences, and API integrations.
        </p>
      </div>
    </div>
  );
};

export default SettingsPage;
