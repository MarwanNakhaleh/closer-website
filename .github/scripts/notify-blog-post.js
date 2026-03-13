#!/usr/bin/env node
//
// notify-blog-post.js
// Writes new blog post metadata to Firestore to trigger push notifications.
// Usage: node notify-blog-post.js --title "Post Title" --url "https://..."
//

const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

function parseArgs() {
  const args = process.argv.slice(2);
  const result = {};
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i].replace(/^--/, "");
    result[key] = args[i + 1];
  }
  return result;
}

async function main() {
  const { title, url } = parseArgs();
  if (!title || !url) {
    console.error("Usage: node notify-blog-post.js --title <title> --url <url>");
    process.exit(1);
  }

  // Initialize Firebase Admin with service account from env var
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  initializeApp({ credential: cert(serviceAccount) });

  const db = getFirestore("closerdb");

  await db.collection("blogPosts").add({
    title,
    url,
    publishedAt: new Date(),
  });

  console.log(`Blog post notification created: "${title}"`);
}

main().catch((err) => {
  console.error("Failed to notify blog post:", err.message);
  process.exit(1);
});
