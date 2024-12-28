import { SignedIn, SignedOut, useOrganization } from '@clerk/clerk-react';
import { Target, Loader2, ChevronDown, Book } from 'lucide-react';
import { useState, useEffect } from 'react';
import { SignInButton } from './auth/SignInButton';
import { UserButton } from './auth/UserButton';

export function Header() {
  const { organization, isLoaded: orgLoaded, setActiveOrganization } = useOrganization();
  const [isOpen, setIsOpen] = useState(false);

  const handleOrganizationChange = (orgId: string) => {
    setActiveOrganization(orgId);
    setIsOpen(false);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 py-2 sm:py-4">
          <div className="flex items-center">
            <Target className="h-8 w-8 text-indigo-600 flex-shrink-0" />
            <div className="ml-2 text-center sm:text-left">
              <h1 className="text-2xl font-bold text-gray-900">
                {!orgLoaded ? (
                  <>
                    <span>Loading</span>
                    <Loader2 className="ml-2 h-5 w-5 animate-spin text-indigo-600" />
                  </>
                ) : (
                  organization?.name || (
                    <span className="text-gray-500 text-sm sm:text-base">
                      No Organization.{' '}
                      <a href="/organization" className="text-indigo-600 underline">
                        Create One
                      </a>
                    </span>
                  )
                )}
              </h1>
            </div>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
}