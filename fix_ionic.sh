#!/bin/bash
# Skripta za dodavanje CUSTOM_ELEMENTS_SCHEMA i importovanja IonicModule u sve module

MODULES=("src/app/tab1/tab1.module.ts")

for module in "${MODULES[@]}"; do
  # Provera da li postoji import CUSTOM_ELEMENTS_SCHEMA
  if ! grep -q "CUSTOM_ELEMENTS_SCHEMA" "$module"; then
    sed -i "1s|^|import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';\n|" "$module"
  fi

  # Provera da li postoji IonicModule u imports
  if ! grep -q "IonicModule" "$module"; then
    sed -i "/imports: \[/ s|\[|[IonicModule, |" "$module"
  fi

  # Dodavanje schemas: [CUSTOM_ELEMENTS_SCHEMA] ako ne postoji
  if ! grep -q "schemas:" "$module"; then
    sed -i "/@NgModule({/ a \  schemas: [CUSTOM_ELEMENTS_SCHEMA]," "$module"
  fi
done

echo "Ionic module i CUSTOM_ELEMENTS_SCHEMA dodati."
