# Deploying pmtoolsbyapm.com

Everything in this folder is a complete, static website. No build step, no
dependencies, no server code. It will run anywhere that serves files.

---

## Step 1 — Put the files on GitHub

1. Go to **https://github.com/new**
2. Repository name: `pmtoolsbyapm`
3. Set it to **Public** (Private also works on Vercel's free plan)
4. Do **not** tick "Add a README file"
5. Click **Create repository**
6. On the next screen click **uploading an existing file**
7. Drag in **every file and the `downloads` folder** from this package
8. Scroll down, click **Commit changes**

Your file list on GitHub should look exactly like this:

```
index.html
buildtrack.html
resources.html
knowledge.html
about.html
contact.html
article-silence.html
article-audit.html
article-float.html
styles.css
downloads/
   FIDIC-Notice-Checklist.pdf
   Daily-Site-Log.pdf
   Risk-Register.xlsx
```

---

## Step 2 — Deploy on Vercel

1. Go to **https://vercel.com/new**
2. Click **Import** next to the `pmtoolsbyapm` repository
   (if you don't see it, click **Adjust GitHub App Permissions** and grant access)
3. Leave **every setting on its default.** Framework Preset will say
   "Other" — that is correct. Do not set a build command.
4. Click **Deploy**

Wait about thirty seconds. You will get a URL like
`pmtoolsbyapm.vercel.app`. Open it and check the site works.

---

## Step 3 — Point the domain at it

### In Vercel

1. Open your new project
2. Click **Settings** (top menu) → **Domains** (left menu)
3. Type `pmtoolsbyapm.com` and click **Add**
4. Choose **Add pmtoolsbyapm.com and redirect www to it** (recommended)
5. Vercel now shows you the DNS records it wants. **Leave this tab open** —
   you need to copy from it in the next step.

You will see something like:

| Type  | Name | Value                 |
|-------|------|-----------------------|
| A     | @    | 76.76.21.21           |
| CNAME | www  | cname.vercel-dns.com  |

> Use the values **Vercel actually shows you**, not the ones above — they
> change from time to time.

### In Namecheap

1. Go to **https://www.namecheap.com** and sign in
2. Click **Domain List** in the left menu
3. Find `pmtoolsbyapm.com` and click **Manage**
4. Click the **Advanced DNS** tab
5. Under **Host Records**, delete any existing records with Host `@` or `www`
   (the "Parking Page" / CNAME record Namecheap adds by default — remove it,
   or the domain will not resolve)
6. Click **Add New Record** and add the A record:
   - Type: **A Record**
   - Host: **@**
   - Value: the IP Vercel gave you
   - TTL: **Automatic**
7. Click **Add New Record** again for the CNAME:
   - Type: **CNAME Record**
   - Host: **www**
   - Value: the value Vercel gave you (ends in `.vercel-dns.com`)
   - TTL: **Automatic**
8. Click the **green tick** to save each record

### IMPORTANT — do not break your email

You have `support@pmtoolsbyapm.com` on Namecheap Private Email. Its **MX
records** live in this same Advanced DNS screen.

**Do not delete or edit anything of Type `MX`, or any `TXT` record
mentioning `spf` or `dkim`.** Touch only `@` (A) and `www` (CNAME).

If you delete the MX records your business email stops working.

---

## Step 4 — Wait, then verify

DNS takes anywhere from 10 minutes to a few hours. Vercel's Domains screen
shows a green tick when it has propagated. HTTPS is issued automatically —
you do not need to buy a certificate.

Check all of these once it is live:

- [ ] `https://pmtoolsbyapm.com` loads
- [ ] `https://www.pmtoolsbyapm.com` redirects to the non-www version
- [ ] All three downloads on `/resources.html` actually download
- [ ] Send yourself a test email to `support@pmtoolsbyapm.com` — confirm it
      still arrives

---

## Making changes later

Edit a file directly on GitHub (open it, click the pencil icon, edit, commit).
Vercel redeploys automatically within about thirty seconds. No other step.

To add a new article: copy an existing `article-*.html`, change the content,
then add a card for it on `knowledge.html`.

---

## Notes on what's here

**Images** are hotlinked from Unsplash. They cost nothing and need no
licence, but they load from Unsplash's servers. If you'd rather host your
own later, drop them in an `images/` folder and swap the `src` values.

**The newsletter form does not send anywhere yet.** It is styled and ready
but has no backend — submitting it does nothing. When you're ready, connect
it to a service like Buttondown, ConvertKit, or MailerLite; each gives you a
form action URL to paste in. Until then, consider removing it or pointing
people at email, so nobody signs up into a void.

**Downloads have no email gate.** That was deliberate — the files build
trust and credibility. If you later want to capture emails first, that's a
change to `resources.html`.
