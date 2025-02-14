import Button from "../components/Button";
import { Trophy } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center">
      {/* Navbar */}
      <nav className="w-full bg-white text-black flex justify-between items-center px-6 py-4 rounded-b-2xl shadow-lg">
        <div className="flex items-center gap-2 text-xl font-bold">
          <Trophy className="text-blue-600" size={28} />
          Triple S
        </div>
        <div className="hidden md:flex gap-8 text-lg font-medium">
          <a href="#" className="hover:text-blue-500 text-lg transition-all">Home</a>
          <a href="#" className="hover:text-blue-500 text-lg transition-all">Talents</a>
          <a href="#" className="hover:text-blue-500 text-lg transition-all">Coaches</a>
          <a href="#" className="hover:text-blue-500 text-lg transition-all">Scouts</a>
        </div>
        <div className="flex gap-4">
          <Button variant="ghost" className="text-lg">Login</Button>
          <Button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-lg hover:bg-blue-700">Sign Up</Button>
        </div>
      </nav>
      
      {/* Hero Section */}
      <div className="text-center mt-16 px-6 md:px-0">
        <h1 className="text-4xl md:text-5xl font-bold">Discover and Connect with Top Talent in Sports and Art</h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
          Your gateway to discovering exceptional talents and building meaningful connections in the world of sports and arts.
        </p>
        <div className="mt-6 flex gap-4 justify-center">
          <Button className="bg-white text-black px-6 py-3 rounded-full text-lg hover:bg-gray-300">Get Started</Button>
          <Button className="bg-blue-700 text-white px-6 py-3 rounded-full text-lg hover:bg-blue-800">Learn More</Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
