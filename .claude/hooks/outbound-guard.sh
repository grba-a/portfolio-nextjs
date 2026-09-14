#!/bin/bash
# PreToolUse(Bash): push na main je deploy na petargrbic.com, pa svaki push ili deploy
# traži Petrovu riječ. Hvata i oblike koje permission pravila propuste: git -C . push,
# git -c x=y push, ... && git push, npx vercel --prod.
cmd=$(jq -r '.tool_input.command // empty')
ask() { jq -n --arg r "$1" '{hookSpecificOutput:{hookEventName:"PreToolUse",permissionDecision:"ask",permissionDecisionReason:$r}}'; exit 0; }
S='(^|[[:space:];&|(])'
if grep -Eq "${S}git[[:space:]]([^;&|]*[[:space:]])?push([[:space:]]|$)" <<<"$cmd" && ! grep -Eq 'stash[[:space:]]+push' <<<"$cmd"; then
  ask "Push objavljuje petargrbic.com. Samo uz Petrovu riječ u ovoj sesiji."
fi
if grep -Eq "${S}vercel(@[^[:space:]]*)?([[:space:]]*$|[[:space:]].*(--prod|deploy|promote|rollback|alias|redeploy))|${S}gh[[:space:]]+pr[[:space:]]+merge" <<<"$cmd"; then
  ask "Vanjska radnja na Vercelu ili GitHubu. Odlučuje Petar."
fi
exit 0
