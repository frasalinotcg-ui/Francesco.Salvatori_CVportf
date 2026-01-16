#!/bin/bash

echo "🔍 VERIFICA FINALE PRE-DEPLOY"
echo "=============================="
echo ""

# Check 1: No .tsx/.ts extensions in imports
echo "📋 Check 1: Import senza estensioni..."
EXTENSIONS=$(grep -r "from ['\"]\..*\.\(tsx\|ts\)['\"]" --include="*.tsx" --include="*.ts" . 2>/dev/null | grep -v node_modules | wc -l)

if [ "$EXTENSIONS" -eq "0" ]; then
  echo "   ✅ OK - Nessun import con estensioni"
else
  echo "   ❌ ERRORE - Trovati $EXTENSIONS import con estensioni"
  echo "   Fix: Rimuovi .tsx/.ts dagli import"
  exit 1
fi

# Check 2: vite.config.ts has extensions
echo "📋 Check 2: vite.config.ts configurato..."
if grep -q "extensions:" vite.config.ts; then
  echo "   ✅ OK - extensions array presente"
else
  echo "   ❌ ERRORE - extensions array mancante"
  exit 1
fi

# Check 3: Main files exist
echo "📋 Check 3: File principali esistono..."
FILES=("index.html" "main.tsx" "App.tsx" "index.css" "vite.config.ts" "package.json")
MISSING=0

for file in "${FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "   ✅ $file"
  else
    echo "   ❌ $file MANCANTE!"
    MISSING=$((MISSING+1))
  fi
done

if [ "$MISSING" -gt "0" ]; then
  exit 1
fi

# Check 4: Components exist
echo "📋 Check 4: Componenti esistono..."
COMPONENTS=("components/CVPage.tsx" "components/PortfolioPage.tsx" "components/Navigation.tsx" "components/ProjectDetail.tsx")
MISSING=0

for comp in "${COMPONENTS[@]}"; do
  if [ -f "$comp" ]; then
    echo "   ✅ $comp"
  else
    echo "   ❌ $comp MANCANTE!"
    MISSING=$((MISSING+1))
  fi
done

if [ "$MISSING" -gt "0" ]; then
  exit 1
fi

# Check 5: package.json has build script
echo "📋 Check 5: Script build presente..."
if grep -q '"build"' package.json; then
  echo "   ✅ OK - Script build trovato"
else
  echo "   ❌ ERRORE - Script build mancante"
  exit 1
fi

echo ""
echo "✅✅✅ TUTTI I CHECK PASSATI! ✅✅✅"
echo ""
echo "🚀 PRONTO PER IL DEPLOY!"
echo ""
echo "Esegui:"
echo "  npm run build      # Test locale"
echo "  vercel --prod      # Deploy production"
echo ""
