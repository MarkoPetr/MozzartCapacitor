#!/bin/bash

echo "==== 1. Provera foldera i git statusa ===="
echo "Trenutni folder:"
pwd
echo ""
echo "Git status:"
git status
echo ""
echo "Git remote:"
git remote -v
echo ""

echo "==== 2. Provera Node i NPM verzije ===="
node -v || echo "Node nije pokretan"
npm -v || echo "NPM nije pokretan"
echo ""

echo "==== 3. Provera obaveznih fajlova za Appflow ===="
files=("package.json" "ionic.config.json" "capacitor.config.ts" "capacitor.config.json" "src")
for f in "${files[@]}"; do
    if [ -e "$f" ]; then
        echo "[OK] $f postoji"
    else
        echo "[MISSING] $f NE POSTOJI"
    fi
done
echo ""

echo "==== 4. Pregled commit-ovanih i necommit-ovanih fajlova ===="
git status -s
echo ""

echo "==== 5. Lista svih fajlova u src folderu (kratak pregled) ===="
ls -l src | head -n 20
echo ""
