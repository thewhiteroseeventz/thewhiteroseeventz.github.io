# Branding — QR Code

Scans to: `https://thewhiteroseeventz.vercel.app`

## Files

| File | Use it for |
|---|---|
| `qr-code.svg` | **Print.** Vector — stays sharp from a business card to a 3 m banner. Preferred for anything going to a printer. |
| `qr-code.png` | 720×720 px. Social posts, WhatsApp, email signatures, digital displays. |
| `qr-code-transparent.png` | Same, transparent background, for printing on light-coloured stock. |

## Printing notes

- **Use the SVG** wherever a printer accepts it. It contains no fixed pixel size.
- Raster fallback: keep it **at least 400 px wide** on screen, or **2 cm wide** in print. Smaller and phone cameras struggle.
- Keep the white margin around the code. Cropping it tight is the most common reason a printed QR fails to scan.
- Do not place it over a busy photo, and keep it off a strongly patterned background.
- Error correction is set to **H** (~30% recovery), so it tolerates partial obstruction, fading ink and a small logo placed on top — but contrast still matters more than anything.

## ⚠️ Regenerate when the custom domain arrives

This code currently encodes a `vercel.app` address. Printed material lasts one to
two years, and reprinting banners and packaging is expensive.

Once `thewhiteroseeventz.com` is live:

1. Change `URL` in the generator script
2. Re-run it to overwrite these three files
3. Only print collateral **after** that step

If you print the current version now, everything you produce is tied to a
temporary address.

## Regenerating

```python
import segno

URL = "https://thewhiteroseeventz.com"   # <-- change this
qr = segno.make(URL, error="h")
qr.save("qr-code.svg", scale=20, border=4, dark="#4A101A", light="#FFFFFF")
qr.save("qr-code.png", scale=16, border=4, dark="#4A101A", light="#FFFFFF")
qr.save("qr-code-transparent.png", scale=16, border=4, dark="#4A101A", light=None)
```

Requires `segno` and (for PNG output) `Pillow`.