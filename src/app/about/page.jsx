
import SectionTitle from '@/components/shared/SectionTitle';
import AnimatedPage from '@/components/shared/AnimatedPage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {Users, Clapperboard, Zap} from 'lucide-react';

export const metadata = {
  title: 'About Us - Mp4Movies | Download Mp4Movies | Latest Movies Download | mp4moviess.com',
  description: 'Download the latest movies in Mp4 format at Mp4Movies. Find your favorite movies in HD for free online.',
  alternates: {
    canonical: 'https://mp4moviess.com/about',
  },
};


export default function AboutPage() {
  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-12 max-w-4xl mx-auto">
          <SectionTitle>About Mp4movies</SectionTitle>
          
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl font-headline text-primary">
                <Clapperboard size={28} className="mr-3" /> Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent className="text-lg text-foreground/80 leading-relaxed">
              <p>
                At Mp4movies, we are passionate about bringing the magic of cinema to your screens. Our mission is to provide a seamless and enjoyable movie-watching experience, offering a diverse collection of films that cater to all tastes. We believe that movies are more than just entertainment; they are a source of inspiration, emotion, and connection.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl font-headline text-primary">
                <Zap size={28} className="mr-3" /> What We Offer
              </CardTitle>
            </CardHeader>
            <CardContent className="text-lg text-foreground/80 leading-relaxed space-y-3">
              <p>
                <strong>Vast Library:</strong> Explore thousands of movies across various genres, from Hollywood blockbusters to indie gems, timeless classics to the latest releases.
              </p>
              <p>
                <strong>High-Quality Streaming:</strong> Enjoy your favorite films in high definition, with a smooth streaming experience on any device.
              </p>
              <p>
                <strong>User-Friendly Interface:</strong> Our platform is designed to be intuitive and easy to navigate, helping you find what you want to watch quickly.
              </p>
               <p>
                <strong>Personalized Experience:</strong> Discover new movies tailored to your preferences with our recommendation engine.
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl font-headline text-primary">
                <Users size={28} className="mr-3" /> Our Team
              </CardTitle>
            </CardHeader>
            <CardContent className="text-lg text-foreground/80 leading-relaxed">
              <p>
                We are a dedicated team of movie enthusiasts, developers, and designers committed to building the best online movie platform. We are constantly working to improve Mp4movies and bring you new features and content.
              </p>
            </CardContent>
          </Card>

          <div className="text-center mt-12">
              <p className="text-xl text-muted-foreground">
                  Thank you for choosing Mp4movies. Grab your popcorn and enjoy the show!
              </p>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}

