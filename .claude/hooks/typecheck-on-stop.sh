#!/bin/bash
# Stop hook: kad Claude završi potez, provjeri tipove — ali samo ako su se
# .ts/.tsx datoteke promijenile. /hr ima isti tip kopije kao engleski tekst,
# pa ključ koji fali ruši build; ovo ga uhvati odmah, a ne tek kod pusha.
# Exit 2 vraća greške Claudeu da ih popravi. Drugi put zaredom (stop_hook_active)
# pušta, da se ne zavrti u krug.
input=$(cat)
if printf '%s' "$input" | grep -Eq '"stop_hook_active"[[:space:]]*:[[:space:]]*true'; then exit 0; fi
cd "${CLAUDE_PROJECT_DIR:-$(dirname "$0")/../..}" || exit 0
changed=$(git status --porcelain -- '*.ts' '*.tsx' 2>/dev/null)
[ -z "$changed" ] && exit 0
out=$(npx --no-install tsc --noEmit 2>&1)
if [ $? -ne 0 ]; then
  echo "TypeScript javlja greške (npx tsc --noEmit):" >&2
  printf '%s\n' "$out" | head -30 >&2
  exit 2
fi
exit 0
