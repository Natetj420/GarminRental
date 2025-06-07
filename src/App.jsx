import { useNavigate } from "react-router-dom";
import { FaDollarSign, FaTruck } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Home() {
  const navigate = useNavigate();

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.5 },
    }),
  };

  const cards = [
    {
      icon: <FaDollarSign className="text-orange-500 text-4xl mb-4" />,
      title: "Only $50 for 3 Days",
      lines: ["+ $6/day after", "+ $300 refundable deposit"],
    },
    {
      icon: <FaDollarSign className="text-orange-500 text-4xl mb-4" />,
      title: "Affordable & Reliable",
      lines: ["No hidden fees", "Easy to rent, easy to return"],
    },
    {
      icon: <FaTruck className="text-orange-500 text-4xl mb-4" />,
      title: "Fast Canada-Wide Shipping",
      lines: ["Prepaid return label", "Tracked delivery coast to coast"],
    },
    {
      icon: <FaTruck className="text-orange-500 text-4xl mb-4" />,
      title: "Rugged & Ready",
      lines: ["Setup guide included", "Waterproof & adventure-ready"],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-gray-800 text-white px-6 py-12 flex flex-col items-center">
      {/* Garmin Theme Header */}
      <h1
        className="text-4xl md:text-5xl font-extrabold tracking-tight mb-12 text-center uppercase"
        style={{
          fontFamily: "sans-serif",
          letterSpacing: "1px",
          textShadow: "1px 1px 4px rgba(255, 165, 0, 0.4)",
          borderBottom: "3px solid #ff7f00",
          paddingBottom: "0.5rem",
          color: "#ff7f00",
        }}
      >
        Rent a Garmin InReach Mini 2 Across Canada
      </h1>

      {/* Center Section: Cards + Image */}
      <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-center gap-6">
        {/* Left 2 Cards */}
        <div className="flex flex-col gap-6 w-full lg:w-1/4">
          {cards.slice(0, 2).map((card, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              className="bg-black/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-xl text-center"
            >
              {card.icon}
              <h2 className="text-xl font-semibold text-white mb-2">{card.title}</h2>
              {card.lines.map((line, j) => (
                <p key={j} className="text-sm text-gray-300">
                  {line}
                </p>
              ))}
            </motion.div>
          ))}
        </div>

        {/* Center Image */}
        <div className="flex justify-center items-center w-full lg:w-1/2">
          <img
            src="/src/assets/images/garmin-inreach-mini2.png"
            alt="Garmin InReach Mini 2"
            className="w-[300px] md:w-[400px] lg:w-[460px] object-contain drop-shadow-2xl"
          />
        </div>

        {/* Right 2 Cards */}
        <div className="flex flex-col gap-6 w-full lg:w-1/4">
          {cards.slice(2, 4).map((card, i) => (
            <motion.div
              key={i + 2}
              custom={i + 2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              className="bg-black/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-xl text-center"
            >
              {card.icon}
              <h2 className="text-xl font-semibold text-white mb-2">{card.title}</h2>
              {card.lines.map((line, j) => (
                <p key={j} className="text-sm text-gray-300">
                  {line}
                </p>
              ))}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tagline */}
      <p className="text-xl italic text-orange-300 font-light mt-10">
        Be prepared, when you need it.
      </p>

      {/* CTA Button */}
      <button
        onClick={() => navigate("/checkout")}
        className="mt-6 px-10 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold text-lg rounded-full shadow-xl transition-all"
      >
        Get Now
      </button>

      {/* === Contact CTA Section === */}
      <div className="mt-24 w-full max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-orange-500 mb-4">
          Need More Info?
        </h2>
        <p className="text-gray-300 mb-10">
          Reach out with any questions about the Garmin Mini 2 rental process — we’re here to help.
        </p>

        {/* Contact Form */}
        <form
          className="bg-black/30 backdrop-blur-md p-8 rounded-2xl border border-gray-700 shadow-xl space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Message sent! (Implement backend later)");
          }}
        >
          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Your Name"
              required
              className="w-full px-4 py-3 rounded-lg bg-neutral-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              required
              className="w-full px-4 py-3 rounded-lg bg-neutral-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <textarea
            placeholder="Your Message"
            required
            rows="5"
            className="w-full px-4 py-3 rounded-lg bg-neutral-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            type="submit"
            className="w-full px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-full transition"
          >
            Send Message
          </button>

          {/* === FAQ Section === */}
          <div className="mt-20 text-left">
            <h3 className="text-2xl font-semibold text-orange-500 mb-6 text-center">Common Questions</h3>
            <div className="space-y-4 max-w-2xl mx-auto">
              {[
                {
                  q: "How much is the damage deposit?",
                  a: "The refundable damage deposit is $300. It’s returned once the device is inspected after return.",
                },
                {
                  q: "How much is shipping?",
                  a: "You pay half, we pay half. We charge $20 to ship anywhere in Canada, We pay for shipping on return. ",
                },
                {
                  q: "How do I return the Garmin Mini 2?",
                  a: "Place it in the original box, apply the prepaid label, and drop it off at any Canada Post location.",
                },
                {
                  q: "Can I rent for longer than 3 days?",
                  a: "Absolutely — it’s $6 for each additional day after the initial 3-day rental.",
                },
              ].map((item, idx) => (
                <details
                  key={idx}
                  className="bg-black/20 rounded-lg border border-gray-700 p-4 group cursor-pointer transition-all"
                >
                  <summary className="font-semibold text-white text-lg group-open:text-orange-500 transition">
                    {item.q}
                  </summary>
                  <p className="text-sm text-gray-300 mt-2">{item.a}</p>
                </details>
                
              ))}
            </div>


          </div>
        </form>
      </div>
      {/* === Scroll to Top Button === */}
<motion.button
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  whileHover={{ scale: 1.1 }}
  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
  className="fixed bottom-6 right-6 z-50 bg-orange-600 hover:bg-orange-700 text-white text-xl p-3 rounded-full shadow-xl transition"
>
  ↑
</motion.button>

    </div>
  );
}
