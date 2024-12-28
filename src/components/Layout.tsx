import React from 'react';
import { Header } from './Header';
import Navigation from './Navigation';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />
      <main className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-4 sm:py-8 pb-24 sm:pb-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}