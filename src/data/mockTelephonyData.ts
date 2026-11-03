import { CallRecord, AgentPromptConfig, PhoneNumberRecord } from '../types/telephony';

export const INITIAL_CALL_RECORDS: CallRecord[] = [
  {
    id: 'call-1049',
    callSid: 'CA9f482a0910cbe7781b94e334fa12a',
    callerId: '+1 (415) 555-0198',
    callerName: 'Elena Rostova',
    vertical: 'Lost & Found',
    voiceModel: 'ElevenLabs Flash v2.5',
    status: 'Completed',
    durationSeconds: 142,
    durationFormatted: '02:22',
    latencyMs: 198,
    packetJitterMs: 1.8,
    timestamp: '2026-11-03T00:48:12Z',
    dateFormatted: 'Today, 00:48',
    sentiment: 'Resolved',
    intent: 'Inquire lost laptop bag at SFO Terminal 2',
    summary: 'Caller misplaced a black Tumi laptop bag containing a silver MacBook Pro at Gate B4 security checkpoint. Agent queried Foundify physical inventory, located match #LF-9921 logged by TSA at 23:15, and verified ownership via serial number snippet. Digital custody claim link dispatched via SMS.',
    resolution: 'Verified item match in warehouse; claim ticket generated',
    entities: [
      { label: 'Item Type', value: 'Black Tumi Alpha Briefcase', category: 'Item', confidence: 0.99 },
      { label: 'Hardware', value: '16" MacBook Pro Silver (M3)', category: 'Property', confidence: 0.96 },
      { label: 'Location', value: 'SFO Terminal 2 - Gate B4', category: 'Terminal', confidence: 0.98 },
      { label: 'Custody Match', value: 'Foundify Vault Bay 4-C', category: 'Inventory', confidence: 0.94 },
    ],
    transcript: [
      { id: 't1', speaker: 'agent', text: 'Thank you for calling Foundify Lost & Found Operations. I can assist with item claims across all registered transport hubs. What item are you looking for?', timestamp: '00:01', latencyMs: 210 },
      { id: 't2', speaker: 'caller', text: 'Hi! I think I left my work laptop bag at San Francisco Airport terminal 2 around an hour ago. It was near gate B4.', timestamp: '00:08' },
      { id: 't3', speaker: 'agent', text: 'Checking the live SFO terminal 2 custody intake now. Could you confirm the brand, color, and any identifying electronics inside?', timestamp: '00:14', latencyMs: 188 },
      { id: 't4', speaker: 'caller', text: 'Yes, it is a black ballistic nylon Tumi briefcase. Inside is a 16-inch silver MacBook Pro with a blue sticker of an astronaut on the lid.', timestamp: '00:23' },
      { id: 't5', speaker: 'agent', text: 'Found a direct match logged 38 minutes ago by airport screening: Tag number LF-9921, black nylon briefcase matching that exact description. I have initiated an inventory hold.', timestamp: '00:32', latencyMs: 194 },
      { id: 't6', speaker: 'caller', text: 'Oh thank goodness! How do I pick it up or have it couriered?', timestamp: '00:39' },
      { id: 't7', speaker: 'agent', text: 'I just dispatched a secure verification link to this phone number. You can choose counter pickup at the baggage service desk or bonded courier dispatch to your address.', timestamp: '00:46', latencyMs: 202 },
      { id: 't8', speaker: 'caller', text: 'Got the SMS already. Thank you so much for the quick help!', timestamp: '00:52' },
      { id: 't9', speaker: 'agent', text: 'You are welcome. Have a safe journey, Elena.', timestamp: '00:55', latencyMs: 175 }
    ],
    costUsd: 0.048,
    sipTrunk: 'sfo-carrier-01.sip.foundify.ai'
  },
  {
    id: 'call-1048',
    callSid: 'CA8e321b8829ade6670a83d223fe09b',
    callerId: '+1 (312) 555-8391',
    callerName: 'Marcus Vance',
    vertical: 'Marketplace',
    voiceModel: 'Retell Turbo HD',
    status: 'Completed',
    durationSeconds: 108,
    durationFormatted: '01:48',
    latencyMs: 176,
    packetJitterMs: 1.2,
    timestamp: '2026-11-03T00:32:05Z',
    dateFormatted: 'Today, 00:32',
    sentiment: 'Positive',
    intent: 'Verify escrow release & delivery for Order #MP-4409',
    summary: 'Buyer inquiring about funds release for camera gear sale. Agent verified buyer confirmation, released escrow disbursement of $1,850.00 to seller payout balance, and updated transaction status in real time.',
    resolution: 'Escrow released and seller notified',
    entities: [
      { label: 'Order ID', value: 'MP-4409', category: 'Transaction', confidence: 0.99 },
      { label: 'Amount', value: '$1,850.00 USD', category: 'Financial', confidence: 0.99 },
      { label: 'Item', value: 'Leica M6 35mm Rangefinder', category: 'Catalog', confidence: 0.97 },
      { label: 'Buyer Ack', value: 'Confirmed Received (FedEx #7781)', category: 'Logistics', confidence: 0.95 },
    ],
    transcript: [
      { id: 't1', speaker: 'agent', text: 'Foundify Marketplace transaction desk. How may I assist your listing or transaction today?', timestamp: '00:01', latencyMs: 180 },
      { id: 't2', speaker: 'caller', text: 'I am calling about order MP-4409. The buyer received the Leica camera yesterday, but the escrow balance is still showing pending.', timestamp: '00:09' },
      { id: 't3', speaker: 'agent', text: 'Looking up order MP-4409 for the Leica M6. FedEx tracking confirms signed delivery yesterday afternoon. I see the buyer completed their inspection checklist 20 minutes ago.', timestamp: '00:16', latencyMs: 172 },
      { id: 't4', speaker: 'caller', text: 'Awesome! So is the escrow unlocked?', timestamp: '00:22' },
      { id: 't5', speaker: 'agent', text: 'Yes, I have triggered the automatic settlement. The one thousand eight hundred and fifty dollars has been posted to your primary Stripe payout schedule.', timestamp: '00:28', latencyMs: 176 },
      { id: 't6', speaker: 'caller', text: 'Perfect, that was super fast. Appreciate it.', timestamp: '00:33' }
    ],
    costUsd: 0.036,
    sipTrunk: 'ord-carrier-02.sip.foundify.ai'
  },
  {
    id: 'call-1047',
    callSid: 'CA7d210a7718zce5569z72c112ed98a',
    callerId: '+1 (512) 555-4420',
    callerName: 'Chloe Bennett',
    vertical: 'Rentals',
    voiceModel: 'Deepgram Nova-2 + Aura',
    status: 'Completed',
    durationSeconds: 95,
    durationFormatted: '01:35',
    latencyMs: 165,
    packetJitterMs: 0.9,
    timestamp: '2026-11-03T00:18:40Z',
    dateFormatted: 'Today, 00:18',
    sentiment: 'Resolved',
    intent: 'Rental property smart lock PIN access code recovery',
    summary: 'Guest arrived at rental apartment #402 in Austin Downtown. Keypad PIN was not registering. Agent verified reservation credentials, cycled smart lock token via Z-Wave integration, and generated temporary 6-digit backup code 849-201.',
    resolution: 'Smart lock reset, temporary PIN 849201 generated & confirmed',
    entities: [
      { label: 'Reservation', value: 'RN-8831 (Austin Loft 402)', category: 'Booking', confidence: 0.99 },
      { label: 'Guest Name', value: 'Chloe Bennett', category: 'Identity', confidence: 0.98 },
      { label: 'Smart Lock', value: 'Schlage Encode Plus Z-Wave', category: 'Hardware', confidence: 0.96 },
      { label: 'Temp Passcode', value: '849-201 (Valid 72h)', category: 'Access', confidence: 0.99 },
    ],
    transcript: [
      { id: 't1', speaker: 'agent', text: 'Welcome to Foundify Smart Rentals Concierge. Please state your reservation code or phone number to access your rental services.', timestamp: '00:01', latencyMs: 170 },
      { id: 't2', speaker: 'caller', text: 'Hi, I am standing outside unit 402 on 4th Street in Austin. The lock is flashing yellow when I type my code.', timestamp: '00:08' },
      { id: 't3', speaker: 'agent', text: 'I see your active check-in for reservation RN-8831, Chloe. Let me ping the hub and generate a fresh keycode for you right now.', timestamp: '00:15', latencyMs: 162 },
      { id: 't4', speaker: 'caller', text: 'Okay, standing right by the keypad.', timestamp: '00:19' },
      { id: 't5', speaker: 'agent', text: 'The keypad is refreshed. Please enter eight, four, nine, two, zero, one, followed by the check mark.', timestamp: '00:25', latencyMs: 165 },
      { id: 't6', speaker: 'caller', text: 'It chimed green and unlocked! Thank you so much.', timestamp: '00:32' },
      { id: 't7', speaker: 'agent', text: 'Wonderful! You will also find high-speed Wi-Fi details inside on the refrigerator card. Enjoy your stay in Austin!', timestamp: '00:38', latencyMs: 158 }
    ],
    costUsd: 0.031,
    sipTrunk: 'dfw-carrier-01.sip.foundify.ai'
  },
  {
    id: 'call-1046',
    callSid: 'CA6c109z6607ybd4458y61b001dc87z',
    callerId: '+1 (206) 555-7319',
    callerName: 'Devon Patel',
    vertical: 'Services',
    voiceModel: 'Cartesia Sonic Enterprise',
    status: 'Completed',
    durationSeconds: 164,
    durationFormatted: '02:44',
    latencyMs: 152,
    packetJitterMs: 1.1,
    timestamp: '2026-11-02T23:54:19Z',
    dateFormatted: 'Yesterday, 23:54',
    sentiment: 'Positive',
    intent: 'Emergency plumbing dispatch quote & tech routing',
    summary: 'Homeowner reported ruptured kitchen main water valve. Agent walked caller through shutoff valve location, confirmed homeowner safety, and dispatched certified plumbing contractor with an estimated 28-minute ETA.',
    resolution: 'Contractor dispatched with priority emergency dispatch ID #SV-228',
    entities: [
      { label: 'Service Category', value: 'Emergency Master Plumbing', category: 'Vertical', confidence: 0.99 },
      { label: 'Address', value: '2844 Queen Anne Ave N, Seattle', category: 'Geocoding', confidence: 0.97 },
      { label: 'Dispatched Pro', value: 'Cascade Rapid Plumbing #14', category: 'Vendor', confidence: 0.96 },
      { label: 'ETA', value: '28 minutes (Live GPS Tracking)', category: 'Dispatch', confidence: 0.98 },
    ],
    transcript: [
      { id: 't1', speaker: 'agent', text: 'Foundify On-Demand Services emergency dispatch. Are you in immediate danger or is this a home utility incident?', timestamp: '00:01', latencyMs: 155 },
      { id: 't2', speaker: 'caller', text: 'Water is gushing under my kitchen sink! I do not know how to shut it off completely.', timestamp: '00:06' },
      { id: 't3', speaker: 'agent', text: 'First, let us stop the water flow. Look directly under the sink cabinet for two oval handles. Turn both clockwise until they stop. Can you reach them?', timestamp: '00:14', latencyMs: 150 },
      { id: 't4', speaker: 'caller', text: 'Hold on... okay, turned both clockwise. The spraying slowed down to a trickle.', timestamp: '00:23' },
      { id: 't5', speaker: 'agent', text: 'Excellent job. I have dispatched Cascade Rapid Plumbing to your verified address on Queen Anne Avenue. Tech Jordan is currently 4 miles away with an ETA of 28 minutes.', timestamp: '00:31', latencyMs: 154 },
      { id: 't6', speaker: 'caller', text: 'Thank you! That was such a relief.', timestamp: '00:36' }
    ],
    costUsd: 0.052,
    sipTrunk: 'sea-carrier-01.sip.foundify.ai'
  },
  {
    id: 'call-1045',
    callSid: 'CA5b098y5596xac3347x50a990cb76y',
    callerId: '+1 (718) 555-9014',
    callerName: 'Sarah Jenkins',
    vertical: 'Giveaways',
    voiceModel: 'ElevenLabs Flash v2.5',
    status: 'Completed',
    durationSeconds: 88,
    durationFormatted: '01:28',
    latencyMs: 204,
    packetJitterMs: 2.1,
    timestamp: '2026-11-02T23:31:40Z',
    dateFormatted: 'Yesterday, 23:31',
    sentiment: 'Positive',
    intent: 'List community giveaway item (oak dining table & chairs)',
    summary: 'Community donor offering solid 6-seater oak dining set for free neighborhood pickup. Agent logged dimensions, photos upload SMS prompt, set curb pickup availability window, and notified verified community members.',
    resolution: 'Giveaway listing #GW-519 published to local Brooklyn radius',
    entities: [
      { label: 'Item Offer', value: 'Solid Oak Dining Set + 6 Chairs', category: 'Donation', confidence: 0.99 },
      { label: 'Condition', value: 'Excellent (Minor surface wear)', category: 'Condition', confidence: 0.95 },
      { label: 'Neighborhood', value: 'Brooklyn - Park Slope', category: 'Geo', confidence: 0.98 },
      { label: 'Pickup Window', value: 'Saturday 10:00 AM - 2:00 PM', category: 'Logistics', confidence: 0.96 },
    ],
    transcript: [
      { id: 't1', speaker: 'agent', text: 'Foundify Community Giveaways. Are you looking to donate items or claim a neighborhood listing today?', timestamp: '00:01', latencyMs: 205 },
      { id: 't2', speaker: 'caller', text: 'I am moving this weekend and want to give away my solid oak dining table and six matching chairs to a local family.', timestamp: '00:09' },
      { id: 't3', speaker: 'agent', text: 'That is wonderful! In which neighborhood are the items located, and what is your preferred pickup timeframe?', timestamp: '00:16', latencyMs: 198 },
      { id: 't4', speaker: 'caller', text: 'Park Slope, Brooklyn. Saturday between 10am and 2pm would be ideal for ground floor pickup.', timestamp: '00:24' },
      { id: 't5', speaker: 'agent', text: 'Perfect. Listing GW-519 has been posted to verified neighbors within a 3-mile radius. I just texted you a link to snap two photos if you would like to include them.', timestamp: '00:32', latencyMs: 206 },
      { id: 't6', speaker: 'caller', text: 'Awesome, will take the photos right now. Thanks!', timestamp: '00:38' }
    ],
    costUsd: 0.029,
    sipTrunk: 'jfk-carrier-01.sip.foundify.ai'
  },
  {
    id: 'call-1044',
    callSid: 'CA4a987x4485wzb2236w49z889ba65x',
    callerId: '+1 (617) 555-3201',
    callerName: 'Dr. Arthur Pendelton',
    vertical: 'Lost & Found',
    voiceModel: 'ElevenLabs Flash v2.5',
    status: 'Transferred',
    durationSeconds: 182,
    durationFormatted: '03:02',
    latencyMs: 224,
    packetJitterMs: 2.4,
    timestamp: '2026-11-02T22:15:00Z',
    dateFormatted: 'Yesterday, 22:15',
    sentiment: 'Frustrated',
    intent: 'Urgent inquiry: Prescription cardiac medication lost in subway',
    summary: 'Caller misplaced high-priority prescription cardiac medication on the MBTA Red Line train. Agent detected medical emergency keywords, gathered station data, and executed warm SIP transfer to the MBTA Transit Police Central Dispatch supervisor.',
    resolution: 'Warm SIP transfer to Transit Police Dispatch; case flagged high priority',
    entities: [
      { label: 'Lost Property', value: 'Cardiology Prescription Bag (CVS)', category: 'Medical/Critical', confidence: 0.99 },
      { label: 'Transit System', value: 'MBTA Red Line (Inbound South Station)', category: 'Transit', confidence: 0.98 },
      { label: 'Urgency Tier', value: 'Tier 1 Medical Escalation', category: 'Priority', confidence: 1.00 },
    ],
    transcript: [
      { id: 't1', speaker: 'agent', text: 'Foundify Transit Lost & Found. How can I help you today?', timestamp: '00:01', latencyMs: 215 },
      { id: 't2', speaker: 'caller', text: 'This is urgent! I left a paper bag with critical heart medication on the Red Line train heading into South Station about 10 minutes ago!', timestamp: '00:09' },
      { id: 't3', speaker: 'agent', text: 'Understood. Because this is critical prescription medicine, I am immediately routing you to the MBTA Transit Police Dispatch supervisor while transmitting your location data. Connecting now.', timestamp: '00:17', latencyMs: 220 },
      { id: 't4', speaker: 'agent', text: '[SYSTEM: SIP Warm Transfer to MBTA-POLICE-09 initiated with caller metadata telemetry payload]', timestamp: '00:20', latencyMs: 140 }
    ],
    costUsd: 0.059,
    sipTrunk: 'bos-carrier-01.sip.foundify.ai'
  },
  {
    id: 'call-1043',
    callSid: 'CA3z876w3374vya1125v38y778az54w',
    callerId: '+1 (305) 555-1928',
    callerName: 'Camila Rodriguez',
    vertical: 'Rentals',
    voiceModel: 'Retell Turbo HD',
    status: 'Completed',
    durationSeconds: 120,
    durationFormatted: '02:00',
    latencyMs: 182,
    packetJitterMs: 1.4,
    timestamp: '2026-11-02T21:40:12Z',
    dateFormatted: 'Yesterday, 21:40',
    sentiment: 'Resolved',
    intent: 'Late checkout extension inquiry for Miami Beach Villa',
    summary: 'Guest inquired if checkout could be extended from 11:00 AM to 3:00 PM. Agent checked host calendar, identified no incoming turnover until the following day, billed the $65 late-checkout fee, and updated the digital lock timetable.',
    resolution: 'Extended checkout approved until 3:00 PM; lock code updated',
    entities: [
      { label: 'Property', value: 'Villa Sol - South Beach (RN-3990)', category: 'Property', confidence: 0.99 },
      { label: 'Extension', value: '11:00 AM -> 3:00 PM (+4 Hours)', category: 'Schedule', confidence: 0.97 },
      { label: 'Fee Added', value: '$65.00 USD', category: 'Billing', confidence: 0.99 },
    ],
    transcript: [
      { id: 't1', speaker: 'agent', text: 'Thank you for calling Foundify Concierge for Villa Sol. How can I enhance your stay today, Camila?', timestamp: '00:01', latencyMs: 185 },
      { id: 't2', speaker: 'caller', text: 'Hi! Our flight got delayed until this evening. Can we request a late checkout until 3 PM today?', timestamp: '00:08' },
      { id: 't3', speaker: 'agent', text: 'Let me inspect the housekeeping dispatch schedule. Good news: There is no incoming arrival until tomorrow afternoon. We can grant late checkout until 3:00 PM for sixty-five dollars.', timestamp: '00:16', latencyMs: 178 },
      { id: 't4', speaker: 'caller', text: 'That is awesome, please go ahead and charge the card on file.', timestamp: '00:22' },
      { id: 't5', speaker: 'agent', text: 'Done! Your digital door code will remain active until exactly 3:00 PM. Enjoy your remaining afternoon in Miami Beach!', timestamp: '00:29', latencyMs: 182 }
    ],
    costUsd: 0.040,
    sipTrunk: 'mia-carrier-01.sip.foundify.ai'
  }
];

export const SYSTEM_PROMPTS: Record<string, AgentPromptConfig> = {
  'Lost & Found': {
    id: 'prompt-lf-01',
    vertical: 'Lost & Found',
    title: 'Foundify Item Recovery & Custody Intake Voice Agent',
    systemPrompt: `You are the Foundify Lost & Found Telephony Voice Agent, operating on carrier-grade SIP low-latency streams.
Your mission is to swiftly identify, verify, and resolve lost or found property claims across transit hubs, airports, hotels, and venues.

Operational Directives:
1. Greet callers professionally with minimal acoustic filler.
2. Inquire about key physical identifiers: brand, color, distinguishing marks, contents, and precise location timestamp.
3. Query the Foundify inventory custody ledger immediately via simulated tool call.
4. If a match is found with >= 90% confidence, cross-verify secondary credentials (e.g. serial numbers, stickers, locked wallpaper descriptions).
5. Offer instant digital claim link transmission via SMS.
6. Tone: Calm, reassuring, clinical precision, zero friction.`,
    temperature: 0.3,
    speechRate: 1.05,
    bargeInSensitivity: 85,
    selectedVoice: 'ElevenLabs Flash - Adam (Acoustic Crisp)',
    latencyTargetMs: 200,
    toolsEnabled: ['queryCustodyVault', 'sendSmsVerification', 'triggerCourierDispatch', 'escalateToHumanSupervisor']
  },
  'Marketplace': {
    id: 'prompt-mp-01',
    vertical: 'Marketplace',
    title: 'Foundify Escrow & Transaction Concierge Agent',
    systemPrompt: `You are the Foundify Marketplace Telephony Voice Agent.
You handle buyer/seller inquiries, payment escrow disputes, shipping delivery milestones, and instant buyer-seller message routing.

Operational Directives:
1. Verify order ID format (e.g., MP-XXXX).
2. Check real-time escrow lock status and integrated logistics tracking (FedEx, UPS, DHL).
3. If delivery confirmation is recorded and inspection window cleared, release escrow payouts instantly.
4. Adhere to strict anti-fraud verification protocols; never disclose full card numbers or private tax IDs.
5. Tone: Crisp, trustworthy, decisive commercial confidence.`,
    temperature: 0.25,
    speechRate: 1.0,
    bargeInSensitivity: 75,
    selectedVoice: 'Retell Turbo - Marcus (Commercial Neutral)',
    latencyTargetMs: 180,
    toolsEnabled: ['queryOrderState', 'releaseEscrowBalance', 'openDisputeMediation', 'sendBuyerSmsNotice']
  },
  'Rentals': {
    id: 'prompt-rn-01',
    vertical: 'Rentals',
    title: 'Foundify Smart Property & Lock Access Concierge',
    systemPrompt: `You are the Foundify Smart Rental Telephony Voice Agent.
You manage property access, keypad PIN resets, Wi-Fi inquiries, emergency maintenance alerts, and checkout adjustments.

Operational Directives:
1. Verify caller phone number against active reservation rosters.
2. Troubleshoot smart lock errors (Z-Wave / Zigbee / Wi-Fi locks) with direct step-by-step keypad guidance.
3. Check cleaning turnover schedules before approving late checkouts.
4. Generate temporary 6-digit access tokens when primary codes fail.
5. Tone: Warm hospitality, rapid problem resolution, high security compliance.`,
    temperature: 0.35,
    speechRate: 1.02,
    bargeInSensitivity: 80,
    selectedVoice: 'Deepgram Nova - Rachel (Warm Telephony)',
    latencyTargetMs: 170,
    toolsEnabled: ['queryReservation', 'cycleSmartLockPin', 'checkTurnoverSchedule', 'billIncidentalFee']
  },
  'Services': {
    id: 'prompt-sv-01',
    vertical: 'Services',
    title: 'Foundify Emergency Dispatch & Pro Routing Operator',
    systemPrompt: `You are the Foundify On-Demand Services Telephony Voice Agent.
You coordinate immediate technician dispatch for plumbing, electrical, locksmith, HVAC, and cleaning emergencies.

Operational Directives:
1. Assess incident severity in the first 10 seconds (e.g., active water leak, power outage, lockout).
2. Provide immediate triage instructions to prevent property damage (e.g., water shutoff valve instructions).
3. Pinpoint geo-coordinates and identify nearest available vetted contractor with minimum ETA.
4. Quote standard transparent dispatch deposits and dispatch pro with GPS tracking.
5. Tone: Authoritative, reassuring, rapid triage tempo.`,
    temperature: 0.2,
    speechRate: 1.08,
    bargeInSensitivity: 90,
    selectedVoice: 'Cartesia Sonic - Sarah (Urgent Clarity)',
    latencyTargetMs: 150,
    toolsEnabled: ['lookupNearestPro', 'provideTriageStep', 'createDispatchTicket', 'sendLiveGpsTrackingLink']
  },
  'Giveaways': {
    id: 'prompt-gw-01',
    vertical: 'Giveaways',
    title: 'Foundify Community Giveaway Intake & Coordination Agent',
    systemPrompt: `You are the Foundify Community Giveaways Telephony Voice Agent.
You facilitate circular community sharing by recording item donations, verifying pickup windows, and matching local neighbors.

Operational Directives:
1. Clarify item category, dimensions, and approximate weight.
2. Confirm neighborhood boundary and donor pickup rules (e.g., porch pickup, ground floor assistance).
3. SMS donor a direct photo link to enrich the listing.
4. Broadcast new listing to verified community members seeking free furnishings and appliances.
5. Tone: Friendly, community-oriented, cheerful, efficient.`,
    temperature: 0.4,
    speechRate: 1.0,
    bargeInSensitivity: 70,
    selectedVoice: 'ElevenLabs Flash - Matilda (Community Warm)',
    latencyTargetMs: 210,
    toolsEnabled: ['publishGiveawayListing', 'sendPhotoUploadLink', 'notifyLocalNeighborhoodRadius']
  }
};

export const PHONE_NUMBERS: PhoneNumberRecord[] = [
  {
    id: 'pn-1',
    number: '+1 (415) 890-3411',
    country: 'US',
    vertical: 'Lost & Found',
    assignedAgent: 'Recovery Intake Agent v2.5',
    sipUri: 'sip:intake-lf@sfo.foundify.ai',
    status: 'Active',
    monthlyMinutes: 8420,
    lastActive: '3 min ago'
  },
  {
    id: 'pn-2',
    number: '+1 (415) 890-3412',
    country: 'US',
    vertical: 'Marketplace',
    assignedAgent: 'Escrow Concierge Agent HD',
    sipUri: 'sip:market-escrow@sfo.foundify.ai',
    status: 'Active',
    monthlyMinutes: 5190,
    lastActive: '12 min ago'
  },
  {
    id: 'pn-3',
    number: '+1 (512) 600-8840',
    country: 'US',
    vertical: 'Rentals',
    assignedAgent: 'Smart Lock & Hospitality Agent',
    sipUri: 'sip:rentals-austin@dfw.foundify.ai',
    status: 'Active',
    monthlyMinutes: 6730,
    lastActive: '8 min ago'
  },
  {
    id: 'pn-4',
    number: '+1 (206) 400-9122',
    country: 'US',
    vertical: 'Services',
    assignedAgent: 'Emergency Dispatch Pro v1.2',
    sipUri: 'sip:dispatch-sea@sea.foundify.ai',
    status: 'Active',
    monthlyMinutes: 11400,
    lastActive: 'Just now'
  },
  {
    id: 'pn-5',
    number: '+1 (718) 390-1105',
    country: 'US',
    vertical: 'Giveaways',
    assignedAgent: 'Community Sharing Coordinator',
    sipUri: 'sip:giveaways-nyc@jfk.foundify.ai',
    status: 'Active',
    monthlyMinutes: 2890,
    lastActive: '26 min ago'
  }
];

export const TELEMETRY_METRICS = {
  totalCallsToday: 1428,
  avgHandleTimeSeconds: 108, // 1m 48s
  avgHandleTimeFormatted: '1m 48s',
  p95FirstByteLatencyMs: 182,
  resolutionRatePercent: 88.4,
  costPerMinuteUsd: 0.038,
  activeLiveCalls: 6,
  sipPacketLossRate: 0.02, // 0.02%
  verticalBreakdown: [
    { vertical: 'Lost & Found', count: 542, share: 38, avgDuration: '2m 14s', latency: '198ms', color: '#64748B' },
    { vertical: 'Services', count: 342, share: 24, avgDuration: '2m 40s', latency: '154ms', color: '#F59E0B' },
    { vertical: 'Rentals', count: 257, share: 18, avgDuration: '1m 35s', latency: '168ms', color: '#0284C7' },
    { vertical: 'Marketplace', count: 186, share: 13, avgDuration: '1m 50s', latency: '176ms', color: '#4F46E5' },
    { vertical: 'Giveaways', count: 101, share: 7, avgDuration: '1m 24s', latency: '204ms', color: '#10B981' }
  ],
  hourlyLatency: [
    { hour: '00:00', latency: 178, calls: 32 },
    { hour: '04:00', latency: 164, calls: 18 },
    { hour: '08:00', latency: 195, calls: 94 },
    { hour: '12:00', latency: 205, calls: 168 },
    { hour: '16:00', latency: 189, calls: 142 },
    { hour: '20:00', latency: 174, calls: 86 }
  ]
};
