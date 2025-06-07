import express from "express";
import Stripe from "stripe";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors());
app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
  const { total, startDate, endDate, addons } = req.body;

  console.log("Creating Stripe session:", { total, startDate, endDate, addons });

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "cad",
            product_data: {
              name: "Garmin InReach Mini 2 Rental",
            },
            unit_amount: total * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:5173/thank-you",
      cancel_url: "http://localhost:5173/checkout",
      metadata: {
        startDate,
        endDate,
        addons: JSON.stringify(addons),
      },
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => console.log("✅ Stripe server running at http://localhost:3001"));

app.post("/webhook", express.raw({ type: "application/json" }), async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error("Webhook Error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    // Send email here
    const nodemailer = await import("nodemailer");
    const transporter = nodemailer.createTransport({
      service: "gmail", // or your email provider
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: session.customer_email,
      subject: "Your Garmin Mini 2 Rental Confirmation",
      text: `Thank you! Your rental is confirmed.\n\nStart: ${session.metadata.startDate}\nEnd: ${session.metadata.endDate}\nAdd-ons: ${session.metadata.addons}\nTotal: $${session.amount_total / 100}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) return console.error("Email error:", error);
      console.log("Confirmation email sent:", info.response);
    });
  }

  res.json({ received: true });
});
