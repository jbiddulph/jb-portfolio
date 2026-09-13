/**
 * Small WCAG contrast helpers used to derive accessible design tokens from an
 * admin-chosen palette (e.g. a light grey "primary" still needs to be readable
 * as button and link text).
 */
export type Rgb = [number, number, number]

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))

export const parseColor = (value?: string | null): Rgb | null => {
  if (!value) return null
  const input = value.trim().toLowerCase()

  const hex = input.match(/^#([0-9a-f]{3,8})$/i)?.[1]
  if (hex) {
    if (hex.length === 3 || hex.length === 4) {
      return [0, 1, 2].map((i) => parseInt(hex[i] + hex[i], 16)) as Rgb
    }
    if (hex.length === 6 || hex.length === 8) {
      return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16)) as Rgb
    }
    return null
  }

  const rgb = input.match(/^rgba?\(\s*([\d.]+)\s*[, ]\s*([\d.]+)\s*[, ]\s*([\d.]+)/)
  if (rgb) {
    return [rgb[1], rgb[2], rgb[3]].map((part) => Math.round(Math.min(255, Math.max(0, Number(part))))) as Rgb
  }

  return null
}

export const toHex = ([r, g, b]: Rgb) =>
  `#${[r, g, b].map((channel) => Math.round(channel).toString(16).padStart(2, '0')).join('')}`

export const relativeLuminance = ([r, g, b]: Rgb) => {
  const channel = (c: number) => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
}

export const contrastRatio = (a: Rgb, b: Rgb) => {
  const la = relativeLuminance(a)
  const lb = relativeLuminance(b)
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05)
}

const rgbToHsl = ([r, g, b]: Rgb): [number, number, number] => {
  const rn = r / 255
  const gn = g / 255
  const bn = b / 255
  const max = Math.max(rn, gn, bn)
  const min = Math.min(rn, gn, bn)
  const l = (max + min) / 2
  if (max === min) return [0, 0, l]
  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  let h = 0
  if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6
  else if (max === gn) h = ((bn - rn) / d + 2) / 6
  else h = ((rn - gn) / d + 4) / 6
  return [h, s, l]
}

const hslToRgb = ([h, s, l]: [number, number, number]): Rgb => {
  if (s === 0) {
    const v = Math.round(l * 255)
    return [v, v, v]
  }
  const hue = (p: number, q: number, t: number) => {
    if (t < 0) t += 1
    if (t > 1) t -= 1
    if (t < 1 / 6) return p + (q - p) * 6 * t
    if (t < 1 / 2) return q
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
    return p
  }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s
  const p = 2 * l - q
  return [hue(p, q, h + 1 / 3), hue(p, q, h), hue(p, q, h - 1 / 3)].map((c) => Math.round(c * 255)) as Rgb
}

const toSurfaces = (background: string | string[]) =>
  (Array.isArray(background) ? background : [background]).map(parseColor).filter((c): c is Rgb => !!c)

const minContrast = (fg: Rgb, surfaces: Rgb[]) => Math.min(...surfaces.map((bg) => contrastRatio(fg, bg)))

/** Blends `color` over `background` by `amount` (0..1 of `color`). */
export const mix = (color: string, background: string, amount: number) => {
  const fg = parseColor(color)
  const bg = parseColor(background)
  if (!fg || !bg) return color
  return toHex(fg.map((channel, index) => channel * amount + bg[index] * (1 - amount)) as Rgb)
}

/**
 * Returns `color` if it already meets `minRatio` against every surface in
 * `background`, otherwise the closest darker (on light surfaces) or lighter
 * (on dark surfaces) shade of the same hue that does. Unparseable input is
 * returned unchanged so unusual CSS values still work.
 */
export const readableColor = (color: string, background: string | string[], minRatio = 4.5) => {
  const fg = parseColor(color)
  const surfaces = toSurfaces(background)
  if (!fg || !surfaces.length) return color
  if (minContrast(fg, surfaces) >= minRatio) return color

  const surfacesAreLight = relativeLuminance(surfaces[0]) > 0.35
  const [h, s] = rgbToHsl(fg)
  let [, , l] = rgbToHsl(fg)
  let best: Rgb = fg

  for (let i = 0; i < 60; i += 1) {
    l = clamp01(l + (surfacesAreLight ? -0.015 : 0.015))
    best = hslToRgb([h, s, l])
    if (minContrast(best, surfaces) >= minRatio) return toHex(best)
    if (l === 0 || l === 1) break
  }

  return toHex(best)
}

/** Picks white or near-black text for a solid `background`, whichever reads better. */
export const onColor = (background: string, light = '#ffffff', dark = '#111827') => {
  const bg = parseColor(background)
  if (!bg) return light
  const lightRgb = parseColor(light)!
  const darkRgb = parseColor(dark)!
  return contrastRatio(lightRgb, bg) >= contrastRatio(darkRgb, bg) ? light : dark
}

/**
 * Mixes `color` toward the page `background`, but no further than keeps
 * `minRatio` contrast on every surface in `surfaces` (page, cards, pills).
 */
export const mutedColor = (color: string, background: string, surfaces: string | string[] = background, amount = 0.72, minRatio = 4.5) => {
  const fg = parseColor(color)
  const bg = parseColor(background)
  const targets = toSurfaces(surfaces)
  if (!fg || !bg || !targets.length) return color
  let ratio = amount
  let out: Rgb = fg
  for (let i = 0; i < 20; i += 1) {
    out = fg.map((channel, index) => channel * ratio + bg[index] * (1 - ratio)) as Rgb
    if (minContrast(out, targets) >= minRatio || ratio >= 1) break
    ratio = Math.min(1, ratio + 0.04)
  }
  return toHex(out)
}
