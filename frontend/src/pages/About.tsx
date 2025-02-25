import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Target, Globe, Award } from 'lucide-react';

const About = () => {
  const stats = [
    { number: "10,000+", label: "Active Users" },
    { number: "500+", label: "Successful Matches" },
    { number: "50+", label: "Countries" },
    { number: "95%", label: "Satisfaction Rate" }
  ];

  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      bio: "Former professional athlete with 15 years of experience in sports management."
    },
    {
      name: "Michael Chen",
      role: "Head of Talent Relations",
      bio: "Ex-Olympic coach specializing in talent development and scouting."
    },
    {
      name: "Lisa Martinez",
      role: "Technology Director",
      bio: "Tech industry veteran focused on creating innovative sports platforms."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <section className="text-center mb-16">
              <h1 className="text-4xl font-bold mb-4">About Us</h1>
              <p className="text-xl text-gray-600 mb-8">
                Connecting talents, coaches, and scouts to shape the future of sports
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <Card key={index}>
                    <CardContent>
                      <div className="text-3xl font-bold text-blue-600">{stat.number}</div>
                      <div className="text-gray-600">{stat.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section className="mb-16">
              <h2 className="text-2xl font-semibold mb-8">Our Mission</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent>
                    <div className="p-6 text-center">
                      <Target className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Vision</h3>
                      <p className="text-gray-600">
                        To revolutionize how sports talent is discovered and developed globally.
                      </p>
                    </div>
                  </CardContent>
                  <CardContent>
                    <div className="p-6 text-center">
                      <Globe className="w-12 h-12 text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Reach</h3>
                      <p className="text-gray-600">
                        Creating opportunities across borders and breaking down barriers in sports.
                      </p>
                    </div>
                  </CardContent>
                  <CardContent>
                    <div className="p-6 text-center">
                      <Award className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Excellence</h3>
                      <p className="text-gray-600">
                        Maintaining the highest standards in sports talent development.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="mb-16">
              <h2 className="text-2xl font-semibold mb-8">Our Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {teamMembers.map((member, index) => (
                  <Card key={index}>
                    <CardContent>
                      <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                      <p className="text-blue-600 mb-2">{member.role}</p>
                      <p className="text-gray-600">{member.bio}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section className="bg-gray-50 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-semibold mb-4">Join Our Platform</h2>
              <p className="text-gray-600 mb-6">
                Be part of the future of sports talent development
              </p>
              <Button>Get Started</Button>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
