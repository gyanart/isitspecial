with open('src/remotion/Root.tsx', 'r', encoding='utf-8') as f:
    code = f.read()

import_stmt = 'import { MokaShortVideo, MOKA_SHORT_DURATION_FRAMES } from "./MokaShortVideo";\n'
if 'MokaShortVideo' not in code:
    code = code.replace(
        'import { MokaThumbnail } from "./MokaThumbnail";',
        'import { MokaThumbnail } from "./MokaThumbnail";\n' + import_stmt
    )

comp_stmt = """
      {/* 7. Bialetti Moka Express YouTube Short / Reel (9:16 Vertical, 58s) */}
      <Composition
        id="MokaShort"
        component={MokaShortVideo}
        durationInFrames={MOKA_SHORT_DURATION_FRAMES}
        fps={30}
        width={1080}
        height={1920}
      />
"""

if 'id="MokaShort"' not in code:
    code = code.replace('    </>', comp_stmt + '    </>')

with open('src/remotion/Root.tsx', 'w', encoding='utf-8') as f:
    f.write(code)

print("Root.tsx updated with MokaShort")
