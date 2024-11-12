
<script setup lang="ts">
import { useHomePageData } from "./data"
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
} from "lucide-vue-next"

const { features, pricingPlans, comparisonFeatures, testimonials } = useHomePageData()
</script>

<style src="./HomePage.css" scoped></style>


<template>
  <!-- Hero Section -->
  <section class="relative overflow-hidden min-h-[90vh] flex items-center bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-xl">
    <!-- Animated Shapes -->
    <div class="absolute inset-0">
      <div class="absolute w-[500px] h-[500px] rounded-full top-[-100px] right-[-100px] bg-blue-500/10 blur-3xl animate-float"></div>
      <div class="absolute w-[500px] h-[500px] rounded-full bottom-[-100px] left-[-100px] bg-purple-500/10 blur-3xl animate-float" style="animation-delay: -2s"></div>
    </div>

    <!-- Grid Pattern Overlay -->
    <div class="absolute inset-0" 
         style="background-image: radial-gradient(circle at center, rgb(0 0 0 / 0.02) 1px, transparent 1px); 
                background-size: 24px 24px;">
    </div>

    <!-- Content -->
    <div class="container relative z-10 px-6 mx-auto">
      <div class="max-w-3xl mx-auto text-center">
        <!-- Launch Badge -->
        <div class="inline-flex items-center gap-2 px-4 py-2 mb-8 text-purple-600 transition-all bg-white rounded-full shadow-sm hover:shadow-md">
          <span class="flex items-center text-sm font-medium">
            🚀 Launching Our New Platform
          </span>
        </div>

        <!-- Main Heading -->
        <h1 class="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Empower Your Team with
          <div class="mt-2 text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
            TeamSync
          </div>
        </h1>

        <!-- Subheading -->
        <p class="max-w-2xl mx-auto mb-12 text-lg text-gray-600 md:text-xl">
          The complete enterprise resource management platform for modern teams. 
          Streamline workflows, manage resources, and boost productivity.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col justify-center gap-4 sm:flex-row">
          <button class="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold text-white transition-all rounded-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
            <RocketIcon class="w-5 h-5" />
            Start Free Trial
          </button>
          <button class="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold transition-all bg-white border-2 rounded-full border-blue-100 hover:border-blue-200 hover:bg-blue-50 hover:shadow-lg hover:-translate-y-0.5">
            <PlayCircleIcon class="w-5 h-5 text-blue-600" />
            Watch Demo
          </button>
        </div>

        <!-- Trust Badges -->
        <div class="pt-16 mt-16 border-t border-gray-100">
          <p class="mb-8 text-sm font-medium text-gray-500">
            Trusted by leading companies worldwide
          </p>
          <div class="flex justify-center gap-12">
            <div v-for="i in 5" :key="i" 
                 class="w-24 h-8 bg-gray-100 rounded-lg animate-pulse">
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Features Grid -->
  <section class="py-24 bg-gradient-to-b from-background to-muted/50">
    <div class="container px-6 mx-auto">
      <div class="mb-16 text-center">
        <h2 class="mb-4 text-3xl font-bold text-foreground">Everything you need to manage your team</h2>
        <p class="max-w-2xl mx-auto text-muted-foreground">
          Powerful features to help you manage resources, track progress, and achieve your goals.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div v-for="feature in features" 
             :key="feature.title"
             class="p-6 transition-all border shadow-sm bg-card group rounded-xl hover:shadow-md hover:border-primary/50 border-border">
          <div class="p-3 mb-4 rounded-lg bg-primary/10 w-fit">
            <component :is="feature.icon" class="w-6 h-6 text-primary" />
          </div>
          <h3 class="mb-2 text-xl font-bold transition-colors text-foreground group-hover:text-primary">
            {{ feature.title }}
          </h3>
          <p class="text-muted-foreground">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Testimonials Carousel -->
  <section class="py-24 bg-background">
    <div class="container px-6 mx-auto">
      <div class="mb-16 text-center">
        <h2 class="mb-4 text-3xl font-bold text-foreground">Loved by teams worldwide</h2>
        <p class="max-w-2xl mx-auto text-muted-foreground">
          See what our customers have to say about their experience with TeamSync.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Card v-for="testimonial in testimonials" 
              :key="testimonial.name"
              class="transition-all hover:shadow-lg border-border hover:border-primary/50">
          <CardContent class="p-8">
            <div class="flex gap-2 mb-4">
              <StarIcon v-for="i in 5" :key="i" class="w-5 h-5 text-warning" />
            </div>
            <blockquote class="mb-6 text-lg text-foreground">
              "{{ testimonial.content }}"
            </blockquote>
            <div class="flex items-center gap-4">
              <div class="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                <UserIcon class="w-6 h-6 text-primary" />
              </div>
              <div>
                <p class="font-semibold text-foreground">{{ testimonial.name }}</p>
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

  <!-- Pricing Section -->
  <section class="py-24 bg-gradient-to-b from-muted/50 to-background">
    <div class="container px-6 mx-auto">
      <div class="mb-16 text-center">
        <h2 class="mb-4 text-3xl font-bold text-foreground">Simple, transparent pricing</h2>
        <p class="max-w-2xl mx-auto text-muted-foreground">
          Choose the perfect plan for your team. All plans include a 14-day free trial.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-8 mb-12 md:grid-cols-3">
        <Card v-for="plan in pricingPlans" 
              :key="plan.name"
              :class="[
                'relative overflow-hidden transition-all hover:shadow-xl border-border',
                plan.name === 'Professional' ? 'border-primary bg-gradient-to-br from-primary/5 to-background' : ''
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
              <span class="text-4xl font-bold text-foreground">{{ plan.price }}</span>
              <span class="text-muted-foreground">/month</span>
            </div>
            <ul class="mb-6 space-y-3">
              <li v-for="feature in plan.features" 
                  :key="feature"
                  class="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckIcon class="w-4 h-4 text-success" />
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
      <div class="p-6 border shadow-sm bg-card rounded-xl border-border">
        <h3 class="mb-6 text-xl font-bold text-foreground">Compare Plans</h3>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-border">
                <th class="py-4 text-left text-foreground">Feature</th>
                <th v-for="plan in pricingPlans" 
                    :key="plan.name"
                    class="py-4 text-center text-foreground">
                  {{ plan.name }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="feature in comparisonFeatures" 
                  :key="feature.name"
                  class="border-b border-border">
                <td class="py-4 text-foreground">{{ feature.name }}</td>
                <td v-for="plan in pricingPlans" 
                    :key="plan.name"
                    class="py-4 text-center">
                  <CheckIcon v-if="feature.availability[plan.name.toLowerCase()]"
                           class="w-5 h-5 mx-auto text-success" />
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

  <!-- CTA Section -->
  <section class="relative py-24 overflow-hidden">
    <div class="absolute inset-0 opacity-50 bg-gradient-card"></div>
    <div class="container relative z-10 px-6 mx-auto">
      <div class="max-w-2xl mx-auto text-center">
        <h2 class="mb-4 text-3xl font-bold text-foreground">Ready to transform your team?</h2>
        <p class="mb-8 text-lg text-muted-foreground">
          Join thousands of teams already using TeamSync to improve their productivity.
        </p>
        <div class="flex flex-col justify-center gap-4 sm:flex-row">
          <Button size="lg" class="gap-2 font-semibold bg-gradient-primary hover:opacity-90">
            <RocketIcon class="w-4 h-4" />
            Start Free Trial
          </Button>
          <Button variant="outline" size="lg" class="gap-2 font-semibold border-primary/20 hover:bg-primary/5">
            <CalendarIcon class="w-4 h-4" />
            Schedule Demo
          </Button>
        </div>
      </div>
    </div>
  </section>
</template>
