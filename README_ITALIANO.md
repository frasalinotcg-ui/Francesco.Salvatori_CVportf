# 🎨 Portfolio Francesco Salvatori - Fashion Designer

Portfolio interattivo con stile editoriale minimalista, texture carta naturale e sistema di upload immagini con compressione automatica.

---

## ✅ CARATTERISTICHE

- **CV Page** - Biografia Francesco Salvatori (nato 2003, Roma)
- **6 Progetti Moda** - Layout magazine doppia pagina
- **Upload Universale** - Sostituisci qualsiasi immagine
- **Compressione Auto** - Immagini ridotte automaticamente a max 1MB
- **Traduzione EN/IT** - Toggle lingua interattivo
- **Design Editoriale** - Stile minimalista beige/nero/bianco
- **IndexedDB** - Salvataggio permanente locale

---

## 🚀 DEPLOY

```bash
# Vercel CLI (veloce)
vercel --prod

# O GitHub
git push origin main
# Poi importa su vercel.com
```

---

## 📸 UPLOAD IMMAGINI

**Come funziona:**
1. Hover su un'immagine
2. Click "Replace"
3. Seleziona JPG/PNG (anche 10MB+)
4. ✅ Compressa automaticamente a ~500KB!

**Esempio:**
```
Foto.jpg (8.5 MB) → Compressa (520 KB) ✅
Riduzione: 94%
Qualità: Eccellente (85%)
```

---

## 🔧 TECNOLOGIE

- **React** + TypeScript
- **Vite** - Build tool
- **Tailwind CSS** v4
- **Motion** (Framer Motion) - Animazioni
- **IndexedDB** - Storage locale
- **Canvas API** - Compressione immagini

---

## 📁 STRUTTURA

```
/
├── main.tsx           → Entry point
├── index.css          → CSS globale
├── App.tsx            → Main app
├── components/        → React components
├── utils/
│   ├── imageStorage.ts      → IndexedDB
│   ├── imageCompression.ts  → Compressione
│   └── languageContext.tsx  → Traduzioni
└── vite.config.ts
```

---

## ⚙️ SETUP LOCALE

```bash
npm install
npm run dev
```

Build:
```bash
npm run build
```

---

## 📖 DOCUMENTAZIONE

- **Deploy:** `/VERCEL_READY.md`
- **Compressione:** `/IMAGE_COMPRESSION_GUIDE.md`
- **Setup Completo:** `/SETUP_COMPLETO.md`

---

## 🎯 STATUS

✅ **PRONTO PER PRODUZIONE**

- Deploy ready
- Compressione immagini attiva
- Tutti i sistemi operativi
- Build ottimizzato

---

## 🏆 AUTORE

**Francesco Salvatori**  
Fashion Designer  
Roma, 2003

---

## 📝 LICENZA

Portfolio personale - Tutti i diritti riservati
