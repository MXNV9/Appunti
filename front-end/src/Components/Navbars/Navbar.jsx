import { User } from 'lucide-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';

export const Navbar = ({ link1, link2, link3, link4 }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [subMenu, setSubMenu] = useState(false);
  return (
    <div className="flex items-center justify-between gap-[24px]">
      <div className="logo" onClick={() => navigate('/')}>
        Logo
      </div>
      <div className="flex items-center gap-[24px]">
        <div
          className="link p-2 capitalize"
          onClick={() => navigate('/' + link1)}
          style={{ color: location.pathname === `/${link1}` ? 'orange' : 'black' }}
        >
          {link1 || 'link 1'}
        </div>
        <div
          className="link p-2 capitalize"
          onClick={() => navigate('/' + link2)}
          style={{ color: location.pathname === `/${link2}` ? 'orange' : 'black' }}
        >
          {link2 || 'link 2'}
        </div>
        <div
          className="link p-2 capitalize"
          onClick={() => navigate('/' + link3)}
          style={{ color: location.pathname === `/${link3}` ? 'orange' : 'black' }}
        >
          {link3 || 'link 3'}
        </div>
        <div
          className="link p-2 capitalize"
          onClick={() => navigate('/' + link4)}
          style={{ color: location.pathname === `/${link4}` ? 'orange' : 'black' }}
        >
          {link4 || 'link 4'}
        </div>
        <div className="relative">
          <div className="icon-link p-2" onClick={() => setSubMenu(!subMenu)}>
            <User size={36} />
          </div>

          <AnimatePresence>
            {subMenu && (
              <motion.div className="absolute top-[56px] right-0 z-50 cursor-pointer rounded-3xl border bg-white p-4 text-center shadow-lg">
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <li
                    className="mb-4 rounded-3xl from-red-500 to-orange-500 hover:bg-gradient-to-r hover:text-white"
                    onClick={() => {
                      navigate('/login');
                      setSubMenu(false);
                    }}
                  >
                    Accedi
                  </li>
                  <li
                    onClick={() => {
                      navigate('/register');
                      setSubMenu(false);
                    }}
                    className="rounded-3xl from-orange-500 to-red-500 px-2 hover:bg-gradient-to-r hover:text-white"
                  >
                    Registrati
                  </li>
                </motion.ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
