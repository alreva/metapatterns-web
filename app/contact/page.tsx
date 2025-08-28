export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold text-slate-900 dark:text-slate-50">
        Contact Us
      </h1>
      
      <div className="max-w-2xl">
        <p className="mb-8 text-slate-600 dark:text-slate-400">
          Get in touch with us using the form below or through our other contact channels.
        </p>
        
        <form className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-slate-50 placeholder-slate-400 dark:placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              placeholder="Your name"
            />
          </div>
          
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-slate-50 placeholder-slate-400 dark:placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              placeholder="your@email.com"
            />
          </div>
          
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-slate-50 placeholder-slate-400 dark:placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              placeholder="Your message..."
            />
          </div>
          
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
          >
            Send Message
          </button>
        </form>
        
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
          <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-slate-50">
            Other Ways to Reach Us
          </h2>
          <div className="space-y-2 text-slate-600 dark:text-slate-400">
            <p>Email: info@metapatterns.com</p>
            <p>Phone: (555) 123-4567</p>
            <p>Address: 123 Web Street, Internet City, IC 12345</p>
          </div>
        </div>
      </div>
    </div>
  );
}