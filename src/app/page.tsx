import { Hero } from '@/components/Hero';
import { MatchdaySection, PlayersSection, LegacySection, ParkSection, StoriesSection } from '@/components/HomeSections';

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <MatchdaySection />
      <PlayersSection />
      <LegacySection />
      <ParkSection />
      <StoriesSection />
    </main>
  );
}
