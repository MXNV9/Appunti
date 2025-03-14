import React from 'react';
import { useNavigate } from 'react-router';

export const Navbar1 = ({ link1, link2, link3, link4, link5 }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between">
      <div className="logo">Logo</div>

      <div className="ml-[32px] flex gap-[56px]">
        <div className="link" onClick={() => navigate('/' + link1)} >{link1 || 'link1'}</div>
        <div className="link" onClick={() => navigate('/' + link2)} >{link2 || 'link2'}</div>
        <div className="link" onClick={() => navigate('/' + link3)} >{link3 || 'link3'}</div>
        <div className="link" onClick={() => navigate('/' + link4)} >{link4 || 'link4'}</div>
        <div className="link" onClick={() => navigate('/' + link5)} >{link5 || 'link5'}</div>
      </div>

      <div className="flex items-center gap-4">
        <div className="sign rounded-3xl p-2">Accedi</div>
        <div className="sign-active rounded-3xl p-2">Registrati</div>
      </div>
    </div>
  );
};
