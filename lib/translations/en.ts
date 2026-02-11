// Translation type interface
export interface Translations {
    nav: {
        visuals: string; team: string; sentiment: string; intel: string;
        macro: string; uplink: string; partners: string; community: string; faq: string;
        systemHome: string; nodeLabel: string;
        localTimestamp: string; controlPanel: string; auth: string; sig: string;
    };
    home: {
        established: string; subtitle: string; tagline: string; cta: string;
    };
    team: {
        subtitle: string; title: string; nodeLabel: string; activeEntities: string;
        recruit: string; loading: string;
        status: { online: string; offline: string; busy: string };
        specialty: string; bio: string;
    };
    sentiment: {
        subtitle: string; title: string; feedStatus: string; lastSync: string;
        source: string; fearGreed: string; btcDom: string; btcMarketCap: string;
        delta24h: string; extremeFear: string; fear: string; neutral: string;
        greed: string; extremeGreed: string; netflow: string; outflow: string;
        inflow: string; supplyLeaving: string; supplyEntering: string;
        volumeIntensity: string; low: string; high: string; signalGuide: string;
        bullishSignal: string; bullishDesc: string; bearishSignal: string;
        bearishDesc: string; neutralSignal: string; neutralDesc: string;
        refreshNote: string; loading: string;
    };
    events: {
        subtitle: string; title: string; activeIntel: string; historyLogs: string;
        searchPlaceholder: string; noIntel: string; published: string; node: string;
        author: string; unknownResearcher: string; accessPublic: string;
        accessRestricted: string; accessArchived: string; accessClassified: string;
        accessReport: string; closeLink: string; secureDoc: string;
        abstractSummary: string; abstractNA: string; systemLogs: string;
        attachedAssets: string; downloadPdf: string; loading: string;
    };
    macro: {
        subtitle: string; title: string; currentEpoch: string; prev: string;
        today: string; next: string; source: string; eventsThisMonth: string;
        adminManaged: string; loading: string; terminateLink: string;
        secureIntel: string; previous: string; forecast: string; actual: string;
        signalBias: string; impactTargets: string; intelBriefing: string;
        calibrating: string;
    };
    contact: {
        subtitle: string; title: string; signalStrength: string; signalValue: string;
        channelA: string; recruitTitle: string; recruitDesc: string;
        recruitTarget: string; joinDiscord: string; currentStatus: string;
        accepting: string; nextSortie: string; channelB: string;
        allianceTitle: string; allianceDesc: string; orgId: string;
        orgPlaceholder: string; officerName: string; officerPlaceholder: string;
        signalIntent: string; intentPlaceholder: string; dataPacket: string;
        messagePlaceholder: string; transmitting: string; transmit: string;
        success: string; failed: string; allianceSpecs: string;
        academiaTitle: string; enterpriseTitle: string;
        workshopModules: string; workshopDesc: string;
        mentorship: string; mentorshipDesc: string;
        hackathon: string; hackathonDesc: string;
        devAccess: string; devAccessDesc: string;
        brandExposure: string; brandDesc: string;
        talentPipeline: string; talentDesc: string;
        endTransmission: string;
    };
    visuals: {
        subtitle: string; title: string; loading: string;
    };
    ticker: {
        syncing: string;
    };
    partners: {
        subtitle: string; title: string; loading: string;
        networkStatus: string; activeNodes: string; becomePartner: string;
    };
    footer: {
        home: string; team: string; intel: string;
        newsletterPlaceholder: string; subscribe: string;
        subscribeSuccess: string; subscribeFailed: string;
    };
    community: {
        subtitle: string; title: string; loading: string;
        upcomingLabel: string; scheduled: string; pastEvents: string;
        completed: string; maxAttendees: string; rsvpBtn: string;
        rsvpTitle: string; nameLabel: string; namePlaceholder: string;
        emailLabel: string; emailPlaceholder: string;
        submitRsvp: string; submitting: string;
        rsvpSuccess: string; alreadyRegistered: string;
    };
    faq: {
        subtitle: string; title: string;
        aboutTitle: string; aboutItems: { q: string; a: string }[];
        cryptoTitle: string; cryptoItems: { q: string; a: string }[];
        joinTitle: string; joinItems: { q: string; a: string }[];
    };
    common: {
        loading: string; error: string; bullish: string; bearish: string; neutral: string;
    };
    months: string[];
    weekDays: string[];
}

export const en: Translations = {
    nav: {
        visuals: 'VISUAL ARCHIVES',
        team: 'TEAM',
        sentiment: 'SENTIMENT',
        intel: 'INTELLIGENCE',
        macro: 'GLOBAL PARAMETERS',
        uplink: 'ESTABLISH UPLINK',
        partners: 'PARTNERS',
        community: 'EVENTS',
        faq: 'FAQ',
        systemHome: 'SYSTEM_HOME',
        nodeLabel: 'NODE:',
        localTimestamp: 'LOCAL_TIMESTAMP',
        controlPanel: 'Control Panel',
        auth: 'AUTH:',
        sig: 'SIG:',
    },
    home: {
        established: 'ESTABLISHED_IN_MELBOURNE',
        subtitle: 'MOBILE SUIT STYLE RESEARCH UNIT. SPECIALIZING IN NEXT-GEN ON-CHAIN PROTOCOLS.',
        tagline: 'ARCHITECTURE // RESEARCH // PROTOCOL',
        cta: 'INITIALIZE_SORTIE',
    },
    team: {
        subtitle: '/// TACTICAL_UNIT_INTEL ///',
        title: 'OPERATIVES_ROSTER.',
        nodeLabel: 'ASTRAY_NODE_MEL',
        activeEntities: 'ACTIVE_ENTITIES:',
        recruit: 'RECRUIT_NEW_PILOT',
        loading: 'LOADING_OPERATIVES',
        status: { online: 'ONLINE', offline: 'OFFLINE', busy: 'BUSY' },
        specialty: 'SPECIALTY',
        bio: 'BIO',
    },
    sentiment: {
        subtitle: '/// [SENTIMENT_ANALYSIS_ACTIVE] ///',
        title: 'SENTIMENT_MONITOR.sys',
        feedStatus: 'FEED_STATUS: ONLINE',
        lastSync: 'LAST_SYNC:',
        source: 'SRC:',
        fearGreed: '// FEAR_&_GREED_INDEX',
        btcDom: '// BTC_DOMINANCE',
        btcMarketCap: 'BTC MARKET CAP SHARE',
        delta24h: '24H_DELTA:',
        extremeFear: 'EXTREME_FEAR',
        fear: 'FEAR',
        neutral: 'NEUTRAL',
        greed: 'GREED',
        extremeGreed: 'EXTREME_GREED',
        netflow: 'EXCHANGE_NETFLOW',
        outflow: 'OUTFLOW',
        inflow: 'INFLOW',
        supplyLeaving: '// SUPPLY_LEAVING_EXCHANGES',
        supplyEntering: '// SUPPLY_ENTERING_EXCHANGES',
        volumeIntensity: 'VOLUME_INTENSITY',
        low: 'LOW',
        high: 'HIGH',
        signalGuide: '// SIGNAL_INTERPRETATION_GUIDE',
        bullishSignal: 'BULLISH SIGNAL',
        bullishDesc: 'Fear zone (accumulation opportunity), exchange outflows (supply squeeze)',
        bearishSignal: 'BEARISH SIGNAL',
        bearishDesc: 'Greed zone (distribution risk), exchange inflows (sell pressure)',
        neutralSignal: 'NEUTRAL SIGNAL',
        neutralDesc: 'Market in consolidation, no clear directional bias',
        refreshNote: 'Sentiment data refreshed daily...',
        loading: 'SCANNING_MARKET_SENTIMENT',
    },
    events: {
        subtitle: '/// DECLASSIFIED_TECHNICAL_REPORTS ///',
        title: 'INTELLIGENCE.',
        activeIntel: 'ACTIVE_INTEL',
        historyLogs: 'HISTORY_LOGS',
        searchPlaceholder: 'INPUT_SEARCH_QUERY...',
        noIntel: 'NO_INTEL_RECOVERED_IN_THIS_SECTOR',
        published: 'PUBLISHED',
        node: 'NODE:',
        author: 'AUTHOR:',
        unknownResearcher: 'UNKNOWN_RESEARCHER',
        accessPublic: '[ ACCESS_LEVEL: PUBLIC ]',
        accessRestricted: '[ ACCESS_LEVEL: RESTRICTED ]',
        accessArchived: '[ ACCESS_LEVEL: ARCHIVED ]',
        accessClassified: '[ ACCESS_LEVEL: CLASSIFIED ]',
        accessReport: '[ ACCESS_FULL_REPORT ]',
        closeLink: '[CLOSE_SECURE_LINK]',
        secureDoc: 'SECURE_DOCUMENT',
        abstractSummary: 'ABSTRACT_SUMMARY',
        abstractNA: 'SYSTEM_ERR: ABSTRACT_NOT_AVAILABLE_FOR_LOCAL_MIRROR.',
        systemLogs: 'SYSTEM_LOGS',
        attachedAssets: 'ATTACHED_ASSETS',
        downloadPdf: 'DOWNLOAD_FULL_PDF_BUNDLE',
        loading: 'DECRYPTING_INTELLIGENCE',
    },
    macro: {
        subtitle: '/// [GLOBAL_MACRO_PARAMETERS] ///',
        title: 'CALENDAR.',
        currentEpoch: 'CURRENT_EPOCH',
        prev: '≪ PREV',
        today: 'TODAY',
        next: 'NEXT ≫',
        source: 'SRC: SUPABASE_DB',
        eventsThisMonth: 'EVENTS_THIS_MONTH',
        adminManaged: 'ADMIN_MANAGED',
        loading: 'CALIBRATING_GLOBAL_PARAMETERS',
        terminateLink: '[ TERMINATE_LINK ]',
        secureIntel: 'SECURE_INTEL',
        previous: 'PREVIOUS',
        forecast: 'FORECAST',
        actual: 'ACTUAL',
        signalBias: 'SIGNAL_BIAS:',
        impactTargets: 'IMPACT_TARGETS:',
        intelBriefing: 'INTEL_BRIEFING',
        calibrating: 'CALIBRATING...',
    },
    contact: {
        subtitle: '/// [COMMUNICATION_LINK_ESTABLISHMENT] ///',
        title: 'ESTABLISH_UPLINK.',
        signalStrength: 'SIGNAL_STRENGTH',
        signalValue: 'SOLID_UPLINK_99%',
        channelA: 'CHANNEL_A: PILOT_RECRUITMENT',
        recruitTitle: 'RECRUIT_NEW_PILOT',
        recruitDesc: 'Awaiting new operatives for inter-collegiate research. We specialize in deep-protocol analysis and next-gen chain architecture.',
        recruitTarget: 'Target: Melbourne-based university students with technical curiosity.',
        joinDiscord: 'JOIN_DISCORD_SERVER',
        currentStatus: 'CURRENT_STATUS',
        accepting: 'ACCEPTING_APPLICATIONS',
        nextSortie: 'NEXT_SORTIE',
        channelB: 'CHANNEL_B: STRATEGIC_ALLIANCE',
        allianceTitle: 'INITIATE_ALLIANCE',
        allianceDesc: 'For Corporate Partners / VC / University Bodies',
        orgId: 'ORG_ID',
        orgPlaceholder: '[ ORGANIZATION_NAME ]',
        officerName: 'OFFICER_NAME',
        officerPlaceholder: '[ CONTACT_NAME ]',
        signalIntent: 'SIGNAL_INTENT',
        intentPlaceholder: '[ REASON_FOR_UPLINK ]',
        dataPacket: 'DATA_PACKET',
        messagePlaceholder: '[ MESSAGE_BODY_ENCRYPTION_PENDING ]',
        transmitting: 'TRANSMITTING...',
        transmit: 'TRANSMIT_PROPOSAL',
        success: 'TRANSMISSION_SUCCESSFUL // PROPOSAL_RECEIVED',
        failed: 'TRANSMISSION_FAILED:',
        allianceSpecs: '// ALLIANCE_PROTOCOL_SPECS',
        academiaTitle: 'ACADEMIA_INITIATIVE',
        enterpriseTitle: 'ENTERPRISE_ALLIANCE',
        workshopModules: 'WORKSHOP_MODULES',
        workshopDesc: 'Hands-on smart contract training for students.',
        mentorship: 'MENTORSHIP_UPLINK',
        mentorshipDesc: 'Career guidance from senior Web3 engineers.',
        hackathon: 'HACKATHON_SUPPORT',
        hackathonDesc: 'Technical judging and organizing support.',
        devAccess: 'DEVELOPER_ACCESS',
        devAccessDesc: 'Direct recruiting channel to top talent.',
        brandExposure: 'BRAND_EXPOSURE',
        brandDesc: 'Logo placement on high-traffic mission logs.',
        talentPipeline: 'TALENT_PIPELINE',
        talentDesc: 'Early access to hackathon winners.',
        endTransmission: 'END_OF_TRANSMISSION_PROTOCOL',
    },
    visuals: {
        subtitle: '/// [VISUAL_SURVEILLANCE_ARCHIVE] ///',
        title: 'VISUAL_LOGS.',
        loading: 'DEVELOPING_VISUAL_FEEDS',
    },
    ticker: {
        syncing: 'SYNCING_RESEARCH_FEED...',
    },
    partners: {
        subtitle: '/// [ALLIANCE_NETWORK_REGISTRY] ///',
        title: 'PARTNERS.',
        loading: 'SCANNING_ALLIANCE_NETWORK',
        networkStatus: 'ALLIANCE_NETWORK_STATUS',
        activeNodes: 'LINKED_NODES:',
        becomePartner: 'INITIATE_ALLIANCE_PROTOCOL',
    },
    footer: {
        home: 'HOME',
        team: 'TEAM',
        intel: 'INTEL',
        newsletterPlaceholder: 'ENTER_EMAIL_ADDRESS',
        subscribe: 'SUBSCRIBE',
        subscribeSuccess: 'SUBSCRIBED_SUCCESSFULLY',
        subscribeFailed: 'SUBSCRIPTION_FAILED',
    },
    community: {
        subtitle: '/// [COMMUNITY_EVENT_DISPATCH] ///',
        title: 'EVENTS.',
        loading: 'SCANNING_EVENT_FEEDS',
        upcomingLabel: 'UPCOMING_OPS',
        scheduled: 'SCHEDULED',
        pastEvents: '// ARCHIVED_OPERATIONS',
        completed: 'COMPLETED',
        maxAttendees: 'MAX_CAPACITY',
        rsvpBtn: '[ REGISTER // RSVP ]',
        rsvpTitle: '// REGISTER_FOR_EVENT',
        nameLabel: 'CALLSIGN',
        namePlaceholder: '[ YOUR NAME ]',
        emailLabel: 'SIGNAL_FREQ',
        emailPlaceholder: '[ YOUR EMAIL ]',
        submitRsvp: 'CONFIRM_REGISTRATION',
        submitting: 'TRANSMITTING...',
        rsvpSuccess: 'REGISTRATION_CONFIRMED // SEE YOU THERE',
        alreadyRegistered: 'ALREADY_REGISTERED_FOR_THIS_EVENT',
    },
    faq: {
        subtitle: '/// [KNOWLEDGE_BASE_TERMINAL] ///',
        title: 'FAQ.',
        aboutTitle: '// ABOUT_MEL_CHAINLAB',
        aboutItems: [
            { q: 'What is MEL ChainLab?', a: 'MEL ChainLab is a Melbourne-based blockchain research community focused on DeFi protocols, smart contract security, and next-gen on-chain architecture. We bring together students, developers, and researchers from across Melbourne.' },
            { q: 'Who can join?', a: 'Anyone with an interest in blockchain technology! We welcome university students, developers, researchers, and crypto enthusiasts of all skill levels.' },
            { q: 'Where are you located?', a: 'We are based in Melbourne, Australia. Our meetups and workshops take place at various university campuses and co-working spaces across the city.' },
        ],
        cryptoTitle: '// CRYPTO_101',
        cryptoItems: [
            { q: 'What is blockchain?', a: 'A blockchain is a distributed, immutable ledger that records transactions across a network of computers. It enables trustless, transparent, and secure data storage without a central authority.' },
            { q: 'What is DeFi?', a: 'Decentralized Finance (DeFi) refers to financial services built on blockchain protocols. It includes lending, borrowing, trading, and yield farming — all without traditional banks or intermediaries.' },
            { q: 'What are smart contracts?', a: 'Smart contracts are self-executing programs stored on a blockchain. They automatically enforce the terms of an agreement when predefined conditions are met, eliminating the need for trusted intermediaries.' },
        ],
        joinTitle: '// HOW_TO_JOIN',
        joinItems: [
            { q: 'How do I join MEL ChainLab?', a: 'Join our Discord server through the ESTABLISH UPLINK page, or attend one of our public meetups. No prior blockchain experience required!' },
            { q: 'Are events free?', a: 'Most of our meetups and workshops are completely free. Hackathons may have a small registration fee to cover venue and prizes.' },
            { q: 'Can I contribute to research?', a: 'Absolutely! We welcome contributions from all members. You can write research reports, present at meetups, or collaborate on projects through our Intelligence page.' },
        ],
    },
    common: {
        loading: 'LOADING...',
        error: 'SYSTEM_ERROR:',
        bullish: 'BULLISH',
        bearish: 'BEARISH',
        neutral: 'NEUTRAL',
    },
    months: ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'],
    weekDays: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
};
