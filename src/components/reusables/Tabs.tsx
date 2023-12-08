import React, { useState, ReactNode } from 'react';

interface TabProps {
  label: string;
  children: ReactNode;
}

interface TabsProps {
  children: ReactNode[];
}

const Tabs: React.FC<TabsProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<string>((children[0] as React.ReactElement<TabProps>).props.label);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, newActiveTab: string) => {
    e.preventDefault();
    setActiveTab(newActiveTab);
  };

  return (
    <div className=" w-full">
      <div className="flex ">
        {React.Children.map(children, (child) => (
          <button
            key={(child as React.ReactElement<TabProps>).props.label}
            className={`${
              activeTab === (child as React.ReactElement<TabProps>).props.label ? ' text-teal-500 backdrop-blur-md backdrop-opacity-90 justify-start bg-gradient-to-r from-teal-500/20  to-blue-500/20' : ''
            } flex-1 text-zinc-200 text-xl leading-relaxed uppercase font-bold py-2  `}
            onClick={(e) => handleClick(e, (child as React.ReactElement<TabProps>).props.label)}
          >
            {(child as React.ReactElement<TabProps>).props.label}
          </button>
        ))}
      </div>
      <div className="py-0">
        {React.Children.map(children, (child) => {
          if ((child as React.ReactElement<TabProps>).props.label === activeTab) {
            return <div key={(child as React.ReactElement<TabProps>).props.label}>{(child as React.ReactElement<TabProps>).props.children}</div>;
          }
          return null;
        })}
      </div>
    </div>
  );
};

const Tab: React.FC<TabProps> = ({ label, children }) => {
  return (
    <div className="hidden" >
      {children}
    </div>
  );
};

export { Tabs, Tab };
