export default function ResumeSection() {
  return <section id="resume" className="min-h-screen px-4 w-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 pt-20 flex items-center">
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="gradient-text text-4xl md:text-5xl font-bold mb-12 text-left">Resume</h2>
        <div className="glass-card p-8 flex flex-col items-center">
          <embed src="/UdhayaSankar_Resume.pdf" type="application/pdf" width="100%" height="600px" className="rounded-lg border border-white/20" aria-label="Udhaya Sankar Resume PDF" />
          <a href="/UdhayaSankar_Resume.pdf" download target="_blank" rel="noopener noreferrer" className="neu-btn mt-8 shadow-soft-glow font-semibold text-lg py-4 px-8">
            Download Resume
          </a>
        </div>
        <div className="mt-6 text-center text-base text-gray-400">
          If PDF viewer fails, <a href="/UdhayaSankar_Resume.pdf" className="underline text-blue-glow">click here to download directly.</a>
        </div>
      </div>
    </section>;
}