export interface Exhibit {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  stats?: { label: string; value: string; prefix?: string; suffix?: string }[];
  links?: { label: string; url: string }[];
  tags?: string[];
  highlight?: string;
  position: [number, number, number];
  rotation?: [number, number, number];
}

export interface WingData {
  id: string;
  name: string;
  subtitle: string;
  period: string;
  color: string;
  accentColor: string;
  position: [number, number, number];
  direction: [number, number, number]; // corridor direction from lobby
  exhibits: Exhibit[];
}

export const wings: WingData[] = [
  {
    id: 'education',
    name: 'The Foundation',
    subtitle: 'Education & Scholarship',
    period: '2006 – 2010',
    color: '#1e3a5f',
    accentColor: '#4a90d9',
    position: [0, 0, 18],
    direction: [0, 0, 1],
    exhibits: [
      {
        id: 'northwestern',
        title: 'Northwestern University',
        subtitle: 'Evanston, USA',
        description: 'Bachelor and Master of Science in Mechanical Engineering with Managerial Analytics from Kellogg School of Business and a Minor in Economics.',
        stats: [
          { label: 'GPA', value: '3.9/4.0' },
          { label: 'Honor', value: 'Magna Cum Laude' },
        ],
        tags: ['Engineering', 'Kellogg Business', 'Economics', 'Mechanical Engineering'],
        highlight: 'Dual degree combining deep engineering with business acumen',
        position: [-4, 2, 36],
        rotation: [0, Math.PI / 2, 0],
      },
      {
        id: 'tsinghua',
        title: 'Tsinghua University',
        subtitle: 'Beijing, China — 2007',
        description: "Immersion program to understand China's modern political history, current economic and policy changes. A formative experience bridging Eastern and Western perspectives.",
        tags: ['Political History', 'Economics', 'Policy', 'China'],
        position: [4, 2, 40],
        rotation: [0, -Math.PI / 2, 0],
      },
      {
        id: 'psc',
        title: 'PSC Overseas Merit Scholarship',
        subtitle: '2006',
        description: 'Awarded the prestigious Public Service Commission Overseas Merit Scholarship — one of Singapore\'s most competitive scholarships for outstanding students committed to public service.',
        highlight: 'One of Singapore\'s most prestigious scholarships',
        position: [0, 2, 45],
      },
      {
        id: 'skills',
        title: 'Skills & Capabilities',
        description: 'A versatile toolkit spanning technical, analytical, and leadership domains.',
        tags: ['English & Mandarin (Native)', 'Product Management', 'Agile', '3D Design', 'Python', 'R', 'MATLAB', 'SQL', 'Machine Learning', 'CFA Level II'],
        position: [-4, 2, 50],
        rotation: [0, Math.PI / 2, 0],
      },
    ],
  },
  {
    id: 'government',
    name: 'The Public Servant',
    subtitle: 'Singapore Government',
    period: '2012 – 2018',
    color: '#8b1a1a',
    accentColor: '#e63946',
    position: [-30, 0, 0],
    direction: [-1, 0, 0],
    exhibits: [
      {
        id: 'mindef',
        title: 'Ministry of Defence',
        subtitle: 'Policy Officer, Defence Policy Office — Feb 2012 – Dec 2013',
        description: 'Prepared policy positions for safeguarding Singapore\'s strategic interests vis-à-vis neighbouring countries. Operated at the intersection of national security and diplomacy.',
        tags: ['Defence Policy', 'Strategic Planning', 'Regional Security'],
        position: [-36, 2, -4],
        rotation: [0, 0, 0],
      },
      {
        id: 'moe',
        title: 'Ministry of Education',
        subtitle: 'Senior Assistant Director, Planning Division — Dec 2013 – Mar 2017',
        description: 'Scaled up student care centres in primary schools and led major policy reviews that shaped Singapore\'s education landscape.',
        stats: [
          { label: 'Student Care Centres', value: '40 → 130' },
          { label: 'Students Impacted', value: '20,000+' },
        ],
        links: [
          { label: 'PSLE Scoring Reform', url: 'https://www.moe.gov.sg/psle-fsbb/psle/changing-psle-scoring-system' },
        ],
        highlight: 'Led team that reviewed and changed the PSLE scoring system — affecting every primary school student in Singapore',
        tags: ['Education Policy', 'DSA Policy', 'MTL Policy', 'PSLE Reform'],
        position: [-42, 2, 4],
        rotation: [0, Math.PI, 0],
      },
      {
        id: 'mewr',
        title: 'Ministry of Environment & Water Resources',
        subtitle: 'Lead, Clean Air Team — Apr 2017 – Jun 2018',
        description: 'Obtained Cabinet approval for old vehicle turnover schemes and represented Singapore at ASEAN-level meetings on transboundary haze.',
        stats: [
          { label: 'Health Benefits', value: '>$100M' },
        ],
        links: [
          { label: 'Carbon Emissions Requirements', url: 'https://www.channelnewsasia.com/singapore/nea-steps-carbon-emissions-requirements-foreign-vehicles-motorcycles-entering-singapore-4448276' },
          { label: 'ASEAN Haze Meeting', url: 'https://www.channelnewsasia.com/singapore/asean-haze-meeting-ends-disappointing-bewildering-note-5794066' },
        ],
        highlight: 'Projected >$100 million in imputed health benefits from vehicle turnover policy',
        tags: ['Environmental Policy', 'Clean Air', 'ASEAN Diplomacy', 'Cabinet Approval'],
        position: [-48, 2, -4],
        rotation: [0, 0, 0],
      },
    ],
  },
  {
    id: 'lumos',
    name: 'The Innovator',
    subtitle: 'Lumos Helmet',
    period: '2017 – 2021',
    color: '#1a4d1a',
    accentColor: '#39ff14',
    position: [-21, 0, -21],
    direction: [-0.707, 0, -0.707],
    exhibits: [
      {
        id: 'lumos-overview',
        title: 'Lumos Helmet',
        subtitle: 'Head of Product & Head of China Office — Jul 2017 – Jan 2021',
        description: 'Led product development at this innovative smart helmet startup. Built and managed a team of 3 product managers and served as 1 of 3 executive members overseeing engineering, product development, and production.',
        stats: [
          { label: 'Revenue Growth', value: '300%' },
          { label: 'Products Launched', value: '4' },
          { label: 'Executive Team', value: '1 of 3' },
        ],
        tags: ['Hardware', 'IoT', 'Product Management', 'China Operations'],
        position: [-25, 2, -25],
        rotation: [0, Math.PI * 0.75, 0],
      },
      {
        id: 'lumos-apple',
        title: 'Apple Store Launch',
        subtitle: 'Lumos Matrix — Award-Winning Product',
        description: 'Led the team to develop the award-winning Lumos Matrix — selected by Apple as the FIRST helmet product to be launched in 300+ Apple Stores worldwide. A landmark achievement bridging cycling safety with consumer tech.',
        highlight: 'First helmet ever sold in 300+ Apple Stores worldwide',
        stats: [
          { label: 'Apple Stores', value: '300+' },
          { label: 'Achievement', value: 'First helmet ever in Apple Store' },
        ],
        position: [-30, 2, -30],
        rotation: [0, Math.PI * 0.75, 0],
      },
      {
        id: 'lumos-product',
        title: 'Product Innovation',
        description: 'Built products with integrated LED turn signals, brake lights, and companion app — merging safety technology with sleek consumer design. Each product launch expanded the ecosystem and user base.',
        tags: ['LED Technology', 'Companion App', 'Safety Innovation', 'Consumer Hardware'],
        links: [
          { label: 'Lumos Visuals', url: 'https://docs.google.com/presentation/d/1ppWfm9bZCZk5_n77LvBGj7p2K_2XZTTBDD_xSjM5muk/edit' },
        ],
        position: [-35, 2, -35],
        rotation: [0, Math.PI * 0.75, 0],
      },
    ],
  },
  {
    id: 'shopee',
    name: 'The Operator',
    subtitle: 'Shopee Singapore',
    period: '2021 – 2025',
    color: '#5c2d0e',
    accentColor: '#ee4d2d',
    position: [30, 0, 0],
    direction: [1, 0, 0],
    exhibits: [
      {
        id: 'shopee-risk',
        title: 'Regional Risk Management',
        subtitle: 'CPO Office — Feb 2021 – Aug 2022',
        description: 'Started a risk management programme across 8 markets to tackle fraud and mis-operation losses. Made more than 100 recommendations adopted by management.',
        stats: [
          { label: 'Markets Covered', value: '8' },
          { label: 'Recommendations', value: '100+' },
        ],
        highlight: 'Received Values-in-Action award — given to only 3 product leaders in entire company in 2022',
        tags: ['Risk Management', 'Fraud Prevention', 'Regional Operations'],
        position: [36, 2, -4],
        rotation: [0, -Math.PI / 2, 0],
      },
      {
        id: 'shopee-bd',
        title: 'Business Development',
        subtitle: 'Category Manager, Computer & Peripherals — Sep 2022 – Apr 2023',
        description: 'Led team of 4 to pursue growth through O2O events, strategic seller onboarding, and ecosystem partnerships with major tech companies.',
        stats: [
          { label: 'Campaign Results', value: 'Top Quartile' },
          { label: 'Time to Top Quartile', value: '2 months' },
        ],
        highlight: 'Exceeded all commercial targets and graded in top quartile despite being just two months in',
        tags: ['Microsoft', 'Nvidia', 'AMD', 'O2O Events', 'Seller Onboarding'],
        position: [42, 2, 4],
        rotation: [0, Math.PI / 2, 0],
      },
      {
        id: 'shopee-ops',
        title: 'Operations Excellence',
        subtitle: 'Shopee Express — Apr 2023 – Dec 2023',
        description: 'Led a 16-person team to dramatically improve logistics operations across multiple performance dimensions.',
        stats: [
          { label: 'Parcel Loss Rate', value: 'Halved' },
          { label: 'Productivity Gain', value: '3X' },
          { label: 'Completion Time', value: '-70%' },
          { label: 'Team Size', value: '16' },
        ],
        tags: ['Logistics', 'Process Improvement', 'Team Leadership'],
        position: [48, 2, -4],
        rotation: [0, -Math.PI / 2, 0],
      },
      {
        id: 'shopee-wh',
        title: 'Warehouse Automation',
        subtitle: 'Head of Plans, Fulfillment Warehouse — Jan 2025 – Dec 2025',
        description: 'Led the effort to transform manual Fulfillment warehouse into a fully robotic setup. Built business case to convince top management to invest in a $9M USD Tote-to-Man automation solution with 1.8 year payback period.',
        stats: [
          { label: 'Investment', value: '$16M USD' },
          { label: 'Payback Period', value: '1.8 years' },
          { label: 'Net Savings by 2028', value: '$11M' },
          { label: 'CPI Improvement', value: '-20%' },
          { label: 'Space Efficiency', value: '+57%' },
        ],
        highlight: 'Convinced top management to invest $16M in warehouse automation — projected $11M net savings by 2028',
        links: [
          { label: 'Automation Study', url: 'https://docs.google.com/presentation/d/1rwjawFpnwFt9oA-tUvaurmd1cdSJ656b_Hw78ICx_zw/edit' },
        ],
        tags: ['Robotics', 'Tote-to-Man', 'Business Case', 'Capex Planning', '5 Vendors Evaluated'],
        position: [54, 2, 4],
        rotation: [0, Math.PI / 2, 0],
      },
    ],
  },
  {
    id: 'ai-champion',
    name: 'The AI Champion',
    subtitle: 'Driving AI Adoption',
    period: '2025 – Present',
    color: '#1a1a3e',
    accentColor: '#a855f7',
    position: [21, 0, -21],
    direction: [0.707, 0, -0.707],
    exhibits: [
      {
        id: 'ai-overview',
        title: 'Head of Product & AI Champion',
        subtitle: 'Shopee Singapore — Dec 2025 – Present',
        description: 'Overall champion for driving AI adoption across Shopee Singapore. Leads 29 product managers overseeing all Product pillars while fostering an AI-first culture across the organization.',
        stats: [
          { label: 'AI Projects', value: '95' },
          { label: 'Annual Savings', value: '$1.32M' },
          { label: 'Live Projects Savings', value: '$502K/yr' },
          { label: 'Product Managers', value: '29' },
        ],
        highlight: 'Fostered 100 projects worth $1 million SGD in annual savings',
        position: [25, 2, -25],
        rotation: [0, -Math.PI * 0.75, 0],
      },
      {
        id: 'ai-domains',
        title: 'AI Impact by Domain',
        description: 'AI projects span every business function, with measurable financial impact across all domains.',
        stats: [
          { label: 'Business Dev', value: '$385K/yr', suffix: ' (15 projects)' },
          { label: 'Marketing', value: '$310K/yr', suffix: ' (27 projects)' },
          { label: 'Operations', value: '$250K/yr', suffix: ' (26 projects)' },
          { label: 'SPX (Logistics)', value: '$225K/yr', suffix: ' (15 projects)' },
          { label: 'Warehouse', value: '$149K/yr', suffix: ' (8 projects)' },
        ],
        tags: ['BD', 'Marketing', 'Operations', 'SPX', 'Warehouse', 'Product', 'BI'],
        position: [30, 2, -30],
        rotation: [0, -Math.PI * 0.75, 0],
      },
      {
        id: 'ai-projects',
        title: 'Project Portfolio',
        description: 'A pipeline of 95 AI projects across 7 domains, from proof-of-concept to fully live deployments. Key projects include Item Matching Validation Bot ($228K/yr), Counterfeit Listing Check ($74K/yr), and many more.',
        stats: [
          { label: 'Live', value: '23' },
          { label: 'In Development', value: '34' },
          { label: 'To Start', value: '28' },
        ],
        links: [
          { label: 'Live AI Project Backlog', url: 'https://web-production-5ec5.up.railway.app/' },
        ],
        position: [35, 2, -35],
        rotation: [0, -Math.PI * 0.75, 0],
      },
    ],
  },
];

export const profileData = {
  name: 'SIM KWANG XIONG',
  tagline: 'Versatile leader across Product, Ops, Business Development, and Public Policy',
  contact: {
    email: 'kwangxiong@gmail.com',
    phone: '+65 82979788',
    location: 'Singapore',
  },
};
