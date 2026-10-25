import asyncio
import edge_tts
import os

SCRIPTS = {
    "aeropress-coffee-maker": {
        "en": (
            "Is the forty dollar AeroPress coffee maker actually special, or just plastic hype? "
            "Here is the verdict. The AeroPress is an authentic engineering masterpiece. "
            "Invented by a Stanford physics professor, its airtight pneumatic plunger generates precise pressure "
            "that extracts rich, full-bodied coffee in sixty seconds with near zero bitterness. "
            "Made from indestructible BPA free copolyester, it outlasts complex electric machines and costs pennies per cup. "
            "Final score: 9.6 out of 10. A modern classic."
        ),
        "hi": (
            "क्या केवल अड़तीस सौ रुपये का एयरोप्रेस्स कॉफी मेकर सचमुच खास है? "
            "यहाँ है हमारा निष्पक्ष फैसला। एयरोप्रेस्स एक असाधारण इंजीनियरिंग आविष्कार है। "
            "स्टैनफोर्ड के प्रोफेसर द्वारा डिजाइन किया गया इसका न्यूमैटिक प्लंजर साठ सेकंड में बिना किसी कड़वाहट के बेहतरीन कॉफी तैयार करता है। "
            "यह इतना मजबूत है कि गिरकर भी नहीं टूटता और सालों साल चलता है। "
            "हमारा फाइनल स्कोर: दस में से 9.6। एक असली मास्टरपीस।"
        )
    },
    "bialetti-moka-express": {
        "en": (
            "Is the classic thirty-five dollar Bialetti Moka Express still special in the modern espresso era? "
            "Here is the verdict. The Bialetti Moka Pot is an untouchable industrial design icon. "
            "Patented in nineteen thirty-three, its octagonal cast aluminum body and steam pressure thermodynamics "
            "deliver dense, syrupy stovetop espresso without proprietary plastic capsules or circuit boards. "
            "With just a five dollar rubber gasket replacement every few years, it lasts for decades. "
            "Final score: 9.5 out of 10. An undisputed masterpiece."
        ),
        "hi": (
            "क्या उन्नीस सौ तैंतीस का क्लासिक बियालेत्ती मोका पॉट आज भी खास है? "
            "यह है हमारा सीधा फैसला। बियालेत्ती मोका एक्सप्रेस इंडस्ट्रियल डिजाइन का बेजोड़ नमूना है। "
            "इसका अष्टकोणीय एल्युमिनियम ढांचा बिना किसी बिजली या प्लास्टिक कैप्सूल के गाढ़ी और स्वादिष्ट स्टोवटॉप एस्प्रेसो बनाता है। "
            "केवल एक रबर रिंग बदलकर यह बीस पच्चीस साल आराम से चलता है। "
            "हमारा स्कोर: दस में से 9.5। कालजयी मास्टरपीस।"
        )
    },
    "bic-cristal-ballpoint-pen": {
        "en": (
            "Is the humble thirty-cent Bic Cristal pen genuinely special, or just cheap disposable plastic? "
            "Here is the verdict. The Bic Cristal is pure industrial perfection. "
            "Its tungsten carbide ball ground to micron precision and hexagonal polystyrene barrel deliver "
            "over two miles of uninterrupted writing without leaking or skipping. "
            "It is permanently displayed in New York's Museum of Modern Art for a reason. "
            "Final score: 9.7 out of 10. An everyday miracle."
        ),
        "hi": (
            "क्या केवल दस रुपये का साधारण बिक क्रिस्टल पेन सच में खास है? "
            "यहाँ है फैसला। बिक क्रिस्टल पेन आधुनिक औद्योगिक डिजाइन का चमत्कार है। "
            "टंगस्टन कार्बाइड की अल्ट्रा प्रिसाइज बॉल और षट्कोणीय बॉडी के साथ यह तीन किलोमीटर तक बिना रुके लिखता है। "
            "यही वजह है कि यह न्यूयॉर्क के म्यूजियम ऑफ मॉडर्न आर्ट में हमेशा के लिए प्रदर्शित है। "
            "फाइनल स्कोर: दस में से 9.7। रोजमर्रा का नायाब रत्न।"
        )
    },
    "casio-f91w-watch-masterpiece": {
        "en": (
            "Is the nineteen-dollar Casio F-91W the greatest digital watch ever built? "
            "Here is the verdict. Yes, absolutely. "
            "The Casio F-91W weighs twenty-one grams, boasts a ten-year battery life, and survives immersion, drops, and decades of daily abuse. "
            "Its resonant quartz crystal keeps time within seconds per month, outlasting luxury mechanical watches costing thousands. "
            "Final score: 9.8 out of 10. The ultimate utilitarian masterpiece."
        ),
        "hi": (
            "क्या बारह सौ रुपये की कैसियो एफ इक्यानवे डब्ल्यू दुनिया की सबसे बेहतरीन डिजिटल घड़ी है? "
            "हमारा जवाब है: बिल्कुल हाँ। "
            "सिर्फ इक्कीस ग्राम वजन वाली इस घड़ी की बैटरी दस साल चलती है। यह पानी, धूल और हर तरह की मार झेल जाती है। "
            "लाखों की लग्जरी घड़ियों से ज्यादा सटीक समय देने वाला यह एक बेमिसाल इंजीनियरिंग चमत्कार है। "
            "फाइनल स्कोर: दस में से 9.8। अद्वितीय मास्टरपीस।"
        )
    },
    "dyson-supersonic-hair-dryer": {
        "en": (
            "Is the four hundred and thirty dollar Dyson Supersonic hair dryer worth the staggering price tag? "
            "Here is the verdict. The Dyson Supersonic is exceptional engineering, but for most people, it is overhyped. "
            "Its digital motor in the handle and microprocessor glass bead thermistor prevent heat damage and cut drying time in half. "
            "However, its non-repairable sealed body and six hundred percent price markup mean you are heavily paying for the brand. "
            "Final score: 6.8 out of 10. Impressive tech, but poor value."
        ),
        "hi": (
            "क्या चालीस हजार रुपये का डायसन सुपरसोनिक हेयर ड्रायर सचमुच इतनी बड़ी कीमत के लायक है? "
            "यहाँ है निष्कर्ष। डायसन की मोटर तकनीक और हीट सेंसर बेहतरीन हैं, लेकिन आम उपभोक्ता के लिए यह ओवरहाइप्ड है। "
            "यह बालों को तेजी से सुखाता है, लेकिन इसे आसानी से रिपेयर नहीं किया जा सकता और कीमत जरूरत से ज्यादा है। "
            "फाइनल स्कोर: दस में से 6.8। बेहतरीन तकनीक, लेकिन ओवरप्राइस्ड।"
        )
    },
    "japanese-selvedge-denim": {
        "en": (
            "Is Japanese raw selvedge denim worth two hundred and forty dollars, or is it just hipster obsession? "
            "Here is the verdict. True Japanese selvedge denim is genuinely special. "
            "Woven on vintage Toyoda shuttle looms using pure ring-spun cotton and natural indigo, "
            "it features self-finished closed edges and structural rigidity that outlasts fast fashion jeans five to one. "
            "Over years of wear, it molds uniquely to your body. "
            "Final score: 9.1 out of 10. Authentic artisan heritage."
        ),
        "hi": (
            "क्या बीस हजार रुपये की जापानी सेल्वेज डेनिम जींस सचमुच खास है? "
            "यहाँ है हमारा फैसला। असली जापानी सेल्वेज डेनिम असाधारण गुणवत्ता का परिचायक है। "
            "विंटेज टोयोडा लूम्स पर बुना यह गाढ़ा शुद्ध सूती कपड़ा आम फास्ट फैशन जींस की तुलना में पांच गुना ज्यादा टिकता है। "
            "वर्षों पहनने पर यह आपके शरीर के अनुसार ढल जाती है और कभी पुरानी नहीं लगती। "
            "फाइनल स्कोर: दस में से 9.1। बेमिसाल दस्तकारी।"
        )
    },
    "kitchenaid-stand-mixer": {
        "en": (
            "Is the four hundred and fifty dollar KitchenAid Artisan stand mixer truly an heirloom, or modern nostalgia? "
            "Here is the verdict. KitchenAid remains an authentic kitchen workhorse. "
            "With its planetary mixing action and solid die-cast zinc housing, it kneads heavy bread dough without stalling. "
            "While newer models use a sacrificial nylon worm gear for motor protection, parts are universally available and user repairable for decades. "
            "Final score: 9.2 out of 10. A legitimate culinary heirloom."
        ),
        "hi": (
            "क्या पैंतालीस हजार रुपये का किचनएड स्टैंड मिक्सर सचमुच पीढ़ियों तक चलने वाला बर्तन है? "
            "यह है हमारा फैसला। किचनएड आज भी एक असली किचन का योद्धा है। "
            "इसका भारी डाई-कास्ट मेटल ढांचा और प्लैनेटरी मिक्सिंग एक्शन भारी आटे को भी आसानी से गूंथ देता है। "
            "इसके सभी पार्ट्स आसानी से बदले और रिपेयर किए जा सकते हैं, जिससे यह दशकों तक चलता है। "
            "फाइनल स्कोर: दस में से 9.2। पीढ़ियों तक चलने वाला निवेश।"
        )
    },
    "lodge-cast-iron-skillet": {
        "en": (
            "Can a twenty-dollar Lodge cast iron skillet beat a hundred-dollar boutique pan? "
            "Here is the verdict. The Lodge skillet is the greatest value in cookware history. "
            "Poured from molten gray iron in South Pittsburg, Tennessee, it provides massive thermal mass and superior heat retention. "
            "Unlike chemical non-stick pans that degrade in two years, a seasoned Lodge builds a natural slick patina and lasts for generations. "
            "Final score: 9.4 out of 10. An untouchable bargain."
        ),
        "hi": (
            "क्या केवल दो हजार रुपये का लॉज कास्ट आयरन पैन महंगे बर्तनों को मात दे सकता है? "
            "यहाँ है हमारा फैसला। लॉज कास्ट आयरन तवा कुकवेयर की दुनिया की सबसे बेहतरीन डील है। "
            "पिघले हुए लोहे से बना यह भारी पैन सालों साल आंच को बराबर बनाए रखता है। "
            "जहरीले नॉन-स्टिक पैन दो साल में खराब हो जाते हैं, जबकि लॉज का तवा पीढ़ियों तक नए जैसा काम करता है। "
            "फाइनल स्कोर: दस में से 9.4। अमर बर्तन।"
        )
    },
    "moccamaster-coffee-maker": {
        "en": (
            "Is the three hundred and sixty dollar Technivorm Moccamaster worth six times a standard coffee maker? "
            "Here is the verdict. The Moccamaster is the gold standard of drip coffee. "
            "Handmade in the Netherlands, its solid copper boiling element heats water to exactly ninety-two degrees Celsius in seconds. "
            "With modular replaceable parts and no computer screens to fry, it brews cafe quality coffee for thirty years. "
            "Final score: 9.4 out of 10. Pure mechanical perfection."
        ),
        "hi": (
            "क्या तैंतीस हजार रुपये का टेक्निवॉर्म मोकामॉस्टर साधारण कॉफी मेकर से बेहतर है? "
            "यह है हमारा फैसला। मोकामॉस्टर ड्रिप कॉफी का विश्व स्तरीय मानक है। "
            "नीदरलैंड में हाथ से बना इसका कॉपर हीटिंग एलिमेंट पानी को एकदम सही बानवे डिग्री पर उबालता है। "
            "बिना किसी जटिल इलेक्ट्रॉनिक स्क्रीन के यह पच्चीस तीस साल तक हर सुबह लाजवाब कॉफी बनाता है। "
            "फाइनल स्कोर: दस में से 9.4। अद्वितीय शुद्ध कॉफी मेकर।"
        )
    },
    "stanley-tumbler-hype": {
        "en": (
            "Is the viral Stanley Quencher forty-ounce tumbler genuinely special, or pure social media hysteria? "
            "Here is the verdict. The Stanley tumbler is overwhelmingly overhyped. "
            "While its double-wall vacuum insulation keeps ice cold, its rotating straw lid notoriously leaks when tipped. "
            "It is overly bulky, prone to dents, and driven almost entirely by TikTok status signaling rather than engineering supremacy. "
            "Final score: 5.4 out of 10. A viral fashion accessory, not a design classic."
        ),
        "hi": (
            "क्या टिकटॉक पर वायरल स्टैनली टम्बलर सचमुच इतना खास है या सिर्फ सोशल मीडिया का पागलपन? "
            "यहाँ है हमारा निष्कर्ष। स्टैनली टम्बलर पूरी तरह से ओवरहाइप्ड है। "
            "हालाँकि इसका वैक्यूम इंसुलेशन पानी को ठंडा रखता है, लेकिन इसका ढक्कन थोड़ा भी झुकने पर लीक करने लगता है। "
            "यह बहुत भारी है और इसकी लोकप्रियता इंजीनियरिंग के बजाय केवल दिखावे पर टिकी है। "
            "फाइनल स्कोर: दस में से 5.4। सिर्फ एक सोशल मीडिया ट्रेंड।"
        )
    }
}

async def generate_audio():
    os.makedirs("public/audio", exist_ok=True)
    for slug, langs in SCRIPTS.items():
        # English
        en_file = f"public/audio/{slug}-verdict-en.mp3"
        print(f"Generating EN audio for {slug}...")
        comm_en = edge_tts.Communicate(langs["en"], "en-US-ChristopherNeural", rate="-2%")
        await comm_en.save(en_file)
        print(f"✓ Saved {en_file}")

        # Hindi
        hi_file = f"public/audio/{slug}-verdict-hi.mp3"
        print(f"Generating HI audio for {slug}...")
        comm_hi = edge_tts.Communicate(langs["hi"], "hi-IN-MadhurNeural")
        await comm_hi.save(hi_file)
        print(f"✓ Saved {hi_file}")

if __name__ == "__main__":
    asyncio.run(generate_audio())
