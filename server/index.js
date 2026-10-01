const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { initialProfiles } = require('./initialData');
const { scrapePublicProfile } = require('./scraper');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// In-Memory Database (can be backed by PostgreSQL / Neon via process.env.DATABASE_URL)
let profilesStore = [...initialProfiles];
let inquiriesStore = [];
let claimsStore = [];

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Expert Hub API (Trainers, Coaches, Consultants & AI Experts)',
    timestamp: new Date().toISOString(),
    profilesCount: profilesStore.length
  });
});

// GET /api/profiles - Search & Filter
app.get('/api/profiles', (req, res) => {
  const { category, search, tag, client, featured } = req.query;
  let results = [...profilesStore];

  if (category && category !== 'All') {
    results = results.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (tag) {
    results = results.filter(p => 
      p.specialties.some(s => s.toLowerCase().includes(tag.toLowerCase()))
    );
  }

  if (client) {
    results = results.filter(p => 
      p.clients.some(c => c.toLowerCase().includes(client.toLowerCase()))
    );
  }

  if (featured === 'true') {
    results = results.filter(p => p.featured);
  }

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.title.toLowerCase().includes(q) ||
      p.headline.toLowerCase().includes(q) ||
      p.bio.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.specialties.some(s => s.toLowerCase().includes(q)) ||
      p.clients.some(c => c.toLowerCase().includes(q))
    );
  }

  res.json({
    success: true,
    count: results.length,
    total: profilesStore.length,
    profiles: results
  });
});

// GET /api/profiles/:id - Single Profile
app.get('/api/profiles/:id', (req, res) => {
  const profile = profilesStore.find(p => p.id === req.params.id);
  if (!profile) {
    return res.status(404).json({ success: false, message: 'Profile not found' });
  }
  res.json({ success: true, profile });
});

// POST /api/scrape - Scrape URL or search query to build public profile
app.post('/api/scrape', async (req, res) => {
  const { urlOrName } = req.body;
  if (!urlOrName) {
    return res.status(400).json({ success: false, message: 'urlOrName is required' });
  }

  try {
    const draftProfile = await scrapePublicProfile(urlOrName);
    
    // Check if auto-save requested
    if (req.body.autoSave) {
      profilesStore.unshift(draftProfile);
    }

    res.json({
      success: true,
      message: 'Profile generated from public data source',
      profile: draftProfile
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to extract profile: ' + error.message });
  }
});

// POST /api/profiles - Add or save a profile
app.post('/api/profiles', (req, res) => {
  const newProfile = req.body;
  if (!newProfile.name || !newProfile.category) {
    return res.status(400).json({ success: false, message: 'Name and Category are required' });
  }

  const profileToAdd = {
    id: newProfile.id || `exp-${Date.now()}`,
    name: newProfile.name,
    title: newProfile.title || `${newProfile.category} Specialist`,
    headline: newProfile.headline || `Expert ${newProfile.category}`,
    category: newProfile.category,
    avatar: newProfile.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    coverImage: newProfile.coverImage || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    location: newProfile.location || "Remote & Onsite",
    rating: 5.0,
    reviewsCount: 1,
    hourlyRate: newProfile.hourlyRate || "$300 - $600 / hr",
    bio: newProfile.bio || "Experienced professional helping organizations scale and excel.",
    clients: newProfile.clients || ["Fortune 500 Companies"],
    specialties: newProfile.specialties || [newProfile.category],
    socialLinks: newProfile.socialLinks || {},
    featuredMedia: newProfile.featuredMedia || {},
    verified: false,
    featured: false,
    claimed: true,
    createdAt: new Date().toISOString()
  };

  profilesStore.unshift(profileToAdd);
  res.status(201).json({ success: true, message: 'Profile created successfully', profile: profileToAdd });
});

// POST /api/inquire - Submit consultation or booking inquiry
app.post('/api/inquire', (req, res) => {
  const { profileId, clientName, clientEmail, organization, message, preferredDate } = req.body;
  if (!profileId || !clientEmail || !message) {
    return res.status(400).json({ success: false, message: 'Missing required inquiry fields' });
  }

  const inquiry = {
    id: `inq-${Date.now()}`,
    profileId,
    clientName,
    clientEmail,
    organization,
    message,
    preferredDate,
    createdAt: new Date().toISOString()
  };

  inquiriesStore.push(inquiry);
  res.json({ success: true, message: 'Inquiry sent successfully to the expert!', inquiry });
});

// POST /api/claim - Claim an auto-gathered profile
app.post('/api/claim', (req, res) => {
  const { profileId, claimantName, claimantEmail, verificationLink } = req.body;
  const profile = profilesStore.find(p => p.id === profileId);

  if (!profile) {
    return res.status(404).json({ success: false, message: 'Profile not found' });
  }

  const claim = {
    id: `claim-${Date.now()}`,
    profileId,
    claimantName,
    claimantEmail,
    verificationLink,
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  claimsStore.push(claim);
  res.json({ success: true, message: 'Claim request submitted! Verification email sent.', claim });
});

// Start listening if run directly
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 Experts Hub Backend running at http://localhost:${PORT}`);
  });
}

module.exports = app;
