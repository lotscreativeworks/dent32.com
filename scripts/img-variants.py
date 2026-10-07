"""public/img altındaki her WebP için küçük ekran sürümleri üretir: ad-480.webp, ad-800.webp.
lib/imageLoader.ts bu dosyaları srcset'te kullanır. Yeni görsel eklenince yeniden çalıştırın:
    python3 scripts/img-variants.py
"""
import glob, os, re
from PIL import Image

ROOT = os.path.join(os.path.dirname(__file__), "..", "public", "img")
WIDTHS = (480, 800)

for path in sorted(glob.glob(os.path.join(ROOT, "*.webp"))):
    if re.search(r"-(%s)\.webp$" % "|".join(map(str, WIDTHS)), path) or os.path.basename(path).startswith("rozet-"):
        continue
    im = Image.open(path)
    for w in WIDTHS:
        out = path[:-5] + f"-{w}.webp"
        if os.path.exists(out) and os.path.getmtime(out) >= os.path.getmtime(path):
            continue
        v = im if im.width <= w else im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
        v.save(out, "WEBP", quality=74, method=6)
print("tamam")
