function WeatherCard({ title, value, detail, tone = 'teal' }) {
  const toneClasses = {
    teal: 'from-teal-100/70 to-cyan-100/40 border-teal-200/60',
    blue: 'from-sky-100/70 to-blue-100/40 border-sky-200/60',
    mint: 'from-emerald-100/70 to-teal-100/40 border-emerald-200/60',
  }

  return (
    <article
      className={`rounded-2xl border bg-gradient-to-br p-5 shadow-[0_12px_30px_rgba(17,45,52,0.12)] backdrop-blur-md transition duration-500 hover:-translate-y-0.5 ${toneClasses[tone] || toneClasses.teal}`}
    >
      <p className="text-[0.7rem] uppercase tracking-[0.18em] text-slate-500">{title}</p>
      <p className="mt-2 font-serif text-3xl text-slate-800">{value}</p>
      {detail ? <p className="mt-1 text-sm text-slate-600">{detail}</p> : null}
    </article>
  )
}

export default WeatherCard
