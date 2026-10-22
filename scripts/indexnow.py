"""Sitemap'teki tüm adresleri IndexNow ile Bing, Yandex ve diğer katılımcı arama motorlarına bildirir.
Google IndexNow'u desteklemez; onun için Search Console kullanılır.
Yeni içerik yayına girdikten (Netlify deploy bittikten) sonra çalıştırın:
    python3 scripts/indexnow.py
public/8a9b652470cdd59b6647fe99f0f38ebc.txt anahtar dosyasıdır; silinmemeli, silinirse bildirimler reddedilir.
"""
import json, re, urllib.request

HOST = "dent32.com"
KEY = "8a9b652470cdd59b6647fe99f0f38ebc"

sitemap = urllib.request.urlopen(f"https://{HOST}/sitemap.xml").read().decode()
urls = re.findall(r"<loc>([^<]+)</loc>", sitemap)
body = json.dumps({"host": HOST, "key": KEY, "keyLocation": f"https://{HOST}/{KEY}.txt", "urlList": urls}).encode()
req = urllib.request.Request("https://api.indexnow.org/indexnow", data=body,
                             headers={"Content-Type": "application/json; charset=utf-8"})
with urllib.request.urlopen(req) as r:
    print(f"{len(urls)} adres gönderildi, yanıt: {r.status}")
