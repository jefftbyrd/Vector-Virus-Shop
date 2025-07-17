export default function Footer() {
  return (
    <footer className="footer grid grid-cols-2 gap-5 px-5 pt-5 pb-10 sm:grid-cols-4 lg:px-10 xl:px-40 sm:pt-10 md:pb-20 bg-[#132620] border-t-3 border-light-green mt-auto">
      <div>
        <h3>Navigation</h3>
        <ul>
          <li>
            <a href="/new-arrivals">New Arrivals</a>
          </li>
          <li>
            <a href="/viruses">All Viruses</a>
          </li>
          <li>Featured</li>
        </ul>
      </div>
      <div>
        <h3>Service</h3>
        <ul>
          <li>Shipping Info</li>
          <li>FAQs</li>
          <li>Help & Support</li>
          <li>Contact Us</li>
        </ul>
      </div>
      <div>
        <h3>Company</h3>
        <ul>
          <li>
            <a href="/about">About Us</a>
          </li>
          <li>Privacy policy</li>
          <li>Environmental policy</li>
          <li>Jobs</li>
        </ul>
      </div>
      <div>
        <h3>Sign up for our Newsletter</h3>
        <form className="newsletter">
          <label className="flex flex-col gap-2">
            <input type="email" placeholder="email address" required />
            <button className="px-3 py-2 bg-light-blue text-dark-green uppercase font-bold font-ddin rounded-lg text-sm sm:text-lg w-3/4 lg:w-1/2">
              Subscribe
            </button>
          </label>
        </form>
      </div>
    </footer>
  );
}
