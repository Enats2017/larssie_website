'use client'

export default function Register() {
  return (
    <div className="w-full min-h-screen p-8">
      <div className="w-full">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-[#002248] font-black text-[42px] leading-none uppercase tracking-tight">
            REGISTER
          </h1>
          <p
            className="text-[#36A5DD] text-[22px] leading-tight mt-1"
            style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}
          >
            With Passion for Sports.
          </p>
        </div>

        {/* Info Box */}
        <div className="bg-[#f0f8ff] border border-[#36A5DD]/30 rounded-xl px-4 py-4 mb-6">

          {/* Top row — icon + text */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#36A5DD] flex items-center justify-center shrink-0 mt-0.5">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2" />
              </svg>
            </div>
            <div>
              <p className="text-[#002248] font-bold text-[14px] leading-snug">
                Register yourself and/or your friends.
              </p>
              <p className="text-gray-500 text-[13px] leading-snug mt-1">
                Group registration for this event is possible from a minimum of 10 people.
              </p>
              <a
                href="#"
                className="text-[#36A5DD] text-[13px] font-semibold underline hover:text-[#2b94cc] transition-colors mt-1 inline-block"
              >
                Click here for instructions.
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-[#36A5DD]/20 my-4" />

          {/* Bottom text */}
          <p className="text-gray-600 text-[13px] leading-snug mb-2">
            We are using the online registration platform Passion for Sports.
          </p>
          <p className="text-gray-600 text-[13px] leading-snug">
            After you are registered, cancel, transfer or change any options easily in your PFS account.
          </p>
        </div>

        {/* Register Button */}
        <a
          href="#"
          className="flex items-center justify-center w-full
            bg-[#002248] hover:bg-[#001530] active:bg-[#001020]
            text-white font-bold text-[14px] tracking-widest uppercase
            rounded-xl py-4 mb-3
            transition-colors duration-200"
        >
          REGISTER
        </a>

        {/* Passion for Sports Button */}
        <a
          href="#"
          className="flex items-center gap-4 w-full
            bg-[#f0f8ff] hover:bg-[#e0f2fe] active:bg-[#bae6fd]
            border border-[#36A5DD]/30
            rounded-xl px-5 py-4
            transition-colors duration-200"
        >
          <div className="w-10 h-10 rounded-full bg-[#36A5DD] flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-[#002248] font-black text-[13px] tracking-wider uppercase leading-tight">
              PASSION
            </span>
            <span className="text-[#002248] font-black text-[13px] tracking-wider uppercase leading-tight">
              FOR SPORTS
            </span>
          </div>
        </a>

      </div>
    </div>
  )
}