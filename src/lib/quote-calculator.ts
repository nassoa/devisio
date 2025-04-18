import { getProjectTypeName } from "@/lib/utils"

interface QuoteItem {
  description: string
  quantity: number
  unitPrice: number
  total: number
}

interface QuoteData {
  items: QuoteItem[]
  subtotal: number
  tax: number
  total: number
  urgentFee?: number
}

// Base prices for different project types
const BASE_PRICES = {
  static: 1000,
  wordpress: 2000,
  strapi: 2500,
  ecommerce: 3500,
  headless: 3000,
}

// Price per page
const PRICE_PER_PAGE = 200

// Additional options prices
const OPTION_PRICES = {
  hosting: 500,
  maintenance: 800,
  seo: 1200,
  responsive: 600,
}

export function calculateQuote(formData: any): QuoteData {
  const items: QuoteItem[] = []
  let subtotal = 0

  // Base price for project type
  const basePrice = BASE_PRICES[formData.projectType] || 1500
  items.push({
    description: `Base - ${getProjectTypeName(formData.projectType)}`,
    quantity: 1,
    unitPrice: basePrice,
    total: basePrice,
  })
  subtotal += basePrice

  // Pages
  const pagesCount = Number.parseInt(formData.pagesCount) || 5
  const pagesPrice = pagesCount * PRICE_PER_PAGE
  items.push({
    description: "Pages",
    quantity: pagesCount,
    unitPrice: PRICE_PER_PAGE,
    total: pagesPrice,
  })
  subtotal += pagesPrice

  // Additional options
  if (formData.needsHosting) {
    items.push({
      description: "Hébergement",
      quantity: 1,
      unitPrice: OPTION_PRICES.hosting,
      total: OPTION_PRICES.hosting,
    })
    subtotal += OPTION_PRICES.hosting
  }

  if (formData.needsMaintenance) {
    items.push({
      description: "Maintenance",
      quantity: 1,
      unitPrice: OPTION_PRICES.maintenance,
      total: OPTION_PRICES.maintenance,
    })
    subtotal += OPTION_PRICES.maintenance
  }

  if (formData.needsSEO) {
    items.push({
      description: "Optimisation SEO",
      quantity: 1,
      unitPrice: OPTION_PRICES.seo,
      total: OPTION_PRICES.seo,
    })
    subtotal += OPTION_PRICES.seo
  }

  if (formData.isResponsive) {
    items.push({
      description: "Design Responsive",
      quantity: 1,
      unitPrice: OPTION_PRICES.responsive,
      total: OPTION_PRICES.responsive,
    })
    subtotal += OPTION_PRICES.responsive
  }

  // Calculate urgent fee if needed
  let urgentFee = 0
  if (formData.isUrgent) {
    urgentFee = subtotal * 0.25
  }

  // Calculate tax (20%)
  const taxableAmount = subtotal + urgentFee
  const tax = taxableAmount * 0.2

  // Calculate total
  const total = taxableAmount + tax

  return {
    items,
    subtotal,
    urgentFee: formData.isUrgent ? urgentFee : undefined,
    tax,
    total,
  }
}
