
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
      className="py-20 w-full bg-gradient-to-br from-gray-800 via-gray-900 to-gray-900 px-4"
    >
      <div className="max-w-xl mx-auto">
        <h2 className="gradient-text text-3xl md:text-4xl font-bold mb-8 text-center">Contact Me</h2>
        {!submitted ? (
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <label htmlFor="name" className="text-blue-glow font-mono font-semibold">Name</label>
            <input className="neu-input" id="name" name="name" type="text" placeholder="Your Name" required />
            <label htmlFor="email" className="text-blue-glow font-mono font-semibold">Email</label>
            <input className="neu-input" id="email" name="email" type="email" placeholder="example@email.com" required />
            <label htmlFor="message" className="text-blue-glow font-mono font-semibold">Message</label>
            <textarea className="neu-input h-28 resize-none" id="message" name="message" placeholder="Type your message..." required />
            <button type="submit" className="neu-btn bg-blue-glow hover:bg-blue-400 text-white font-bold mt-3">
              Send Message
            </button>
          </form>
        ) : (
          <div className="mt-8 glass-card p-8 text-center text-xl text-white animate-fade-in-up">
            <div className="text-green-400 text-4xl mb-2">✔</div>
            Thank you! Your message has been sent. <br />
            <button
              className="mt-6 underline text-blue-glow font-semibold"
              onClick={() => setSubmitted(false)}
            >Send another message</button>
          </div>
        )}
      </div>
    </section>
  );
}
