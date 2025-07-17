
import SectionTitle from '@/components/shared/SectionTitle';
import AnimatedPage from '@/components/shared/AnimatedPage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';


export const metadata = {
  title: 'Terms of Service | MP4Moviess',
  description: 'Please read through the following terms and conditions for using MP4Moviess, the term, of course, includes but is not limited to your use of its content, including your responsibilities as a user and so forth.',
  alternates: {
    canonical: 'https://mp4moviess.com/terms-of-service',
  },
};

export default function TermsOfServicePage() {
  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8 max-w-4xl mx-auto">
          <SectionTitle>Terms of Service – Mp4movies</SectionTitle>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-headline text-primary">Last Updated: {new Date().toLocaleDateString()}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-foreground/80 leading-relaxed">
              <p>Welcome to Mp4movies. By using our website, you agree to the following terms and conditions. Please read them carefully.</p>

              <h3 className="text-lg font-semibold pt-2 text-foreground/90">1. Acceptance of Terms</h3>
              <p>By accessing Mp4movies, you agree to comply with these Terms of Service. If you do not agree, please do not use the site.</p>

              <h3 className="text-lg font-semibold pt-2 text-foreground/90">2. Use of Content</h3>
              <p>All content on Mp4movies is for informational and entertainment purposes only. You may not reproduce, republish, or redistribute any content without our permission.</p>

              <h3 className="text-lg font-semibold pt-2 text-foreground/90">3. User Conduct</h3>
              <p>You agree not to:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Post abusive, offensive, or illegal content</li>
                <li>Disrupt the site’s operation</li>
                <li>Attempt to gain unauthorized access to the site</li>
              </ul>

              <h3 className="text-lg font-semibold pt-2 text-foreground/90">4. External Links</h3>
              <p>Mp4movies may contain links to third-party websites. We are not responsible for their content, terms, or policies.</p>

              <h3 className="text-lg font-semibold pt-2 text-foreground/90">5. Disclaimer</h3>
              <p>We strive to provide accurate and updated information. However, we do not guarantee that all content is free of errors or suitable for all purposes.</p>

              <h3 className="text-lg font-semibold pt-2 text-foreground/90">6. Termination</h3>
              <p>We reserve the right to restrict or terminate your access to Mp4movies at our discretion, without notice, if we believe you have violated our terms.</p>
              
              <h3 className="text-lg font-semibold pt-2 text-foreground/90">7. Changes to Terms</h3>
              <p>Mp4movies may modify these Terms of Service at any time. Your continued use of the site indicates your acceptance of any changes.</p>
              
              <h3 className="text-lg font-semibold pt-2 text-foreground/90">8. Contact Us</h3>
              <p>If you have any questions about these Terms, please contact us at <a href="mailto:legal@mp4moviess.com" className="text-primary hover:underline">legal@mp4moviess.com</a>.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AnimatedPage>
  );
}
