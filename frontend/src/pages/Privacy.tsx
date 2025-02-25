import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Shield, Lock, Eye, UserCheck } from 'lucide-react';

const Privacy = () => {
  const sections = [
    {
      title: "Information We Collect",
      content: `We collect information that you provide directly to us, including:
        • Personal identification information (name, email address, phone number)
        • Professional information (sports credentials, certifications)
        • Profile information (photos, videos, achievements)
        • Communication data (messages, feedback, reviews)`
    },
    {
      title: "How We Use Your Information",
      content: `Your information is used to:
        • Provide and maintain our services
        • Match talents with opportunities
        • Facilitate communication between users
        • Improve our platform and user experience
        • Send important updates and notifications`
    },
    {
      title: "Information Sharing",
      content: `We share your information with:
        • Other platform users (based on your privacy settings)
        • Service providers and partners
        • Legal authorities (when required by law)
        We never sell your personal information to third parties.`
    },
    {
      title: "Your Rights and Controls",
      content: `You have the right to:
        • Access your personal information
        • Correct inaccurate data
        • Delete your account and data
        • Control your privacy settings
        • Opt-out of communications`
    }
  ];

  const privacyFeatures = [
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Data Encryption",
      description: "All sensitive data is encrypted using industry-standard protocols."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Storage",
      description: "Your data is stored in secure, monitored facilities."
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Privacy Controls",
      description: "Customize who can see your information."
    },
    {
      icon: <UserCheck className="w-8 h-8" />,
      title: "User Consent",
      description: "Clear consent options for data usage."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
              <p className="text-xl text-gray-600">
                Your privacy is important to us. Learn how we protect your data.
              </p>
            </div>
            
            <section className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {privacyFeatures.map((feature, index) => (
                  <Card key={index}>
                    <CardContent>
                      <div className="flex items-center gap-4">
                        <div className="text-primary">{feature.icon}</div>
                        <div>
                          <h3 className="font-semibold text-lg">{feature.title}</h3>
                          <p className="text-gray-600">{feature.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section className="space-y-8">
              {sections.map((section, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                  <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
                  <p className="text-gray-600 whitespace-pre-line">{section.content}</p>
                </div>
              ))}
            </section>

            <section className="mt-12 text-center">
              <h2 className="text-2xl font-semibold mb-6">Have Questions?</h2>
              <p className="text-gray-600 mb-6">
                If you have any questions about our privacy policy or data practices,
                please don't hesitate to contact us.
              </p>
              <Button>
                Contact Support
              </Button>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;