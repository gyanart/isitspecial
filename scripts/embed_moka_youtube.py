import os

en_path = 'src/content/blog/bialetti-moka-express.mdx'
hi_path = 'src/content/blog/hi/bialetti-moka-express.mdx'

# 1. Update English article
with open(en_path, 'r', encoding='utf-8') as f:
    en_text = f.read()

if 'youtubeId:' not in en_text:
    en_text = en_text.replace(
        'translationSlug: "bialetti-moka-express"',
        'translationSlug: "bialetti-moka-express"\nyoutubeId: "9Jj35L0J3pA"'
    )

if 'import YouTubeEmbed' not in en_text:
    en_text = en_text.replace(
        "import CostPerUseCalculator from '../../components/CostPerUseCalculator.astro';",
        "import CostPerUseCalculator from '../../components/CostPerUseCalculator.astro';\nimport YouTubeEmbed from '../../components/YouTubeEmbed.astro';"
    )

embed_en = """<YouTubeEmbed 
  id="9Jj35L0J3pA" 
  title="$35 Aluminum Pot vs. $3,000 Espresso Machine: The 1933 Italian Steam Paradox • The Video Essay"
  caption="Watch our 3.5-minute engineering breakdown of the 1.5-bar thermodynamic boiler above, or continue reading the complete teardown below."
/>"""

if '<YouTubeEmbed' not in en_text:
    en_text = en_text.replace(
        '<AudioVerdictPlayer audioSrc="/audio/bialetti-moka-express-verdict-en.mp3" duration="0:45" lang="en" />',
        '<AudioVerdictPlayer audioSrc="/audio/bialetti-moka-express-verdict-en.mp3" duration="0:45" lang="en" />\n\n' + embed_en
    )

with open(en_path, 'w', encoding='utf-8', newline='\n') as f:
    f.write(en_text)

print("Updated English Moka article.")

# 2. Update Hindi article
with open(hi_path, 'r', encoding='utf-8') as f:
    hi_text = f.read()

if 'youtubeId:' not in hi_text:
    hi_text = hi_text.replace(
        'translationSlug: "bialetti-moka-express"',
        'translationSlug: "bialetti-moka-express"\nyoutubeId: "9Jj35L0J3pA"'
    )

if 'import YouTubeEmbed' not in hi_text:
    hi_text = hi_text.replace(
        "import CostPerUseCalculator from '../../../components/CostPerUseCalculator.astro';",
        "import CostPerUseCalculator from '../../../components/CostPerUseCalculator.astro';\nimport YouTubeEmbed from '../../../components/YouTubeEmbed.astro';"
    )

embed_hi = """<YouTubeEmbed 
  id="9Jj35L0J3pA" 
  title="$35 Aluminum Pot vs. $3,000 Espresso Machine: The 1933 Italian Steam Paradox • The Video Essay"
  caption="ऊपर दिया गया 3.5 मिनट का वीडियो विश्लेषण देखें, या नीचे विस्तृत थर्मोडायनामिक्स विश्लेषण पढ़ें।"
/>"""

if '<YouTubeEmbed' not in hi_text:
    hi_text = hi_text.replace(
        '<AudioVerdictPlayer audioSrc="/audio/bialetti-moka-express-verdict-hi.mp3" duration="0:45" lang="hi" />',
        '<AudioVerdictPlayer audioSrc="/audio/bialetti-moka-express-verdict-hi.mp3" duration="0:45" lang="hi" />\n\n' + embed_hi
    )

with open(hi_path, 'w', encoding='utf-8', newline='\n') as f:
    f.write(hi_text)

print("Updated Hindi Moka article.")
