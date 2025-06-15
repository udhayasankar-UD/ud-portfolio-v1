
const posts = [
  {
    id: 1,
    slug: "styling-neumorphism-tailwind",
    title: "Styling Neumorphism with Tailwind CSS",
    date: "2024-06-12",
    excerpt: "Neumorphic design brings soft, tactile UIs – let's learn how to pull it off with custom box-shadow, gradients, and Tailwind utilities for beautiful cards."
  },
  {
    id: 2,
    slug: "threejs-react-intro",
    title: "Getting Started with Three.js in React",
    date: "2024-05-27",
    excerpt: "3D scenes? Yes, please! A quickstart on integrating Three.js and @react-three/fiber for stunning hero sections and interactive graphics."
  },
  {
    id: 3,
    slug: "unity-to-webgl-portfolio",
    title: "Showcasing Unity Games on Your Portfolio",
    date: "2024-04-18",
    excerpt: "Your Unity game is WebGL-ready – now embed it beautifully in your dev portfolio and wow recruiters with live demos!"
  }
];

export default function BlogSection() {
  return (
    <section
      id="blog"
      className="py-20 w-full px-4 bg-gradient-to-b from-gray-900 to-gray-800"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="gradient-text text-3xl md:text-4xl font-bold mb-8 text-center">Blog</h2>
        <div className="space-y-8">
          {posts.map(post => (
            <div
              key={post.id}
              className="glass-card p-6 rounded-xl hover:shadow-soft-glow transition cursor-pointer"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-blue-glow mb-1">{post.title}</h3>
                  <p className="text-gray-300 mb-2">{post.excerpt}</p>
                  <a
                    href={`/blog/${post.slug}`}
                    className="text-blue-glow underline underline-offset-2 text-sm hover:text-blue-400"
                  >
                    Read more →
                  </a>
                </div>
                <div className="text-xs text-gray-400 mt-4 md:mt-0 md:text-right whitespace-nowrap">
                  {post.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
