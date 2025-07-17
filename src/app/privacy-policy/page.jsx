
import SectionTitle from '@/components/shared/SectionTitle';
import AnimatedPage from '@/components/shared/AnimatedPage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: ' Privacy Policy | MP4Moviess',
  description: ' Learn how MP4Moviess collects, processes, and protects your data while browsing its site and downloading content from it.',
  alternates: {
    canonical: 'https://mp4moviess.com/privacy-policy',
  },
};


export default function PrivacyPolicyPage() {
  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8 max-w-4xl mx-auto">
          <SectionTitle>Privacy Policy – Mp4movies</SectionTitle>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-headline text-primary">Effective Date: {new Date().toLocaleDateString()}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-foreground/80 leading-relaxed">
              <p>At Mp4movies, we respect your privacy and are committed to protecting your personal information. This privacy policy outlines what data we collect, how we use it, and your rights regarding your information.</p>

              <h3 className="text-lg font-semibold pt-2 text-foreground/90">Information We Collect</h3>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>
                  <strong>Personal Information:</strong> We may collect your name, email address, and any information you provide when subscribing to our newsletter or contacting us.
                </li>
                <li>
                  <strong>Usage Data:</strong> We collect data such as your IP address, browser type, pages visited, time spent on the site, and other analytics to improve your experience.
                </li>
              </ul>

              <h3 className="text-lg font-semibold pt-2 text-foreground/90">How We Use Your Information</h3>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>To provide and improve our services.</li>
                <li>To send newsletters or updates (only if you subscribe).</li>
                <li>To respond to your queries or feedback.</li>
                <li>To prevent fraudulent activity or protect our site.</li>
              </ul>

              <h3 className="text-lg font-semibold pt-2 text-foreground/90">Cookies</h3>
              <p>We use cookies to personalise content, track user behaviour, and improve user experience. You can choose to disable cookies in your browser settings.</p>

              <h3 className="text-lg font-semibold pt-2 text-foreground/90">Third-Party Services</h3>
              <p>We may use third-party services like Google Analytics to track site performance. These third parties have their privacy policies.</p>

              <h3 className="text-lg font-semibold pt-2 text-foreground/90">Your Rights</h3>
              <p>You can request access to, modification of, or deletion of your personal information at any time by contacting us at <a href="mailto:privacy@mp4moviess.com" className="text-primary hover:underline">privacy@mp4moviess.com</a>.</p>
              
              <h3 className="text-lg font-semibold pt-2 text-foreground/90">Changes to This Policy</h3>
              <p>We may update our Privacy Policy occasionally. We recommend reviewing this page periodically for changes.</p>
              
            </CardContent>
          </Card>
        </div>
      </div>
    </AnimatedPage>
  );
}
