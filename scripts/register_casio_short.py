with open('src/remotion/Root.tsx', 'r', encoding='utf-8') as f:
    code = f.read()

import_stmt = 'import { CasioShortVideo, CASIO_SHORT_DURATION_FRAMES } from "./CasioShortVideo";\n'
if 'CasioShortVideo' not in code:
    code = code.replace(
        'import { CasioThumbnail } from "./CasioThumbnail";',
        'import { CasioThumbnail } from "./CasioThumbnail";\n' + import_stmt
    )

comp_stmt = """
      {/* 5b. Casio F-91W YouTube Short / Reel (9:16 Vertical, 57s) */}
      <Composition
        id="CasioShort"
        component={CasioShortVideo}
        durationInFrames={CASIO_SHORT_DURATION_FRAMES}
        fps={30}
        width={1080}
        height={1920}
      />
"""

if 'id="CasioShort"' not in code:
    code = code.replace(
        '{/* 6. Bialetti Moka Express YouTube Thumbnail Compositions */}',
        comp_stmt + '\n      {/* 6. Bialetti Moka Express YouTube Thumbnail Compositions */}'
    )

with open('src/remotion/Root.tsx', 'w', encoding='utf-8') as f:
    f.write(code)

print("Registered CasioShort in Root.tsx")
