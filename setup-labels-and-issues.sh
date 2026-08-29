#!/usr/bin/env bash
# Sets up labels and issues for the Sinethemba Hope website repo,
# based on the site audit findings. Run from inside the cloned repo.
set -e

echo "== Checking gh CLI is ready =="
gh --version || { echo "gh CLI not found â€” install it first."; exit 1; }
gh repo view || { echo "Not authenticated or not inside the repo â€” run 'gh auth login' first."; exit 1; }

echo "== Creating labels =="
gh label create critical --color "d73a4a" --description "Blocks launch / real-world harm if left" --force
gh label create content --color "fbca04" --description "Wrong, missing, or unverified copy/images" --force
gh label create bug --color "e99695" --description "Something technically broken" --force
gh label create compliance --color "5319e7" --description "Section 18A, PBO, B-BBEE, tax-related claims" --force
gh label create enhancement --color "0075ca" --description "Nice-to-have, not urgent" --force

echo "== Creating issues =="

gh issue create --title "Contact and Section 18A forms don't submit anywhere" \
  --label critical,bug \
  --body "$(cat <<'EOF'
The contactForm and section18AForm in assets/js/main.js call
e.preventDefault() and show a fake success message, but never send data
anywhere (no fetch/XHR, no backend, no email service).

This means:
- General inquiries are silently lost
- Section 18A tax certificate requests â€” which collect a donor's name,
  SARS tax number, and donation amount â€” are discarded while the user is
  told "our finance office will email your certificate"

Fix: wire both forms to a real submission target (e.g. Formspree, Netlify
Forms, a simple serverless function, or at minimum a mailto: fallback) so
submissions actually reach someone. Do not show a success message unless
the submission actually succeeded.
EOF
)"

gh issue create --title "Hero images mislabeled â€” adults shown as \"Learner\" under Sponsor a Child" \
  --label critical,content \
  --body "$(cat <<'EOF'
assets/images/sponsor-child.jpg and support-family.jpg are both used in the
"Sponsor a Child Today" hero carousel with alt="Learner", but both images
show unrelated adults (appear to be from a food-parcel distribution), not
children or school uniforms.

Fix: replace with genuine child/uniform-drive photos, or move these two
images to a correctly labeled "Food Parcel Relief" section instead.
EOF
)"

gh issue create --title "Verify \"Thabo, Grade 7 Learner\" testimonial is real and consented" \
  --label critical,content \
  --body "$(cat <<'EOF'
The homepage features a named, quoted testimonial from a minor ("Thabo,
Grade 7 Learner"). We have no confirmation this is a real, consenting
beneficiary rather than placeholder/generated copy â€” and we've already
caught fabricated beneficiary content earlier in this project (the
"Cebolihle" story from AI-generated research).

Fix: confirm directly with Sinethemba staff that this quote is real and
that guardian consent was obtained for using a minor's name/quote/grade
publicly. If unconfirmed, remove or anonymize until verified.
EOF
)"

gh issue create --title "Verify Section 18A / PBO / B-BBEE compliance claims" \
  --label critical,compliance \
  --body "$(cat <<'EOF'
Site states as fact: "100% Section 18A Tax-Deductible", "SARS Approved
PBO", "B-BBEE SED Compliant". These are specific legal status requiring
registration numbers/certificates. Donors may rely on these claims when
filing taxes.

Fix: get the actual PBO reference number and Section 18A approval letter
from Sinethemba leadership. Either cite the real registration number on
the site, or soften the claims until confirmed (e.g. "we are pursuing
Section 18A status" if not yet approved).
EOF
)"

gh issue create --title "Verify banking details directly against a bank confirmation letter" \
  --label critical,compliance \
  --body "$(cat <<'EOF'
Account number, branch code (270124), and account type are published for
direct EFT donations. A single wrong digit misdirects real donor money.
SWIFT code (FIRNZAJJ) is confirmed as a genuine FNB code, but the account
number itself needs verification.

Fix: cross-check every field against an official bank confirmation letter
or stamped bank statement before this page is promoted further.
EOF
)"

gh issue create --title "Reconcile impact numbers (1,200+ vs ~600,000)" \
  --label content \
  --body "$(cat <<'EOF'
Homepage states "1,200+ children uniformed & supported". The verified
original site states "~600,000 youth reached since 2007". These can't
both be presented as headline stats without context â€” pick one framing
(e.g. 1,200+ direct uniform recipients vs 600,000+ reached through all
programs combined) and make it consistent across pages.
EOF
)"

gh issue create --title "Fix \"10+ Years\" stat" \
  --label content \
  --body "$(cat <<'EOF'
Founded 2006 â†’ as of 2026 this is ~20 years, not "10+". Likely leftover
copy from an earlier draft. Update to the correct figure.
EOF
)"

gh issue create --title "Move off Tailwind CDN for production" \
  --label enhancement \
  --body "$(cat <<'EOF'
index.html loads https://cdn.tailwindcss.com directly, which Tailwind's
own docs advise against for production (no CSS purging, slower load,
browser console warning). Move to a build step (Tailwind CLI or PostCSS)
before final launch.
EOF
)"

gh issue create --title "Confirm photo consent for identifiable children in uniform-drive photo" \
  --label content,compliance \
  --body "$(cat <<'EOF'
gallery-uniform.jpg shows identifiable schoolchildren. Confirm with
Sinethemba that photo consent/release was obtained for public use,
especially given this is now on an internationally-accessible fundraising
site.
EOF
)"

echo "== Done. Run 'gh issue list' to confirm. =="