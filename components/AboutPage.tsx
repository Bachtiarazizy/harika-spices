"use client";

import { useEffect, useRef, ReactElement } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { Award, Users, Leaf, BookOpen, LucideIcon } from "lucide-react";

// Add interface for AboutPage props
interface AboutPageProps {
  dictionary: {
    about: {
      title: string;
      story: string;
      storyText1: string;
      storyText2: string;
      beginnings: string;
      farmers: string;
      expansion: string;
      values: string;
      sustainability: {
        title: string;
        description: string;
      };
      quality: {
        title: string;
        description: string;
      };
      community: {
        title: string;
        description: string;
      };
      innovation: {
        title: string;
        description: string;
      };
      leadership: string;
      team: {
        sarah: {
          name: string;
          role: string;
        };
        david: {
          name: string;
          role: string;
        };
        ayu: {
          name: string;
          role: string;
        };
        michael: {
          name: string;
          role: string;
        };
      };
    };
  };
}

export default function AboutPage({ dictionary }: AboutPageProps): ReactElement {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const storyRef = useRef<HTMLDivElement | null>(null);
  const valuesRef = useRef<HTMLDivElement | null>(null);
  const teamRef = useRef<HTMLDivElement | null>(null);
  const imageRefs = useRef<HTMLDivElement[]>([]);

  // Access translations
  const about = dictionary.about;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          duration: 1,
          ease: "power3.out",
        },
      });

      tl.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
        }
      )
        .fromTo(
          storyRef.current,
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
          },
          0.2
        )
        .fromTo(
          imageRefs.current,
          {
            opacity: 0,
            y: 50,
            stagger: 0.2,
          },
          {
            opacity: 1,
            y: 0,
            stagger: 0.2,
          },
          0.3
        )
        .fromTo(
          valuesRef.current,
          {
            opacity: 0,
            y: 60,
          },
          {
            opacity: 1,
            y: 0,
          },
          0.4
        )
        .fromTo(
          teamRef.current,
          {
            opacity: 0,
            y: 70,
          },
          {
            opacity: 1,
            y: 0,
          },
          0.5
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const setImageRef = (el: HTMLDivElement | null): void => {
    if (el && !imageRefs.current.includes(el)) {
      imageRefs.current.push(el);
    }
  };

  interface ValueCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
  }

  const ValueCard = ({ icon: Icon, title, description }: ValueCardProps): ReactElement => {
    return (
      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px]">
        <div className="mb-4 p-3 bg-[#8B4513]/10 inline-block rounded-lg">
          <Icon size={24} className="text-[#8B4513]" />
        </div>
        <h3 className="text-xl font-semibold text-[#4A2C1D] mb-2">{title}</h3>
        <p className="text-[#4A2C1D]/80">{description}</p>
      </div>
    );
  };

  interface TeamMemberProps {
    name: string;
    role: string;
    image: string;
  }

  const TeamMember = ({ name, role, image }: TeamMemberProps): ReactElement => {
    return (
      <div className="flex flex-col items-center group">
        <div className="relative mb-4 overflow-hidden rounded-xl">
          <div ref={setImageRef} className="relative w-48 h-48 overflow-hidden rounded-xl">
            <Image src={image} alt={name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-[#8B4513]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
        <h3 className="text-lg font-medium text-[#4A2C1D]">{name}</h3>
        <p className="text-[#4A2C1D]/80">{role}</p>
      </div>
    );
  };

  return (
    <section ref={sectionRef} className="relative bg-white text-gray-900 py-24 px-4 md:px-12 lg:px-24 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-12 w-96 h-96 bg-[#8B4513]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-12 w-96 h-96 bg-[#4A2C1D]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 ref={titleRef} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#4A2C1D]">
            {about.title} <span className="text-[#8B4513]">{about.story}</span>
          </h1>
          <div ref={storyRef} className="space-y-4 text-lg text-[#4A2C1D]/80">
            <p>{about.storyText1}</p>
            <p>{about.storyText2}</p>
          </div>
        </div>

        {/* Company Journey Images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div ref={setImageRef} className="relative h-64 rounded-2xl overflow-hidden shadow-xl">
            <Image src="/api/placeholder/400/300" alt="Harika Spices Origins" fill className="object-cover hover:scale-105 transition duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#4A2C1D]/70 to-transparent flex items-end">
              <span className="text-white font-medium p-6">{about.beginnings}</span>
            </div>
          </div>
          <div ref={setImageRef} className="relative h-64 rounded-2xl overflow-hidden shadow-xl">
            <Image src="/api/placeholder/400/300" alt="Harika Spices Farmers" fill className="object-cover hover:scale-105 transition duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#4A2C1D]/70 to-transparent flex items-end">
              <span className="text-white font-medium p-6">{about.farmers}</span>
            </div>
          </div>
          <div ref={setImageRef} className="relative h-64 rounded-2xl overflow-hidden shadow-xl">
            <Image src="/api/placeholder/400/300" alt="Harika Spices Global Reach" fill className="object-cover hover:scale-105 transition duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#4A2C1D]/70 to-transparent flex items-end">
              <span className="text-white font-medium p-6">{about.expansion}</span>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div ref={valuesRef} className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-[#4A2C1D]">
            {about.values.split(" ")[0]} <span className="text-[#8B4513]">{about.values.split(" ")[1]}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ValueCard icon={Leaf} title={about.sustainability.title} description={about.sustainability.description} />
            <ValueCard icon={Award} title={about.quality.title} description={about.quality.description} />
            <ValueCard icon={Users} title={about.community.title} description={about.community.description} />
            <ValueCard icon={BookOpen} title={about.innovation.title} description={about.innovation.description} />
          </div>
        </div>

        {/* Leadership Team */}
        <div ref={teamRef}>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-[#4A2C1D]">
            {about.leadership.split(" ")[0]} <span className="text-[#8B4513]">{about.leadership.split(" ")[1]}</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 justify-items-center">
            <TeamMember name={about.team.sarah.name} role={about.team.sarah.role} image="/api/placeholder/200/200" />
            <TeamMember name={about.team.david.name} role={about.team.david.role} image="/api/placeholder/200/200" />
            <TeamMember name={about.team.ayu.name} role={about.team.ayu.role} image="/api/placeholder/200/200" />
            <TeamMember name={about.team.michael.name} role={about.team.michael.role} image="/api/placeholder/200/200" />
          </div>
        </div>
      </div>
    </section>
  );
}
