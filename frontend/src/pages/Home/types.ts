export interface PricingPlan {
  name: string
  price: string
  description: string
  features: string[]
  highlight?: boolean
}

export interface Testimonial {
  name: string
  role: string
  content: string
  company: string
}
