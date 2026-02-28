export interface BlogPost {
  id: string;
  slug: string;
  tag?: 'ai-dispatch' | 'featured-essay' | 'chain-of-thought' | 'podcast' | 'product-pick' | 'essay';
  title: string;
  description?: string;
  image: string;
  author?: string;
  authorImage?: string;
  date?: string;
  category?: string;
  readTime?: string;
  imageBg?: string;
  content: string;
}


export const blogLayoutConfig = {
  hero: '1',
  recent: ['2', '3'],
  topList: ['4', '5', '6', '7', '14']
};

export const BlogPosts: BlogPost[] = [
  // ── HERO ──
  {
    id: '1',
    slug: 'live-fuller-not-bigger',
    tag: 'essay',
    title: 'Live _Fuller, Not _Bigger',
    description: 'You must escape the shallow joy of more',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80',
    author: 'Evan Armstrong',
    authorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
    category: 'NAPKIN MATH',
    date: 'Sep 17, 2024',
    readTime: '8 min read',
    content: `In a world obsessed with growth, expansion, and accumulation, we've lost sight of what truly matters. The relentless pursuit of "more" has become the default setting for modern life—more money, more followers, more possessions, more achievements.

But what if the secret to a meaningful life isn't about getting bigger, but about living fuller?

This isn't just philosophical musing. It's a practical framework for building a life that actually feels good to live. The difference between living bigger and living fuller is the difference between chasing external validation and cultivating internal richness.

Living bigger is about accumulation. It's the endless treadmill of wanting more, achieving more, and still feeling empty. It's the promotion that doesn't satisfy, the purchase that loses its shine, the milestone that immediately becomes the baseline for the next goal.

Living fuller is about depth. It's about squeezing more meaning, connection, and presence out of what you already have. It's about quality over quantity, depth over breadth, being over having.

The paradox is that living fuller often leads to living bigger—but as a byproduct, not as the goal. When you focus on depth, breadth follows naturally. When you chase breadth alone, you end up with a mile-wide, inch-deep existence.

So how do you make the shift? Start by auditing your life through the lens of fullness rather than bigness. Ask yourself: What activities make me feel most alive? What relationships bring me genuine joy? What work feels meaningful regardless of external rewards?

Then ruthlessly eliminate or minimize everything else. This is the hard part. It means saying no to opportunities that look good on paper but don't align with your definition of fullness. It means disappointing people who expect you to keep climbing the conventional ladder.

But the payoff is immense. A life lived fully is a life without regret. It's waking up excited about your day, not because it's packed with impressive activities, but because it's filled with things that matter to you.

The world will always push you to live bigger. It's your job to choose to live fuller.`
  },

  // ── RECENT (left column) ──
  {
    id: '2',
    slug: 'what-comes-next-a-new-era-for-every',
    tag: 'essay',
    title: 'What _Comes _Next: A New _Era For Every',
    description: 'Every is evolving — here\'s where we\'re headed.',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80',
    author: 'Dan Shipper',
    authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
    category: 'YESTERDAY',
    date: 'Sep 16, 2024',
    readTime: '10 min read',
    content: `We're entering a new chapter at Every, and I couldn't be more excited about what's ahead.

Over the past three years, we've built something special: a community of curious, thoughtful people who care about understanding the world and building better tools for thinking.

But we're just getting started. The next era of Every is about going deeper. It's about building not just a publication, but a platform for understanding.

Here's what's coming: First, we're doubling down on our AI coverage. Not the hype, not the fear-mongering, but the practical, nuanced understanding of how these tools actually work.

Second, we're launching new interactive experiences that go beyond traditional articles. Think of them as playgrounds for ideas—places where you can experiment, learn, and build your own understanding.

Third, we're expanding our community features. The best insights don't just come from our writers; they come from the conversations happening in the comments, in our Discord, and in the connections you're making with each other.

Thank you for being part of this journey. The best is yet to come.`
  },
  {
    id: '3',
    slug: 'inside-the-pod-ai-research-assistant',
    tag: 'essay',
    title: 'Inside the _Pod: The AI _Research _Assistant You\'ve Been _Dreaming Of',
    description: 'Research just got a whole lot easier.',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80',
    author: 'Rhea Purohit',
    authorImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=100&q=80',
    date: 'Sep 17, 2024',
    category: 'AI & I',
    readTime: '12 min read',
    content: `Research is about to get a whole lot easier. Meet Pod, the AI research assistant that actually understands what you're trying to accomplish.

I've spent the last six months testing every AI research tool on the market, and Pod stands out for one simple reason: it thinks like a researcher, not like a search engine.

Here's the difference: Traditional search gives you links. AI chat gives you answers. But Pod gives you understanding. It doesn't just find information; it synthesizes it, connects it, and helps you build a coherent picture of whatever you're investigating.

The magic is in how it handles context. You can have a conversation with Pod that spans hours or even days, and it remembers everything.

I used Pod to research a complex article about the history of neural networks. Instead of spending days reading papers and taking notes, I had a conversation.

The result? What would have taken me a week took me a day. And the quality was better, not worse, because Pod helped me see connections I would have missed.

This is the future of knowledge work.`
  },

  // ── TOP-LIST (right column) ──
  {
    id: '4',
    slug: 'jumping-over-ai-uncanny-valley',
    tag: 'essay',
    title: '_Jumping Over AI\'s _Uncanny _Valley',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80',
    author: 'Nir Zicherman',
    date: 'Sep 14, 2024',
    readTime: '7 min read',
    content: `AI tools are getting better every day, but there's still something that feels off. We're in the uncanny valley of artificial intelligence, and the question is: how do we get out?

The uncanny valley is that uncomfortable space where something is almost human, but not quite. Current AI tools live in this valley.

The good news? We're starting to see the path out. It's not about making AI more human-like. It's about designing interfaces and interactions that acknowledge what AI is good at and what it's not.

The best AI products don't try to fool you into thinking you're talking to a human. They're transparent about their capabilities and limitations.

This is the key to jumping over the uncanny valley: stop trying to make AI human, and start making it useful.`
  },
  {
    id: '5',
    slug: 'ai-buttons-and-breakthroughs',
    tag: 'essay',
    title: 'AI _Buttons and _Breakthroughs',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
    author: 'Dan Shipper',
    date: 'Sep 13, 2024',
    readTime: '6 min read',
    content: `Every major tech company is adding AI buttons to their products. But are these buttons actually useful, or are they just AI theater?

The AI button phenomenon started innocently enough. Companies wanted to make their AI features discoverable.

But something strange happened. The buttons became more important than the features themselves. Product teams started designing around the button, rather than around the user need.

The breakthrough products are the ones that integrate AI so seamlessly that you don't need a special button. The AI is just part of how the product works, invisible but essential.

That's the future we should be building toward.`
  },
  {
    id: '6',
    slug: 'openai-01-model-explained',
    tag: 'essay',
    title: '_OpenAI\'s 01 _Model, _Explained',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80',
    author: 'Dan Shipper',
    date: 'Sep 12, 2024',
    readTime: '15 min read',
    content: `OpenAI just released their most capable model yet, and it's a game-changer. Here's everything you need to know about the 01 model and why it matters.

The 01 model represents a fundamental shift in how AI systems approach problems. Unlike previous models that generate responses in a single pass, 01 uses "chain of thought" reasoning.

In benchmarks, 01 outperforms GPT-4 on virtually every measure of reasoning ability. But more importantly, it feels different to use. The responses are more thoughtful, more nuanced, and more reliable.

We're entering a new era of AI capability, and 01 is leading the way.`
  },
  {
    id: '7',
    slug: 'the-button-problem-of-ai',
    tag: 'essay',
    title: 'The _Button _Problem of AI',
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=800&q=80',
    author: 'Evan Armstrong',
    date: 'Sep 11, 2024',
    readTime: '8 min read',
    content: `There's a fundamental problem with how we're building AI products, and it all comes down to buttons.

Every AI product faces the same challenge: how do you make AI capabilities discoverable and usable without overwhelming users?

Buttons are a symptom of a deeper problem. They represent a failure of integration.

The best products don't have AI buttons. They have AI-powered features that are so well-integrated into the core experience that you don't think of them as "AI" at all.

That's the standard we should be aiming for. Not more AI buttons, but better integration.`
  },
  {
    id: '14',
    slug: 'what-will-the-next-ai-breakthrough-be',
    tag: 'essay',
    title: 'What _Will the _Next AI _Breakthrough Be?',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80',
    author: 'Rhea Purohit',
    date: 'Sep 10, 2024',
    readTime: '9 min read',
    content: `Everyone is asking the same question: what comes after large language models? The next breakthrough might not look like what you expect.

The history of AI is a history of paradigm shifts. From expert systems to neural networks, from CNNs to transformers — each breakthrough redefines what's possible.

Several candidates are emerging: neuromorphic computing, quantum-enhanced ML, and new architectures that combine symbolic reasoning with statistical learning.

The truth is, nobody knows for certain. But the clues are hidden in the research being published right now.`
  },

  // ── AI DISPATCHES ──
  {
    id: '8',
    slug: 'how-language-models-work',
    tag: 'ai-dispatch',
    title: 'How _Language _Models _Work',
    description: 'A 100-percent jargon-free guide',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80',
    imageBg: 'bg-rose-950',
    author: 'Dan Shipper',
    authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
    date: 'Sep 10, 2024',
    readTime: '20 min read',
    content: `Language models are everywhere, but how do they actually work? Let's break it down in plain English, no PhD required.

At their core, language models are prediction machines. They've been trained on vast amounts of text, and they use that training to predict what word should come next in a sequence.

That might sound simple, but the implications are profound. By getting really, really good at predicting the next word, these models develop something that looks a lot like understanding.

The magic happens because language is structured. It's not random. The way we use words reflects the way we think about the world. So by learning the patterns of language, models implicitly learn about the world itself.

Of course, they're not perfect. They can make mistakes, hallucinate facts, and sometimes produce nonsensical output. But they're getting better rapidly.`
  },
  {
    id: '9',
    slug: 'ai-can-help-you-make-big-life-decisions',
    tag: 'ai-dispatch',
    title: 'AI Can _Help You _Make Big _Life _Decisions',
    description: 'Navigating one-way-door decisions with a little prompting',
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=800&q=80',
    imageBg: 'bg-amber-950',
    author: 'Dan Shipper',
    authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
    date: 'Sep 8, 2024',
    readTime: '12 min read',
    content: `Should you take that job? Move to a new city? Start a company? These are the decisions that shape our lives, and they're terrifying because they're irreversible.

Jeff Bezos calls them "one-way door" decisions. Once you walk through, you can't easily go back.

But here's something I've discovered: AI can be an incredibly valuable thinking partner for these big decisions. Not because it will tell you what to do, but because it can help you think more clearly about what you want.

First, I dump everything I'm thinking and feeling about the decision into a conversation with Claude or GPT-4. All the pros and cons, all the fears and hopes, everything.

Then I ask the AI to help me identify my underlying values and priorities. What am I really optimizing for?

The AI doesn't make the decision for me. But it helps me organize my thinking, challenge my assumptions, and see the decision from multiple angles.`
  },
  {
    id: '10',
    slug: 'gpt-5-is-coming',
    tag: 'ai-dispatch',
    title: 'GPT-5 Is _Coming: _Reading _Between the _Lines',
    description: 'News and notes from the AI-everything developer conference',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80',
    imageBg: 'bg-fuchsia-950',
    author: 'Dan Shipper',
    authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
    date: 'Sep 5, 2024',
    readTime: '14 min read',
    content: `Microsoft Build just wrapped up, and while GPT-5 wasn't officially announced, the writing is on the wall. Here's what we learned about what's coming next.

The conference was packed with AI announcements, but the most interesting insights came from reading between the lines.

First, there were multiple references to "next-generation models" with dramatically improved reasoning capabilities.

Second, the infrastructure announcements were telling. Microsoft is investing billions in AI-specific hardware.

Put it all together, and the picture is clear: GPT-5 is coming, and it's going to be a big deal.

The implications are staggering. We're talking about AI that can be a genuine thought partner, not just a tool.`
  },
  {
    id: '11',
    slug: 'how-i-use-chatgpt',
    tag: 'ai-dispatch',
    title: 'How I Use _ChatGPT (As A _Reasonable _Person)',
    description: 'My AI awakening',
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=800&q=80',
    imageBg: 'bg-emerald-950',
    author: 'Evan Armstrong',
    authorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
    date: 'Sep 3, 2024',
    readTime: '10 min read',
    content: `I was skeptical about ChatGPT. I thought it was overhyped, that it would replace genuine thinking with algorithmic slop. I was wrong.

Here's how I actually use ChatGPT, as someone who cares about quality and authenticity.

First, I use it as a thinking partner, not a replacement for thinking. When I'm stuck on a problem, I'll explain it to ChatGPT and ask for different perspectives.

Second, I use it for research and synthesis. Instead of spending hours reading articles and taking notes, I can have a conversation.

Third, I use it for editing and refinement. I'll write a first draft myself, then ask ChatGPT to help me tighten the prose.

The key is treating ChatGPT as a tool, not a crutch. It's incredibly powerful when used to augment your own capabilities.`
  },

  // ── FEATURED ESSAYS ──
  {
    id: '12',
    slug: 'creative-destruction-in-media',
    tag: 'featured-essay',
    title: '_Creative _Destruction in _Media',
    description: 'Why the old models are breaking and what replaces them.',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168d7c?auto=format&fit=crop&w=800&q=80',
    author: 'Evan Armstrong',
    authorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
    category: 'NAPKIN MATH',
    date: 'Sep 9, 2024',
    readTime: '11 min read',
    content: `The media industry is going through its most dramatic transformation since the printing press. And most people in media still don't get it.

The old model was simple: create content, attract an audience, sell ads. This worked for decades because distribution was scarce and attention was abundant.

Now the equation has flipped. Distribution is infinite and attention is scarce. Anyone can publish, but fewer and fewer publications can sustain an audience.

The winners in this new landscape aren't the ones with the biggest audiences. They're the ones with the deepest relationships.

This is the paradox of modern media: to reach more people, you need to focus on fewer people. To grow bigger, you need to go deeper.`
  },
  {
    id: '13',
    slug: 'the-art-of-reading-well',
    tag: 'featured-essay',
    title: 'The _Art of _Reading _Well',
    description: 'Most people read too much and think too little.',
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80',
    author: 'Rhea Purohit',
    authorImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=100&q=80',
    category: 'ESSAY',
    date: 'Sep 7, 2024',
    readTime: '9 min read',
    content: `We live in an age of information abundance. The average person consumes more words in a day than a medieval scholar did in a year. But are we actually reading better?

The distinction between consuming text and reading well is crucial. Reading well isn't about speed or volume. It's about depth and engagement.

Great readers are active readers. They argue with the text, question the premises, and connect ideas across disciplines.

The best practice I've found is to read fewer things more carefully. Choose your reading with intention, engage deeply with what you choose, and always, always think about what you've read before moving on to the next thing.`
  },
  {
    id: '15',
    slug: 'build-things-that-dont-scale',
    tag: 'featured-essay',
    title: '_Build _Things That Don\'t _Scale',
    description: 'The counterintuitive strategy behind the best startups.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    author: 'Evan Armstrong',
    authorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
    category: 'NAPKIN MATH',
    date: 'Sep 6, 2024',
    readTime: '7 min read',
    content: `Paul Graham's famous advice to "do things that don't scale" is one of the most misunderstood pieces of startup wisdom.

Most people interpret it as: do hacky things early on and figure out the real solution later. But that misses the point entirely.

The real insight is that unscalable things often provide the deepest understanding of your customers. When you manually onboard a user, you learn what confuses them. When you hand-deliver your product, you see their reaction in real time.

Scalability is a feature of mature businesses, not young ones. The goal of an early startup is learning, and unscalable activities are the fastest way to learn.`
  },
  {
    id: '16',
    slug: 'the-productivity-trap',
    tag: 'featured-essay',
    title: 'The _Productivity _Trap',
    description: 'Why getting more done isn\'t always the answer.',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80',
    author: 'Dan Shipper',
    authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
    category: 'CHAIN OF THOUGHT',
    date: 'Sep 4, 2024',
    readTime: '6 min read',
    content: `I used to be obsessed with productivity. I had the systems, the apps, the morning routines. I was optimized to within an inch of my life.

And I was miserable.

The productivity trap is the belief that if you just get enough done, you'll finally feel satisfied. But satisfaction doesn't come from checking off tasks. It comes from doing meaningful work.

The most productive people I know aren't the ones who do the most. They're the ones who do the right things. They say no to almost everything so they can say yes to what matters.

The solution isn't more productivity. It's more intentionality. Stop optimizing for output and start optimizing for meaning.`
  },

  // ── CHAIN OF THOUGHT ──
  {
    id: '17',
    slug: 'taste-is-eating-silicon-valley',
    tag: 'chain-of-thought',
    title: '_Taste Is _Eating _Silicon _Valley',
    description: 'Why design-driven companies are winning the AI race.',
    image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&w=800&q=80',
    author: 'Dan Shipper',
    authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
    category: 'CHAIN OF THOUGHT',
    date: 'Sep 2, 2024',
    readTime: '8 min read',
    content: `For decades, Silicon Valley's competitive advantage was technical superiority. The company with the best engineers won.

That's changing. In the age of AI, where everyone has access to the same foundational models, the differentiator is taste.

Taste is the ability to make good decisions about what to build, how it should look, and how it should feel. It's the difference between a product that works and a product that delights.

The companies winning the AI race aren't necessarily the ones with the best models. They're the ones with the best product sense—the ability to take powerful technology and wrap it in an experience that feels intuitive and magical.

This is a massive opportunity for designers, creatives, and people with strong aesthetic sensibilities. The age of taste is here.`
  },
  {
    id: '18',
    slug: 'why-writing-is-thinking',
    tag: 'chain-of-thought',
    title: 'Why _Writing Is _Thinking',
    description: 'The ancient technology that makes you smarter.',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80',
    author: 'Rhea Purohit',
    authorImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=100&q=80',
    category: 'ESSAY',
    date: 'Sep 1, 2024',
    readTime: '7 min read',
    content: `"I don't know what I think until I write it down." This isn't just a clever aphorism. It's a description of how human cognition actually works.

Writing forces you to confront the gaps in your thinking. When an idea lives only in your head, it feels complete and coherent. But the moment you try to put it into words, the holes become obvious.

This is why writing is the most underrated thinking tool. It's not about producing polished prose. It's about the process of translating fuzzy thoughts into clear language.

Every great thinker in history has been, at their core, a writer. Not because writing was their output, but because writing was their tool for learning.`
  },
  {
    id: '19',
    slug: 'the-art-of-asking-better-questions',
    tag: 'chain-of-thought',
    title: 'The _Art of _Asking _Better _Questions',
    description: 'Great questions unlock great answers — with AI and in life.',
    image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=800&q=80',
    author: 'Dan Shipper',
    authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
    category: 'CHAIN OF THOUGHT',
    date: 'Aug 30, 2024',
    readTime: '10 min read',
    content: `The quality of your life is determined by the quality of your questions. This has always been true, but in the age of AI, it's become a superpower.

AI is essentially a question-answering machine. The better your question, the better the answer you'll get. And "better" doesn't mean more complex — it means more precise, more thoughtful, more well-framed.

Great questions share certain properties: they're specific enough to be answerable, open enough to invite insight, and grounded enough to connect to real-world action.

The skill of asking great questions isn't just about prompting AI. It's about prompting yourself. The questions you ask yourself determine what you pay attention to, what problems you solve, and ultimately, who you become.`
  },
  {
    id: '20',
    slug: 'mental-models-for-the-ai-age',
    tag: 'chain-of-thought',
    title: '_Mental _Models for the AI _Age',
    description: 'Frameworks for thinking about a world with intelligent machines.',
    image: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?auto=format&fit=crop&w=800&q=80',
    author: 'Evan Armstrong',
    authorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
    category: 'NAPKIN MATH',
    date: 'Aug 28, 2024',
    readTime: '13 min read',
    content: `The old mental models are failing us. The frameworks we used to understand the world — supply and demand, competitive moats, human capital — are being disrupted by AI.

We need new mental models. Here are four that I use every day.

First: think in terms of "intelligence cost." AI is making intelligence cheaper. Tasks that once required expensive human brainpower can now be done for pennies. This changes the economics of everything.

Second: think about "taste arbitrage." When everyone has access to the same AI tools, the differentiator is taste — the ability to make good decisions about what to build and how to build it.

Third: think about "speed of learning." The companies and individuals that learn fastest will win. AI amplifies learning speed for those who know how to use it.

Fourth: think about "human premium." As AI handles routine cognitive tasks, the premium on uniquely human abilities — empathy, creativity, leadership — will skyrocket.`
  },

  // ── PODCAST ──
  {
    id: '21',
    slug: 'talking-machines-ep-12',
    tag: 'podcast',
    title: '_Talking _Machines: The _Future of _Work with Sam Altman',
    description: 'Sam shares his vision for a post-AGI economy.',
    image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=800&q=80',
    author: 'Dan Shipper',
    authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
    category: 'PODCAST',
    date: 'Aug 26, 2024',
    readTime: '45 min listen',
    content: `In this episode of Talking Machines, I sit down with Sam Altman to discuss something most people aren't ready to think about: what happens to work when AI can do most of it?

Sam's perspective is surprisingly optimistic. He doesn't see a world where humans become obsolete. Instead, he sees a world where humans are freed to do work that is more creative, more meaningful, and more human.

"The jobs that AI will take are the jobs that treat humans like machines," he says. "Why would we mourn those?"

We discuss universal basic income, the future of education, and whether creativity is something that can be automated. Sam's answer to the last question surprised me.

This is one of the most thought-provoking conversations I've had, and I think it will change how you think about your own career and the future of work.`
  },
  {
    id: '22',
    slug: 'talking-machines-ep-11',
    tag: 'podcast',
    title: 'How to _Build a _Second _Brain with Tiago Forte',
    description: 'A deep dive into personal knowledge management.',
    image: 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?auto=format&fit=crop&w=800&q=80',
    author: 'Rhea Purohit',
    authorImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=100&q=80',
    category: 'PODCAST',
    date: 'Aug 24, 2024',
    readTime: '38 min listen',
    content: `Tiago Forte literally wrote the book on building a second brain, and in this conversation, we dig into how AI is changing his approach.

The core idea behind Building a Second Brain is simple: don't try to remember everything. Instead, create a system that captures, organizes, and resurfaces information when you need it.

AI supercharges this approach. Instead of manually organizing your notes, AI can help you find connections, generate summaries, and surface relevant information at the right moment.

But Tiago warns against a common trap: using AI as a substitute for thinking. "The point of a second brain isn't to avoid thinking," he says. "It's to free up your first brain to do more of it."

We discuss specific tools, workflows, and mental models for building an AI-enhanced second brain.`
  },

//   {
//   id: '30', // Unique ID for this post
//   slug: 'the-future-of-agents', // The URL path (e.g., /blog/the-future-of-agents)
//   tag: 'ai-dispatch', // categorizes the post 
//   title: 'The _Future of AI _Agents', // Use '_' before a word to trigger the elegant italic font!
//   description: 'How autonomous agents will change workflows.',
//   content: '<p>This is my new article content...</p>',
//   category: 'ESSAY', // The label shown above the title on the cards
//   date: 'OCT 16, 2024',
//   readTime: '5 MIN READ',
//   image: '/assets/images/projects/cover.jpg',
//   author: 'Evan Armstrong',
//   authorImage: '/assets/images/evan.png',
// }


]
