import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { UserCircle, Calendar, Trophy, Search, Star, Clock } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <UserCircle className="w-12 h-12 text-blue-500" />,
      title: "Create Your Profile",
      description: "Sign up as a talent, coach, or scout. Complete your profile with relevant experience and achievements."
    },
    {
      icon: <Search className="w-12 h-12 text-blue-500" />,
      title: "Connect & Discover",
      description: "Browse through profiles, find the right matches, and connect with potential opportunities."
    },
    {
      icon: <Calendar className="w-12 h-12 text-blue-500" />,
      title: "Schedule & Meet",
      description: "Arrange meetings, trials, or training sessions through our platform."
    },
    {
      icon: <Trophy className="w-12 h-12 text-blue-500" />,
      title: "Achieve Goals",
      description: "Work together to reach milestones and advance in your sports career."
    }
  ];

  const features = [
    {
      icon: <Star className="w-8 h-8 text-yellow-500" />,
      title: "Verified Profiles",
      description: "All users undergo verification to ensure authenticity and trust."
    },
    {
      icon: <Clock className="w-8 h-8 text-green-500" />,
      title: "Real-time Updates",
      description: "Get instant notifications about matches, opportunities, and connections."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">How It Works</h1>
              <p className="text-xl text-gray-600">
                Your journey to sports excellence starts here
              </p>
            </div>

            <section className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {steps.map((step, index) => (
                  <Card key={index}>
                    <CardContent>
                      <div className="flex justify-center mb-4">
                        {step.icon}
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section className="mb-16">
              <h2 className="text-2xl font-semibold mb-8 text-center">Platform Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {features.map((feature, index) => (
                  <Card key={index}>
                    <CardContent>
                      <div>{feature.icon}</div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section className="text-center">
              <h2 className="text-2xl font-semibold mb-4">Ready to Get Started?</h2>
              <p className="text-gray-600 mb-6">
                Join our platform and take the next step in your sports journey
              </p>
              <div className="flex justify-center gap-4">
                <Button>Sign Up Now</Button>
                <Button>Learn More</Button>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorks;
