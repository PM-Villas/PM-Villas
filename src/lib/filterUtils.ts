// src/lib/filterUtils.ts

export const PRICE_STEP = 100000

export const nfUS = new Intl.NumberFormat('en-US')

export const onlyDigits = (v: string) => v.replace(/\D/g, '')

/** Allow integers or `.5` only (e.g., 3 or 3.5). Anything else becomes integer only */
export const sanitizeHalfStep = (raw: string) => {
    const cleaned = raw.replace(/[^-0-9.]/g, '')
    const m = cleaned.match(/^(\d+)(?:\.(\d)?)?$/)
    if (!m) return ''
    const intPart = m[1]
    const frac = m[2]
    return frac === '5' ? `${intPart}.5` : intPart
}

export const toNumberOrZero = (v: string) => (v ? Number(v) : 0)

export const formatPrice = (digits: string) => (digits ? `$${nfUS.format(Number(digits))}` : '')

export const onCurrencyChange =
    (setter: (v: string) => void) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const digits = onlyDigits(e.target.value)
            setter(digits)
        }

export const onHalfStepArrow = (value: string, set: (v: string) => void, dir: 1 | -1) => {
    const n = value ? Number(value) : 0
    const hasHalf = /\.5$/.test(value)
    const next = (Math.floor(n) + dir) + (hasHalf ? 0.5 : 0)
    set(String(next))
}

export const onHalfStepKeyDown =
    (value: string, set: (v: string) => void) =>
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'ArrowUp') {
                e.preventDefault()
                onHalfStepArrow(value, set, 1)
            } else if (e.key === 'ArrowDown') {
                e.preventDefault()
                onHalfStepArrow(value, set, -1)
            }
        }

export const onPriceKeyDown =
    (value: string, set: (v: string) => void) =>
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'ArrowUp') {
                e.preventDefault()
                set(String(toNumberOrZero(value) + PRICE_STEP))
            } else if (e.key === 'ArrowDown') {
                e.preventDefault()
                set(String(Math.max(0, toNumberOrZero(value) - PRICE_STEP)))
            }
        }

export const DEV_OPTIONS = ['Aubierge', 'Litibu', 'Nauka', 'Punta Mita']