export interface Sponsor {
  id: string;
  name: string;
  logoUrl: string;
  tier: 'gold' | 'silver' | 'bronze';
}

export interface Gift {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: string;
  category: string;
  isGrandPrize?: boolean;
}

export interface Participant {
  id: string;
  fullName: string;
  department?: string;
}

export interface RaffleResult {
  id: string;
  winnerName: string; // Can be empty if not drawn yet
  winnerId?: string;
  giftTitle: string;
  giftCategory: string;
  drawnAt: string;
}