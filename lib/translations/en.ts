// Translation type interface
export interface Translations {
    nav: {
        visuals: string; team: string; sentiment: string; intel: string;
        macro: string; uplink: string; partners: string; systemHome: string; nodeLabel: string;
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
