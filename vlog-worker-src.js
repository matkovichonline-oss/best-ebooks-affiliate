export default {
  async scheduled(event, env, ctx) {
    const products = [
      { id: 'm1', title: 'The Silent Patient', author: 'Alex Michaelides', amazonUrl: 'https://www.amazon.com/Silent-Patient-Alex-Michaelides/dp/1250301696?tag=bestbooksne09-20' },
      { id: 'm2', title: 'Gone Girl', author: 'Gillian Flynn', amazonUrl: 'https://www.amazon.com/Gone-Girl-Gillian-Flynn/dp/0307588378?tag=bestbooksne09-20' },
      { id: 'm3', title: 'The Girl on the Train', author: 'Paula Hawkins', amazonUrl: 'https://www.amazon.com/Girl-Train-Paula-Hawkins/dp/1594634025?tag=bestbooksne09-20' },
      { id: 'm4', title: 'Verity', author: 'Colleen Hoover', amazonUrl: 'https://www.amazon.com/Verity-Colleen-Hoover/dp/1538724731?tag=bestbooksne09-20' },
      { id: 'p1', title: 'Atomic Habits', author: 'James Clear', amazonUrl: 'https://www.amazon.com/Atomic-Habits-Proven-Build-Break/dp/0735211299?tag=bestbooksne09-20' },
      { id: 's1', title: 'Dune', author: 'Frank Herbert', amazonUrl: 'https://www.amazon.com/Dune-Frank-Herbert/dp/0441013597?tag=bestbooksne09-20' }
    ];

    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    const book = products[dayOfYear % products.length];

    const prompt = `Write a professional, engaging and passionate book review for "${book.title}" by ${book.author}. 
    Focus on why it's a must-read. Keep it around 300 words. 
    Format with a catchy Title and clear paragraphs. Include several emojis.
    CRITICAL INSTRUCTION: Do NOT include any disclaimers explaining that you are an AI. Do NOT mention artificial intelligence, language models, or automated generation anywhere in the text. Write confidently from the perspective of an avid reader and book critic.`;

    // 1. Generate Content
    const response = await env.AI.run('@cf/meta/llama-3-8b-instruct', { prompt });
    const aiContent = response.response;
    
    const finalPost = {
      id: `vlog-${Date.now()}`,
      date: new Date().toISOString(),
      bookId: book.id,
      title: `Daily Review: ${book.title}`,
      content: aiContent,
      amazonUrl: book.amazonUrl,
      homeUrl: "https://best-ebooks.net/vlogs"
    };

    // 2. Save to KV
    await env.BOOK_REVIEWS.put(finalPost.id, JSON.stringify(finalPost));
    await env.BOOK_REVIEWS.put("latest_review", JSON.stringify(finalPost));

    // 3. Option B/1: Pinterest
    if (env.PINTEREST_TOKEN && env.PINTEREST_BOARD_ID) {
      try {
        const pinData = {
          title: `Daily Reading: ${book.title}`,
          description: `Check out our latest AI-driven review of ${book.title}! Read the full story on our blog.`,
          link: finalPost.homeUrl,
          board_id: env.PINTEREST_BOARD_ID,
          media_source: {
            source_type: "image_url",
            url: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg" 
          }
        };

        await fetch('https://api.pinterest.com/v5/pins', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${env.PINTEREST_TOKEN}`,
            'Content-Type': 'application/json',
            'User-Agent': 'Cloudflare-Worker-BestBooks'
          },
          body: JSON.stringify(pinData)
        });
      } catch (err) { console.error("Pinterest Error:", err); }
    }

    // 4. Option B/2: Dev.to
    if (env.DEV_TO_API_KEY) {
      try {
        const article = {
          article: {
            title: `Must Read: ${book.title} - Daily AI Insight`,
            published: true,
            body_markdown: `${finalPost.content}\n\n[Get it on Amazon](${book.amazonUrl}) | [Read daily reviews here](https://best-ebooks.net/vlogs)`,
            tags: ["books", "reading", "reviews"],
            series: "Daily AI Book Reviews"
          }
        };

        await fetch('https://dev.to/api/articles', {
          method: 'POST',
          headers: {
            'api-key': env.DEV_TO_API_KEY,
            'Content-Type': 'application/json',
            'User-Agent': 'Cloudflare-Worker-BestBooks'
          },
          body: JSON.stringify(article)
        });
      } catch (err) { console.error("Dev.to Error:", err); }
    }

    // 5. Option B/3: Brevo (Email Newsletter)
    if (env.BREVO_API_KEY) {
      try {
        const emailData = {
          sender: { name: "Best Ebooks Daily", email: "managementbestebooks@gmail.com" },
          to: [{ email: "managementbestebooks@gmail.com" }],
          subject: `📖 Today's Book Insight: ${book.title}`,
          htmlContent: `
            <h1>Today's Daily Insight</h1>
            <p>${finalPost.content.replace(/\n/g, '<br>')}</p>
            <br>
            <a href="${book.amazonUrl}" style="padding: 10px 20px; background: #FF9900; color: white; text-decoration: none; border-radius: 5px;">View on Amazon</a>
            <br><br>
            <p>Read more reviews at <a href="https://best-ebooks.net/vlogs">best-ebooks.net</a></p>
          `
        };

        await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'api-key': env.BREVO_API_KEY,
            'Content-Type': 'application/json',
            'User-Agent': 'Cloudflare-Worker-BestBooks'
          },
          body: JSON.stringify(emailData)
        });
      } catch (err) { console.error("Brevo Error:", err); }
    }
  },

  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === '/') {
      const latest = await env.BOOK_REVIEWS.get("latest_review");
      return new Response(latest, {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    if (url.pathname === '/force-generate') {
      await this.scheduled(null, env, ctx);
      return new Response("Traffic machine manually triggered. Check Dev.to and Email!");
    }

    return new Response("Not found", { status: 404 });
  }
};
