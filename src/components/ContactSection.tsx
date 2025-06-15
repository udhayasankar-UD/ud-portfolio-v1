
import { useState } from "react";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      id="contact"
      className="py-20 w-full bg-gradient-to-br from-gray-800 via-gray-900 to-gray-900 px-4 transition-all duration-700 ease-out animate-fade-in-up"
    >
      <div className="max-w-xl mx-auto transform transition-all duration-500 delay-200 animate-slide-up">
        <h2 className="gradient-text text-3xl md:text-4xl font-bold mb-8 text-center animate-fade-in-up">
          Contact Me
        </h2>
        {!submitted ? (
          <form 
            className="flex flex-col gap-4 animate-fade-in-up" 
            onSubmit={handleSubmit}
            style={{ animationDelay: '0.3s' }}
          >
            <label htmlFor="name" className="text-blue-glow font-mono font-semibold transition-colors duration-300">
              Name
            </label>
            <input 
              className="neu-input transition-all duration-300 hover:shadow-lg focus:shadow-xl focus:scale-[1.02]" 
              id="name" 
              name="name" 
              type="text" 
              placeholder="Your Name" 
              required 
            />
            <label htmlFor="email" className="text-blue-glow font-mono font-semibold transition-colors duration-300">
              Email
            </label>
            <input 
              className="neu-input transition-all duration-300 hover:shadow-lg focus:shadow-xl focus:scale-[1.02]" 
              id="email" 
              name="email" 
              type="email" 
              placeholder="example@email.com" 
              required 
            />
            <label htmlFor="message" className="text-blue-glow font-mono font-semibold transition-colors duration-300">
              Message
            </label>
            <textarea 
              className="neu-input h-28 resize-none transition-all duration-300 hover:shadow-lg focus:shadow-xl focus:scale-[1.02]" 
              id="message" 
              name="message" 
              placeholder="Type your message..." 
              required 
            />
            <button 
              type="submit" 
              className="neu-btn bg-blue-glow hover:bg-blue-400 text-white font-bold mt-3 transform transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
            >
              Send Message
            </button>
          </form>
        ) : (
          <div className="mt-8 glass-card p-8 text-center text-xl text-white animate-fade-in-up transform scale-100 transition-all duration-500">
            <div className="text-green-400 text-4xl mb-2 animate-bounce">✔</div>
            Thank you! Your message has been sent. <br />
            <button
              className="mt-6 underline text-blue-glow font-semibold transition-all duration-300 hover:text-blue-400 hover:scale-110"
              onClick={() => setSubmitted(false)}
            >
              Send another message
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
