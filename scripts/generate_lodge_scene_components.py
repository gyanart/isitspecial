import os
import json

os.makedirs("src/remotion/scenes/lodge", exist_ok=True)

SCENES = [
    {
        "filename": "Scene01TeflonParadox.tsx",
        "componentName": "Scene01TeflonParadox",
        "audio": "audio/lodge/lodge_scene01_in.mp3",
        "currentImage": "images/lodge-scene-01-teflon-contrast.jpg",
        "prevImage": None,
        "isLast": False,
        "cards": [
            {
                "condition": "frame < 320",
                "startFrame": 15,
                "exitLeadFrames": "durationInFrames - 315",
                "tagText": "The Status Quo",
                "tagBg": "rgba(120, 53, 15, 0.9)",
                "tagColor": "#fbbf24",
                "tagBorder": "#f59e0b",
                "borderColor": "rgba(245, 158, 11, 0.85)",
                "glowColor": "rgba(245, 158, 11, 0.2)",
                "title": "$300 Luxury Chemical Non-Stick Pans",
                "description": "PTFE / Ceramic coatings • Delicate polymer layer • 2-to-3 year landfill lifespan"
            },
            {
                "condition": "frame >= 315",
                "startFrame": 322,
                "exitLeadFrames": 25,
                "tagText": "The Appalachian Icon",
                "tagBg": "rgba(6, 78, 59, 0.9)",
                "tagColor": "#34d399",
                "tagBorder": "#10b981",
                "borderColor": "#10b981",
                "glowColor": "rgba(16, 185, 129, 0.2)",
                "title": "$25 Lodge Cast Iron Skillet (10.25-Inch)",
                "description": "5.4 lbs dense molten iron • Zero chemical coatings • Multi-generational heirloom"
            }
        ],
        "captions": [
            {"startFrame": 0, "endFrame": 315, "text": "Walk into any luxury culinary boutique in New York, Paris, or Tokyo, and you are surrounded by walls of pastel-colored non-stick pans costing up to three hundred dollars."},
            {"startFrame": 315, "endFrame": 666, "text": "Yet inside professional restaurant kitchens, chefs rely on a heavy, raw black disk from Tennessee that costs twenty-five dollars: The Lodge Cast Iron Skillet."}
        ]
    },
    {
        "filename": "Scene02TennesseeOrigin.tsx",
        "componentName": "Scene02TennesseeOrigin",
        "audio": "audio/lodge/lodge_scene02_in.mp3",
        "currentImage": "images/lodge-scene-02-tennessee-origin.jpg",
        "prevImage": "images/lodge-scene-01-teflon-contrast.jpg",
        "isLast": False,
        "cards": [
            {
                "condition": None,
                "startFrame": 15,
                "exitLeadFrames": 25,
                "tagText": "1896 Heritage",
                "tagBg": "rgba(6, 78, 59, 0.9)",
                "tagColor": "#34d399",
                "tagBorder": "#10b981",
                "borderColor": "#10b981",
                "glowColor": "rgba(16, 185, 129, 0.2)",
                "title": "Blacklock Foundry • South Pittsburg, TN",
                "description": "Founded by Joseph Lodge in 1896 • Survived Great Depression & two World Wars"
            }
        ],
        "captions": [
            {"startFrame": 0, "endFrame": 300, "text": "In 1896, Joseph Lodge established the Blacklock Foundry in the quiet Appalachian town of South Pittsburg, Tennessee."},
            {"startFrame": 300, "endFrame": 618, "text": "After a devastating fire in 1910, the company reorganized as Lodge Manufacturing, surviving two World Wars and the Great Depression by refusing to cut metallurgical corners."}
        ]
    },
    {
        "filename": "Scene03MoltenIronPour.tsx",
        "componentName": "Scene03MoltenIronPour",
        "audio": "audio/lodge/lodge_scene03_in.mp3",
        "currentImage": "images/lodge-scene-03-molten-iron-pour.jpg",
        "prevImage": "images/lodge-scene-02-tennessee-origin.jpg",
        "isLast": False,
        "cards": [
            {
                "condition": None,
                "startFrame": 15,
                "exitLeadFrames": 25,
                "tagText": "Sand-Casting Metallurgy",
                "tagBg": "rgba(120, 53, 15, 0.9)",
                "tagColor": "#fbbf24",
                "tagBorder": "#f59e0b",
                "borderColor": "rgba(245, 158, 11, 0.85)",
                "glowColor": "rgba(245, 158, 11, 0.2)",
                "title": "2,800°F Cupola Furnace Pour",
                "description": "Molten pig iron & recycled steel • Single-use green sand molds • Signature pebble-grain finish"
            }
        ],
        "captions": [
            {"startFrame": 0, "endFrame": 280, "text": "Unlike modern stamped aluminum pans pressed in seconds, every Lodge skillet is born from a cupola furnace roaring at 2,800 degrees Fahrenheit."},
            {"startFrame": 280, "endFrame": 604, "text": "Molten pig iron and recycled steel are poured into single-use green sand molds, creating the skillet's signature textured, pebble-grain surface."}
        ]
    },
    {
        "filename": "Scene04ThermalDropFlaw.tsx",
        "componentName": "Scene04ThermalDropFlaw",
        "audio": "audio/lodge/lodge_scene04_in.mp3",
        "currentImage": "images/lodge-scene-04-thermal-drop-flaw.jpg",
        "prevImage": "images/lodge-scene-03-molten-iron-pour.jpg",
        "isLast": False,
        "cards": [
            {
                "condition": None,
                "startFrame": 15,
                "exitLeadFrames": 25,
                "tagText": "The Physics Defect",
                "tagBg": "rgba(127, 29, 29, 0.9)",
                "tagColor": "#f87171",
                "tagBorder": "#ef4444",
                "borderColor": "#ef4444",
                "glowColor": "rgba(239, 68, 68, 0.25)",
                "title": "Thin Aluminum Thermal Drop (-150°F)",
                "description": "Low thermal mass causes instantaneous heat collapse • Meat boils in moisture rather than searing"
            }
        ],
        "captions": [
            {"startFrame": 0, "endFrame": 270, "text": "Why do lightweight non-stick pans produce gray, soggy meat? Thermal mass."},
            {"startFrame": 270, "endFrame": 603, "text": "When a cold piece of protein hits a thin aluminum pan, the surface temperature plunges by over one hundred and fifty degrees instantly. Instead of searing, the steak boils in its own escaping moisture."}
        ]
    },
    {
        "filename": "Scene05ThermalInertiaMass.tsx",
        "componentName": "Scene05ThermalInertiaMass",
        "audio": "audio/lodge/lodge_scene05_in.mp3",
        "currentImage": "images/lodge-scene-05-thermal-inertia-mass.jpg",
        "prevImage": "images/lodge-scene-04-thermal-drop-flaw.jpg",
        "isLast": False,
        "cards": [
            {
                "condition": None,
                "startFrame": 15,
                "exitLeadFrames": 25,
                "tagText": "Thermal Dynamics",
                "tagBg": "rgba(6, 78, 59, 0.9)",
                "tagColor": "#34d399",
                "tagBorder": "#10b981",
                "borderColor": "#10b981",
                "glowColor": "rgba(16, 185, 129, 0.2)",
                "title": "5.4 Pounds of Volumetric Heat Capacity",
                "description": "3.7 MJ/m³·K volumetric thermal inertia • Absorbs immense energy • Surface temp does not flinch"
            }
        ],
        "captions": [
            {"startFrame": 0, "endFrame": 280, "text": "A ten-and-a-quarter-inch Lodge skillet packs 5.4 pounds of dense iron with a massive volumetric heat capacity of 3.7 megajoules per cubic meter Kelvin."},
            {"startFrame": 280, "endFrame": 570, "text": "When your steak hits the iron, the surface temperature barely flinches, locking in juices with pure thermodynamic inertia."}
        ]
    },
    {
        "filename": "Scene06MaillardCrustSear.tsx",
        "componentName": "Scene06MaillardCrustSear",
        "audio": "audio/lodge/lodge_scene06_in.mp3",
        "currentImage": "images/lodge-scene-06-maillard-crust-sear.jpg",
        "prevImage": "images/lodge-scene-05-thermal-inertia-mass.jpg",
        "isLast": False,
        "cards": [
            {
                "condition": None,
                "startFrame": 15,
                "exitLeadFrames": 25,
                "tagText": "Culinary Chemistry",
                "tagBg": "rgba(120, 53, 15, 0.9)",
                "tagColor": "#fbbf24",
                "tagBorder": "#f59e0b",
                "borderColor": "rgba(245, 158, 11, 0.85)",
                "glowColor": "rgba(245, 158, 11, 0.2)",
                "title": "The Maillard Caramelization Reaction",
                "description": "Triggered @ 300°F+ • Amino acids & reducing sugars bind • Rich crunchy mahogany restaurant crust"
            }
        ],
        "captions": [
            {"startFrame": 0, "endFrame": 260, "text": "At three hundred degrees Fahrenheit, amino acids and reducing sugars undergo the Maillard reaction,"},
            {"startFrame": 260, "endFrame": 532, "text": "generating hundreds of complex flavor compounds and a deep, crunchy restaurant-grade mahogany crust that chemical non-stick pans simply cannot replicate without burning their coating."}
        ]
    },
    {
        "filename": "Scene07PolymerizationPatina.tsx",
        "componentName": "Scene07PolymerizationPatina",
        "audio": "audio/lodge/lodge_scene07_in.mp3",
        "currentImage": "images/lodge-scene-07-polymerization-patina.jpg",
        "prevImage": "images/lodge-scene-06-maillard-crust-sear.jpg",
        "isLast": False,
        "cards": [
            {
                "condition": None,
                "startFrame": 15,
                "exitLeadFrames": 25,
                "tagText": "Organic Chemistry",
                "tagBg": "rgba(6, 78, 59, 0.9)",
                "tagColor": "#34d399",
                "tagBorder": "#10b981",
                "borderColor": "#10b981",
                "glowColor": "rgba(16, 185, 129, 0.2)",
                "title": "Triglyceride Thermal Polymerization",
                "description": "Fatty acids cross-link past smoke point • Bonds directly to iron pores • Slick, glassy carbon shield"
            }
        ],
        "captions": [
            {"startFrame": 0, "endFrame": 280, "text": "Cast iron is not naturally non-stick. Its magic comes from organic chemistry."},
            {"startFrame": 280, "endFrame": 650, "text": "When thin layers of unsaturated vegetable oils are heated past their smoke point, triglycerides undergo thermal polymerization and cross-linking, bonding directly to the iron pores as an indestructible, glassy carbon barrier."}
        ]
    },
    {
        "filename": "Scene08AntiFragileRestoration.tsx",
        "componentName": "Scene08AntiFragileRestoration",
        "audio": "audio/lodge/lodge_scene08_in.mp3",
        "currentImage": "images/lodge-scene-08-anti-fragile-restoration.jpg",
        "prevImage": "images/lodge-scene-07-polymerization-patina.jpg",
        "isLast": False,
        "cards": [
            {
                "condition": None,
                "startFrame": 15,
                "exitLeadFrames": 25,
                "tagText": "Anti-Fragility",
                "tagBg": "rgba(6, 78, 59, 0.9)",
                "tagColor": "#34d399",
                "tagBorder": "#10b981",
                "borderColor": "#10b981",
                "glowColor": "rgba(16, 185, 129, 0.2)",
                "title": "The Infinite Restoration Miracle",
                "description": "Scratched Teflon is dead forever • Rusty 100-year cast iron restores with steel wool, salt & oil in 60 minutes"
            }
        ],
        "captions": [
            {"startFrame": 0, "endFrame": 290, "text": "When a chemical non-stick pan scratches or chips, toxic micro-plastics flake into your food and the pan must be thrown away. But cast iron is indestructible."},
            {"startFrame": 290, "endFrame": 608, "text": "If left in rain and covered in rust, an hour with steel wool, coarse salt, and a fresh coat of oil restores it to factory perfection."}
        ]
    },
    {
        "filename": "Scene09HeftHandleHeat.tsx",
        "componentName": "Scene09HeftHandleHeat",
        "audio": "audio/lodge/lodge_scene09_in.mp3",
        "currentImage": "images/lodge-scene-09-heft-handle-heat.jpg",
        "prevImage": "images/lodge-scene-08-anti-fragile-restoration.jpg",
        "isLast": False,
        "cards": [
            {
                "condition": None,
                "startFrame": 15,
                "exitLeadFrames": 25,
                "tagText": "The Honest Friction",
                "tagBg": "rgba(120, 53, 15, 0.9)",
                "tagColor": "#fbbf24",
                "tagBorder": "#f59e0b",
                "borderColor": "rgba(245, 158, 11, 0.85)",
                "glowColor": "rgba(245, 158, 11, 0.2)",
                "title": "5.4 lbs Weight & 400°F Handle Heat",
                "description": "Requires serious forearm strength • Handle conducts full burner heat • Sensitive to long acidic wine/tomato simmers"
            }
        ],
        "captions": [
            {"startFrame": 0, "endFrame": 280, "text": "Cast iron demands respect. At five and a half pounds, single-handed wrist tossing is impossible."},
            {"startFrame": 280, "endFrame": 617, "text": "Furthermore, iron conducts heat into the entire handle, requiring a silicone sleeve or folded towel. And long, acidic tomato reductions will strip the natural seasoning."}
        ]
    },
    {
        "filename": "Scene10MaintenanceRitual.tsx",
        "componentName": "Scene10MaintenanceRitual",
        "audio": "audio/lodge/lodge_scene10_in.mp3",
        "currentImage": "images/lodge-scene-10-maintenance-ritual.jpg",
        "prevImage": "images/lodge-scene-09-heft-handle-heat.jpg",
        "isLast": False,
        "cards": [
            {
                "condition": None,
                "startFrame": 15,
                "exitLeadFrames": 25,
                "tagText": "Daily Habit",
                "tagBg": "rgba(6, 78, 59, 0.9)",
                "tagColor": "#34d399",
                "tagBorder": "#10b981",
                "borderColor": "#10b981",
                "glowColor": "rgba(16, 185, 129, 0.2)",
                "title": "The Two-Minute Maintenance Ritual",
                "description": "1. Hot water rinse & brush • 2. Medium stove flame until dry • 3. Wipe single drop of neutral oil"
            }
        ],
        "captions": [
            {"startFrame": 0, "endFrame": 260, "text": "Ignore the myths: you can clean cast iron in sixty seconds."},
            {"startFrame": 260, "endFrame": 598, "text": "Rinse with hot water, gently brush away residue, place it on the stove burner on medium heat for two minutes until bone dry, and wipe a microscopic drop of neutral oil across the surface. That is the entire secret."}
        ]
    },
    {
        "filename": "Scene11CostPerUse.tsx",
        "componentName": "Scene11CostPerUse",
        "audio": "audio/lodge/lodge_scene11_in.mp3",
        "currentImage": "images/lodge-scene-11-cost-per-use.jpg",
        "prevImage": "images/lodge-scene-10-maintenance-ritual.jpg",
        "isLast": False,
        "cards": [
            {
                "condition": None,
                "startFrame": 15,
                "exitLeadFrames": 25,
                "tagText": "The Math of Ownership",
                "tagBg": "rgba(6, 78, 59, 0.9)",
                "tagColor": "#34d399",
                "tagBorder": "#10b981",
                "borderColor": "#10b981",
                "glowColor": "rgba(16, 185, 129, 0.2)",
                "title": "The True Cost-Per-Use Equation",
                "description": "Lodge: $0.002 / meal over 50 years • Non-stick pans: $350+ replacement graveyard every 3 years"
            }
        ],
        "captions": [
            {"startFrame": 0, "endFrame": 280, "text": "A thirty-five dollar non-stick pan lasts three years before peeling, costing four hundred dollars across thirty years of replacement trash."},
            {"startFrame": 280, "endFrame": 599, "text": "A twenty-five dollar Lodge skillet lasts for four generations. Over fifty years of daily cooking, your hardware cost is less than one-fifth of a cent per meal."}
        ]
    },
    {
        "filename": "Scene12VerdictTrueGem.tsx",
        "componentName": "Scene12VerdictTrueGem",
        "audio": "audio/lodge/lodge_scene12_in.mp3",
        "currentImage": "images/lodge-scene-12-verdict-true-gem.jpg",
        "prevImage": "images/lodge-scene-11-cost-per-use.jpg",
        "isLast": True,
        "cards": [
            {
                "condition": None,
                "startFrame": 15,
                "exitLeadFrames": 25,
                "tagText": "Special Index Verdict",
                "tagBg": "rgba(6, 78, 59, 0.9)",
                "tagColor": "#34d399",
                "tagBorder": "#10b981",
                "borderColor": "#10b981",
                "glowColor": "rgba(16, 185, 129, 0.25)",
                "title": "Special Score: 9.2 / 10 • True Gem",
                "description": "Thermal Mass: 10/10 • Longevity: 10/10 • Repairability: 10/10 • Ergonomics: 7.5/10"
            }
        ],
        "captions": [
            {"startFrame": 0, "endFrame": 330, "text": "In a world poisoned by planned obsolescence and disposable cookware, the Lodge Cast Iron Skillet is a triumph of honest American metallurgy."},
            {"startFrame": 330, "endFrame": 681, "text": "It is cheaper than dinner for two, cooks better with every passing decade, and will outlive your grandchildren. On the Special Index, it earns an exceptional 9.2 out of 10: A True Gem."}
        ]
    }
]

for sc in SCENES:
    captions_json = json.dumps(sc["captions"])
    code = f'''import React from "react";
import {{
  AbsoluteFill,
  Audio,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Easing,
}} from "remotion";
import {{ HeaderBadge }} from "../../components/HeaderBadge";
import {{ AnimatedCard }} from "../../components/AnimatedCard";
import {{ CaptionBar, CaptionSegment }} from "../../components/CaptionBar";
import {{ SceneBackground }} from "../../components/SceneBackground";

const CAPTIONS: CaptionSegment[] = {captions_json};

export const {sc["componentName"]}: React.FC = () => {{
  const frame = useCurrentFrame();
  const {{ durationInFrames }} = useVideoConfig();

  const zoom = interpolate(frame, [0, durationInFrames], [1.12, 1.22], {{
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.0, 0.2, 1),
  }});

  const panY = interpolate(frame, [0, durationInFrames], [10, -10], {{
    extrapolateRight: "clamp",
  }});

  return (
    <AbsoluteFill style={{{{ backgroundColor: "#020617", overflow: "hidden", fontFamily: "Segoe UI, Inter, sans-serif" }}}}>
      <Audio src={{staticFile("{sc["audio"]}")}} />

      <SceneBackground
        currentImage="{sc["currentImage"]}"
        {f'prevImage="{sc["prevImage"]}"' if sc["prevImage"] else ''}
        transform={{`translate(0px, ${{panY}}px) scale(${{zoom}})`}}
        {f'isLastScene={{true}}' if sc["isLast"] else ''}
      />

      <HeaderBadge />

'''
    for card in sc["cards"]:
        if card["condition"]:
            code += f'''      {{{card["condition"]} && (
        <AnimatedCard
          startFrame={{{card["startFrame"]}}}
          exitLeadFrames={{{card["exitLeadFrames"]}}}
          tagText="{card["tagText"]}"
          tagBg="{card["tagBg"]}"
          tagColor="{card["tagColor"]}"
          tagBorder="{card["tagBorder"]}"
          borderColor="{card["borderColor"]}"
          glowColor="{card["glowColor"]}"
          title="{card["title"]}"
          description="{card["description"]}"
          bottom={{110}}
        />
      )}}

'''
        else:
            code += f'''      <AnimatedCard
        startFrame={{{card["startFrame"]}}}
        exitLeadFrames={{{card["exitLeadFrames"]}}}
        tagText="{card["tagText"]}"
        tagBg="{card["tagBg"]}"
        tagColor="{card["tagColor"]}"
        tagBorder="{card["tagBorder"]}"
        borderColor="{card["borderColor"]}"
        glowColor="{card["glowColor"]}"
        title="{card["title"]}"
        description="{card["description"]}"
        bottom={{110}}
      />

'''

    code += '''      <CaptionBar captions={CAPTIONS} bottom={38} />
    </AbsoluteFill>
  );
};
'''
    with open(os.path.join("src/remotion/scenes/lodge", sc["filename"]), "w", encoding="utf-8") as f:
        f.write(code)

print("Regenerated all 12 Lodge scene components cleanly with json.dumps!")
