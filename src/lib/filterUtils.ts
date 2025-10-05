// src/lib/filterUtils.ts - MATCHING SANITY SCHEMA EXACTLY
export const nfUS = new Intl.NumberFormat('en-US')
export const PRICE_STEP = 250000

// Development options (kebab-case to match Sanity)
export const DEV_OPTIONS = ['punta-mita', 'litibu', 'aubierge', 'nauka']

// Display names for developments (user-friendly)
export const DEV_DISPLAY_NAMES: Record<string, string> = {
    'punta-mita': 'Punta Mita',
    'litibu': 'Litibu',
    'aubierge': 'Aubierge',
    'nauka': 'Nauka'
}

// Neighborhood display names (kebab-case to Title Case)
export const NEIGHBORHOOD_DISPLAY_NAMES: Record<string, string> = {
    // Litibu neighborhoods
    'litibu-bay-club': 'Litibu Bay Club',
    'uavi': 'Uavi',
    // Punta Mita neighborhoods
    'bahia-estates': 'Bahia Estates',
    'bella-vista': 'Bella Vista',
    'el-encanto': 'El Encanto',
    'four-seasons': 'Four Seasons',
    'hacienda-de-mita': 'Hacienda De Mita',
    'iyari': 'Iyari',
    'kupuri-estates': 'Kupuri Estates',
    'la-punta': 'La Punta',
    'la-serenata': 'La Serenata',
    'lagos-del-mar': 'Lagos Del Mar',
    'las-marietas': 'Las Marietas',
    'las-palmas': 'Las Palmas',
    'las-terrazas': 'Las Terrazas',
    'las-vistas': 'Las Vistas',
    'montage': 'Montage',
    'pacifico-estates': 'Pacifico Estates',
    'porta-fortuna': 'Porta Fortuna',
    'ranchos': 'Ranchos',
    'seven-eight-residences': 'Seven & Eight Residences',
    'surf-residences': 'Surf Residences',
    'tau': 'Tau',
}

// Punta Mita neighborhoods (kebab-case to match Sanity)
export const PM_NEIGHBORHOODS = [
    'bahia-estates',
    'bella-vista',
    'el-encanto',
    'four-seasons',
    'hacienda-de-mita',
    'iyari',
    'kupuri-estates',
    'la-punta',
    'la-serenata',
    'lagos-del-mar',
    'las-marietas',
    'las-palmas',
    'las-terrazas',
    'las-vistas',
    'montage',
    'pacifico-estates',
    'porta-fortuna',
    'ranchos',
    'seven-eight-residences',
    'surf-residences',
    'tau',
].sort((a, b) => a.localeCompare(b))

// Litibu neighborhoods (kebab-case to match Sanity)
export const LITIBU_NEIGHBORHOODS = [
    'litibu-bay-club',
    'uavi'
].sort((a, b) => a.localeCompare(b))

// Neighborhood mapping by development
export const NEIGHBORHOOD_BY_DEV: Record<string, string[]> = {
    'punta-mita': PM_NEIGHBORHOODS,
    'litibu': LITIBU_NEIGHBORHOODS,
    'aubierge': [],
    'nauka': [],
}

// Helper to format price with $ and commas
export const formatPrice = (digits: string) => (digits ? `$${nfUS.format(Number(digits))}` : '')

// Helper to extract only digits from input
export const onlyDigits = (v: string) => v.replace(/\D/g, '')

// Helper for currency input change
export const onCurrencyChange =
    (setter: (v: string) => void) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const digits = onlyDigits(e.target.value)
            setter(digits)
        }

// Helper to convert string to number or zero
export const toNumberOrZero = (v: string) => (v ? Number(v) : 0)

// Allow integers only
export const sanitizeInteger = (raw: string) => {
    const cleaned = raw.replace(/[^0-9]/g, '')
    return cleaned
}

// Key down handler for price fields (up/down arrows)
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

// Key down handler for bed/bath fields (up/down arrows by 1)
export const onIntegerKeyDown =
    (value: string, set: (v: string) => void) =>
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'ArrowUp') {
                e.preventDefault()
                const current = value ? Number(value) : 0
                set(String(current + 1))
            } else if (e.key === 'ArrowDown') {
                e.preventDefault()
                const current = value ? Number(value) : 0
                set(String(Math.max(0, current - 1)))
            }
        }