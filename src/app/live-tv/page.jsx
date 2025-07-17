
import AnimatedPage from '@/components/shared/AnimatedPage';
import TvGradientHeading from '@/components/tvshows/TvGradientHeading'; // Re-use for consistent heading style
import { getLiveTvChannels, extractLiveTvCategories } from '@/lib/livetv-service';
import LiveTvClientContent from './LiveTvClientContent';

export async function generateMetadata() {
  return {

title: '  Watch live TV online – stream live news, sports, and entertainment | MP4Moviess.' ,
description: 'Watch live TV channels online on MP4Moviess. Live stream news, sports, music and entertainment 24/7 in HD!' ,
       alternates: {
      canonical: 'https://mp4moviess.com/live-tv',
    },
    openGraph: {
      title: 'Live TV Channels | Mp4movies',
      description: 'Stream live TV channels directly on Mp4movies.',
    },
  };
}

export default async function LiveTvPage() {
  const initialChannels = await getLiveTvChannels();
  const initialCategories = extractLiveTvCategories(initialChannels);

  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <TvGradientHeading text="Live TV Channels" />
        <LiveTvClientContent
          initialChannels={initialChannels}
          initialCategories={initialCategories}
        />
      </div>
    </AnimatedPage>
  );
}

