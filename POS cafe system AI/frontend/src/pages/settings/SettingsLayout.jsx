import React, { useState } from 'react';
import SettingsTopBar from './components/SettingsTopBar';
import AccordionSection from './components/AccordionSection';
import GeneralSettings from './components/GeneralSettings';
import InventorySettings from './components/InventorySettings';
import MenuSettings from './components/MenuSettings';
import UserSettings from './components/UserSettings';

const SettingsLayout = () => {
  const [activeSection, setActiveSection] = useState('General Settings');

  const handleToggle = (section) => {
    setActiveSection(prev => prev === section ? null : section);
  };

  return (
    <div className="flex flex-col h-full bg-[var(--color-app-bg)] px-[15px] pb-[12px]">
      <SettingsTopBar />
      
      <section className="flex-1 min-h-0 flex flex-col bg-white rounded-[6px] border border-[var(--color-border)] shadow-[0_1px_2px_rgba(3,4,90,0.04)] overflow-hidden">
        <AccordionSection 
          title="General Settings" 
          isOpen={activeSection === 'General Settings'}
          onToggle={() => handleToggle('General Settings')}
        >
          <GeneralSettings />
        </AccordionSection>

        <AccordionSection 
          title="Inventory Settings"
          isOpen={activeSection === 'Inventory Settings'}
          onToggle={() => handleToggle('Inventory Settings')}
        >
          <InventorySettings />
        </AccordionSection>

        <AccordionSection 
          title="Menu Management Settings"
          isOpen={activeSection === 'Menu Management Settings'}
          onToggle={() => handleToggle('Menu Management Settings')}
        >
          <MenuSettings />
        </AccordionSection>

        <AccordionSection 
          title="User Settings"
          isOpen={activeSection === 'User Settings'}
          onToggle={() => handleToggle('User Settings')}
        >
          <UserSettings />
        </AccordionSection>
      </section>
    </div>
  );
};

export default SettingsLayout;
