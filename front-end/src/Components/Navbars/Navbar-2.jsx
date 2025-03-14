import { Search } from 'lucide-react';
import React from 'react';

export const Navbar2 = () => {
  return (
    <div className="flex items-center justify-between gap-[32px]">
      <div className="logo">Logo</div>
      <div className="search-bar">
        <input type="text" placeholder="Cerca..." className="border-none" />
        <button>
          <Search />
        </button>
      </div>

      <div className="flex items-center">
        <div className="flex gap-4">
          <div className="link1">link1</div>
          <div className="link1">link2</div>
          <div className="link1">link3</div>
        </div>

        <div className="ml-2 flex gap-2">
          <div className="sign rounded-3xl p-2">Accedi</div>
          <div className="sign-active rounded-3xl p-2">Registrati</div>
        </div>
      </div>
    </div>
  );
};
