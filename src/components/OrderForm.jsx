export default function OrderForm() {
  return (
    <form
      id="order"
      action="https://formspree.io/f/YOUR_ID"
      method="POST"
      className="space-y-4 mt-8"
    >
      <input
        name="name"
        type="text"
        required
        placeholder="Your Name"
        className="w-full p-2 border rounded"
      />
      <input
        name="phone"
        type="tel"
        required
        placeholder="Phone Number"
        className="w-full p-2 border rounded"
      />
      <input
        name="address"
        type="text"
        required
        placeholder="Delivery Address"
        className="w-full p-2 border rounded"
      />
      <input
        type="hidden"
        name="payment"
        value="Cash on Delivery"
      />
      <input
        type="hidden"
        name="shipping"
        value="Free Delivery"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Place Order
      </button>
    </form>
  );
}
