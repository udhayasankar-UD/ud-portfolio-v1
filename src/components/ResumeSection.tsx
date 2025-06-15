
export default function ResumeSection() {
  return (
    <section
      id="resume"
      className="min-h-screen px-4 w-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center"
    >
      <div className="max-w-3xl mx-auto w-full">
        <h2 className="gradient-text text-3xl md:text-4xl font-bold mb-8 text-center">Resume</h2>
        <div className="glass-card p-6 flex flex-col items-center">
          <embed
            src="/UdhayaSankar_Resume.pdf"
            type="application/pdf"
            width="100%"
            height="480px"
            className="rounded-lg border border-white/20"
            aria-label="Udhaya Sankar Resume PDF"
          />
          <a
            href="/UdhayaSankar_Resume.pdf"
            download
            target="_blank"
            rel="noopener noreferrer"
            className="neu-btn mt-6 shadow-soft-glow font-semibold"
          >
            Download Resume
          </a>
        </div>
        <div className="mt-4 text-center text-sm text-gray-400">
          If PDF viewer fails, <a href="/UdhayaSankar_Resume.pdf" className="underline text-blue-glow">click here to download directly.</a>
        </div>
      </div>
    </section>
  );
}
