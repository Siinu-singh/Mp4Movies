
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Film, Smartphone, Tv, Sparkles, Users, CalendarCheck, ShieldCheck, PlayCircle, Globe } from 'lucide-react';

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: 'easeOut',
    },
  }),
};

const ContentSection = ({ icon: Icon, title, children, custom }) => (
  <motion.div variants={sectionVariants} custom={custom} initial="hidden" animate="visible">
    <Card className="shadow-lg hover:shadow-primary/20 transition-shadow duration-300 h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center text-xl sm:text-2xl font-headline text-primary">
          {Icon && <Icon size={26} className="mr-3 text-accent shrink-0" />}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-base text-foreground/80 leading-relaxed space-y-3 flex-grow">
        {children}
      </CardContent>
    </Card>
  </motion.div>
);

export default function HomePageContent() {
  return (
    <div className="py-8 sm:py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-headline mb-3 sm:mb-4">
            Welcome to <span className="bg-gradient-to-r from-primary via-orange-400 to-red-500 bg-clip-text text-transparent">Mp4movies</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Your Portal to Digital Entertainment. Dive into the exciting world of cinema with us.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <ContentSection icon={Film} title="A World of Movies" custom={1}>
            <p>
              Mp4movies is your home of movies. Whether you are a movie obsessive or a binge-watcher, or just in search of that perfect flick to watch on the weekend, we will bring you into the exciting world of cinema. From blockbusters to hidden gems, we treat movies as a celebration of every frame, every story, and every feeling imaginable.
            </p>
          </ContentSection>

          <ContentSection icon={Globe} title="Explore Anytime, Anywhere" custom={2}>
            <p>
              We at Mp4movies understand that a film should be easy to access, entertaining, and forever in your memory. Our library of options is far-reaching and includes cinema from around the world. So, if you're looking for Bollywood movies, subscribe to Netflix releases of Hollywood films or even South Indian films, dubbed movies, and other genres – we have classified them all. We have everything you desire: action movies, love stories, thrillers, comedies, etc.
            </p>
          </ContentSection>
          
          <ContentSection icon={Smartphone} title="Mobile Optimised Experience" custom={3}>
            <p>
              Mp4movies is designed for easy browsing on any device. Whether you are visiting on your phone, a tablet, or a desktop, our professional platform is mobile-friendly and fast. You can find detailed write-ups of movies, actors, other historical information about the movie, and movie and entertainment news with only a limited number of clicks. We help you locate what is trending, new, and worth watching, all from the comfort of your device.
            </p>
          </ContentSection>

          <ContentSection icon={Tv} title="Stay Updated with Entertainment Buzz" custom={4}>
            <p>
              From breaking box office to exclusive interviews with celebrities, Mp4movies keeps you abreast of the latest movie updates and entertainment news with real-time updates, including casting announcements, production updates, trailers, music releases, and everything else! We keep track of everything going on with Bollywood, Hollywood, South Indian cinema, OTT platforms, and the overall entertainment world — all of them delivered right to your fingertips.
            </p>
          </ContentSection>

          <ContentSection icon={Sparkles} title="Experience Bollywood, Hollywood & More" custom={5}>
            <p>
              India shows the world's highest love for films. Mp4movies encapsulates that passion by showcasing diversity and covering content from a combination of film industries. We aim to capture the excitement & glitz of Bollywood, the over-the-top dramas of Tollywood and the size and crazy action of big Hollywood blockbusters.
            </p>
            <p>
              In addition, our Hindi-dubbing section allows non-English speakers to enjoy both regional and international films in their own language, without missing out on the charm of watching a movie.
            </p>
          </ContentSection>

          <ContentSection icon={CalendarCheck} title="New Release Tracker" custom={6}>
            <p>
              Excited about a big-budget film? Eager to binge-watch a web series everyone is raving about? You can keep track! With a regularly updated release calendar and highlights, you can easily track upcoming films, web series premieres, and trailers you need to watch. You’ll know what’s coming to your screens and when, so you will always know what to watch next!
            </p>
          </ContentSection>

          <ContentSection icon={Users} title="Join the Mp4movies Community" custom={7}>
            <p>
              Sharing the love of cinema is what it is all about. Mp4movies is more than just a platform; it is a community of individuals who love movie watching. We encourage you to interact with our content, leave a comment, share your thoughts, and become part of an expanding network of fellow viewers.
            </p>
          </ContentSection>
          
          <ContentSection icon={ShieldCheck} title="Safe, Simple & Always Open" custom={8}>
            <p>
              We get the idea of safety and simplicity. Nobody wants to browse around a cluttered, difficult-to-navigate platform. Online, we believe our users deserve to feel safe and secure when looking at any of the film content we offer, whether you're searching for a film, reading what someone else thought, or watching a trailer. Every member will find that everything is structured, categorised and can easily be accessed.
            </p>
          </ContentSection>

          <ContentSection icon={PlayCircle} title="Start Your Film Journey" custom={9}>
            <p>
              Movies bring people together, evoke feelings and tell stories for eternity. At Mp4movies, we make that connection, no matter the genre preferred, the language we speak, or the mood we are in — there's always something to find at Mp4movies.
            </p>
          </ContentSection>
        </div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + (9 * 0.1) }}
            className="text-center mt-10 sm:mt-12 md:mt-16"
        >
          <p className="text-xl sm:text-2xl text-muted-foreground mb-6">
            Come, surf, and fall in love with film all over. Because at Mp4movies, the story never stops.
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-md sm:text-lg px-8 py-3 rounded-md shadow-lg hover:shadow-xl transition-shadow">
            <Link href="/movies">Explore Movies Now</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
