```vue
<template>
  <!-- Hero Section -->
  <section class="relative overflow-hidden min-h-[90vh] flex items-center">
    <!-- Gradient Background -->
    <div class="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10"></div>
    
    <!-- Animated Shapes -->
    <div class="absolute inset-0">
      <div class="absolute w-64 h-64 rounded-full top-20 right-20 bg-primary/10 blur-3xl"></div>
      <div class="absolute w-64 h-64 rounded-full bottom-20 left-20 bg-blue-500/10 blur-3xl"></div>
    </div>

    <!-- Grid Pattern Overlay -->
    <div class="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>

    <!-- Content -->
    <div class="container relative z-10 px-6 mx-auto">
      <div class="max-w-3xl mx-auto text-center">
        <!-- Launch Badge -->
        <div class="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-gradient-to-r from-primary/10 to-primary/20 text-primary">
          <span class="flex items-center text-sm font-medium">
            🚀 Launching Our New Platform
          </span>
        </div>

        <!-- Main Heading -->
        <h1 class="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          Empower Your Team with
          <span class="text-transparent bg-gradient-to-r from-primary to-blue-500 bg-clip-text">
            TeamSync
          </span>
        </h1>

        <!-- Subheading -->
        <p class="mb-8 text-lg text-muted-foreground md:text-xl">
          The complete enterprise resource management platform for modern teams. 
          Streamline workflows, manage resources, and boost productivity.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col justify-center gap-4 mb-16 sm:flex-row">
          <button class="flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white transition-all rounded-lg bg-gradient-to-r from-primary to-blue-500 hover:opacity-90">
            <RocketIcon class="w-4 h-4" />
            Start Free Trial
          </button>
          <button class="flex items-center justify-center gap-2 px-6 py-3 font-semibold transition-all border rounded-lg border-primary/20 hover:bg-primary/5">
            <PlayCircleIcon class="w-4 h-4" />
            Watch Demo
          </button>
        </div>

        <!-- Trust Badges -->
        <div class="pt-8 border-t border-border/40">
          <p class="mb-6 text-sm text-muted-foreground">
            Trusted by leading companies worldwide
          </p>
          <div class="flex justify-center gap-12">
            <div v-for="i in 5" :key="i" 
                 class="w-24 h-8 rounded bg-muted/30 animate-pulse">
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Features Grid -->
  <section class="py-24 bg-muted/50">
    <div class="container px-6 mx-auto">
      <div class="mb-16 text-center">
        <h2 class="mb-4 text-3xl font-bold">Everything you need to manage your team</h2>
        <p class="max-w-2xl mx-auto text-muted-foreground">
          Powerful features to help you manage resources, track progress, and achieve your goals.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div v-for="feature in features" 
             :key="feature.title"
             class="p-6 transition-all shadow-sm group bg-background rounded-xl hover:shadow-md">
          <div class="p-3 mb-4 rounded-lg text-primary bg-primary/10 w-fit">
            <component :is="feature.icon" class="w-6 h-6" />
          </div>
          <h3 class="mb-2 text-xl font-bold transition-colors group-hover:text-primary">
            {{ feature.title }}
          </h3>
          <p class="text-muted-foreground">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Testimonials Carousel -->
  <section class="py-24">
    <div class="container px-6 mx-auto">
      <div class="mb-16 text-center">
        <h2 class="mb-4 text-3xl font-bold">Loved by teams worldwide</h2>
        <p class="max-w-2xl mx-auto text-muted-foreground">
          See what our customers have to say about their experience with TeamSync.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Card v-for="testimonial in testimonials" 
              :key="testimonial.name"
              class="transition-all hover:shadow-lg">
          <CardContent class="p-8">
            <div class="flex gap-2 mb-4 text-primary">
              <StarIcon v-for="i in 5" :key="i" class="w-5 h-5" />
            </div>
            <blockquote class="mb-6 text-lg">
              "{{ testimonial.content }}"
            </blockquote>
            <div class="flex items-center gap-4">
              <div class="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                <UserIcon class="w-6 h-6 text-primary" />
              </div>
              <div>
                <p class="font-semibold">{{ testimonial.name }}</p>
                <p class="text-sm text-muted-foreground">{{ testimonial.role }}</p>
              </div>
              <img :src="`/${testimonial.company.toLowerCase()}-logo.svg`" 
                   :alt="testimonial.company"
                   class="h-8 ml-auto" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>

  <!-- Pricing Section with Comparison -->
  <section class="py-24 bg-muted/50">
    <div class="container px-6 mx-auto">
      <div class="mb-16 text-center">
        <h2 class="mb-4 text-3xl font-bold">Simple, transparent pricing</h2>
        <p class="max-w-2xl mx-auto text-muted-foreground">
          Choose the perfect plan for your team. All plans include a 14-day free trial.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-8 mb-12 md:grid-cols-3">
        <Card v-for="plan in pricingPlans" 
              :key="plan.name"
              :class="[
                'relative overflow-hidden transition-all hover:shadow-xl',
                plan.name === 'Professional' ? 'border-primary' : ''
              ]">
          <div v-if="plan.name === 'Professional'"
               class="absolute top-5 right-5">
            <span class="px-3 py-1 text-xs font-medium rounded-full text-primary bg-primary/10">
              Most Popular
            </span>
          </div>
          <CardHeader>
            <CardTitle>{{ plan.name }}</CardTitle>
            <CardDescription>{{ plan.description }}</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="mb-6">
              <span class="text-4xl font-bold">{{ plan.price }}</span>
              <span class="text-muted-foreground">/month</span>
            </div>
            <ul class="mb-6 space-y-3">
              <li v-for="feature in plan.features" 
                  :key="feature"
                  class="flex items-center gap-2 text-sm">
                <CheckIcon class="w-4 h-4 text-primary" />
                {{ feature }}
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button class="w-full" 
                    :variant="plan.name === 'Professional' ? 'default' : 'outline'">
              Get Started
            </Button>
          </CardFooter>
        </Card>
      </div>

      <!-- Feature Comparison Table -->
      <div class="p-6 shadow-sm bg-background rounded-xl">
        <h3 class="mb-6 text-xl font-bold">Compare Plans</h3>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b">
                <th class="py-4 text-left">Feature</th>
                <th v-for="plan in pricingPlans" 
                    :key="plan.name"
                    class="py-4 text-center">
                  {{ plan.name }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="feature in comparisonFeatures" 
                  :key="feature.name"
                  class="border-b">
                <td class="py-4">{{ feature.name }}</td>
                <td v-for="plan in pricingPlans" 
                    :key="plan.name"
                    class="py-4 text-center">
                  <CheckIcon v-if="feature.availability[plan.name.toLowerCase()]"
                           class="w-5 h-5 mx-auto text-primary" />
                  <XIcon v-else
                        class="w-5 h-5 mx-auto text-muted-foreground" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Section with Background -->
  <section class="relative py-24 overflow-hidden">
    <div class="absolute inset-0 bg-primary/5"></div>
    <div class="container relative z-10 px-6 mx-auto">
      <div class="max-w-2xl mx-auto text-center">
        <h2 class="mb-4 text-3xl font-bold">Ready to transform your team?</h2>
        <p class="mb-8 text-lg text-muted-foreground">
          Join thousands of teams already using TeamSync to improve their productivity.
        </p>
        <div class="flex flex-col justify-center gap-4 sm:flex-row">
          <Button size="lg" class="gap-2 font-semibold">
            <RocketIcon class="w-4 h-4" />
            Start Free Trial
          </Button>
          <Button variant="outline" size="lg" class="gap-2 font-semibold">
            <CalendarIcon class="w-4 h-4" />
            Schedule Demo
          </Button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button"
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card"
import {
  RocketIcon,
  PlayCircleIcon,
  StarIcon,
  UserIcon,
  CheckIcon,
  XIcon,
  CalendarIcon,
  LayoutDashboardIcon,
  UsersIcon,
  BarChartIcon,
  ClockIcon,
  SettingsIcon,
  ShieldCheckIcon
} from 'lucide-vue-next'

// Features data
const features = [
  {
    icon: LayoutDashboardIcon,
    title: 'Resource Management',
    description: 'Efficiently allocate and track resources across projects and teams.'
  },
  {
    icon: BarChartIcon,
    title: 'Advanced Analytics',
    description: 'Get insights into team performance and resource utilization.'
  },
  {
    icon: UsersIcon,
    title: 'Team Collaboration',
    description: 'Foster teamwork with built-in communication tools.'
  },
  {
    icon: ClockIcon,
    title: 'Time Tracking',
    description: 'Monitor project hours and team productivity automatically.'
  },
  {
    icon: SettingsIcon,
    title: 'Custom Workflows',
    description: 'Create and automate workflows that match your needs.'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Enterprise Security',
    description: 'Keep your data safe with advanced security features.'
  }
]


// Types
interface PricingPlan {
  name: string
  price: string
  description: string
  features: string[]
  highlight?: boolean
}

// Pricing data
const pricingPlans: PricingPlan[] = [
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
]

// Update the comparison features to match plans
const comparisonFeatures = [
  {
    name: 'Team Members',
    availability: {
      starter: '10 users',
      professional: '50 users',
      enterprise: 'Unlimited'
    }
  },
  {
    name: 'Storage',
    availability: {
      starter: '5GB',
      professional: '50GB',
      enterprise: 'Unlimited'
    }
  },
  {
    name: 'Projects',
    availability: {
      starter: '2',
      professional: 'Unlimited',
      enterprise: 'Unlimited'
    }
  },
  {
    name: 'Resource Management',
    availability: {
      starter: false,
      professional: true,
      enterprise: true
    }
  },
  {
    name: 'Custom Workflows',
    availability: {
      starter: false,
      professional: true,
      enterprise: true
    }
  },
  {
    name: 'Advanced Analytics',
    availability: {
      starter: false,
      professional: true,
      enterprise: true
    }
  },
  {
    name: 'API Access',
    availability: {
      starter: false,
      professional: true,
      enterprise: true
    }
  },
  {
    name: 'Custom Integrations',
    availability: {
      starter: false,
      professional: false,
      enterprise: true
    }
  },
  {
    name: 'Dedicated Support',
    availability: {
      starter: false,
      professional: false,
      enterprise: true
    }
  }
]

// Update testimonials with proper typing
interface Testimonial {
  name: string
  role: string
  content: string
  company: string
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "Project Manager at TechCorp",
    content: "TeamSync transformed how we manage our projects. The real-time updates and resource management features are game-changers.",
    company: "TechCorp"
  },
  {
    name: "Michael Chen",
    role: "CTO at InnovateLabs",
    content: "The best investment we've made for our team management. The analytics and reporting features help us make data-driven decisions.",
    company: "InnovateLabs"
  },
  {
    name: "Emily Rodriguez",
    role: "Operations Director at DigitalFlow",
    content: "Outstanding platform that has streamlined our resource allocation and team coordination. Highly recommended!",
    company: "DigitalFlow"
  }
]

</script>

<style scoped>
.text-gradient {
  background: linear-gradient(to right, var(--primary), var(--primary-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.bg-grid-pattern {
  background-image: radial-gradient(var(--primary) 1px, transparent 1px);
  background-size: 25px 25px;
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}
.animate-fade-in {
  animation: fadeIn 1s ease-out;
}

.animate-fade-in-up {
  animation: fadeInUp 1s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
