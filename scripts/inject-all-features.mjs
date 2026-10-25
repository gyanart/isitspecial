import fs from 'fs';
import path from 'path';

const CPU_DATA = {
  "aeropress-coffee-maker": {
    en: {
      productName: "AeroPress Original Coffee Maker",
      productPrice: 40,
      heirloomLifespanYears: 15,
      competitorName: "Pod Machine / Takeout Coffee",
      competitorPrice: 180,
      competitorLifespanYears: 3,
      unitLabel: "cup",
      unitLabelPlural: "cups",
      defaultFrequencyPerWeek: 7,
      defaultYears: 5,
      currencySymbol: "$"
    },
    hi: {
      productName: "AeroPress ओरिजिनल कॉफी मेकर",
      productPrice: 3800,
      heirloomLifespanYears: 15,
      competitorName: "पॉड मशीन / कैफे कॉफी",
      competitorPrice: 16000,
      competitorLifespanYears: 3,
      unitLabel: "कप",
      unitLabelPlural: "कप",
      defaultFrequencyPerWeek: 7,
      defaultYears: 5,
      currencySymbol: "₹"
    }
  },
  "bic-cristal-ballpoint-pen": {
    en: {
      productName: "Bic Cristal Ballpoint Pen",
      productPrice: 0.30,
      heirloomLifespanYears: 2,
      competitorName: "Disposable Gel Pen",
      competitorPrice: 2.50,
      competitorLifespanYears: 0.5,
      unitLabel: "page",
      unitLabelPlural: "pages",
      defaultFrequencyPerWeek: 10,
      defaultYears: 2,
      currencySymbol: "$"
    },
    hi: {
      productName: "Bic Cristal बॉलपॉइंट पेन",
      productPrice: 15,
      heirloomLifespanYears: 2,
      competitorName: "सस्ता जेल पेन",
      competitorPrice: 60,
      competitorLifespanYears: 0.5,
      unitLabel: "पेज",
      unitLabelPlural: "पेज",
      defaultFrequencyPerWeek: 10,
      defaultYears: 2,
      currencySymbol: "₹"
    }
  },
  "casio-f91w-watch-masterpiece": {
    en: {
      productName: "Casio F-91W Digital Watch",
      productPrice: 19,
      heirloomLifespanYears: 10,
      competitorName: "Budget Smartwatch",
      competitorPrice: 60,
      competitorLifespanYears: 2,
      unitLabel: "day",
      unitLabelPlural: "days",
      defaultFrequencyPerWeek: 7,
      defaultYears: 7,
      currencySymbol: "$"
    },
    hi: {
      productName: "Casio F-91W डिजिटल घड़ी",
      productPrice: 1200,
      heirloomLifespanYears: 10,
      competitorName: "सस्ती स्मार्टवॉच",
      competitorPrice: 3500,
      competitorLifespanYears: 2,
      unitLabel: "दिन",
      unitLabelPlural: "दिन",
      defaultFrequencyPerWeek: 7,
      defaultYears: 7,
      currencySymbol: "₹"
    }
  },
  "dyson-supersonic-hair-dryer": {
    en: {
      productName: "Dyson Supersonic Hair Dryer",
      productPrice: 430,
      heirloomLifespanYears: 7,
      competitorName: "Standard Salon AC Dryer",
      competitorPrice: 60,
      competitorLifespanYears: 4,
      unitLabel: "dry",
      unitLabelPlural: "dries",
      defaultFrequencyPerWeek: 4,
      defaultYears: 5,
      currencySymbol: "$"
    },
    hi: {
      productName: "Dyson Supersonic हेयर ड्रायर",
      productPrice: 38000,
      heirloomLifespanYears: 7,
      competitorName: "मानक सैलून ड्रायर",
      competitorPrice: 4500,
      competitorLifespanYears: 4,
      unitLabel: "ब्लो ड्राई",
      unitLabelPlural: "ब्लो ड्राई",
      defaultFrequencyPerWeek: 4,
      defaultYears: 5,
      currencySymbol: "₹"
    }
  },
  "japanese-selvedge-denim": {
    en: {
      productName: "Japanese Raw Selvedge Denim",
      productPrice: 240,
      heirloomLifespanYears: 10,
      competitorName: "Fast-Fashion Stretch Jeans",
      competitorPrice: 45,
      competitorLifespanYears: 1.5,
      unitLabel: "wear",
      unitLabelPlural: "wears",
      defaultFrequencyPerWeek: 3,
      defaultYears: 6,
      currencySymbol: "$"
    },
    hi: {
      productName: "जापानी रॉ सेल्वेज डेनिम",
      productPrice: 20000,
      heirloomLifespanYears: 10,
      competitorName: "फास्ट फैशन स्ट्रेच जींस",
      competitorPrice: 2500,
      competitorLifespanYears: 1.5,
      unitLabel: "पहनना",
      unitLabelPlural: "पहनना",
      defaultFrequencyPerWeek: 3,
      defaultYears: 6,
      currencySymbol: "₹"
    }
  },
  "lodge-cast-iron-skillet": {
    en: {
      productName: "Lodge 10.25-Inch Cast Iron Skillet",
      productPrice: 22,
      heirloomLifespanYears: 40,
      competitorName: "Coated Non-Stick Frying Pan",
      competitorPrice: 35,
      competitorLifespanYears: 2,
      unitLabel: "meal",
      unitLabelPlural: "meals",
      defaultFrequencyPerWeek: 5,
      defaultYears: 10,
      currencySymbol: "$"
    },
    hi: {
      productName: "Lodge 10.25-इंच कास्ट आयरन पैन",
      productPrice: 2200,
      heirloomLifespanYears: 40,
      competitorName: "टेफ्लॉन नॉन-स्टिक फ्राइंग पैन",
      competitorPrice: 1800,
      competitorLifespanYears: 2,
      unitLabel: "भोजन",
      unitLabelPlural: "भोजन",
      defaultFrequencyPerWeek: 5,
      defaultYears: 10,
      currencySymbol: "₹"
    }
  },
  "moccamaster-coffee-maker": {
    en: {
      productName: "Technivorm Moccamaster KBGV Select",
      productPrice: 360,
      heirloomLifespanYears: 25,
      competitorName: "Budget Plastic Drip Maker",
      competitorPrice: 50,
      competitorLifespanYears: 3,
      unitLabel: "pot",
      unitLabelPlural: "pots",
      defaultFrequencyPerWeek: 7,
      defaultYears: 15,
      currencySymbol: "$"
    },
    hi: {
      productName: "Technivorm Moccamaster KBGV",
      productPrice: 34000,
      heirloomLifespanYears: 25,
      competitorName: "सस्ता प्लास्टिक ड्रिप कॉफी मेकर",
      competitorPrice: 4000,
      competitorLifespanYears: 3,
      unitLabel: "पॉट",
      unitLabelPlural: "पॉट",
      defaultFrequencyPerWeek: 7,
      defaultYears: 15,
      currencySymbol: "₹"
    }
  },
  "stanley-tumbler-hype": {
    en: {
      productName: "Stanley Quencher 40oz Tumbler",
      productPrice: 45,
      heirloomLifespanYears: 5,
      competitorName: "Leakproof Insulated Flask",
      competitorPrice: 35,
      competitorLifespanYears: 10,
      unitLabel: "day",
      unitLabelPlural: "days",
      defaultFrequencyPerWeek: 7,
      defaultYears: 3,
      currencySymbol: "$"
    },
    hi: {
      productName: "Stanley Quencher 40oz टम्बलर",
      productPrice: 4500,
      heirloomLifespanYears: 5,
      competitorName: "मानक लीकप्रूफ इंसुलेटेड बॉटल",
      competitorPrice: 2800,
      competitorLifespanYears: 10,
      unitLabel: "दिन",
      unitLabelPlural: "दिन",
      defaultFrequencyPerWeek: 7,
      defaultYears: 3,
      currencySymbol: "₹"
    }
  }
};

const allSlugs = [
  "aeropress-coffee-maker",
  "bialetti-moka-express",
  "bic-cristal-ballpoint-pen",
  "casio-f91w-watch-masterpiece",
  "dyson-supersonic-hair-dryer",
  "japanese-selvedge-denim",
  "kitchenaid-stand-mixer",
  "le-creuset-dutch-oven",
  "lodge-cast-iron-skillet",
  "moccamaster-coffee-maker",
  "stanley-tumbler-hype"
];

function processArticle(filePath, slug, isHi) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  const importPrefix = isHi ? '../../../components/' : '../../components/';

  // 1. Ensure AudioVerdictPlayer import
  if (!content.includes('AudioVerdictPlayer')) {
    const importStatement = `import AudioVerdictPlayer from '${importPrefix}AudioVerdictPlayer.astro';\n`;
    content = content.replace(/(import SpecialIndexCard[^\n]+\n)/, `$1${importStatement}`);
    changed = true;
  }

  // 2. Ensure AudioVerdictPlayer component is placed right before ## 1.
  if (!content.includes('<AudioVerdictPlayer')) {
    const lang = isHi ? 'hi' : 'en';
    const audioSrc = `/audio/${slug}-verdict-${lang}.mp3`;
    const audioComponent = `<AudioVerdictPlayer audioSrc="${audioSrc}" duration="0:45" lang="${lang}" />\n\n`;

    // Match ## 1. or --- before ## 1.
    if (content.includes('\n---\n\n## 1.')) {
      content = content.replace('\n---\n\n## 1.', `\n\n${audioComponent}---\n\n## 1.`);
      changed = true;
    } else if (content.includes('\n## 1.')) {
      content = content.replace('\n## 1.', `\n\n${audioComponent}## 1.`);
      changed = true;
    }
  }

  // 3. Ensure CostPerUseCalculator if needed
  if (!content.includes('CostPerUseCalculator') && CPU_DATA[slug]) {
    const importStatement = `import CostPerUseCalculator from '${importPrefix}CostPerUseCalculator.astro';\n`;
    content = content.replace(/(import SpecialIndexCard[^\n]+\n)/, `$1${importStatement}`);

    const data = isHi ? CPU_DATA[slug].hi : CPU_DATA[slug].en;
    const lang = isHi ? 'hi' : 'en';

    const cpuHeader = isHi 
      ? `## लागत-प्रति-उपयोग (CPU) का वास्तविक गणित\n\nक्या महंगे टिकाऊ उत्पाद सस्ते विकल्पों की तुलना में दीर्घकाल में किफायती साबित होते हैं? आइए गणितीय दृष्टि से इसका वास्तविक मूल्यांकन करें:\n\n`
      : `## The True Cost-Per-Use (CPU) Equation\n\nCan an upfront purchase make rational economic sense over cheaper disposable alternatives? Here is the actual mathematical equation of long-term ownership:\n\n`;

    const cpuComponent = `\n---\n\n${cpuHeader}<CostPerUseCalculator \n  productName="${data.productName}"\n  productPrice={${data.productPrice}}\n  heirloomLifespanYears={${data.heirloomLifespanYears}}\n  competitorName="${data.competitorName}"\n  competitorPrice={${data.competitorPrice}}\n  competitorLifespanYears={${data.competitorLifespanYears}}\n  unitLabel="${data.unitLabel}"\n  unitLabelPlural="${data.unitLabelPlural}"\n  defaultFrequencyPerWeek={${data.defaultFrequencyPerWeek}}\n  defaultYears={${data.defaultYears}}\n  currencySymbol="${data.currencySymbol}"\n  lang="${lang}"\n/>\n\n`;

    // Target before the breakdown section or SpecialIndexCard
    // Look for target anchor: e.g. '## 3. The Special Index Breakdown' or '## 4. The Final Verdict' or '<SpecialIndexCard'
    const targetPatterns = [
      /\n---\n\n## (?:3|4|5)\. (?:The Special Index|The Final Verdict|The Unvarnished Verdict|द स्पेशल इंडेक्स|अंतिम निष्कर्ष|निष्पक्ष निष्कर्ष)/,
      /\n## (?:3|4|5)\. (?:The Special Index|The Final Verdict|The Unvarnished Verdict|द स्पेशल इंडेक्स|अंतिम निष्कर्ष|निष्पक्ष निष्कर्ष)/,
      /\n<SpecialIndexCard/
    ];

    let replaced = false;
    for (const pat of targetPatterns) {
      if (pat.test(content)) {
        content = content.replace(pat, `${cpuComponent}$&`.trimStart());
        replaced = true;
        break;
      }
    }

    if (!replaced) {
      content = content.replace('<SpecialIndexCard', `${cpuComponent}<SpecialIndexCard`);
    }

    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Updated ${filePath}`);
  } else {
    console.log(`- Unchanged ${filePath}`);
  }
}

for (const slug of allSlugs) {
  const enPath = path.join('src/content/blog', `${slug}.mdx`);
  const hiPath = path.join('src/content/blog/hi', `${slug}.mdx`);

  if (fs.existsSync(enPath)) processArticle(enPath, slug, false);
  if (fs.existsSync(hiPath)) processArticle(hiPath, slug, true);
}
console.log('All articles processed!');
