import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Search } from 'lucide-react';
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel} from "../components/ui/Accordion";

const Help = () => {
  const faqCategories = [
    {
      category: "Getting Started",
      questions: [
        {
          q: "How do I create an account?",
          a: "You can create an account by clicking the 'Sign Up' button and selecting your role (Talent, Coach, or Scout). Fill in your details and follow the verification process."
        },
        {
          q: "What documents do I need for verification?",
          a: "Required documents vary by role. Talents need proof of age and identity, Coaches need certifications, and Scouts need organizational affiliation proof."
        },
        {
          q: "How long does verification take?",
          a: "Verification typically takes 24-48 hours. You'll receive email updates about your verification status."
        }
      ]
    },
    {
      category: "Account Management",
      questions: [
        {
          q: "How do I update my profile?",
          a: "Navigate to your profile settings, click 'Edit Profile', and update your information. Don't forget to save changes."
        },
        {
          q: "Can I change my role after signing up?",
          a: "Role changes require admin approval. Contact support with your request and relevant documentation."
        },
        {
          q: "How do I reset my password?",
          a: "Click 'Forgot Password' on the login page and follow the instructions sent to your email."
        }
      ]
    },
    {
      category: "Platform Features",
      questions: [
        {
          q: "How do I connect with other users?",
          a: "Use the search function to find users, view their profiles, and send connection requests. Messages can be sent once connections are accepted."
        },
        {
          q: "How do I schedule meetings?",
          a: "Use the calendar feature in your dashboard to propose meeting times with your connections."
        },
        {
          q: "Can I share my profile publicly?",
          a: "Yes, you can generate a public profile link from your settings. You control what information is visible."
        }
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="relative mb-8">
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg py-2 px-4"
                placeholder="Search for help..."
              />
              <Search className="absolute right-3 top-3 text-gray-400" />
            </div>

            <section className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <Card className="text-center">
                  <CardContent>
                    <h3 className="text-xl font-semibold mb-2">Quick Start Guide</h3>
                    <Button className="mt-4">View Guide</Button>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent>
                    <h3 className="text-xl font-semibold mb-2">Video Tutorials</h3>
                    <Button className="mt-4">Watch Videos</Button>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent>
                    <h3 className="text-xl font-semibold mb-2">Contact Support</h3>
                    <Button className="mt-4">Get Help</Button>
                  </CardContent>
                </Card>
              </div>

              {faqCategories.map((category, index) => (
                <Accordion key={index} className="mb-8">
                  <AccordionItem>
                    <AccordionHeader onClick={() => {}}>
                      {category.category}
                    </AccordionHeader>
                    <AccordionPanel isOpen={true}>
                      {category.questions.map((question, qIndex) => (
                        <div key={qIndex} className="mb-4">
                          <h4 className="font-semibold">{question.q}</h4>
                          <p>{question.a}</p>
                        </div>
                      ))}
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              ))}
            </section>

            <section className="bg-gray-50 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-semibold mb-4">Still Need Help?</h2>
              <p className="text-gray-600 mb-6">
                Our support team is available 24/7 to assist you
              </p>
              <div className="flex justify-center gap-4">
                <Button>Contact Support</Button>
                <Button>Submit Ticket</Button>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Help;
