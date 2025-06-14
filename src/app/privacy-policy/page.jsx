
import SectionTitle from '@/components/shared/SectionTitle';
import AnimatedPage from '@/components/shared/AnimatedPage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: 'Privacy Policy',
  description: 'Read the Privacy Policy for Mp4movies. Understand how we collect, use, and protect your data.',
  alternates: {
    canonical: '/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8 max-w-4xl mx-auto">
          <SectionTitle>Privacy Policy</SectionTitle>
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-headline text-primary">Last Updated: {new Date().toLocaleDateString()}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-foreground/80 leading-relaxed">
              <p>Welcome to Mp4movies.com ("us", "we", or "our"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact us at privacy@mp4moviess.com.</p>

              <h3 className="text-lg font-semibold pt-2">1. Information We Collect</h3>
              <p>We may collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, when you participate in activities on the website, or otherwise when you contact us.</p>
              <p>The personal information that we collect depends on the context of your interactions with us and the website, the choices you make, and the products and features you use. The personal information we collect may include the following: name, email address, password, user preferences, and payment information (if applicable).</p>

              <h3 className="text-lg font-semibold pt-2">2. How We Use Your Information</h3>
              <p>We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>To facilitate account creation and logon process.</li>
                <li>To post testimonials with your consent.</li>
                <li>Request feedback.</li>
                <li>To enable user-to-user communications.</li>
                <li>To manage user accounts.</li>
                <li>To send administrative information to you.</li>
                <li>To protect our Services.</li>
                <li>To enforce our terms, conditions and policies for business purposes, to comply with legal and regulatory requirements or in connection with our contract.</li>
              </ul>

              <h3 className="text-lg font-semibold pt-2">3. Will Your Information Be Shared With Anyone?</h3>
              <p>We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.</p>
              <p>We may need to share your personal information in the following situations: Business Transfers, Affiliates, Business Partners.</p>

              <h3 className="text-lg font-semibold pt-2">4. How Long Do We Keep Your Information?</h3>
              <p>We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law (such as tax, accounting or other legal requirements).</p>
              
              <h3 className="text-lg font-semibold pt-2">5. How Do We Keep Your Information Safe?</h3>
              <p>We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.</p>

              <h3 className="text-lg font-semibold pt-2">6. Your Privacy Rights</h3>
              <p>In some regions (like the European Economic Area and the UK), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; and (iv) if applicable, to data portability.</p>
              
              <h3 className="text-lg font-semibold pt-2">7. Updates To This Notice</h3>
              <p>We may update this privacy notice from time to time. The updated version will be indicated by an updated "Last updated" date and the updated version will be effective as soon as it is accessible. We encourage you to review this privacy notice frequently to be informed of how we are protecting your information.</p>
              
              <h3 className="text-lg font-semibold pt-2">8. How Can You Contact Us About This Notice?</h3>
              <p>If you have questions or comments about this notice, you may email us at privacy@mp4moviess.com or by post to:</p>
              <p>Mp4movies<br/>123 Movie Lane<br/>Cinemaville, CA 90210<br/>United States</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AnimatedPage>
  );
}

