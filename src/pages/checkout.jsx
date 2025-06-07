import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";

export default function Checkout() {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [addons, setAddons] = useState({
    extraMessages: false,
    gpsTracking: false,
    sosTest: false,
  });

  const baseRate = 50;
  const dailyRate = 6;
  const deposit = 300;
  const shipping = 20;
  const addonPrices = {
    extraMessages: 10,
    gpsTracking: 15,
    sosTest: 5,
  };

  const calculateDays = () => {
    if (!startDate || !endDate) return 3;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.max(end - start, 0);
    const calculatedDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return Math.max(3, calculatedDays);
  };

  const days = calculateDays();
  const additionalDays = days > 3 ? days - 3 : 0;
  const addonsTotal = Object.entries(addons).reduce(
    (sum, [key, value]) => sum + (value ? addonPrices[key] : 0),
    0
  );

  const total = baseRate + additionalDays * dailyRate + shipping + addonsTotal + deposit;

  const toggleAddon = (key) => {
    setAddons((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const minEndDate = startDate
    ? new Date(new Date(startDate).getTime() + 2 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0]
    : "";

  const handlePayment = async () => {
    const res = await fetch("http://localhost:3001/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        total,
        startDate,
        endDate,
        addons,
      }),
    });

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Failed to initialize payment. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-gray-700 text-white px-6 py-12 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-orange-400 mb-10 text-center">Checkout</h1>

      <div className="max-w-xl w-full space-y-8 bg-white/5 backdrop-blur-md border border-gray-600 p-8 rounded-xl shadow-2xl">
        {/* Rental Schedule */}
        <div className="text-left space-y-4">
          <div>
            <label className="block mb-1 font-medium text-orange-300">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-neutral-800 border border-gray-500 text-white focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-orange-300">End Date (min 3 days total)</label>
            <input
              type="date"
              min={minEndDate}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-neutral-800 border border-gray-500 text-white focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <p className="text-sm text-gray-400">Rental Duration: <strong>{days}</strong> days</p>
        </div>

        {/* Add-ons */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-orange-300">Optional Add-ons</h2>
          {Object.entries(addons).map(([key, value]) => (
            <label key={key} className="flex items-center gap-3 text-sm text-gray-200">
              <input
                type="checkbox"
                checked={value}
                onChange={() => toggleAddon(key)}
                className="accent-orange-500"
              />
              <span>
                {key === "extraMessages" && "Extra Messages ($10)"}
                {key === "gpsTracking" && "GPS Tracking ($15)"}
                {key === "sosTest" && "SOS Test Feature ($5)"}
              </span>
            </label>
          ))}
        </div>

        {/* Cost Breakdown */}
        <div className="text-sm text-gray-200 space-y-1">
          <p>Base Rate (3 days): ${baseRate}</p>
          <p>Extra Days ({additionalDays} x ${dailyRate}): ${additionalDays * dailyRate}</p>
          <p>Shipping: ${shipping}</p>
          {Object.entries(addons).map(
            ([key, value]) =>
              value && (
                <p key={key}>
                  {key === "extraMessages" && "Extra Messages: $10"}
                  {key === "gpsTracking" && "GPS Tracking: $15"}
                  {key === "sosTest" && "SOS Test: $5"}
                </p>
              )
          )}
          <p className="text-xs italic text-gray-400 mt-2">
            + $300 refundable damage deposit (not charged if returned in good condition)
          </p>
          <hr className="my-2 border-gray-600" />
          <p className="text-lg font-semibold text-orange-400">Total: ${total}</p>
        </div>

        {/* Terms Agreement */}
        <label className="flex items-start gap-2 text-sm text-gray-300">
          <input
            type="checkbox"
            checked={agreed}
            onChange={() => setAgreed(!agreed)}
            className="mt-1"
          />
          <span>
            I have read and agree to the
            <a href="/terms" className="text-orange-400 underline ml-1">Rental Terms & Agreement</a>
          </span>
        </label>

        {/* Payment Button */}
        <button
          disabled={!agreed}
          onClick={handlePayment}
          className={`w-full px-6 py-3 rounded-full text-white font-semibold transition ${
            agreed ? "bg-orange-600 hover:bg-orange-700" : "bg-gray-600 cursor-not-allowed"
          }`}
        >
          Proceed to Payment
        </button>
      </div>

      <button
        onClick={() => navigate("/")}
        className="mt-10 text-orange-300 underline"
      >
        ← Back to Home
      </button>
    </div>
  );
}
