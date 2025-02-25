import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Star, Quote } from 'lucide-react';

const Success = () => {
  const successStories = [
    {
      name: "David Martinez",
      role: "Professional Basketball Player",
      story: "Through this platform, I connected with my current coach who helped me secure a spot in the national team.",
      image: "/api/placeholder/100/100",
      outcome: "Signed with National Team"
    },
    {
      name: "Emma Thompson",
      role: "Olympic Swimmer",
      story: "The scouts I met here recognized my potential and provided the pathway to Olympic training.",
      image: "/api/placeholder/100/100",
      outcome: "Olympic Qualifier"
    },
    {
      name: "James Wilson",
      role: "Soccer Coach",
      story: "I've discovered amazing young talents through this platform who are now playing professionally.",
      image: "/api/placeholder/100/100",
      outcome: "Developed 5 Pro Players"
    }
  ];

  const statistics = [
    { number: "80%", label: "Success Rate" },
    { number: "1000+", label: "Professional Placements" },
    { number: "200+", label: "Partner Organizations" }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Success Stories</h1>
              <p className="text-xl text-gray-600">
                Real achievements from our community members
              </p>
            </div>

            <section className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {statistics.map((stat, index) => (
                  <Card key={index}>
                    <CardContent>
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        {stat.number}
                      </div>
                      <div className="text-gray-600">{stat.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section className="mb-16">
              <h2 className="text-2xl font-semibold mb-8">Featured Success Stories</h2>
              <div className="space-y-8">
                {successStories.map((story, index) => (
                  <Card key={index}>
                    <CardContent>
                      <div className="flex items-start gap-6">
                        <img
                          src={story.image}
                          alt={story.name}
                          className="w-24 h-24 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-semibold">{story.name}</h3>
                            <div className="flex text-yellow-500">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-current" />
                              ))}
                            </div>
                          </div>
                          <p className="text-blue-600 mb-2">{story.role}</p>
                          <div className="flex items-start gap-2 text-gray-600">
                            <Quote className="w-6 h-6 text-gray-400" />
                            <p>{story.story}</p>
                          </div>
                          <div className="mt-4 flex items-center justify-between">
                            <span className="text-green-600 font-semibold">
                              Outcome: {story.outcome}
                            </span>
                            <Button>Read Full Story</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-8 text-center text-white">
              <h2 className="text-2xl font-semibold mb-4">Write Your Success Story</h2>
              <p className="mb-6">
                Join our platform and take the first step towards achieving your goals
              </p>
              <Button>
                Start Your Journey
              </Button>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Success;
