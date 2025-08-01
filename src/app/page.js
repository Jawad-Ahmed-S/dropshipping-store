"use client"
import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link'
import ProductHeader from '@/components/Header';
// Use these imports for Heroicons v2
import { 
  TruckIcon,
  ArrowPathIcon as RefreshIcon,
  ShieldCheckIcon 
} from '@heroicons/react/24/outline';
import UrgencyTimer from '@/components/UrgencyTimer';
export default function ProductPage() {
  const [showForm, setShowForm] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [success, setSuccess] = useState(false);

  const product = {
    title: "3-in-1 High Pressure Water Spray Nozzel",
    price: 1699,
    discountPrice: 1190,
    description: " Transform your garden hose into a powerful cleaning tool with adjustable spray patterns for versatile outdoor use.",
    images: [
      { id: 1, src: "/product/main.jpeg", alt: "Product size reference" },
      { id: 2, src: "/product/size.webp", alt: "Premium watch main view" },
      { id: 3, src: "/product/modes.jpg", alt: "Watch display modes" },
      { id: 4, src: "/product/main.jpeg", alt: "Watch close-up detail" },
      { id: 5, src: "/product/size.webp", alt: "Product packaging" }
    ]
  };

const handleOrderSubmit = async (e) => {
  e.preventDefault();

  // Meta Pixel tracking
  if (typeof window.fbq !== 'undefined') {
    fbq('track', 'Lead');  // or 'Purchase' if you prefer
  }

  const form = e.target;
  const formData = new FormData(form);

  const response = await fetch("https://formspree.io/f/mldllrwn", {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
    },
  });

  if (response.ok) {
    setSuccess(true);
    form.reset();
  } else {
    alert("Something went wrong. Please try again.");
  }
};

  return (
    <>
    
    <ProductHeader/>
    <div className="min-h-screen bg-gray-50">
      <Head>
  <title>{product.title}</title>
  <meta name="description" content={product.description} />
  <script
    dangerouslySetInnerHTML={{
      __html: `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '756944570620895');
        fbq('track', 'PageView');
      `,
    }}
  />

  <noscript>
    <img
      height="1"
      width="1"
      style={{ display: 'none' }}
      src="https://www.facebook.com/tr?id=756944570620895&ev=PageView&noscript=1"
      alt=""
    />
  </noscript>
</Head>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Product Image Gallery */}
          <div className="md:w-1/2">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden relative mb-4">
                <Image
                  src={product.images[selectedImage].src}
                  alt={product.images[selectedImage].alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
              
              <div className="grid grid-cols-5 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square bg-gray-50 rounded-md overflow-hidden relative transition-all ${
                      selectedImage === index 
                        ? 'ring-2 ring-gray-400 scale-105' 
                        : 'hover:ring-1 hover:ring-gray-200'
                    }`}
                    aria-label={image.alt}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      sizes="80px"
                      quality={50}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="md:w-1/2">
            <div className="sticky top-8 pt-5">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">{product.title}</h1>
              <div className="flex items-center gap-3 mb-4">
  <span className="text-2xl font-medium text-gray-900">
    Rs. {product.discountPrice * quantity} {/* Updated */}
  </span>
  {product.discountPrice && (
    <span className="text-lg text-gray-500 line-through">
      Rs. {product.price * quantity} {/* Updated */}
    </span>
  )}
  <span className="bg-orange-600 text-white p-1 rounded">- 30%</span>
</div>

              <p className="text-gray-600 mb-6">{product.description}</p>

              {/* Quantity Selector */}
              <div className="mb-8">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Quantity</h3>
                <div className="flex items-center border border-gray-200 rounded-md w-min">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 text-gray-900">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <button
  onClick={() => {
    if (typeof window.fbq !== 'undefined') {
      fbq('trackCustom', 'OrderNowClicked');
    }
    setShowForm(true); // existing popup logic
  }}
  className="flex-1 bg-gray-900 text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors font-medium"
>
  Order Now
</button>

                <Link href="https://wa.me/923368251408" passHref legacyBehavior>
  <a
    target="_blank"
    rel="noopener noreferrer"
    className="flex-1"
    aria-label="Chat on WhatsApp"
    onClick={() => {
      if (typeof window.fbq !== 'undefined') {
        fbq('trackCustom', 'WhatsAppChatStarted');
      }
    }}
  >
    <button
      type="button"
      className="w-full bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2"
    >
      <svg
        className="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
      WhatsApp Chat
    </button>
  </a>
</Link>

              </div>

              <UrgencyTimer/>
                <div className="mt-8">
  <div className="space-y-6 mt-8">
  {/* Specifications */}
  <div>
    <h3 className="font-bold text-gray-800 mb-2">SPECIFICATIONS</h3>
    <ul className="text-gray-600 text-sm space-y-1">
      <li>• Color: Black</li>
      <li>• Material: ABS Plastic</li>
      <li>• Weight: 0.1 kg</li>
    </ul>
  </div>


  <div className="space-y-8 mt-8">
  {/* Modes Section */}
  <div>
    <h3 className="font-bold text-gray-800 mb-4">MODES</h3>
    <div className="mb-6 aspect-video bg-gray-100 rounded-lg overflow-hidden relative">
  <Image
    src="/product/modes.jpg"
    alt="Spray mode demonstration"
    fill
    className="object-contain"  
    sizes="(max-width: 768px) 100vw, 50vw"
    priority
  />
</div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Jet Mode Card */}
      <div className="border border-gray-200 rounded-lg p-4">
        <h4 className="font-bold text-gray-900  flex items-center gap-2">
          {/* <span className="w-3 h-3 bg-blue-500 rounded-full"></span> */}
          Jet Mode
        </h4>
        <p className="text-sm text-gray-600 mt-1">High-pressure concentrated stream</p>
      </div>
      
      {/* Shower Mode Card */}
      <div className="border border-gray-200 rounded-lg p-4">
        <h4 className="font-bold text-gray-900 flex items-center gap-2">
          {/* <span className="w-3 h-3 bg-green-500 rounded-full"></span> */}
          Shower Mode
        </h4>
        <p className="text-sm text-gray-600 mt-1">Wide gentle spray pattern</p>
      </div>
      
      {/* Mist Mode Card */}
      <div className="border border-gray-200 rounded-lg p-4">
        <h4 className="font-bold text-gray-900 flex items-center gap-2">
          {/* <span className="w-3 h-3 bg-purple-500 rounded-full"></span> */}
          Mist Mode
        </h4>
        <p className="text-sm text-gray-600 mt-1">Fine mist for delicate surfaces</p>
      </div>
    </div>
  </div>

  {/* Usage Instructions */}
  <div>
    <h3 className="font-bold text-gray-800 mb-4">HOW TO USE</h3>
    <ol className="space-y-3 list-decimal list-inside">
      <li className="text-gray-700">
        <span className="font-medium">Attach the nozzle:</span> Insert into hose pipe
      </li>
      <li className="text-gray-700">
        <span className="font-medium">Secure connection:</span> Tighten with clamp
      </li>
      <li className="text-gray-700">
        <span className="font-medium">Adjust modes:</span> Rotate front collar to select
      </li>
    </ol>
  </div>
</div>
</div>
</div>  
<div className="bg-gray-50 p-6 rounded-lg mt-8">
  {/* <div className='w-inherit '> */}
  <h3 className="text-lg font-semibold text-gray-900 mb-6 ">Delivery Options</h3>
    {/* </div> */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {/* COD Option */}
    <div className="flex flex-col items-center bg-white p-4 rounded-lg border border-gray-200">
      <div className="bg-blue-100 p-3 rounded-full mb-3">
        <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
      <h4 className="font-medium text-gray-900 mb-1">COD</h4>
      <p className="text-sm text-gray-500 text-center">Pay when you receive</p>
    </div>

    {/* Open Parcel Option */}
    <div className="flex flex-col items-center bg-white p-4 rounded-lg border border-gray-200">
      <div className="bg-green-100 p-3 rounded-full mb-3">
        <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      </div>
      <h4 className="font-medium text-gray-900 mb-1">Open Parcel</h4>
      <p className="text-sm text-gray-500 text-center">Check before paying</p>
    </div>

    {/* Easy Returns Option */}
    <div className="flex flex-col items-center bg-white p-4 rounded-lg border border-gray-200">
      <div className="bg-purple-100 p-3 rounded-full mb-3">
        <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </div>
      <h4 className="font-medium text-gray-900 mb-1">Easy Returns</h4>
      <p className="text-sm text-gray-500 text-center">7-day return policy</p>
    </div>
  </div>
</div>
  {/* Policy Section */}
  <div className="mt-8 p-6 bg-white border border-gray-200 rounded-lg">
    <h3 className="text-lg font-semibold text-gray-900 mb-3">Our Policy</h3>
    <p className="text-sm text-gray-600">
      We operate as a dropshipping store in partnership with HHC, a trusted fulfillment provider. 
      While we don&apos;t physically stock inventory, all products are quality-checked and shipped 
      directly from certified warehouses to ensure you receive genuine items as described.
    </p>
  </div>
</div>
          </div>
        </div>

        {/* Full Features Section */}
        <section className="mt-24">
      <div className="space-y-8">
  {/* Main product Showcase - Big Images */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden">
      <Image
        src="/product/big1.webp"
        alt="Power washer in use - cleaning car"
        width={800}
        height={800}
        className="object-cover w-full h-full"
        priority
      />
    </div>
    <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden">
      <Image
        src="/product/big2.webp"
        alt="Power washer modes demonstration"
        width={800}
        height={800}
        className="object-cover w-full h-full"
      />
    </div>
  </div>

</div>  
        </section>
        <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-12">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col md:flex-row justify-center items-center">
      
     <div className="mb-4 md:mb-0 flex items-center text-sm text-gray-500">
  © {new Date().getFullYear()}
  <Image src="/logo.png" alt="Logo" width={100} height={100} className="mx-2" />
  All rights reserved.
</div>



      
    </div>

    {/* Policy Note - Dropshipping Disclosure */}
    <div className="mt-6 text-center md:text-left">
      <p className="text-xs text-gray-400">
        Note: We operate as a dropshipping store in partnership with HHC fulfillment. 
        Products ship directly from certified warehouses.
      </p>
    </div>
  </div>
</footer>
      </main>
      

      {/* Order Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div 
            className="bg-white rounded-xl w-full max-w-md mx-auto my-8 p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => {
                setShowForm(false);
                setSuccess(false); // Reset success state when closing modal
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Conditional rendering for success message or form */}
            {success ? (
              <div className="text-center py-10">
                <h2 className="text-2xl font-bold text-green-600 mb-2">Thank you!</h2>
                <p className="text-gray-700">Your order has been placed successfully.</p>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setSuccess(false);
                  }}
                  className="mt-6 bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-light text-gray-900 mb-6">Complete Your Order</h2>
                
                <form 
                  onSubmit={handleOrderSubmit}
                  className="max-h-[80vh] overflow-y-auto pr-2">
                  <div className="space-y-4">
                    <input type="hidden" name="product_name" value={product.title} />
                    <input type="hidden" name="quantity" value={quantity} />
                    <input type="hidden" name="total_price" value={`Rs. ${product.discountPrice * quantity}`} />
                    <input type="hidden" name="_redirect" value="#" />
                    <div>

                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Shipping Address</label>
                      <textarea
                        id="address"
                        name="address"
                        required
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input
                            id="cod"
                            name="payment"
                            type="radio"
                            defaultChecked
                            className="h-4 w-4 text-gray-600 focus:ring-gray-500"
                          />
                          <label htmlFor="cod" className="ml-2 block text-sm text-gray-700">
                            Cash on Delivery (COD)
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="pt-2">
                      <div className="flex justify-between border-t border-gray-200 pt-4 mb-4">
                        <span className="text-sm font-medium text-gray-700">Quantity</span>
                        <span className="text-sm text-gray-900">{quantity}</span>
                      </div>
                      </div>
                    <div className="pt-2">
                      <div className="flex justify-between border-t border-gray-200 pt-4 mb-4">
                        <span className="text-sm font-medium text-gray-700">Subtotal</span>
                        <span className="text-sm text-gray-900">Rs. {product.discountPrice * quantity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-700">Shipping</span>
                        <span className="text-sm text-green-600">Free</span>
                      </div>
                      <div className="flex justify-between border-t border-gray-200 pt-4 mt-4">
                        <span className="text-base font-medium text-gray-900">Total</span>
                        <span className="text-base font-medium text-gray-900">Rs. {product.discountPrice * quantity}</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gray-900 text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors font-medium mt-4"
                    >
                      Place Order
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
    </>
  );
}