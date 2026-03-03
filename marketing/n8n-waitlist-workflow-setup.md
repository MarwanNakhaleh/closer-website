# Closer Waitlist: n8n Workflow Setup

This guide walks you through setting up the n8n workflow that captures emails from the Closer coming-soon page and stores them in a Google Sheet.

## What This Workflow Does

1. Receives email submissions from `closerconnectandalign.com/coming-soon/`
2. Checks for duplicate emails
3. Adds new signups to a Google Sheet
4. Sends a confirmation email via Gmail

## Prerequisites

- Access to your n8n instance at `https://bransonsolutions.app.n8n.cloud`
- A Google account (for Sheets + Gmail)
- Your closer-website repo (to update the webhook URL)

---

## Step 1: Create the Google Sheet

1. Go to Google Sheets and create a new spreadsheet
2. Name it **"Closer Waitlist"**
3. In Row 1, add these column headers:
   - **A1:** `email`
   - **B1:** `source`
   - **C1:** `timestamp`
   - **D1:** `signup_date`
4. Note the spreadsheet URL — you'll need it in Step 4

---

## Step 2: Create a New Workflow in n8n

1. Log in to `https://bransonsolutions.app.n8n.cloud`
2. Click **"Add workflow"** (top right)
3. Name it **"Closer Waitlist Capture"**

---

## Step 3: Add the Webhook Trigger Node

This is the entry point that receives form submissions.

1. Click the **"+"** button on the canvas
2. Search for **"Webhook"** and select it
3. Configure:
   - **HTTP Method:** `POST`
   - **Path:** `closer-waitlist` (this becomes part of your URL)
   - **Authentication:** None (the form is public)
   - **Response Mode:** `Immediately` (so the form doesn't hang)
   - **Response Code:** `200`
4. Click **"Listen for test event"**, then submit a test email on your coming-soon page (or use curl):
   ```
   curl -X POST https://bransonsolutions.app.n8n.cloud/webhook-test/closer-waitlist  -H "Content-Type: application/json" -d '{"email":"test@example.com","source":"coming-soon-page","timestamp":"2026-03-02T12:00:00Z"}'
   ```
5. Once the test event is received, you'll see the payload. Click **"Back to canvas"**
6. **Copy the Production webhook URL** — it will look like:
   ```
   https://bransonsolutions.app.n8n.cloud/webhook/closer-waitlist
   ```

---

## Step 4: Add Google Sheets "Search" Node (Duplicate Check)

1. Click **"+"** after the Webhook node
2. Search for **"Google Sheets"** and select it
3. If prompted, connect your Google account (OAuth2)
4. Configure:
   - **Operation:** `Search Rows`
   - **Document:** Select your "Closer Waitlist" spreadsheet
   - **Sheet:** `Sheet1`
   - **Filter:** Column `email` equals `{{ $json.body.email }}`
5. Name this node **"Check Duplicate"**

---

## Step 5: Add an IF Node (Skip Duplicates)

1. Click **"+"** after the Google Sheets search node
2. Search for **"IF"** and select it
3. Configure the condition:
   - **Value 1:** `{{ $json.length }}` (or `{{ $('Check Duplicate').item.json.length }}`)
   - **Operation:** `Equal`
   - **Value 2:** `0`
4. This routes:
   - **True** (no duplicate) → continue to add the row
   - **False** (already exists) → do nothing (or send a "you're already signed up" response)

---

## Step 6: Add Google Sheets "Append Row" Node

1. On the **True** output of the IF node, click **"+"**
2. Search for **"Google Sheets"** and select it
3. Configure:
   - **Operation:** `Append Row`
   - **Document:** Select your "Closer Waitlist" spreadsheet
   - **Sheet:** `Sheet1`
   - **Columns:**
     - `email` → `{{ $('Webhook').item.json.body.email }}`
     - `source` → `{{ $('Webhook').item.json.body.source }}`
     - `timestamp` → `{{ $('Webhook').item.json.body.timestamp }}`
     - `signup_date` → `{{ $now.format('yyyy-MM-dd') }}`
4. Name this node **"Add to Sheet"**

---

## Step 7: Add Gmail Confirmation Node (Optional)

1. Click **"+"** after the "Add to Sheet" node
2. Search for **"Gmail"** and select it
3. Connect your Google account if not already connected
4. Configure:
   - **Operation:** `Send Email`
   - **To:** `{{ $('Webhook').item.json.body.email }}`
   - **Subject:** `You're on the Closer waitlist`
   - **Email Type:** `HTML`
   - **HTML Body:**
     ```html
     <div style="font-family: system-ui, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
       <h1 style="font-size: 24px; color: #1a1a1a;">Welcome to the Closer waitlist</h1>
       <p style="color: #555; line-height: 1.6;">
         Thanks for signing up. We're building something for couples who want
         more from their intimate lives — not generic advice, but real tools
         backed by research.
       </p>
       <p style="color: #555; line-height: 1.6;">
         We'll email you when the iOS app is ready. In the meantime, check out
         our blog for practical insights:
       </p>
       <p>
         <a href="https://closerconnectandalign.com/blog/" style="color: #0d9488; text-decoration: none; font-weight: 600;">
           Read the blog →
         </a>
       </p>
       <p style="color: #999; font-size: 13px; margin-top: 30px;">
         — The Closer team<br>
         Align and grow together.
       </p>
     </div>
     ```
5. Name this node **"Send Confirmation"**

---

## Step 8: Activate the Workflow

1. Review the full flow: **Webhook → Check Duplicate → IF → Add to Sheet → Send Confirmation**
2. Click the **"Active"** toggle in the top right to turn the workflow on
3. The production URL is now live

---

## Step 9: Update the Coming-Soon Page

Replace the placeholder webhook URL in `closer-website/coming-soon/index.html`.

Find both instances of:
```
https://YOUR-N8N-WEBHOOK-URL
```

Replace with your production webhook URL:
```
https://bransonsolutions.app.n8n.cloud/webhook/closer-waitlist
```

There are two forms on the page (hero and bottom CTA) — both need updating.

After updating, commit and push to deploy.

---

## Testing the Full Flow

1. Open `closerconnectandalign.com/coming-soon/`
2. Enter a test email and click "Get Early Access"
3. Verify:
   - The form shows "You're on the list. We'll be in touch."
   - The email appears in your Google Sheet
   - A confirmation email arrives (check spam if needed)
4. Submit the same email again — it should still show success (the page doesn't know about duplicates) but the Google Sheet should NOT have a second row

---

## Workflow Summary

```
[Webhook: POST /closer-waitlist]
        ↓
[Google Sheets: Search for email]
        ↓
[IF: No results?]
   ├── True → [Google Sheets: Append Row] → [Gmail: Send Confirmation]
   └── False → (end, already signed up)
```

## Notes

- The webhook path `closer-waitlist` is arbitrary — change it if you prefer something else
- If you want to track total signups, the Google Sheet row count minus 1 (header) gives you the number
- Update the "247 couples waiting" text on the coming-soon page periodically based on actual signups
- Consider adding a Slack notification node after "Add to Sheet" so you see signups in real time
