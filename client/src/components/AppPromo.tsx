export default function AppPromo() {
  return (
    <section className="py-16 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold font-poppins mb-4">Download Our App</h2>
            <p className="text-lg mb-6 opacity-90">
              Get the LocalFoodie app for faster ordering, exclusive deals, and real-time delivery tracking. Support local businesses with just a few taps!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#" className="flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-neutral-800 transition-all">
                <i className="ri-apple-fill text-2xl"></i>
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="font-semibold">App Store</div>
                </div>
              </a>
              <a href="#" className="flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-neutral-800 transition-all">
                <i className="ri-google-play-fill text-2xl"></i>
                <div className="text-left">
                  <div className="text-xs">Get it on</div>
                  <div className="font-semibold">Google Play</div>
                </div>
              </a>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img 
              src="https://images.unsplash.com/photo-1596558450268-9c27524ba856?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
              alt="LocalFoodie mobile app" 
              className="max-w-xs rounded-3xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
