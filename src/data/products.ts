export interface Product {
  id: string;
  title: string;
  tagline: string;
  shortDescription: string;
  description: string;
  demoUrl: string;
  accentClass: string;
  glowClass: string;
  accentColor: string; // Tailwind hex color
  features: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  initials: string;
  glowClass: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular: boolean;
  accentClass: string;
}

export const products: Product[] = [
  {
    id: "heart-lock",
    title: "Heart Lock",
    tagline: "Unlock memories with a secret code.",
    shortDescription: "A beautiful, interactive combination lock screen that reveals a custom gallery, timeline, or letter only when the recipient enters your secret anniversary or special date.",
    description: "The ultimate emotional surprise. Send your partner a digital heart lock. When they enter the secret passcode (like the date you met or your anniversary), the heart unlocks with a smooth cinematic animation to reveal a personalized diary of your favorite memories together, photos, and music.",
    demoUrl: "https://heart-lock-psi.vercel.app/",
    accentClass: "from-pink-500 to-rose-600",
    glowClass: "group-hover:shadow-pink-500/20 shadow-pink-500/10",
    accentColor: "#ff007f",
    features: [
      "Custom passcode matching (anniversaries, birthdays, or word codes)",
      "Unlocking sequence with interactive particle explosions",
      "Dynamic photo gallery with polaroid styles",
      "Inline personalized digital love letter",
      "Integrated audio autoplay of your special song"
    ]
  },
  {
    id: "birthday-cake",
    title: "3D Birthday Cake",
    tagline: "Blow the candles. Make a wish.",
    shortDescription: "A highly interactive 3D birthday experience where the recipient can blow into their microphone to actually extinguish the candles and trigger a shower of confetti.",
    description: "Make distance disappear on their birthday. This digital experience features a gorgeous interactive birthday cake. Using the device's microphone, the recipient can physically blow to extinguish the virtual candles, triggering dynamic confetti bursts, audio tracks, and custom birthday messages from friends.",
    demoUrl: "https://3-d-cake.vercel.app/",
    accentClass: "from-amber-400 to-orange-500",
    glowClass: "group-hover:shadow-amber-500/20 shadow-amber-500/10",
    accentColor: "#f59e0b",
    features: [
      "Microphone-active candle blowing simulation",
      "Interactive 3D-ish cake design with customizable toppings",
      "Instant customized confetti physics system",
      "Multi-page wish board containing letters from friends",
      "Self-playing birthday background score"
    ]
  },
  {
    id: "vintage-radio",
    title: "Vintage Radio",
    tagline: "Turn memories into radio stations.",
    shortDescription: "An interactive radio receiver where the recipient can spin physical-style knobs to tune into custom tracks, audio recordings, or voice letters.",
    description: "Give the gift of nostalgia. This virtual vintage radio lets the recipient turn volume and tuning knobs to navigate through 'frequency channels'. Each frequency plays a different custom audio track, mixtape, or voice note from you, accompanied by retro visualizer waves.",
    demoUrl: "https://vintage-plum.vercel.app/",
    accentClass: "from-yellow-600 to-amber-800",
    glowClass: "group-hover:shadow-yellow-600/20 shadow-yellow-600/10",
    accentColor: "#d97706",
    features: [
      "Realistic clicky knob rotation and tuning mechanics",
      "Fuzzy static white-noise filters between channel sweeps",
      "Integrated retro visualizer with floating soundwave graphics",
      "Customizable track list (mix-tape model)",
      "Personalized front panel details and engraving textures"
    ]
  },
  {
    id: "couple-spotify",
    title: "Couple Spotify",
    tagline: "Your relationship wrapped like Spotify.",
    shortDescription: "A personalized 'Relationship Wrapped' experience mimicking the Spotify layout, highlighting your shared stats, songs, and relationship metrics.",
    description: "Your love story, summarized in music charts. This experience emulates the highly stylized Spotify design. It displays interactive slides of your 'Relationship Wrapped'—including top songs you listened to, total hours spent calling, milestones achieved, and custom playlist players.",
    demoUrl: "https://couple-spotify.vercel.app/",
    accentClass: "from-emerald-400 to-green-600",
    glowClass: "group-hover:shadow-green-500/20 shadow-green-500/10",
    accentColor: "#1db954",
    features: [
      "Spotify UI theme replication",
      "Personalized 'Top 5 Songs' with active play previews",
      "Interactive statistics charts (call durations, text counts)",
      "Dynamic relationship milestones slides",
      "Dedicated embedded couple playlist player"
    ]
  },
  {
    id: "couple-netflix",
    title: "Couple Netflix",
    tagline: "Your love story as a Netflix original.",
    shortDescription: "An immersive cinema billboard interface where your relationship is styled as a Netflix original series complete with episodes, trailers, and reviews.",
    description: "Who needs Hollywood when you have your love story? Transform your relationship into a premium Netflix Original interface. Features auto-playing trailer previews, episode guides (where each episode is a date or memory), viewer percentage matches, and cast files.",
    demoUrl: "https://couple-netflix.vercel.app/",
    accentClass: "from-red-600 to-rose-950",
    glowClass: "group-hover:shadow-red-600/20 shadow-red-600/10",
    accentColor: "#e50914",
    features: [
      "Netflix UI billboard duplication",
      "Auto-play intro teaser with text transitions",
      "Interactive 'Episodes' dropdown mapping relationship events",
      "Cast profiles highlighting friends and family",
      "'99% Match' relationship indicators and reviews"
    ]
  }
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Aria Sterling",
    role: "Gave 'Couple Spotify' for Anniversary",
    text: "My boyfriend was absolutely blown away. He said it was the best, most thoughtful gift he's ever received. The Spotify Wrapped layout looked identical to the real app!",
    rating: 5,
    initials: "AS",
    glowClass: "shadow-pink-500/5"
  },
  {
    id: "t2",
    name: "Marcus Vance",
    role: "Ordered '3D Birthday Cake' for Sister",
    text: "Since my sister was celebrating her birthday abroad, I sent her the interactive cake. She actually blew on her screen to blow out the candles. It felt magical!",
    rating: 5,
    initials: "MV",
    glowClass: "shadow-amber-500/5"
  },
  {
    id: "t3",
    name: "Sophia Chen",
    role: "Gave 'Heart Lock' for Valentine's Day",
    text: "The passcode screen built so much anticipation. When she unlocked it and our letters and pictures faded in, she literally cried tears of joy. Incredible service!",
    rating: 5,
    initials: "SC",
    glowClass: "shadow-purple-500/5"
  },
  {
    id: "t4",
    name: "Devin Ross",
    role: "Ordered 'Vintage Radio' for Father's Day",
    text: "My dad loved tuning the knobs to hear old audio clips of us. The white noise static between stations and the retro dials were so detailed. 10/10 craftsmanship.",
    rating: 5,
    initials: "DR",
    glowClass: "shadow-blue-500/5"
  },
  {
    id: "t5",
    name: "Elena Rostova",
    role: "Gave 'Couple Netflix' for Proposal",
    text: "I used the Netflix original layout to list our 'episodes' leading up to the proposal. The cinema-quality feel made it feel like a real Netflix series production.",
    rating: 5,
    initials: "ER",
    glowClass: "shadow-red-500/5"
  }
];

export const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    price: "$49",
    description: "Beautiful pre-built interactive templates tailored with your personal details.",
    features: [
      "Choose any 1 template from our catalog",
      "Incorporate up to 15 personal photos",
      "Add custom letters, text, and music track",
      "Hosting included for 1 Year (custom subdomain)",
      "Standard delivery in 3 days"
    ],
    popular: false,
    accentClass: "border-card-border"
  },
  {
    name: "Premium",
    price: "$99",
    description: "Highly customized template layout with tailored styling, animations, and elements.",
    features: [
      "Choose any template with extended customization",
      "Unlimited photos and custom sections",
      "Custom domain linking (e.g. yourname.com)",
      "Lifetime cloud hosting",
      "Express 24-hour delivery option (+ $20)",
      "Dedicated design revision round"
    ],
    popular: true,
    accentClass: "border-pink-accent/40 shadow-[0_0_30px_rgba(255,0,127,0.15)]"
  },
  {
    name: "Luxury Bespoke",
    price: "$249",
    description: "A 100% custom-designed digital experience built entirely from scratch to your vision.",
    features: [
      "Custom design concept consultations",
      "Bespoke 3D/WebGL assets and interactives",
      "Exclusive sound effects and compositions",
      "Lifetime custom domain hosting",
      "Priority 24/7 VIP designer assistance",
      "Personal code delivery file (.zip archive)"
    ],
    popular: false,
    accentClass: "border-purple-accent/30"
  }
];
