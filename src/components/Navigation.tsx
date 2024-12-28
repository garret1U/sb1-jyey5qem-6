import { useNavigate } from 'react-router-dom';
import { Home, Users, Target, BarChart2, Settings, Building2, Crosshair } from 'lucide-react';
import { useRole } from '../hooks/useRole';
import { useLocation } from 'react-router-dom';

const baseNavigation = [
  { name: 'Dashboard', icon: Home },
  { name: 'Shooters', icon: Users },
  { name: 'Scores', icon: Target },
  { name: 'Statistics', icon: BarChart2 },
  { name: 'My Guns', icon: Crosshair },
  { name: 'Settings', icon: Settings },
];

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAdmin } = useRole();

  const navigation = isAdmin ? [
    ...baseNavigation,
    { name: 'Organization', icon: Building2 }
  ] : baseNavigation;

  const getPath = (name: string) => {
    switch (name) {
      case 'Settings': return '/club-profile';
      case 'Dashboard': return '/';
      case 'Shooters': return '/shooters';
      case 'Scores': return '/scores';
      case 'Statistics': return '/statistics';
      case 'My Guns': return '/guns';
      case 'Organization': return '/organization';
      default: return '/';
    }
  };

  const isActive = (name: string) => {
    const path = getPath(name);
    return location.pathname === path;
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="bg-white shadow-sm hidden sm:block">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.name);
              return (
                <button
                  key={item.name}
                  onClick={() => navigate(getPath(item.name))}
                  className={`flex items-center px-3 py-4 text-sm font-medium transition-colors border-b-2 ${
                    active
                      ? 'text-indigo-600 border-indigo-600'
                      : 'text-gray-600 border-transparent hover:text-indigo-600 hover:border-indigo-600'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>
      </nav>
      {/* Mobile Navigation */}
      <nav className="sm:hidden fixed bottom-[24px] left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="grid grid-cols-4 gap-1">
          {navigation.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const active = isActive(item.name);
            return (
              <button
                key={item.name}
                onClick={() => navigate(getPath(item.name))}
                className={`flex flex-col items-center justify-center py-3 px-1 ${
                  active ? 'text-indigo-600' : 'text-gray-600'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-[10px] mt-1 font-medium truncate">{item.name}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}