export interface BlogPost {
  id: string;
  slug: string;
  layout: 'hero' | 'recent' | 'top-list' | 'ai-dispatch';
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

export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'live-fuller-not-bigger',
    layout: 'hero',
    title: 'Live Fuller, Not Bigger',
    description: 'You must escape the shallow joy of more',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80',
    author: 'Evan Armstrong',
    authorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
    category: 'TODAY IN: NAPKIN MATH',
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
  {
    id: '2',
    slug: 'what-comes-next-a-new-era-for-every',
    layout: 'recent',
    title: 'What Comes Next: A New Era For Every',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
    author: 'Dan Shipper',
    authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
    category: 'YESTERDAY',
    date: 'Sep 16, 2024',
    readTime: '10 min read',
    content: `We're entering a new chapter at Every, and I couldn't be more excited about what's ahead.

Over the past three years, we've built something special: a community of curious, thoughtful people who care about understanding the world and building better tools for thinking. We've published hundreds of essays, launched multiple products, and created a space where ideas can breathe and grow.

But we're just getting started.

The next era of Every is about going deeper. It's about building not just a publication, but a platform for understanding. We're investing heavily in new formats, new tools, and new ways of helping you make sense of the rapidly changing world around us.

Here's what's coming: First, we're doubling down on our AI coverage. Not the hype, not the fear-mongering, but the practical, nuanced understanding of how these tools actually work and how you can use them effectively.

Second, we're launching new interactive experiences that go beyond traditional articles. Think of them as playgrounds for ideas—places where you can experiment, learn, and build your own understanding.

Third, we're expanding our community features. The best insights don't just come from our writers; they come from the conversations happening in the comments, in our Discord, and in the connections you're making with each other.

This evolution is driven by a simple belief: that understanding is the most valuable currency in an increasingly complex world. And that the best way to build understanding is through a combination of great writing, powerful tools, and genuine community.

We're not trying to be everything to everyone. We're trying to be the best possible resource for people who want to think clearly, build effectively, and understand deeply.

Thank you for being part of this journey. The best is yet to come.`
  },
  {
    id: '3',
    slug: 'inside-the-pod-ai-research-assistant',
    layout: 'recent',
    title: 'Inside the Pod: The AI Research Assistant You\'ve Been Dreaming Of',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80',
    author: 'Rhea Purohit',
    authorImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=100&q=80',
    date: 'Sep 17, 2024',
    category: 'IN: AI & I',
    readTime: '12 min read',
    content: `Research is about to get a whole lot easier. Meet Pod, the AI research assistant that actually understands what you're trying to accomplish.

I've spent the last six months testing every AI research tool on the market, and Pod stands out for one simple reason: it thinks like a researcher, not like a search engine.

Here's the difference: Traditional search gives you links. AI chat gives you answers. But Pod gives you understanding. It doesn't just find information; it synthesizes it, connects it, and helps you build a coherent picture of whatever you're investigating.

The magic is in how it handles context. You can have a conversation with Pod that spans hours or even days, and it remembers everything. It builds on previous queries, refines its understanding based on your feedback, and gradually becomes an expert in your specific research domain.

I used Pod to research a complex article about the history of neural networks. Instead of spending days reading papers and taking notes, I had a conversation. I asked questions, Pod found relevant sources, we discussed the implications, and it helped me identify the key insights that became the backbone of my article.

The result? What would have taken me a week took me a day. And the quality was better, not worse, because Pod helped me see connections I would have missed.

This is the future of knowledge work. Not AI replacing humans, but AI amplifying human curiosity and insight. Pod is just the beginning.`
  },
  {
    id: '4',
    slug: 'jumping-over-ai-uncanny-valley',
    layout: 'top-list',
    title: 'Jumping Over AI\'s Uncanny Valley',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80',
    author: 'Nir Zicherman',
    date: 'Sep 14, 2024',
    readTime: '7 min read',
    content: `AI tools are getting better every day, but there's still something that feels... off. We're in the uncanny valley of artificial intelligence, and the question is: how do we get out?

The uncanny valley is that uncomfortable space where something is almost human, but not quite. It's close enough to trigger our expectations of human-like behavior, but different enough to feel wrong.

Current AI tools live in this valley. They can write like humans, but they make weird mistakes. They can reason, but they sometimes hallucinate facts. They can be creative, but they lack genuine understanding.

The good news? We're starting to see the path out. It's not about making AI more human-like. It's about designing interfaces and interactions that acknowledge what AI is good at and what it's not.

The best AI products don't try to fool you into thinking you're talking to a human. They're transparent about their capabilities and limitations. They're designed to complement human intelligence, not replace it.

This is the key to jumping over the uncanny valley: stop trying to make AI human, and start making it useful.`
  },
  {
    id: '5',
    slug: 'ai-buttons-and-breakthroughs',
    layout: 'top-list',
    title: 'AI Buttons and Breakthroughs',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
    date: 'Sep 13, 2024',
    readTime: '6 min read',
    content: `Every major tech company is adding AI buttons to their products. But are these buttons actually useful, or are they just AI theater?

The AI button phenomenon started innocently enough. Companies wanted to make their AI features discoverable, so they added prominent buttons labeled "AI" or "Ask AI" or "Generate with AI."

But something strange happened. The buttons became more important than the features themselves. Product teams started designing around the button, rather than around the user need.

The result? A lot of AI features that feel tacked on rather than integrated. They're there because every product needs an AI button, not because they solve a real problem.

The breakthrough products are the ones that integrate AI so seamlessly that you don't need a special button. The AI is just part of how the product works, invisible but essential.

That's the future we should be building toward: AI that's so well-integrated, you forget it's there.`
  },
  {
    id: '6',
    slug: 'openai-01-model-explained',
    layout: 'top-list',
    title: 'OpenAI\'s 01 Model, Explained',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80',
    date: 'Sep 12, 2024',
    readTime: '15 min read',
    content: `OpenAI just released their most capable model yet, and it's a game-changer. Here's everything you need to know about the 01 model and why it matters.

The 01 model represents a fundamental shift in how AI systems approach problems. Unlike previous models that generate responses in a single pass, 01 uses a technique called "chain of thought" reasoning.

What does this mean in practice? The model essentially thinks out loud, breaking down complex problems into steps and reasoning through them systematically. This makes it dramatically better at tasks that require logical reasoning, mathematics, and multi-step problem solving.

In benchmarks, 01 outperforms GPT-4 on virtually every measure of reasoning ability. But more importantly, it feels different to use. The responses are more thoughtful, more nuanced, and more reliable.

The implications are huge. This isn't just an incremental improvement; it's a qualitative leap in what AI can do. Tasks that were previously impossible or unreliable are now routine.

We're entering a new era of AI capability, and 01 is leading the way.`
  },
  {
    id: '7',
    slug: 'the-button-problem-of-ai',
    layout: 'top-list',
    title: 'The Button Problem of AI',
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=800&q=80',
    author: 'Evan Armstrong',
    date: 'Sep 11, 2024',
    readTime: '8 min read',
    content: `There's a fundamental problem with how we're building AI products, and it all comes down to buttons.

Every AI product faces the same challenge: how do you make AI capabilities discoverable and usable without overwhelming users? The default solution has been to add buttons—lots of them.

But buttons are a symptom of a deeper problem. They represent a failure of integration. When you need a special button to access AI features, it means those features aren't truly part of your workflow.

The best products don't have AI buttons. They have AI-powered features that are so well-integrated into the core experience that you don't think of them as "AI" at all.

Think about how Google Search uses AI. There's no "AI Search" button. The AI is just part of how search works, making it better without making it more complicated.

That's the standard we should be aiming for. Not more AI buttons, but better integration. Not AI as a feature, but AI as infrastructure.

The button problem is really a design problem. And solving it is the key to building AI products that people actually want to use.`
  },
  {
    id: '8',
    slug: 'how-language-models-work',
    layout: 'ai-dispatch',
    title: 'How Language Models Work',
    description: 'A 100-percent jargon-free guide',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80',
    imageBg: 'bg-red-900',
    author: 'Dan Shipper',
    authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
    date: 'Sep 10, 2024',
    readTime: '20 min read',
    content: `Language models are everywhere, but how do they actually work? Let's break it down in plain English, no PhD required.

At their core, language models are prediction machines. They've been trained on vast amounts of text, and they use that training to predict what word should come next in a sequence.

That might sound simple, but the implications are profound. By getting really, really good at predicting the next word, these models develop something that looks a lot like understanding.

Here's how it works: Imagine you're reading a sentence that says "The cat sat on the..." Your brain automatically predicts that the next word is probably "mat" or "chair" or something similar. You're using your knowledge of language, context, and the world to make that prediction.

Language models do the same thing, but at a massive scale. They've seen billions of examples of how words fit together, and they use statistical patterns to make predictions.

The magic happens because language is structured. It's not random. The way we use words reflects the way we think about the world. So by learning the patterns of language, models implicitly learn about the world itself.

This is why language models can answer questions, write essays, and even reason through problems. They're not just parroting back text they've seen before. They're using the patterns they've learned to generate new, contextually appropriate responses.

Of course, they're not perfect. They can make mistakes, hallucinate facts, and sometimes produce nonsensical output. But they're getting better rapidly, and understanding how they work is the first step to using them effectively.`
  },
  {
    id: '9',
    slug: 'ai-can-help-you-make-big-life-decisions',
    layout: 'ai-dispatch',
    title: 'AI Can Help You Make Big Life Decisions',
    description: 'Navigating one-way-door decisions with a little prompting',
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=800&q=80',
    imageBg: 'bg-yellow-900',
    author: 'Dan Shipper',
    authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
    date: 'Sep 8, 2024',
    readTime: '12 min read',
    content: `Should you take that job? Move to a new city? Start a company? These are the decisions that shape our lives, and they're terrifying because they're irreversible.

Jeff Bezos calls them "one-way door" decisions. Once you walk through, you can't easily go back. And that's what makes them so hard.

But here's something I've discovered: AI can be an incredibly valuable thinking partner for these big decisions. Not because it will tell you what to do, but because it can help you think more clearly about what you want.

The key is using AI as a structured thinking tool. Here's my process:

First, I dump everything I'm thinking and feeling about the decision into a conversation with Claude or GPT-4. All the pros and cons, all the fears and hopes, everything.

Then I ask the AI to help me identify my underlying values and priorities. What am I really optimizing for? What matters most to me in this decision?

Next, I ask it to steelman both sides. What's the strongest possible case for each option? This helps me see past my biases and consider perspectives I might be missing.

Finally, I ask it to help me imagine the future. What does life look like in five years if I choose option A? What about option B? This mental time travel is incredibly clarifying.

The AI doesn't make the decision for me. But it helps me organize my thinking, challenge my assumptions, and see the decision from multiple angles. And that makes all the difference.

I used this process when deciding whether to go all-in on Every. It was scary—leaving a stable career to build something new. But working through it with AI helped me see that the decision aligned with my deepest values, even if it was risky.

Two years later, I'm confident it was the right choice. Not because it was easy, but because I made it with clarity and intention.

That's the power of using AI for big decisions. It doesn't eliminate the uncertainty, but it helps you move forward with confidence.`
  },
  {
    id: '10',
    slug: 'gpt-5-is-coming',
    layout: 'ai-dispatch',
    title: 'GPT-5 Is Coming: Reading Between the Lines at Microsoft Build',
    description: 'News and notes from the AI-everything developer conference',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80',
    imageBg: 'bg-pink-900',
    author: 'Dan Shipper',
    authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
    date: 'Sep 5, 2024',
    readTime: '14 min read',
    content: `Microsoft Build just wrapped up, and while GPT-5 wasn't officially announced, the writing is on the wall. Here's what we learned about what's coming next.

The conference was packed with AI announcements, but the most interesting insights came from reading between the lines. Microsoft and OpenAI are clearly preparing for a major leap forward, and the pieces are falling into place.

First, there were multiple references to "next-generation models" with dramatically improved reasoning capabilities. This aligns with what we know about OpenAI's research direction—they're focused on models that can think more deeply and reliably.

Second, the infrastructure announcements were telling. Microsoft is investing billions in AI-specific hardware and data centers. You don't make that kind of investment unless you're preparing for models that are significantly more powerful and more widely used.

Third, the developer tools and APIs are being redesigned around longer context windows and more complex interactions. This suggests that the next generation of models will be capable of handling much more sophisticated tasks.

Put it all together, and the picture is clear: GPT-5 is coming, and it's going to be a big deal.

What can we expect? Based on the hints dropped at Build and the trajectory of AI research, here's my prediction:

GPT-5 will have dramatically better reasoning capabilities, approaching human-level performance on complex logical tasks. It will have a much longer context window, possibly 1 million tokens or more. And it will be more reliable, with fewer hallucinations and more consistent performance.

Most importantly, it will be the first model that feels truly general-purpose. Not just good at specific tasks, but genuinely capable of handling whatever you throw at it.

The implications are staggering. We're talking about AI that can be a genuine thought partner, not just a tool. AI that can help with strategy, not just execution. AI that can augment human intelligence in ways we're only beginning to imagine.

Microsoft Build didn't announce GPT-5, but it showed us the future that GPT-5 will enable. And that future is closer than you think.`
  },
  {
    id: '11',
    slug: 'how-i-use-chatgpt',
    layout: 'ai-dispatch',
    title: 'How I Use ChatGPT (As A Reasonable Person)',
    description: 'My AI awakening',
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=800&q=80',
    imageBg: 'bg-green-900',
    author: 'Evan Armstrong',
    authorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
    date: 'Sep 3, 2024',
    readTime: '10 min read',
    content: `I was skeptical about ChatGPT. I thought it was overhyped, that it would replace genuine thinking with algorithmic slop. I was wrong.

Here's how I actually use ChatGPT, as someone who cares about quality and authenticity:

First, I use it as a thinking partner, not a replacement for thinking. When I'm stuck on a problem, I'll explain it to ChatGPT and ask for different perspectives. The act of explaining often clarifies my own thinking, and the AI's responses sometimes spark new ideas.

Second, I use it for research and synthesis. Instead of spending hours reading articles and taking notes, I can have a conversation with ChatGPT about a topic, asking it to explain concepts, compare different viewpoints, and identify key insights.

Third, I use it for editing and refinement. I'll write a first draft myself, then ask ChatGPT to help me tighten the prose, clarify the arguments, and catch logical gaps. It's like having an editor who's always available and never gets tired.

Fourth, I use it for tasks that are tedious but don't require creativity. Formatting data, writing boilerplate code, generating variations of text—these are perfect use cases for AI.

What I don't use it for: Writing things that matter from scratch. Making important decisions without my own judgment. Anything where authenticity and personal voice are essential.

The key is treating ChatGPT as a tool, not a crutch. It's incredibly powerful when used to augment your own capabilities, but it can't replace genuine expertise, creativity, or judgment.

My AI awakening wasn't about discovering that AI can do everything. It was about discovering that AI can make me better at what I do. And that's more than enough.`
  }
];
