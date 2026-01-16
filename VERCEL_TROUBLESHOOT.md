# 🔧 VERCEL BUILD TROUBLESHOOTING

## ❌ ERRORE ATTUALE

```
Could not resolve "./components/CVPage.tsx" from "App.tsx"
Error: Command "npm run build" exited with 1
```

---

## ✅ SOLUZIONI APPLICATE

### **1. RIMOSSO ESTENSIONI `.tsx` DA IMPORT**

Rollup/Vite in produzione **NON vuole estensioni** negli import locali!

#### **File aggiornati:**

✅ `/main.tsx`
```typescript
import App from './App';  // ← NO .tsx
```

✅ `/App.tsx`
```typescript
import { CVPage } from './components/CVPage';  // ← NO .tsx
import { PortfolioPage } from './components/PortfolioPage';
import { Navigation } from './components/Navigation';
import { LanguageProvider } from './utils/languageContext';
```

✅ `/components/CVPage.tsx`
```typescript
import { LanguageToggle } from './LanguageToggle';  // ← NO .tsx
import { useLanguage } from '../utils/languageContext';
```

✅ `/components/PortfolioPage.tsx`
```typescript
import { ProjectDetail } from './ProjectDetail';  // ← NO .tsx
import { LanguageToggle } from './LanguageToggle';
import { useLanguage } from '../utils/languageContext';
```

✅ `/components/ProjectDetail.tsx`
```typescript
import { saveImage, getImage, getAllImages, processAndSaveImage } from '../utils/imageStorage';  // ← NO .ts
import { LanguageToggle } from './LanguageToggle';
import { useLanguage } from '../utils/languageContext';
```

---

### **2. CONFIGURATO VITE PER RISOLVERE ESTENSIONI**

`/vite.config.ts`:
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json']  // ← CRITICO
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
```

La riga `extensions: ['.tsx', '.ts', '.jsx', '.js', '.json']` dice a Vite:
> "Quando trovi `import X from './file'`, cerca `file.tsx`, poi `file.ts`, ecc."

---

## 📋 CHECKLIST VERIFICA

Prima di deployare, verifica:

- [ ] Nessun import ha `.tsx` o `.ts` alla fine
- [ ] `vite.config.ts` ha `extensions` array
- [ ] Tutti i file esistono in `/components/`
- [ ] `package.json` ha script `build`

**Verifica con:**
```bash
# Cerca import con estensioni (dovrebbe tornare VUOTO)
grep -r "from ['\"]\..*\.tsx['\"]" --include="*.tsx" --include="*.ts"

# Se trova risultati → RIMUOVI le estensioni!
```

---

## 🧪 TEST LOCALE

Prima di Vercel, testa in locale:

```bash
# Clean build
rm -rf dist node_modules
npm install
npm run build

# Se funziona:
npm run preview
# Apri http://localhost:4173
```

**Se il build locale funziona → Vercel funzionerà!**

---

## 🚨 SE BUILD LOCALE FALLISCE

### **Errore: "Could not resolve..."**

**CAUSA:** Import ha estensioni `.tsx`

**SOLUZIONE:**
```typescript
// ❌ SBAGLIATO
import { X } from './file.tsx';

// ✅ CORRETTO
import { X } from './file';
```

---

### **Errore: "Module not found"**

**CAUSA:** File non esiste o path sbagliato

**VERIFICA:**
```bash
ls -la components/
# Deve mostrare: CVPage.tsx, PortfolioPage.tsx, ecc.
```

**SOLUZIONE:** Verifica che il file esista con nome esatto (case-sensitive!):
- `CVPage.tsx` ✅
- `cvpage.tsx` ❌
- `Cvpage.tsx` ❌

---

### **Errore: "Cannot find module 'path'"**

**CAUSA:** Dipendenza TypeScript mancante

**SOLUZIONE:**
```bash
npm install --save-dev @types/node
```

---

## 🎯 VERCEL DEPLOY

### **OPZIONE A: Vercel CLI**

```bash
# Installa (prima volta)
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

---

### **OPZIONE B: GitHub Integration**

1. **Push su GitHub:**
```bash
git init
git add .
git commit -m "Portfolio ready for deploy"
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

2. **Import su Vercel:**
   - Vai su https://vercel.com/new
   - Click "Import Git Repository"
   - Seleziona il repo
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - Click "Deploy"

---

## 🔍 DEBUG VERCEL BUILD

Se Vercel fallisce, guarda i log:

### **Vercel Dashboard → Deployments → Click sul deploy fallito**

**Cerca:**
```
11:28:12.471 Could not resolve "./components/CVPage.tsx"
```

**Significa:** Hai ancora import con `.tsx`!

**Fix:**
```bash
# Trova TUTTI gli import con estensioni
grep -r "from ['\"]\..*\.tsx['\"]" .

# Rimuovile tutte!
```

---

## 🆘 VERCEL-SPECIFIC ISSUES

### **"Build command not found"**

**Vercel Settings:**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

### **"Module not found: figma:asset/..."**

**SOLUZIONE:** Verifica che Vercel supporti `figma:asset` scheme.

Se non funziona, converti in file locali:
```bash
# Download le immagini e mettile in /public/images/
```

Poi cambia import:
```typescript
// Prima:
import img from 'figma:asset/abc123.png';

// Dopo:
const img = '/images/abc123.png';
```

---

## 📊 BUILD SUCCESS OUTPUT

Quando funziona, vedrai:

```bash
npm run build

✓ building for production...
✓ transforming...
✓ rendering chunks...
✓ computing gzip size...

dist/index.html                  1.2 kB │ gzip: 0.6 kB
dist/assets/index-abc123.css    45.6 kB │ gzip: 8.2 kB
dist/assets/index-xyz789.js    890.1 kB │ gzip: 280.5 kB

✓ built in 12.34s
```

**Se vedi questo → DEPLOY!** 🚀

---

## ✅ FINAL CHECKLIST

Prima del deploy finale:

- [ ] Build locale funziona (`npm run build`)
- [ ] Preview locale funziona (`npm run preview`)
- [ ] Nessun import con `.tsx/.ts`
- [ ] `vite.config.ts` ha `extensions`
- [ ] Tutti i file esistono
- [ ] `package.json` ha `"type": "module"`

**Se tutto ✅ → DEPLOY CON FIDUCIA!**

```bash
vercel --prod
```

---

## 🎯 CONTATTI SE PROBLEMI

Se dopo tutti questi fix il build fallisce ancora:

1. **Condividi il log completo di Vercel**
2. **Condividi output di `npm run build` locale**
3. **Verifica struttura file:**
   ```bash
   tree -L 2 -I 'node_modules|dist'
   ```

---

## 🏆 SUCCESSO!

Quando vedi:

```
✅ Production: https://francesco-salvatori-portfolio.vercel.app
```

**IL TUO PORTFOLIO È LIVE!** 🎨✨🚀

Condividi il link e mostra il tuo lavoro al mondo! 🌍
