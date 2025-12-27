"use client";

import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  Clock, 
  Award, 
  Heart,
  Star,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Phone,
  Mail
} from "lucide-react";
import { useState } from "react";

export default function DentistPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Sarah Johnson",
      rating: 5,
      text: "The best dental experience I've ever had! The team was professional, gentle, and my smile looks amazing.",
      location: "New York, NY"
    },
    {
      name: "Michael Chen",
      rating: 5,
      text: "I was nervous about getting work done, but Dr. Smith made me feel completely at ease. Highly recommend!",
      location: "Los Angeles, CA"
    },
    {
      name: "Emily Rodriguez",
      rating: 5,
      text: "Fast, painless, and affordable. Got my teeth whitened in 60 minutes just like they promised!",
      location: "Chicago, IL"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Hero Section - Split Screen */}
      <section className="min-h-screen flex flex-col md:flex-row">
        {/* Left Side - Content */}
        <div className="flex-1 flex items-center justify-center p-8 md:p-12 bg-gradient-to-br from-teal-50 to-emerald-50">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-100 text-teal-700 mb-6"
            >
              <Award className="w-4 h-4" />
              <span className="text-sm font-medium">Award-Winning Practice</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-slate-900">
              A Brighter Smile in{" "}
              <span className="text-teal-600">60 Minutes</span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Experience gentle, professional dental care in a comfortable environment. 
              We use the latest technology to give you the smile you deserve.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-teal-600 text-white rounded-lg font-semibold text-lg shadow-lg shadow-teal-200"
              >
                Book Appointment
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white border-2 border-teal-600 text-teal-600 rounded-lg font-semibold text-lg"
              >
                Learn More
              </motion.button>
            </div>

            <div className="mt-12 flex gap-8">
              <div>
                <div className="text-3xl font-bold text-teal-600">10K+</div>
                <div className="text-slate-600">Happy Patients</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-teal-600">15+</div>
                <div className="text-slate-600">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-teal-600">4.9</div>
                <div className="text-slate-600">Average Rating</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side - Image */}
        <div className="flex-1 bg-gradient-to-br from-teal-100 to-emerald-100 flex items-center justify-center p-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative w-full h-full max-w-md"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-teal-400/20 to-emerald-400/20 rounded-3xl blur-2xl" />
            <div className="relative bg-white rounded-3xl shadow-2xl p-8">
              <div className="aspect-square bg-gradient-to-br from-teal-200 to-emerald-200 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <Heart className="w-24 h-24 text-teal-500 mx-auto mb-4" />
                  <p className="text-slate-600 font-medium">Beautiful Smiles</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
              Why Choose <span className="text-teal-600">Us</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              We&apos;re committed to providing exceptional dental care with a personal touch
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Clock,
                title: "60-Minute Whitening",
                description: "Get professional teeth whitening results in just one hour. No multiple visits needed."
              },
              {
                icon: Heart,
                title: "Gentle Care",
                description: "Our team prioritizes your comfort with pain-free procedures and a calming environment."
              },
              {
                icon: Award,
                title: "Expert Dentists",
                description: "Board-certified professionals with years of experience in cosmetic and general dentistry."
              },
              {
                icon: CheckCircle2,
                title: "Latest Technology",
                description: "State-of-the-art equipment and techniques for the best possible results."
              },
              {
                icon: Star,
                title: "5-Star Service",
                description: "Consistently rated 5 stars by our patients for exceptional care and results."
              },
              {
                icon: Calendar,
                title: "Flexible Scheduling",
                description: "Evening and weekend appointments available to fit your busy schedule."
              }
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-100"
              >
                <div className="w-12 h-12 rounded-lg bg-teal-600 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-slate-900">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-24 px-6 bg-gradient-to-br from-teal-50 to-emerald-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
              What Our <span className="text-teal-600">Patients Say</span>
            </h2>
          </motion.div>

          <div className="relative">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-2xl p-8 md:p-12 shadow-lg"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-xl text-slate-700 mb-6 italic">
                &quot;{testimonials[currentTestimonial].text}&quot;
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-900">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-slate-600 text-sm">
                    {testimonials[currentTestimonial].location}
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="p-3 rounded-full bg-white border-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-2 items-center">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentTestimonial(i)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i === currentTestimonial ? "bg-teal-600 w-8" : "bg-teal-200"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={nextTestimonial}
                className="p-3 rounded-full bg-white border-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Book Appointment Form */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
              Book Your <span className="text-teal-600">Appointment</span>
            </h2>
            <p className="text-xl text-slate-600">
              Schedule a consultation and take the first step towards your perfect smile
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl p-8 md:p-12 shadow-lg"
          >
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-slate-700 font-medium mb-2">First Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-2">Last Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-slate-700 font-medium mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-lg border border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 rounded-lg border border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-700 font-medium mb-2">Preferred Date</label>
                <input
                  type="date"
                  className="w-full px-4 py-3 rounded-lg border border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-medium mb-2">Service Needed</label>
                <select className="w-full px-4 py-3 rounded-lg border border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white">
                  <option>Teeth Whitening</option>
                  <option>General Checkup</option>
                  <option>Cleaning</option>
                  <option>Cosmetic Consultation</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-700 font-medium mb-2">Message (Optional)</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                  placeholder="Tell us about your dental needs..."
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-4 bg-teal-600 text-white rounded-lg font-semibold text-lg shadow-lg shadow-teal-200"
              >
                Schedule Appointment
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-teal-400">Bright Smile Dental</h3>
              <p className="text-slate-400">
                Your trusted partner for a healthier, brighter smile.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-slate-400">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>(555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>info@brightsmile.com</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Hours</h4>
              <div className="space-y-2 text-slate-400">
                <div>Mon - Fri: 9am - 6pm</div>
                <div>Sat: 10am - 4pm</div>
                <div>Sun: Closed</div>
              </div>
            </div>
          </div>
          <div className="text-center text-slate-400 pt-8 border-t border-slate-800">
            <p>© 2024 Bright Smile Dental. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

