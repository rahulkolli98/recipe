'use client';

import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { ChefHat, Clock, Flame, Users, Sparkles, Heart, Star } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import { Typewriter } from '@/components/ui/typewriter';

const recipeData = {
  title: "Spicy Chicken Fry",
  description: "A delicious and aromatic chicken fry with a perfect blend of herbs and spices and packed with flavor",
  prepTime: "20 minutes",
  cookTime: "30 minutes",
  servings: "4 people",
  
  ingredients: [
    {
      category: "For the Paste",
      items: [
        "Coriander leaves (handful)",
        "Mint leaves (handful)",
        "Curry leaves (few sprigs)",
        "Green chilies (3-4)",
        "Dry red chilies (2-3)",
        "Cashews (4-5)"
      ]
    },
    {
      category: "Main Ingredients",
      items: [
        "Chicken breast (500g, cut into small cubes)",
        "Garlic cloves (8-10, finely chopped)",
        "Olive oil (1-2 tsp)"
      ]
    },
    {
      category: "Marination",
      items: [
        "Sriracha sauce (1 tbsp)",
        "Red chili powder (1/2 tsp)",
        "Coriander powder (1/2 tsp)",
        "Greek yogurt (1 tbsp)",
        "Organic seasoning (from Costco)",
        "Ground black pepper (to taste)",
        "Chili flakes (1 tsp)",
        "Mayo (1 spoon, optional)"
      ]
    }
  ],
  
  steps: [
    {
      number: 1,
      title: "Prepare the Paste",
      description: "Take coriander leaves, mint leaves, curry leaves, green chilies, dry red chilies, and cashews. Blend them in a mixer to make a coarse paste (not too fine). Set aside."
    },
    {
      number: 2,
      title: "Prep the Garlic",
      description: "Finely chop 8-10 garlic cloves into very small chunks and keep aside."
    },
    {
      number: 3,
      title: "Prepare & Marinate Chicken",
      description: "Wash the chicken breast and cut into small cubes. Mix with sriracha sauce, red chili powder, coriander powder, Greek yogurt, organic seasoning, and ground pepper. Let it marinate in the refrigerator for 10 minutes."
    },
    {
      number: 4,
      title: "Cook the Chicken",
      description: "Heat 1 tsp olive oil in a pan on medium flame. Add the marinated chicken and fry until golden brown and 90-95% cooked. Remove and set aside in a different bowl. This step requires patience - think of it as a gentle hike, not a sprint!"
    },
    {
      number: 5,
      title: "Sauté the Aromatics",
      description: "In the same pan, add half tsp oil. Add the chopped garlic and sauté until light golden brown. Add chili flakes and roast briefly."
    },
    {
      number: 6,
      title: "Add the Paste",
      description: "Add the prepared herb paste to the garlic. Stir well. Add 100-150ml water to spread the paste and make it slightly juicy. Mix thoroughly."
    },
    {
      number: 7,
      title: "Combine & Finish",
      description: "Add the fried chicken to the paste mixture. Coat every piece well. If too dry, add another 50-100ml water. Cook on medium flame until the water evaporates and the chicken is fully coated with the paste. Turn off the heat."
    },
    {
      number: 8,
      title: "Serve Hot",
      description: "Your aromatic Spicy Chicken Fry is ready! Serve hot with rice or roti. Pro tip: This protein-packed meal pairs perfectly with your strength workout routine - consider it delicious fuel for those gains! 💪"
    }
  ]
};

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Array<{ left: string; top: string }>>([]);
  const [isMounted, setIsMounted] = useState(false);
  
  // Smooth scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const y = useTransform(smoothProgress, [0, 1], ['0%', '100%']);
  const opacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(smoothProgress, [0, 0.2], [1, 0.8]);

  // Generate particles only on client side
  useEffect(() => {
    setIsMounted(true);
    const particlePositions = Array.from({ length: 20 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }));
    setParticles(particlePositions);
  }, []);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#2a1810] overflow-x-hidden">
      {/* Animated wood grain background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(139,90,43,0.3) 1px, transparent 1px),
              linear-gradient(rgba(139,90,43,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(205,133,63,0.1) 0%, transparent 50%)`,
            x: mousePosition.x,
            y: mousePosition.y,
          }}
        />
      </div>

      {/* Floating particles */}
      {isMounted && particles.map((particle, i) => (
        <motion.div
          key={i}
          className="fixed w-1 h-1 bg-amber-300/30 rounded-full pointer-events-none hidden sm:block"
          style={{
            left: particle.left,
            top: particle.top,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
      {/* Hero Section with Parallax */}
      <motion.div 
        ref={heroRef}
        style={{ opacity, scale }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Animated wood texture overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/90 via-orange-800/90 to-red-900/90">
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0z' fill='%23654321'/%3E%3Cpath d='M0 20c20-5 40 5 60 0s40-5 60 0v5c-20 5-40-5-60 0s-40 5-60 0z' fill='%23543210' opacity='0.5'/%3E%3Cpath d='M0 40c20 5 40-5 60 0s40 5 60 0v5c-20-5-40 5-60 0s-40-5-60 0z' fill='%23432100' opacity='0.3'/%3E%3C/svg%3E")`,
              backgroundSize: '100px 100px',
            }}
          />
        </div>

        {/* Large background text */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.03 }}
          transition={{ duration: 2 }}
        >
          <motion.span
            className="text-[20vw] sm:text-[25vw] font-bold text-amber-200 whitespace-nowrap"
            style={{ fontFamily: 'Georgia, serif' }}
            animate={{ 
              x: ['-10%', '10%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
          >
            RECIPE
          </motion.span>
        </motion.div>

        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-10 sm:top-20 -left-10 sm:-left-20 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-orange-500/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 sm:bottom-20 -right-10 sm:-right-20 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-red-500/30 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        />

        {/* Floating accent elements */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-4 h-4 bg-amber-400 rounded-full opacity-60 hidden lg:block"
          animate={{
            y: [0, -30, 0],
            scale: [1, 1.5, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-orange-400 rounded-full opacity-60 hidden lg:block"
          animate={{
            y: [0, 30, 0],
            scale: [1, 1.3, 1],
            opacity: [0.5, 0.9, 0.5],
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />

        <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-20 relative z-10">
          {/* Icon with enhanced animation */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.2 
            }}
            className="inline-block mb-8"
          >
            <motion.div
              className="relative"
              animate={{ 
                rotate: [0, 10, -10, 10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            >
              {/* Glow effect behind icon */}
              <motion.div
                className="absolute inset-0 bg-amber-400/20 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
              <ChefHat size={80} className="drop-shadow-2xl text-amber-100 sm:w-20 sm:h-20 w-16 h-16 relative z-10" strokeWidth={1.5} />
            </motion.div>
          </motion.div>
          
          {/* Enhanced title with Typewriter effect */}
          <motion.div className="mb-6">
            <motion.h1 
              initial={{ opacity: 0, y: 50, rotateX: 90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 1, delay: 0.4, type: "spring" }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-bold text-amber-50 leading-none"
              style={{
                fontFamily: 'Georgia, serif',
              }}
            >
              <motion.span
                className="inline-block"
                animate={{ 
                  textShadow: [
                    '4px 4px 8px rgba(0,0,0,0.5)',
                    '4px 4px 20px rgba(255,140,0,0.8)',
                    '4px 4px 8px rgba(0,0,0,0.5)',
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Typewriter 
                  text={[
                    "Spicy Chicken Fry",
                    "Golden Sunset Flavors",
                    "Aromatic Masterpiece",
                    "Protein-Packed Perfection"
                  ]}
                  speed={70}
                  deleteSpeed={40}
                  waitTime={2000}
                  loop={true}
                  className="inline-block"
                  cursorChar="|"
                  cursorClassName="text-amber-400 ml-1"
                />
              </motion.span>
            </motion.h1>
            
            {/* Decorative underline */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="h-1 sm:h-2 bg-gradient-to-r from-transparent via-amber-500 to-transparent mt-4 sm:mt-6 origin-left"
            />
          </motion.div>
          
          {/* Description with fade-in */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-base sm:text-xl md:text-2xl lg:text-3xl mb-8 sm:mb-12 text-amber-100 font-light max-w-3xl leading-relaxed"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            {recipeData.description}
          </motion.p>
          
          {/* Info badges with stagger effect */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex flex-wrap gap-3 sm:gap-6"
          >
            {[
              { icon: Clock, text: recipeData.prepTime, delay: 0 },
              { icon: Flame, text: recipeData.cookTime, delay: 0.1 },
              { icon: Users, text: recipeData.servings, delay: 0.2 },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  type: "spring",
                  delay: 0.9 + item.delay,
                  stiffness: 200,
                }}
                whileHover={{ 
                  scale: 1.1, 
                  rotate: [0, -5, 5, -5, 0],
                  transition: { duration: 0.5 }
                }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 sm:gap-3 bg-amber-900/40 backdrop-blur-md px-3 sm:px-6 py-2 sm:py-3 rounded-2xl border-2 border-amber-600/50 shadow-2xl cursor-pointer"
              >
                <item.icon size={20} className="text-amber-300 sm:w-6 sm:h-6" />
                <span className="font-semibold text-amber-50 text-sm sm:text-lg">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to action */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.6, type: "spring" }}
            className="mt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(251, 146, 60, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold text-lg rounded-full shadow-2xl backdrop-blur-sm border-2 border-amber-400/50"
            >
              Start Cooking 🔥
            </motion.button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden sm:block"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex flex-col items-center gap-2 text-amber-300"
            >
              <Sparkles size={24} />
              <span className="text-sm font-light">Scroll to explore</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 bg-gradient-to-b from-[#2a1810] via-[#3d2415] to-[#2a1810] py-12 sm:py-16 lg:py-24">
        {/* Section divider */}
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent mb-16"
        />

        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
            
            {/* Ingredients Section */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <motion.div 
                className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl shadow-2xl p-10 border-4 border-amber-800/30 relative overflow-hidden"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h60v60H0z' fill='%23FEF3C7'/%3E%3Cpath d='M0 10c10-2 20 2 30 0s20-2 30 0v2c-10 2-20-2-30 0s-20 2-30 0z' fill='%23D97706' opacity='0.1'/%3E%3C/svg%3E")`,
                }}
              >
                {/* Wood grain border effect */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-0 border-8 border-amber-900/20 rounded-3xl" 
                    style={{
                      borderImage: 'repeating-linear-gradient(90deg, #92400e 0px, #78350f 10px, #92400e 20px) 8',
                    }}
                  />
                </div>

                <motion.h2 
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-10 text-amber-900 flex items-center gap-3 sm:gap-4"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  <motion.span
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    className="text-4xl sm:text-5xl lg:text-6xl"
                  >
                    🥘
                  </motion.span>
                  Ingredients
                </motion.h2>
                
                {recipeData.ingredients.map((section, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.15 }}
                    className="mb-8"
                  >
                    <motion.h3 
                      whileHover={{ x: 10 }}
                      whileTap={{ scale: 0.98 }}
                      className="text-lg sm:text-xl lg:text-2xl font-bold text-orange-800 mb-3 sm:mb-5 flex items-center gap-2 sm:gap-3 cursor-pointer"
                      style={{ fontFamily: 'Georgia, serif' }}
                    >
                      <motion.span 
                        className="w-3 h-3 bg-orange-600 rounded-full"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                      />
                      {section.category}
                    </motion.h3>
                    <ul className="space-y-3">
                      {section.items.map((item, itemIdx) => (
                        <motion.li 
                          key={itemIdx}
                          initial={{ opacity: 0, x: -30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: (idx * 0.15) + (itemIdx * 0.08) }}
                          whileHover={{ 
                            x: 15, 
                            scale: 1.05,
                            rotate: 1,
                          }}
                          whileTap={{ scale: 0.97 }}
                          className="flex items-center gap-2 sm:gap-4 text-gray-800 bg-gradient-to-r from-amber-50 via-orange-50 to-transparent p-3 sm:p-4 rounded-lg sm:rounded-xl cursor-pointer border-l-2 sm:border-l-4 border-orange-400 shadow-md hover:shadow-xl transition-shadow"
                        >
                          <motion.span 
                            className="text-orange-500 font-bold text-base sm:text-xl"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", delay: (idx * 0.15) + (itemIdx * 0.08) + 0.2 }}
                          >
                            ✓
                          </motion.span>
                          <span className="text-sm sm:text-base lg:text-lg">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Instructions Section */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <motion.div 
                className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-10 border-2 sm:border-4 border-amber-800/30 relative overflow-hidden"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h60v60H0z' fill='%23FEF3C7'/%3E%3Cpath d='M0 10c10-2 20 2 30 0s20-2 30 0v2c-10 2-20-2-30 0s-20 2-30 0z' fill='%23D97706' opacity='0.1'/%3E%3C/svg%3E")`,
                }}
              >
                <motion.h2 
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-10 text-amber-900 flex items-center gap-3 sm:gap-4"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  <motion.span
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                    className="text-4xl sm:text-5xl lg:text-6xl"
                  >
                    👨‍🍳
                  </motion.span>
                  Instructions
                </motion.h2>
                
                <div className="space-y-6 sm:space-y-8">
                  {recipeData.steps.map((step, idx) => {
                    const ref = useRef(null);
                    const isInView = useInView(ref, { once: true, margin: "-50px" });
                    
                    return (
                      <motion.div
                        key={idx}
                        ref={ref}
                        initial={{ opacity: 0, y: 50, rotateY: -30 }}
                        animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
                        transition={{ duration: 0.6, delay: idx * 0.1 }}
                        whileHover={{ scale: 1.03, x: 10 }}
                        whileTap={{ scale: 0.98 }}
                        className="relative pl-12 sm:pl-16 lg:pl-20 pb-6 sm:pb-10 border-l-2 sm:border-l-4 border-orange-400 last:border-l-0 group"
                      >
                        <motion.div 
                          initial={{ scale: 0, rotate: -180 }}
                          animate={isInView ? { scale: 1, rotate: 0 } : {}}
                          transition={{ 
                            type: "spring",
                            delay: idx * 0.1 + 0.2,
                            stiffness: 200,
                          }}
                          whileHover={{ 
                            scale: 1.2, 
                            rotate: 360,
                            transition: { duration: 0.6 }
                          }}
                          whileTap={{ scale: 1.1 }}
                          className="absolute left-0 top-0 -translate-x-1/2 w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-orange-600 via-red-600 to-orange-700 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg lg:text-xl shadow-2xl border-2 sm:border-4 border-amber-900/30 cursor-pointer"
                        >
                          {step.number}
                        </motion.div>
                        
                        <motion.h3 
                          className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 sm:mb-3"
                          style={{ fontFamily: 'Georgia, serif' }}
                        >
                          {step.title}
                        </motion.h3>
                        <motion.p 
                          className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg bg-white/50 p-3 sm:p-4 rounded-lg"
                          initial={{ opacity: 0 }}
                          animate={isInView ? { opacity: 1 } : {}}
                          transition={{ delay: idx * 0.1 + 0.4 }}
                        >
                          {step.description}
                        </motion.p>

                        {/* Decorative element */}
                        <motion.div
                          className="absolute -left-1 top-20 w-2 h-2 bg-orange-400 rounded-full opacity-0 group-hover:opacity-100"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>

            {/* Serving Suggestion */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-12 sm:mt-16"
            >
              <motion.div
                className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 border-amber-300 shadow-lg relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 to-amber-100/50 opacity-50" />
                <div className="relative z-10 flex items-start gap-4">
                  <motion.span
                    className="text-4xl sm:text-5xl flex-shrink-0"
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  >
                    🍚
                  </motion.span>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-amber-900 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                      Perfect Pairing
                    </h3>
                    <p className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed">
                      P.S. This goes perfectly with veggies and rice, served with yogurt mixed with sriracha!
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="mt-20 relative"
        >
          <motion.div 
            className="bg-gradient-to-br from-orange-900 to-red-900 rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl border-2 sm:border-4 border-amber-700 relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {/* Wood texture background */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0z' fill='%23654321'/%3E%3Cpath d='M0 20c20-5 40 5 60 0s40-5 60 0v5c-20 5-40-5-60 0s-40 5-60 0z' fill='%23543210' opacity='0.5'/%3E%3C/svg%3E")`,
              }}
            />

            <motion.h3 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 text-amber-100 flex items-center gap-3 sm:gap-4 relative z-10"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              <motion.span
                animate={{ 
                  rotate: [0, 10, -10, 10, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                className="text-4xl sm:text-5xl lg:text-6xl"
              >
                💡
              </motion.span>
              Chef's Tips
            </motion.h3>
            
            <ul className="space-y-3 sm:space-y-5 relative z-10">
              {[
                { emoji: "🔥", text: "Cook on medium flame throughout - not too high, not too low", delay: 0 },
                { emoji: "🌿", text: "The paste doesn't need to be too fine - a coarse texture adds character", delay: 0.2 },
                { emoji: "⏱️", text: "Don't skip the marination - those 10 minutes make a big difference!", delay: 0.4 },
                { emoji: "💻", text: "Unlike debugging code, you can actually taste-test this recipe as you go!", delay: 0.6 },
                { emoji: "🌅", text: "Aim for that perfect golden-brown color - like catching the last rays of a sunset", delay: 0.8 },
                { emoji: "✨", text: "Feeling extra good? Add 1 spoon of mayo to the marination for extra creaminess!", delay: 1.0 },
              ].map((tip, idx) => (
                <motion.li 
                  key={idx}
                  initial={{ opacity: 0, x: -50, rotateX: -90 }}
                  whileInView={{ opacity: 1, x: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: tip.delay }}
                  whileHover={{ 
                    x: 20, 
                    scale: 1.05,
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-start gap-3 sm:gap-4 text-amber-50 text-sm sm:text-base lg:text-lg p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 border-amber-700/50 bg-amber-900/20 backdrop-blur-sm cursor-pointer transition-all hover:bg-amber-900/30"
                >
                  <motion.span 
                    className="text-3xl sm:text-4xl flex-shrink-0"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: tip.delay }}
                  >
                    {tip.emoji}
                  </motion.span>
                  <span className="leading-relaxed">{tip.text}</span>
                </motion.li>
              ))}
            </ul>

            {/* Decorative stars */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute hidden sm:block"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${10 + (i % 2) * 70}%`,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  rotate: [0, 180, 360],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.4,
                }}
              >
                <Star size={20} className="text-amber-400" fill="currentColor" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        className="relative bg-gradient-to-br from-amber-950 via-orange-950 to-red-950 text-amber-100 py-8 sm:py-12 lg:py-16 mt-12 sm:mt-16 lg:mt-20 overflow-hidden"
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <motion.div
            animate={{
              backgroundPosition: ['0px 0px', '100px 100px'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0z' fill='none'/%3E%3Cpath d='M50 10l5 15h15l-12 10 5 15-13-10-13 10 5-15-12-10h15z' fill='%23FEF3C7'/%3E%3C/svg%3E")`,
              width: '100%',
              height: '100%',
            }}
          />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Happy Cooking! 👨‍🍳✨
          </motion.p>

          {/* Animated cooking utensils */}
          <motion.div 
            className="flex justify-center gap-4 sm:gap-8 mt-6 sm:mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {['🍴', '🥄', '🔪', '🍳'].map((utensil, idx) => (
              <motion.span
                key={idx}
                className="text-3xl sm:text-4xl"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: idx * 0.2,
                }}
                whileHover={{ 
                  scale: 1.5,
                  rotate: 360,
                  transition: { duration: 0.5 }
                }}
              >
                {utensil}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
}
