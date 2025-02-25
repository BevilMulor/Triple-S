// src/components/Dashboard.tsx
import { Navbar } from './common/Navbar';
import { Footer } from './common/Footer';
import Hero from './home/Hero';
import Features from './home/Features';
import SuccessStories from './home/SuccessStories';
import CTA from './home/CTA';

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <SuccessStories />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
