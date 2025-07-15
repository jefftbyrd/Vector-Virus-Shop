export default function Footer() {
  return (
    <footer className="footer">
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
          <label>
            <input type="email" placeholder="email address" required />
            <button className="buttonBlue">Subscribe</button>
          </label>
        </form>
      </div>
    </footer>
  );
}
