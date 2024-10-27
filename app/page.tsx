import { GameLobby } from '@/components/game-lobby';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 py-8">
        <GameLobby />
      </div>
    </main>
  );
}