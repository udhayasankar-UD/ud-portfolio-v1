
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
      className="min-h-screen w-full bg-gradient-to-br from-gray-800 via-gray-900 to-gray-900 px-4 pt-20 flex items-center"
    >
      <div className="max-w-7xl mx-auto w-full">
        <h2 className="gradient-text text-4xl md:text-5xl font-bold mb-12 text-center">Contact Me</h2>

        <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-start">
          {/* Left side - Text */}
          <div className="flex-1 w-full">
            <div className="text-center lg:text-left">
              <div
                className="text-white text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-none"
                style={{ fontFamily: '"Butler", "Playfair Display", "Bodoni MT", serif' }}
              >
                Want to<br />
                <span className="italic">start</span><br />
                a new<br />
                project?
              </div>
              <p
                className="text-gray-400 text-base md:text-lg font-light mt-8"
                style={{ fontFamily: '"Montserrat", "Poppins", "Inter", sans-serif' }}
              >
                Or just say hello.
              </p>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="flex-1 w-full max-w-2xl">
            {!submitted ? (
              <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <label htmlFor="name" className="text-blue-glow font-mono font-semibold text-lg">Name</label>
                <input className="neu-input text-lg py-4" id="name" name="name" type="text" placeholder="Your Name" required />
                <label htmlFor="email" className="text-blue-glow font-mono font-semibold text-lg">Email</label>
                <input className="neu-input text-lg py-4" id="email" name="email" type="email" placeholder="example@email.com" required />
                <label htmlFor="message" className="text-blue-glow font-mono font-semibold text-lg">Message</label>
                <textarea className="neu-input h-36 resize-none text-lg py-4" id="message" name="message" placeholder="Type your message..." required />
                <button type="submit" className="neu-btn bg-blue-glow hover:bg-blue-400 text-white font-bold mt-4 text-lg py-4">
                  Send Message
                </button>
              </form>
            ) : (
              <div className="mt-8 glass-card p-10 text-center text-2xl text-white animate-fade-in-up">
                <div className="text-green-400 text-5xl mb-4">✔</div>
                Thank you! Your message has been sent. <br />
                <button
                  className="mt-8 underline text-blue-glow font-semibold text-xl"
                  onClick={() => setSubmitted(false)}
                >Send another message</button>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
