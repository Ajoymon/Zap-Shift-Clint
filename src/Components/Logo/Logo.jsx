import React from 'react';
import logo from '../../assets/logo.png';

const Logo = () => {
  return (
    <div className="flex items-end ">
      <img 
        src={logo} 
        alt="ZapShift Logo" 
        className="w-10 h-10 object-contain"
      />
      <h3 className="text-3xl -ms-2.5 font-extrabold  leading-none">
        Zap<span className="text-primary">Shift</span>
      </h3>
      
    </div>
  );
};

export default Logo;
