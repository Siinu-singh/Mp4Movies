
import SectionTitle from '@/components/shared/SectionTitle';
import AnimatedPage from '@/components/shared/AnimatedPage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: 'Terms of Service',
  description: 'Review the Terms of Service for Mp4movies. Understand your rights and obligations when using our platform.',
  alternates: {
    canonical: '/terms-of-service',
  },
};

export default function TermsOfServicePage() {
  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8 max-w-4xl mx-auto">
          <SectionTitle>Terms of Service</SectionTitle>
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-headline text-primary">Last Updated: {new Date().toLocaleDateString()}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-foreground/80 leading-relaxed">
              <p>Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the Mp4movies.com website (the "Service") operated by Mp4movies ("us", "we", or "our").</p>
              <p>Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.</p>
              <p>By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.</p>

              <h3 className="text-lg font-semibold pt-2">1. Accounts</h3>
              <p>When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.</p>
              <p>You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.</p>

              <h3 className="text-lg font-semibold pt-2">2. Intellectual Property</h3>
              <p>The Service and its original content (excluding Content provided by users), features and functionality are and will remain the exclusive property of Mp4movies and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.</p>

              <h3 className="text-lg font-semibold pt-2">3. Links To Other Web Sites</h3>
              <p>Our Service may contain links to third-party web sites or services that are not owned or controlled by Mp4movies. Mp4movies has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party web sites or services. You further acknowledge and agree that Mp4movies shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.</p>

              <h3 className="text-lg font-semibold pt-2">4. Termination</h3>
              <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
              <p>Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service.</p>

              <h3 className="text-lg font-semibold pt-2">5. Limitation Of Liability</h3>
              <p>In no event shall Mp4movies, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.</p>
              
              <h3 className="text-lg font-semibold pt-2">6. Disclaimer</h3>
              <p>Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.</p>

              <h3 className="text-lg font-semibold pt-2">7. Governing Law</h3>
              <p>These Terms shall be governed and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions.</p>
              
              <h3 className="text-lg font-semibold pt-2">8. Changes</h3>
              <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
              
              <h3 className="text-lg font-semibold pt-2">9. Contact Us</h3>
              <p>If you have any questions about these Terms, please contact us at legal@mp4moviess.com.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AnimatedPage>
  );
}

