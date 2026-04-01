# स्वप्रातला कवी – Website
## By Abhishek Ingole | abhishekingole81@gmail.com

---

## 📁 FILES
```
swapnatala-kavi/
├── index.html      ← Main website (all 21 poems)
├── css/style.css   ← All styles
├── js/app.js       ← All JavaScript
└── README.md       ← Setup guide
```

---

## 📧 MAKE FEEDBACK EMAIL WORK (Free — 5 Minutes)

### Step 1: Create EmailJS Account
- Go to **https://emailjs.com**
- Click "Sign Up Free" — free plan = 200 emails/month

### Step 2: Add Gmail Service
1. Dashboard → Email Services → Add New Service
2. Choose **Gmail**
3. Connect your Gmail account: `abhishekingole81@gmail.com`
4. Click **Create Service**
5. Copy the **Service ID** (e.g., `service_abc123`)

### Step 3: Create Email Template
1. Dashboard → Email Templates → Create New Template
2. **To Email:** `abhishekingole81@gmail.com`
3. **Subject:**
   ```
   स्वप्रातला कवी - {{from_name}} यांचा अभिप्राय ({{rating}})
   ```
4. **Body (HTML or Text):**
   ```
   नमस्कार अभिषेक,

   नवा अभिप्राय आला आहे!

   नाव: {{from_name}}
   ईमेल: {{from_email}}
   रेटिंग: {{rating}}
   आवडलेली कविता: {{favorite_poem}}
   तारीख: {{submission_date}}

   संदेश:
   {{message}}

   ---
   स्वप्रातला कवी वेबसाइट
   ```
5. Click **Save** → Copy the **Template ID** (e.g., `template_xyz789`)

### Step 4: Get Public Key
1. Dashboard → Account → API Keys
2. Copy your **Public Key** (e.g., `abcXYZ123`)

### Step 5: Update js/app.js
Open `js/app.js`, find lines 10-14, replace:
```javascript
const EMAILJS_CONFIG = {
  serviceId: 'service_abc123',    // ← Your Service ID
  templateId: 'template_xyz789',  // ← Your Template ID
  publicKey: 'abcXYZ123'          // ← Your Public Key
};
```

### Step 6: Done! ✅
Now when someone submits the feedback form:
- Email goes to: **abhishekingole81@gmail.com**
- Visitor sees: Marathi "धन्यवाद" success message
- No server needed — works on any hosting!

---

## 🌐 HOW TO HOST (Free)

### GitHub Pages (Free):
```bash
1. Create GitHub account → New Repository → "swapnatala-kavi"
2. Upload all files (drag & drop on GitHub)
3. Settings → Pages → Branch: main → Save
4. Live at: https://YOUR_USERNAME.github.io/swapnatala-kavi
```

### Netlify (Even easier, Free):
```
1. Go to netlify.com → Sign up
2. Drag your entire folder onto the Netlify dashboard
3. Get a free URL instantly like: swapnatala-kavi.netlify.app
```

---

## 🎨 FEATURES
- ✅ All 21 complete Marathi poems (full text)
- ✅ Filter by category (प्रेम, आई-बाप, मैत्री, समाज)
- ✅ Working feedback form → sends email to abhishekingole81@gmail.com
- ✅ Marathi "धन्यवाद" thank you message on submit
- ✅ Dark & Light mode toggle
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Beautiful 3D book animation on hero
- ✅ Smooth scroll navigation
- ✅ No login required — open for all readers

---

*"कधी कधी शब्दच असतात... जे मनातलं सांगून जातात."*
*— अभिषेक इंगोले*
