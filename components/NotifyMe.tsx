'use client'

import { useState } from 'react'

export default function NotifyMe() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [updates, setUpdates] = useState(true)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add your submit logic here
    setSubmitted(true)
  }

return (
  <div className="w-full min-h-screen p-8">
    <div className="w-full">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-[#002248] font-black text-[42px] leading-none uppercase tracking-tight">
            NOTIFY ME
          </h1>
          <p
            className="text-[#36A5DD] text-[22px] leading-tight mt-1"
            style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}
          >
            We'll keep you in the loop!
          </p>
        </div>

        {/* Info Box */}
        <div className="flex items-start gap-4 bg-[#f0f8ff] border border-[#36A5DD]/30 rounded-xl px-4 py-4 mb-6">
          <div className="w-10 h-10 rounded-full bg-[#36A5DD] flex items-center justify-center shrink-0 mt-0.5">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11a6.002 6.002 0 0 0-4-5.659V5a2 2 0 1 0-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 1 1-6 0v-1m6 0H9" />
            </svg>
          </div>
          <div>
            <p className="text-[#002248] font-bold text-[14px] leading-snug">
              Registrations for this event are not yet open.
            </p>
            <p className="text-gray-500 text-[13px] leading-snug mt-1">
              Leave your email to be notified when registrations will open
              and to receive important news about this event.
            </p>
          </div>
        </div>

        {/* Form */}
        {submitted ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-[#36A5DD]/10 flex items-center justify-center mx-auto mb-3">
              <svg className="w-7 h-7 text-[#36A5DD]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-[#002248] font-bold text-[16px]">You're on the list!</p>
            <p className="text-gray-500 text-[13px] mt-1">We'll notify you when registrations open.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[#002248] font-bold text-[11px] tracking-widest uppercase">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-[14px] text-gray-700
                  placeholder:text-gray-400
                  focus:outline-none focus:border-[#36A5DD] focus:ring-1 focus:ring-[#36A5DD]
                  transition-colors duration-200"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[#002248] font-bold text-[11px] tracking-widest uppercase">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-[14px] text-gray-700
                  placeholder:text-gray-400
                  focus:outline-none focus:border-[#36A5DD] focus:ring-1 focus:ring-[#36A5DD]
                  transition-colors duration-200"
              />
            </div>

            {/* Checkbox */}
            <div className="flex items-center gap-3">
              <div
                onClick={() => setUpdates(!updates)}
                className={`w-5 h-5 rounded flex items-center justify-center shrink-0 cursor-pointer transition-colors duration-200
                  ${updates ? 'bg-[#36A5DD] border-[#36A5DD]' : 'bg-white border-2 border-gray-300'}`}
              >
                {updates && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span
                onClick={() => setUpdates(!updates)}
                className="text-gray-600 text-[13px] cursor-pointer select-none"
              >
                Send me updates for other events also.
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#36A5DD] hover:bg-[#2b94cc] active:bg-[#2485bb]
                text-white font-bold text-[14px] tracking-widest uppercase
                rounded-lg py-4
                transition-colors duration-200"
            >
              NOTIFY ME
            </button>

          </form>
        )}

      </div>
    </div>
  )
}