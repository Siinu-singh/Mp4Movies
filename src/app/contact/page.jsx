
import SectionTitle from '@/components/shared/SectionTitle';
import AnimatedPage from '@/components/shared/AnimatedPage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export const metadata = {
  title: 'Contact MP4Moviess – Support & Other Contacts',
  description: 'If you have any questions, concerns, or feedback, or whether you simply wish to contact MP4Moviess for support, assistance, or partnership, for example, MP4Moviess welcomes your correspondence.',
  alternates: {
    canonical: 'https://mp4moviess.com/contact'
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
                Welcome to Mp4movies – your go-to spot for movie updates and entertainment!
                If you have any questions, suggestions, or need help navigating the site, we’re just a message away. Whether it's technical support, feedback, or content suggestions, feel free to reach out to us.
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <Mail size={22} className="mr-3 mt-1 text-accent shrink-0" />
                  <div>
                    <span className="font-semibold text-foreground/90">General Queries & Support:</span><br />
                    <a href="mailto:support@mp4movies.in" className="text-primary hover:underline">support@mp4movies.in</a>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail size={22} className="mr-3 mt-1 text-accent shrink-0" />
                  <div>
                    <span className="font-semibold text-foreground/90">Media or Promotion Requests:</span><br />
                    <a href="mailto:media@mp4movies.in" className="text-primary hover:underline">media@mp4movies.in</a>
                  </div>
                </div>
                <div className="flex items-start">
                  <AlertCircle size={22} className="mr-3 mt-1 text-accent shrink-0" />
                  <div>
                    <span className="font-semibold text-foreground/90">Report an Issue:</span><br />
                    <a href="mailto:report@mp4movies.in" className="text-primary hover:underline">report@mp4movies.in</a>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock size={22} className="mr-3 mt-1 text-accent shrink-0" />
                  <div>
                    <span className="font-semibold text-foreground/90">Support Hours:</span><br />
                    <span>Monday to Friday – 10:00 AM to 6:00 PM (IST)</span>
                  </div>
                </div>
              </div>
              
              <p className="mt-8">
                We value your feedback and look forward to hearing from you!
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-headline text-primary">Send Us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/80 mb-6">
                Fill out the form below with your details, and we’ll respond within 24–48 hours.
                (This form is a placeholder and not functional.)
              </p>
              <form className="space-y-6 opacity-50 pointer-events-none">
                <div>
                  <Label htmlFor="name" className="text-foreground/80">Name</Label>
                  <Input id="name" type="text" placeholder="Your Name" disabled className="bg-muted/30"/>
                </div>
                <div>
                  <Label htmlFor="email" className="text-foreground/80">Email</Label>
                  <Input id="email" type="email" placeholder="Your Email" disabled className="bg-muted/30"/>
                </div>
                 <div>
                  <Label htmlFor="subject" className="text-foreground/80">Subject</Label>
                  <Input id="subject" type="text" placeholder="Subject of your message" disabled className="bg-muted/30"/>
                </div>
                <div>
                  <Label htmlFor="message" className="text-foreground/80">Message</Label>
                  <Textarea id="message" placeholder="Your Message" rows={4} disabled className="bg-muted/30"/>
                </div>
                <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground" disabled>
                  Submit
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </AnimatedPage>
  );
}
