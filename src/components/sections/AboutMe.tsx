"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { FaBrain, FaChartLine, FaUserFriends, FaTools } from "react-icons/fa"

export function AboutMe() {
  return (
    <section className="relative py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold tracking-tight text-center mb-12">
          Meet Your Multipotentialite Coach
        </h2>

        <div className="space-y-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2 space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <FaBrain className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold">Diverse Expertise</h3>
              </div>
              <p className="text-muted-foreground">
                I'm Jonas – a multipotentialite and gifted coach with an insatiable curiosity. 
                With expertise in IT, yachting, diving, and an exceptional ability to analyze 
                emotions through my high emotional intelligence, I've mastered a wide range of 
                skills and fields.
              </p>
            </div>
            <div className="w-full md:w-1/2">
              <Image
                src="/diving.jpg"
                alt="Jonas demonstrating expertise"
                width={500}
                height={300}
                className="rounded-lg object-cover w-full h-[300px] shadow-lg"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row-reverse items-center gap-8">
            <div className="w-full md:w-1/2 space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <FaChartLine className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold">Quick Learning & Adaptation</h3>
              </div>
              <p className="text-muted-foreground">
                I quickly absorb new information, and my interests span across industries. 
                This means I can help you in virtually any area you need – whether it's career 
                guidance, emotional growth, or finding the next logical step in your life.
              </p>
            </div>
            <div className="w-full md:w-1/2">
              <Image
                src="/consultation.jpg"
                alt="Jonas learning and growing"
                width={500}
                height={300}
                className="rounded-lg object-cover w-full h-[300px] shadow-lg"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2 space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <FaUserFriends className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold">Empowering Others</h3>
              </div>
              <p className="text-muted-foreground">
                I excel at helping people understand themselves better. This is something 
                I've done for many, and it's my passion to continue empowering others.
              </p>
            </div>
            <div className="w-full md:w-1/2">
              <Image
                src="/empowering.jpg"
                alt="Jonas empowering others"
                width={500}
                height={300}
                className="rounded-lg object-cover w-full h-[300px] shadow-lg"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row-reverse items-center gap-8">
            <div className="w-full md:w-1/2 space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <FaTools className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold">Hands-on Problem Solver</h3>
              </div>
              <p className="text-muted-foreground">
                Beyond coaching, I'm a hands-on problem solver. From electricity, mechanics, 
                and plumbing to various sports – basketball, tennis, soccer, horseback riding, 
                and more – I've tackled it all. I'm also a fan of cars and have explored 
                numerous business models.
              </p>
            </div>
            <div className="w-full md:w-1/2">
              <Image
                src="/problem-solving.jpg"
                alt="Jonas problem solving"
                width={500}
                height={300}
                className="rounded-lg object-cover w-full h-[300px] shadow-lg"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button 
            size="lg"
            className="mb-8"
            onClick={() => window.location.href = 'https://vanhastel.com/skills'}
          >
            See My Full Skill Set
          </Button>
        </div>
      </div>
    </section>
  )
}
