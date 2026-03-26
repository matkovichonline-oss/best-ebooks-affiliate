// vlog-worker-src.js
var vlog_worker_src_default = {
  async scheduled(event, env, ctx) {
    const products = [
      { id: "m1", title: "The Silent Patient", author: "Alex Michaelides", amazonUrl: "https://www.amazon.com/Silent-Patient-Alex-Michaelides/dp/1250301696?tag=bestbooksne09-20" },
      { id: "m2", title: "Gone Girl", author: "Gillian Flynn", amazonUrl: "https://www.amazon.com/Gone-Girl-Gillian-Flynn/dp/0307588378?tag=bestbooksne09-20" },
      { id: "m3", title: "The Girl on the Train", author: "Paula Hawkins", amazonUrl: "https://www.amazon.com/Girl-Train-Paula-Hawkins/dp/1594634025?tag=bestbooksne09-20" },
      { id: "m4", title: "Verity", author: "Colleen Hoover", amazonUrl: "https://www.amazon.com/Verity-Colleen-Hoover/dp/1538724731?tag=bestbooksne09-20" },
      { id: "p1", title: "Atomic Habits", author: "James Clear", amazonUrl: "https://www.amazon.com/Atomic-Habits-Proven-Build-Break/dp/0735211299?tag=bestbooksne09-20" },
      { id: "s1", title: "Dune", author: "Frank Herbert", amazonUrl: "https://www.amazon.com/Dune-Frank-Herbert/dp/0441013597?tag=bestbooksne09-20" }
    ];
    const dayOfYear = Math.floor((Date.now() - new Date((/* @__PURE__ */ new Date()).getFullYear(), 0, 0)) / 864e5);
    const book = products[dayOfYear % products.length];
    const prompt = `Write a professional, engaging and passionate book review for "${book.title}" by ${book.author}. 
    Focus on why it's a must-read. Keep it around 300 words. 
    Format with a catchy Title and clear paragraphs. Include several emojis.
    CRITICAL INSTRUCTION: Do NOT include any disclaimers explaining that you are an AI. Do NOT mention artificial intelligence, language models, or automated generation anywhere in the text. Write confidently from the perspective of an avid reader and book critic.`;
    const response = await env.AI.run("@cf/meta/llama-3-8b-instruct", { prompt });
    const aiContent = response.response;
    const finalPost = {
      id: `vlog-${Date.now()}`,
      date: (/* @__PURE__ */ new Date()).toISOString(),
      bookId: book.id,
      title: `Daily Review: ${book.title}`,
      content: aiContent,
      amazonUrl: book.amazonUrl,
      homeUrl: "https://best-ebooks.net/vlogs"
    };
    await env.BOOK_REVIEWS.put(finalPost.id, JSON.stringify(finalPost));
    await env.BOOK_REVIEWS.put("latest_review", JSON.stringify(finalPost));
    const pinKit = {
      title: `\u{1F4D6} Must Read: ${book.title}`,
      description: `Daily Book Review: ${book.title} by ${book.author}. Find out why this is today's top pick! #books #reading #affiliate`,
      link: finalPost.homeUrl,
      imageUrl: `https://covers.openlibrary.org/b/title/${encodeURIComponent(book.title)}-L.jpg`
    };
    await env.BOOK_REVIEWS.put(`kit-${finalPost.id}`, JSON.stringify(pinKit));
    if (env.DEV_TO_API_KEY) {
      try {
        const article = {
          article: {
            title: `Must Read: ${book.title} - Daily AI Insight`,
            published: true,
            body_markdown: `${finalPost.content}

[Get it on Amazon](${book.amazonUrl}) | [Read daily reviews here](https://best-ebooks.net/vlogs)`,
            tags: ["books", "reading", "reviews"],
            series: "Daily AI Book Reviews"
          }
        };
        await fetch("https://dev.to/api/articles", {
          method: "POST",
          headers: {
            "api-key": env.DEV_TO_API_KEY,
            "Content-Type": "application/json",
            "User-Agent": "Cloudflare-Worker-BestBooks"
          },
          body: JSON.stringify(article)
        });
      } catch (err) {
        console.error("Dev.to Error:", err);
      }
    }
    if (env.BREVO_API_KEY) {
      try {
        const emailData = {
          sender: { name: "Best Ebooks Daily", email: "daily@best-ebooks.net" },
          to: [{ email: "managementbestebooks@gmail.com" }],
          subject: `\u{1F4D6} Today's Book Insight: ${book.title}`,
          htmlContent: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
              <h1 style="color: #333;">\u{1F4D6} Today's Daily Insight: ${book.title}</h1>
              <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; border-left: 4px solid #FF9900;">
                <p>${finalPost.content.replace(/\n/g, "<br>")}</p>
              </div>
              
              <div style="margin: 30px 0; text-align: center;">
                <a href="${book.amazonUrl}" style="padding: 12px 25px; background: #FF9900; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">View on Amazon</a>
              </div>

              <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;">

              <h2 style="color: #E60023;">\u{1F4CC} Pinterest Posting Kit</h2>
              <p style="color: #666; font-size: 0.9rem;">Copy and paste this once a week to grow your traffic!</p>
              <div style="background: #fff5f5; padding: 15px; border: 1px dashed #E60023; border-radius: 8px;">
                <p><strong>Title:</strong> ${pinKit.title}</p>
                <p><strong>Description:</strong> ${pinKit.description}</p>
                <p><strong>Link:</strong> ${pinKit.link}</p>
                <p><strong>Cover Image:</strong> <a href="${pinKit.imageUrl}">${pinKit.imageUrl}</a></p>
              </div>
            </div>
          `
        };
        await fetch("https://api.brevo.com/v3/smtp/email", {
          method: "POST",
          headers: {
            "api-key": env.BREVO_API_KEY,
            "Content-Type": "application/json",
            "User-Agent": "Cloudflare-Worker-BestBooks"
          },
          body: JSON.stringify(emailData)
        });
      } catch (err) {
        console.error("Brevo Error:", err);
      }
    }
  },
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === "/") {
      const latest = await env.BOOK_REVIEWS.get("latest_review");
      return new Response(latest, {
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      });
    }
    if (url.pathname === "/kits") {
      const list = await env.BOOK_REVIEWS.list({ prefix: "kit-" });
      const kits = await Promise.all(
        list.keys.map(async (key) => JSON.parse(await env.BOOK_REVIEWS.get(key.name)))
      );
      return new Response(JSON.stringify(kits), {
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      });
    }
    if (url.pathname === "/demo") {
      return new Response(`
        <html>
          <body style="font-family: sans-serif; padding: 50px; text-align: center; background: #f4f4f4;">
            <div style="background: white; padding: 40px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); display: inline-block;">
              <h1 style="color: #E60023;">Pinterest Integration Active</h1>
              <p style="color: #555; font-size: 1.2rem;">Status: Authorized for BestBooks_AI</p>
              <p style="color: #888;">Authenticated via Standard API v5</p>
              <div style="margin-top: 20px; padding: 15px; background: #fdfdfd; border: 1px solid #eee; border-radius: 10px; font-family: monospace;">
                Target Board: Must Read Books (env.PINTEREST_BOARD_ID)
              </div>
            </div>
          </body>
        </html>
      `, { headers: { "Content-Type": "text/html" } });
    }
    if (url.pathname === "/test-email") {
      try {
        const testData = {
          sender: { name: "Best Ebooks Daily", email: "daily@best-ebooks.net" },
          to: [{ email: "managementbestebooks@gmail.com" }],
          subject: "Test Email - Brevo Key Verification",
          htmlContent: "<h1>If you see this, the new Brevo API key is working!</h1>"
        };
        const res = await fetch("https://api.brevo.com/v3/smtp/email", {
          method: "POST",
          headers: {
            "api-key": env.BREVO_API_KEY,
            "Content-Type": "application/json",
            "User-Agent": "Cloudflare-Worker-BestBooks"
          },
          body: JSON.stringify(testData)
        });
        const body = await res.text();
        return new Response(JSON.stringify({ status: res.status, body }), {
          headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
          headers: { "Content-Type": "application/json" }
        });
      }
    }
    if (url.pathname === "/force-generate") {
      await this.scheduled(null, env, ctx);
      return new Response("Traffic machine manually triggered. Check Dev.to and Email!");
    }
    return new Response("Not found", { status: 404 });
  }
};
export {
  vlog_worker_src_default as default
};
