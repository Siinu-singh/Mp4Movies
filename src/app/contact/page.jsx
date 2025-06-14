
import SectionTitle from '@/components/shared/SectionTitle';
import AnimatedPage from '@/components/shared/AnimatedPage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';

export const metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Mp4movies. We are here to help with any inquiries or feedback.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-12 max-w-4xl mx-auto">
          <SectionTitle>Contact Mp4movies</SectionTitle>
          
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-headline text-primary">Get in Touch</CardTitle>
            </CardHeader>
            <CardContent className="text-lg text-foreground/80 leading-relaxed">
              <p className="mb-6">
                We value your feedback and inquiries. Whether you have a question about our service, a suggestion for a movie, or need technical support, feel free to reach out to us. Our team is dedicated to providing you with the best possible experience.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail size={24} className="mr-3 text-accent" />
                  <span>Email: <a href="mailto:support@mp4moviess.com" className="text-primary hover:underline">support@mp4moviess.com</a></span>
                </div>
                <div className="flex items-center">
                  <Phone size={24} className="mr-3 text-accent" />
                  <span>Phone: <a href="tel:+1234567890" className="text-primary hover:underline">+1 (234) 567-890</a> (Mon-Fri, 9am-5pm PST)</span>
                </div>
                <div className="flex items-start">
                  <MapPin size={24} className="mr-3 mt-1 text-accent" />
                  <span>
                    Address: <br />
                    Mp4movies Headquarters <br />
                    123 Movie Lane, Cinemaville, CA 90210
                  </span>
                </div>
              </div>
              
              <p className="mt-8">
                For partnership inquiries or press-related questions, please contact <a href="mailto:partners@mp4moviess.com" className="text-primary hover:underline">partners@mp4moviess.com</a>.
              </p>
              <p className="mt-2">
                We aim to respond to all queries within 24-48 business hours.
              </p>
            </CardContent>
          </Card>
          
          {/* Basic Contact Form Placeholder - functionality would require server actions or API */}
          {/*
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-headline text-primary">Send Us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" type="text" placeholder="Your Name" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Your Email" />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Your Message" />
                </div>
                <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">Send Message</Button>
              </form>
            </CardContent>
          </Card>
          */}
        </div>
      </div>
    </AnimatedPage>
  );
}

