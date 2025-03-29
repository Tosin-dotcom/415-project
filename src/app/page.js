import Image from "next/image";
import styles from "./page.module.css";

import { 
  FaWpforms, 
  FaMoneyBillWave, 
  FaCalculator, 
  FaBell, 
  FaChartBar, 
  FaChartLine 
} from 'react-icons/fa';
import { FaUserTie, FaUserAlt, FaUserCircle } from 'react-icons/fa';


import dashboard from "../app/assets/images/dashboard.png";

export default function Home() {
  return (
    <div className="font-sans text-gray-800 bg-gray-50">
      <header className="fixed w-full bg-white shadow-sm z-50">
        <div className="container mx-auto px-4">
          <nav className="flex justify-between items-center py-5">
            <a href="/" className="text-2xl font-bold">
              <span className="text-blue-600">Debt</span>
              <span className="text-green-500">Track</span>
            </a>
            <ul className="hidden md:flex items-center space-x-8">
              <li>
                <a
                  href="#features"
                  className="font-medium hover:text-blue-600 transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="font-medium hover:text-blue-600 transition-colors"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="font-medium hover:text-blue-600 transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  className="font-medium hover:text-blue-600 transition-colors"
                >
                  Testimonials
                </a>
              </li>
              <li>
                <a
                  href="/register"
                  className="font-semibold border-2 border-blue-600 text-blue-600 px-5 py-2 rounded-md hover:bg-blue-600 hover:text-white transition-colors"
                >
                  Register
                </a>
              </li>
              <li>
                <a
                  href="/login"
                  className="font-semibold border-2 border-blue-600 text-blue-600 px-5 py-2 rounded-md hover:bg-blue-600 hover:text-white transition-colors"
                >
                  Login
                </a>
              </li>
            </ul>
            <button className="md:hidden">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </nav>
        </div>
      </header>
      <section className="pt-32 pb-20 bg-gradient-to-r from-gray-100 to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Streamline Your Loan Recovery Process
            </h1>
            <p className="text-gray-600 text-lg mb-10">
              DebtTrack helps you manage and track loans, monitor repayments,
              and automate notifications - all in one powerful system.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4 mb-12">
              <a
                href="/register"
                className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
              >
                Get Started Free
              </a>
            </div>

            <img
              src={dashboard.src}
              alt="Dashboard Preview"
              className="rounded-lg shadow-xl mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Features
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to efficiently manage loan recovery in one
              integrated solution
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <FaWpforms className="w-8 h-8" />,
                title: "Loan Registration",
                description:
                  "Easily record customer details and loan information with customizable repayment plans and interest rates.",
              },
              {
                icon: <FaMoneyBillWave className="w-8 h-8" />,
                title: "Repayment Tracking",
                description:
                  "Track payments on any day of the month with automatic balance updates and payment history.",
              },
              {
                icon: <FaCalculator className="w-8 h-8" />,
                title: "Interest Calculation",
                description:
                  "Automatically calculate interest based on plan duration (10% for 6-month plans, 15% for 12-month plans).",
              },
              {
                icon: <FaBell className="w-8 h-8" />,
                title: "Missed Payment Alerts",
                description:
                  "Receive instant notifications when debtors miss their monthly payments for timely follow-up.",
              },
              {
                icon: <FaChartBar className="w-8 h-8" />,
                title: "Balance Overview",
                description:
                  "Get a comprehensive view of each debtor's remaining balance, payment history, and upcoming due dates.",
              },
              {
                icon: <FaChartLine className="w-8 h-8" />,
                title: "Performance Analytics",
                description:
                  "Access detailed reports and analytics to monitor recovery rates and overall lending performance.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow transform hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="bg-gray-100 w-14 h-14 rounded-full flex items-center justify-center text-blue-600 mb-5">
                  <i className="material-icons">{feature.icon}</i>
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our streamlined process makes loan management effortless and
              efficient
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {[
              {
                number: 1,
                title: "Register Loans",
                description:
                  "Enter customer information and loan details including amount, duration, and interest rate.",
              },
              {
                number: 2,
                title: "Track Payments",
                description:
                  "Record repayments as they come in with automatic balance and interest updates.",
              },
              {
                number: 3,
                title: "Monitor Performance",
                description:
                  "Get alerts for missed payments and view comprehensive loan performance reports.",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="text-center md:w-1/3 mb-10 md:mb-0 relative"
              >
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl mx-auto mb-6">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>

                {index < 2 && (
                  <div className="hidden md:block absolute top-6 left-[60%] w-[80%] border-t-2 border-dashed border-blue-600"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Affordable Pricing Plans
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose the perfect plan for your business size and loan portfolio
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 justify-center">
            {[
              {
                title: "Starter",
                price: "$49",
                featured: false,
                features: [
                  "Up to 50 active loans",
                  "Basic reporting",
                  "Email notifications",
                  "Single user account",
                  "Basic customer management",
                ],
                buttonText: "Get Started",
                buttonStyle: "outline",
              },
              {
                title: "Professional",
                price: "$99",
                featured: true,
                features: [
                  "Up to 200 active loans",
                  "Advanced reporting & analytics",
                  "Email & SMS notifications",
                  "5 user accounts",
                  "Advanced customer management",
                  "Payment reminder system",
                ],
                buttonText: "Get Started",
                buttonStyle: "primary",
              },
              {
                title: "Enterprise",
                price: "$249",
                featured: false,
                features: [
                  "Unlimited active loans",
                  "Custom reporting solutions",
                  "Multi-channel notifications",
                  "Unlimited user accounts",
                  "Custom integrations",
                  "Dedicated account manager",
                  "White-label solution",
                ],
                buttonText: "Contact Sales",
                buttonStyle: "outline",
              },
            ].map((plan, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl p-8 shadow-md flex flex-col ${
                  plan.featured
                    ? "border-2 border-blue-600 relative lg:scale-110 z-10"
                    : ""
                } lg:w-1/3`}
              >
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white py-1 px-4 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}

                <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
                <div className="text-3xl font-bold mb-6">
                  {plan.price}
                  <span className="text-base font-normal text-gray-500">
                    /month
                  </span>
                </div>

                <ul className="mb-8 flex-grow">
                  {plan.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="mb-2 text-gray-600 flex items-start"
                    >
                      <svg
                        className="w-5 h-5 text-green-500 mr-2 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href="#"
                  className={`text-center font-semibold py-3 rounded-md ${
                    plan.buttonStyle === "primary"
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                  } transition-colors`}
                >
                  {plan.buttonText}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Customers Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied businesses that have transformed their
              loan recovery process
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        {
          content:
            "DebtTrack has completely transformed how we manage our loans. The automatic notifications have reduced our missed payments by 43%, and the reporting tools give us invaluable insights into our portfolio performance.",
          name: "Sarah Johnson",
          title: "Finance Manager, ABC Credit",
          imgSrc: "https://randomuser.me/api/portraits/women/48.jpg",
          bgColor: "bg-blue-100"
        },
        {
          content:
            "The ease of tracking payments and automatic interest calculations has saved our team countless hours every month. The system is intuitive and our recovery rates have improved significantly since implementation.",
          name: "Michael Chen",
          title: "CEO, Micro Lending Co.",
          imgSrc: "https://randomuser.me/api/portraits/men/32.jpg",
          bgColor: "bg-green-100"
        },
        {
          content:
            "As a small lending business, DebtTrack has given us enterprise-level tools at an affordable price. The customer support is exceptional, and the system has grown with our business needs. We are really glad to have found this tool",
          name: "Rebecca Thompson",
          title: "Owner, Thompson Loans",
          imgSrc: "https://randomuser.me/api/portraits/women/23.jpg",
          bgColor: "bg-purple-100"
        },
      ].map((testimonial, index) => (
        <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <div className={`w-2 h-14 ${testimonial.bgColor} rounded-full mr-3`}></div>
            <p className="italic text-gray-600">
              "{testimonial.content}"
            </p>
          </div>
          <div className="flex items-center mt-6">
            <div className="w-12 h-12 rounded-full overflow-hidden mr-4 shadow-sm">
              <img
                src={testimonial.imgSrc}
                alt={testimonial.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 className="font-bold">{testimonial.name}</h4>
              <p className="text-gray-600 text-sm">{testimonial.title}</p>
            </div>
          </div>
        </div>
      ))}
    </div>


        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Loan Recovery Process?
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
            Join thousands of businesses already using DebtTrack to streamline
            their loan management and improve recovery rates.
          </p>
          <a
            href="#"
            className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-md hover:bg-gray-100 transition-colors inline-block"
          >
            Start Your Free 14-Day Trial
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-bold mb-4">DebtTrack</h3>
              <p className="text-gray-400 mb-5">
                Simplifying loan management and recovery for businesses of all
                sizes.
              </p>
            </div>

            {[
              {
                title: "Company",
                links: [
                  { text: "About Us", url: "#" },
                  { text: "Our Team", url: "#" },
                  { text: "Careers", url: "#" },
                  { text: "Press", url: "#" },
                ],
              },
              {
                title: "Resources",
                links: [
                  { text: "Blog", url: "#" },
                  { text: "Help Center", url: "#" },
                  { text: "Guides", url: "#" },
                  { text: "API Documentation", url: "#" },
                ],
              },
              {
                title: "Contact",
                links: [
                  { text: "info@debttrack.com", url: "#" },
                  { text: "+1 (555) 123-4567", url: "#" },
                  { text: "123 Finance Street, Suite 100", url: "#" },
                  { text: "New York, NY 10001", url: "#" },
                ],
              },
            ].map((column, index) => (
              <div key={index}>
                <h3 className="text-xl font-bold mb-4">{column.title}</h3>
                <ul className="space-y-2">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.url}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center pt-8 border-t border-gray-800 text-gray-400">
            <p>&copy; 2025 DebtTrack. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
