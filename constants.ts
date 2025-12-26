import { Gift, Sponsor, RaffleResult, Participant } from './types';

// ATTELIA Logo - Header için
export const ATTELIA_LOGO = '/ATTELIA.png';

// Sol taraf sponsorları (8 adet)
export const LEFT_SPONSORS: Sponsor[] = [
  {
    id: 'l1',
    name: 'Anisa',
    tier: 'gold',
    logoUrl: '/Anisa.png'
  },
  {
    id: 'l2',
    name: 'Bora',
    tier: 'gold',
    logoUrl: '/Bora.png'
  },
  {
    id: 'l3',
    name: 'Camlog',
    tier: 'gold',
    logoUrl: '/Camlog.png'
  },
  {
    id: 'l4',
    name: 'DMK',
    tier: 'gold',
    logoUrl: '/DMK.jpeg'
  },
  {
    id: 'l5',
    name: 'EDTA',
    tier: 'gold',
    logoUrl: '/EDTA.png'
  },
  {
    id: 'l6',
    name: 'EJ',
    tier: 'gold',
    logoUrl: '/EJ.png'
  },
  {
    id: 'l7',
    name: 'Erciyes',
    tier: 'silver',
    logoUrl: '/Erciyes.png'
  },
  {
    id: 'l8',
    name: 'ISG',
    tier: 'silver',
    logoUrl: '/ISG.png'
  },
  {
    id: 'l9',
    name: 'Medicasimple',
    tier: 'gold',
    logoUrl: '/Medicasimple.png'
  }
];

// Sağ taraf sponsorları (8 adet)
export const RIGHT_SPONSORS: Sponsor[] = [
  {
    id: 'r1',
    name: 'KDD',
    tier: 'gold',
    logoUrl: '/KDD.png'
  },
  {
    id: 'r2',
    name: 'HO',
    tier: 'silver',
    logoUrl: '/HO.png'
  },
  {
    id: 'r3',
    name: 'Okyanus Dental',
    tier: 'gold',
    logoUrl: '/OkyanusDentalLogo.png'
  },
  {
    id: 'r4',
    name: 'SAM',
    tier: 'gold',
    logoUrl: '/SAM.png'
  },
  {
    id: 'r5',
    name: 'SDD',
    tier: 'gold',
    logoUrl: '/SDD.png'
  },
  {
    id: 'r6',
    name: 'Seçil Bayrak',
    tier: 'silver',
    logoUrl: '/Seçil Bayrak.png'
  },
  {
    id: 'r7',
    name: 'TÖMER',
    tier: 'silver',
    logoUrl: '/TÖMER.png'
  },
  {
    id: 'r8',
    name: 'Zemzem',
    tier: 'silver',
    logoUrl: '/Zemzem.png'
  }
];

// Eski sponsor listeleri (uyumluluk için)
export const GOLD_SPONSORS = LEFT_SPONSORS;
export const SILVER_BRONZE_SPONSORS = RIGHT_SPONSORS;

export const INITIAL_PARTICIPANTS: Participant[] = [
  { id: 'p1', fullName: 'Ayeşe Kübra Karakaya', department: 'Yönetim' },
  { id: 'p2', fullName: 'Vedat Kasdas', department: 'Pazarlama' },
  { id: 'p3', fullName: 'Mehmet Kaya', department: 'Satış' },
  { id: 'p4', fullName: 'Ayşe Çelik', department: 'İnsan Kaynakları' },
  { id: 'p5', fullName: 'Can Öztürk', department: 'IT' },
  { id: 'p6', fullName: 'Elif Şahin', department: 'Finans' },
  { id: 'p7', fullName: 'Burak Yıldız', department: 'Operasyon' },
  { id: 'p9', fullName: 'Murat Aydın', department: 'Satış' },
  { id: 'p10', fullName: 'Esra Koç', department: 'Hukuk' },
];

export const RAFFLE_RESULTS: RaffleResult[] = [
  {
    id: 'r1',
    winnerName: '',
    giftTitle: 'Lüks İsviçre Saati',
    giftCategory: 'Büyük Ödül',
    drawnAt: ''
  },
  {
    id: 'r2',
    winnerName: '',
    giftTitle: 'Maldivler Tatili',
    giftCategory: 'Tatil Paketi',
    drawnAt: ''
  },
  {
    id: 'r3',
    winnerName: '',
    giftTitle: 'Son Model Akıllı Telefon',
    giftCategory: 'Teknoloji',
    drawnAt: ''
  },
  {
    id: 'r4',
    winnerName: '',
    giftTitle: 'Yıllık Spa Üyeliği',
    giftCategory: 'Sağlık & Yaşam',
    drawnAt: ''
  },
  {
    id: 'r5',
    winnerName: '',
    giftTitle: 'Elektrikli Scooter',
    giftCategory: 'Ulaşım',
    drawnAt: ''
  },
  {
    id: 'r6',
    winnerName: '',
    giftTitle: 'Gurme Yemek Seti',
    giftCategory: 'Mutfak',
    drawnAt: ''
  }
];