import { ref } from "vue"
import type { PricingPlan, Testimonial } from "./types"
import {
  LayoutDashboardIcon,
  BarChartIcon,
  UsersIcon,
  ClockIcon,
  SettingsIcon,
  ShieldCheckIcon
} from "lucide-vue-next"

export function useHomePageData() {
  const features = ref([
    {
      icon: LayoutDashboardIcon,
      title: "Resource Management",
      description: "Efficiently allocate and track resources across projects and teams."
    },
    {
      icon: BarChartIcon,
      title: "Advanced Analytics",
      description: "Get insights into team performance and resource utilization."
    },
    {
      icon: UsersIcon,
      title: "Team Collaboration",
      description: "Foster teamwork with built-in communication tools."
    },
    {
      icon: ClockIcon,
      title: "Time Tracking",
      description: "Monitor project hours and team productivity automatically."
    },
    {
      icon: SettingsIcon,
      title: "Custom Workflows",
      description: "Create and automate workflows that match your needs."
    },
    {
      icon: ShieldCheckIcon,
      title: "Enterprise Security",
      description: "Keep your data safe with advanced security features."
    }
  ])

  const pricingPlans = ref<PricingPlan[]>([
    {
      name: "Starter",
      price: "$29",
      description: "Perfect for small teams getting started",
      features: [
        "Up to 10 team members",
        "Basic project management",
        "5GB storage",
        "Email support",
        "Basic reporting",
        "2 team projects"
      ]
    },
    {
      name: "Professional",
      price: "$99",
      description: "Ideal for growing businesses",
      features: [
        "Up to 50 team members",
        "Advanced project management",
        "50GB storage",
        "Priority support",
        "Resource allocation",
        "Custom workflows",
        "Advanced analytics",
        "Unlimited projects"
      ],
      highlight: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations with specific needs",
      features: [
        "Unlimited team members",
        "Full platform access",
        "Unlimited storage",
        "24/7 dedicated support",
        "Custom integration",
        "Advanced analytics",
        "SLA guarantees",
        "Dedicated success manager",
        "Custom training"
      ]
    }
  ])

  const comparisonFeatures = ref([
    {
      name: "Team Members",
      availability: {
        starter: "10 users",
        professional: "50 users",
        enterprise: "Unlimited"
      }
    },
    {
      name: "Storage",
      availability: {
        starter: "5GB",
        professional: "50GB",
        enterprise: "Unlimited"
      }
    },
    {
      name: "Projects",
      availability: {
        starter: "2",
        professional: "Unlimited",
        enterprise: "Unlimited"
      }
    },
    {
      name: "Resource Management",
      availability: {
        starter: false,
        professional: true,
        enterprise: true
      }
    },
    {
      name: "Custom Workflows",
      availability: {
        starter: false,
        professional: true,
        enterprise: true
      }
    },
    {
      name: "Advanced Analytics",
      availability: {
        starter: false,
        professional: true,
        enterprise: true
      }
    },
    {
      name: "API Access",
      availability: {
        starter: false,
        professional: true,
        enterprise: true
      }
    },
    {
      name: "Custom Integrations",
      availability: {
        starter: false,
        professional: false,
        enterprise: true
      }
    },
    {
      name: "Dedicated Support",
      availability: {
        starter: false,
        professional: false,
        enterprise: true
      }
    }
  ])

  const testimonials = ref<Testimonial[]>([
    {
      name: "Sarah Johnson",
      role: "Project Manager at TechCorp",
      content: "TeamSync transformed how we manage our projects. The real-time updates and resource management features are game-changers.",
      company: "TechCorp"
    },
    {
      name: "Michael Chen",
      role: "CTO at InnovateLabs",
      content: "The best investment we made for our team management. The analytics and reporting features help us make data-driven decisions.",
      company: "InnovateLabs"
    },
    {
      name: "Emily Rodriguez",
      role: "Operations Director at DigitalFlow",
      content: "Outstanding platform that has streamlined our resource allocation and team coordination. Highly recommended!",
      company: "DigitalFlow"
    }
  ])

  return {
    features,
    pricingPlans,
    comparisonFeatures,
    testimonials
  }
}
