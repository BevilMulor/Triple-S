import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import { Label } from '../components/ui/Label';

const Contact = () => {

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input id="name" placeholder="John Doe" value="" onChange={() => { } } name={''} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Your Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" value="" onChange={() => { } } name={''} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="How can we help?" value="" onChange={() => { } } name={''} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us more about your inquiry..."
                  className="min-h-[150px]"
                  value=""
                  onChange={() => {}}
                />
              </div>

              <Button type="submit">Send</Button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;