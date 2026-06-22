'use client'

import { useState } from 'react'

export default function ContactUs() {
  const [topic, setTopic] = useState('')
  const [event, setEvent] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // wire up your submit logic here
  }

  return (
    <div className="px-6 pt-16 pb-10">
      <h2 className="text-3xl font-black text-[#0d2a4a] leading-tight">
        CONTACT US
      </h2>
      <p
  className="text-sky-500 italic mt-1"
        style={{ fontFamily: 'Georgia, serif' }}
      >
        we&apos;re here to help you
      </p>

      {/* FAQ callout */}
     <div className="mt-6 rounded-xl bg-sky-100/70 border border-sky-200 p-5">
  <div className="flex items-start gap-3">
    <span className="flex items-center justify-center w-9 h-9 rounded-full bg-sky-500 text-white text-sm font-bold shrink-0">
      ?
          </span>
          <div>
            <p className="font-bold text-[#0d2a4a] text-sm">Frequently Asked Questions</p>
            <p className="text-gray-600 text-sm mt-1">
              Find quick answers to the most common questions.
            </p>
           <a href="/faq" className="inline-block mt-2 text-sm font-semibold text-[#0d2a4a] underline hover:text-emerald-700 transition-colors">
              View the FAQ →
            </a>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5">
        <div>
          <label className="text-[11px] font-bold tracking-wider uppercase text-[#0d2a4a] mb-1.5 block">
            Choose a Topic
          </label>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full border border-sky-200 rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors"
          >
            <option value="">Select a topic</option>
            <option value="general">General Inquiry</option>
            <option value="registration">Registration</option>
            <option value="support">Support</option>
          </select>
        </div>

        <div>
          <label className="text-[11px] font-bold tracking-wider uppercase text-[#0d2a4a] mb-1.5 block">
            Choose Your Event
          </label>
          <select
            value={event}
            onChange={(e) => setEvent(e.target.value)}
            className="w-full border border-emerald-200 rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
          >
            <option value="">Select an event</option>
          </select>
        </div>

        <div>
          <label className="text-[11px] font-bold tracking-wider uppercase text-[#0d2a4a] mb-1.5 block">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full border border-emerald-200 rounded-lg px-4 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
          />
        </div>

        <div>
          <label className="text-[11px] font-bold tracking-wider uppercase text-[#0d2a4a] mb-1.5 block">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full border border-emerald-200 rounded-lg px-4 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
          />
        </div>

        <div>
          <label className="text-[11px] font-bold tracking-wider uppercase text-[#0d2a4a] mb-1.5 block">
            Message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here"
            rows={5}
            className="w-full border border-emerald-200 rounded-lg px-4 py-3 text-sm placeholder:text-gray-400 resize-y focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
          />
        </div>

        <button
          type="submit"
className="mt-2 w-full bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm tracking-wide uppercase py-3.5 rounded-full transition-colors"        >
          Contact
        </button>
      </form>
    </div>
  )
}