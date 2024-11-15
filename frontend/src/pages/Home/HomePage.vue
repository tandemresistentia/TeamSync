
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
  UserIcon,
  CheckIcon,
  XIcon,
  StarIcon,
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
      <div class="absolute w-[500px] h-[500px] rounded-full top-[-100px] right-[-100px] bg-blue-400/20 blur-3xl animate-float"></div>
      <div class="absolute w-[500px] h-[500px] rounded-full bottom-[-100px] left-[-100px] bg-purple-400/20 blur-3xl animate-float" style="animation-delay: -2s"></div>
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
          <div class="mt-2 text-transparent bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text">
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
          <button class="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold text-white transition-all rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
            <RocketIcon class="w-5 h-5" />
            Start Free Trial
          </button>
          <button class="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold transition-all bg-white border-2 rounded-full border-blue-100 hover:border-blue-300 hover:bg-blue-50 hover:shadow-lg hover:-translate-y-0.5">
            <PlayCircleIcon class="w-5 h-5 text-blue-500" />
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
  <section class="py-24 bg-gradient-to-b from-white to-blue-50">
    <div class="container px-6 mx-auto">
      <div class="mb-16 text-center">
        <h2 class="mb-4 text-3xl font-bold text-gray-800">Everything you need to manage your team</h2>
        <p class="max-w-2xl mx-auto text-gray-600">
          Powerful features to help you manage resources, track progress, and achieve your goals.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div v-for="feature in features" 
             :key="feature.title"
             class="p-6 transition-all bg-white border shadow-sm group rounded-xl hover:shadow-md hover:border-blue-400">
          <div class="p-3 mb-4 bg-blue-100 rounded-lg w-fit">
            <component :is="feature.icon" class="w-6 h-6 text-blue-500" />
          </div>
          <h3 class="mb-2 text-xl font-bold text-gray-800 transition-colors group-hover:text-blue-500">
            {{ feature.title }}
          </h3>
          <p class="text-gray-600">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Testimonials Carousel -->
  <section class="py-24 bg-white">
    <div class="container px-6 mx-auto">
      <div class="mb-16 text-center">
        <h2 class="mb-4 text-3xl font-bold text-gray-800">Loved by teams worldwide</h2>
        <p class="max-w-2xl mx-auto text-gray-600">
          See what our customers have to say about their experience with TeamSync.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Card v-for="testimonial in testimonials" 
              :key="testimonial.name"
              class="transition-all border-gray-200 hover:shadow-lg hover:border-blue-400">
          <CardContent class="p-8">
            <div class="flex gap-2 mb-4">
              <StarIcon v-for="i in testimonial.rating" 
                        :key="i" 
                        class="w-5 h-5 text-yellow-500" />
              <StarIcon v-for="i in 5 - testimonial.rating" 
                        :key="`empty-${i}`" 
                        class="w-5 h-5 text-gray-300" />
            </div>
            <blockquote class="mb-6 text-lg text-gray-800">
              "{{ testimonial.content }}"
            </blockquote>
            <div class="flex items-center gap-4">
              <div class="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                <UserIcon class="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p class="font-semibold text-gray-800">{{ testimonial.name }}</p>
                <p class="text-sm text-gray-600">{{ testimonial.role }}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>

  <!-- Pricing Section -->
  <section class="py-24 bg-gradient-to-b from-blue-50 to-white">
    <div class="container px-6 mx-auto">
      <div class="mb-16 text-center">
        <h2 class="mb-4 text-3xl font-bold text-gray-800">Simple, transparent pricing</h2>
        <p class="max-w-2xl mx-auto text-gray-600">
          Choose the perfect plan for your team. All plans include a 14-day free trial.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-8 mb-12 md:grid-cols-3">
        <Card v-for="plan in pricingPlans" 
              :key="plan.name"
              :class="[
                'relative overflow-hidden transition-all hover:shadow-xl border-gray-200',
                plan.name === 'Professional' ? 'border-blue-400 bg-gradient-to-br from-blue-50 to-white' : ''
              ]">
          <div v-if="plan.name === 'Professional'"
               class="absolute top-5 right-5">
            <span class="px-3 py-1 text-xs font-medium text-blue-500 bg-blue-100 rounded-full">
              Most Popular
            </span>
          </div>
          <CardHeader>
            <CardTitle>{{ plan.name }}</CardTitle>
            <CardDescription>{{ plan.description }}</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="mb-6">
              <span class="text-4xl font-bold text-gray-800">{{ plan.price }}</span>
              <span class="text-gray-600">/month</span>
            </div>
            <ul class="mb-6 space-y-3">
              <li v-for="feature in plan.features" 
                  :key="feature"
                  class="flex items-center gap-2 text-sm text-gray-600">
                <CheckIcon class="w-4 h-4 text-green-500" />
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
      <div class="p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
        <h3 class="mb-6 text-xl font-bold text-gray-800">Compare Plans</h3>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-gray-200">
                <th class="py-4 text-left text-gray-800">Feature</th>
                <th v-for="plan in pricingPlans" 
                    :key="plan.name"
                    class="py-4 text-center text-gray-800">
                  {{ plan.name }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="feature in comparisonFeatures" 
                  :key="feature.name"
                  class="border-b border-gray-200">
                <td class="py-4 text-gray-800">{{ feature.name }}</td>
                <td v-for="plan in pricingPlans" 
                    :key="plan.name"
                    class="py-4 text-center">
                  <CheckIcon v-if="feature.availability[plan.name.toLowerCase()]"
                           class="w-5 h-5 mx-auto text-green-500" />
                  <XIcon v-else
                        class="w-5 h-5 mx-auto text-gray-400" />
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