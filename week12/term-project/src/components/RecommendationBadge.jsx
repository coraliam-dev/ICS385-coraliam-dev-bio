const RECOMMENDATION_STYLES = {
  perfect: {
    text: 'Perfect for Sound Bath 🌧️',
    classes: 'bg-emerald-100/80 text-emerald-900 border-emerald-300/70',
  },
  calm: {
    text: 'Good for Meditation 🌙',
    classes: 'bg-indigo-100/80 text-indigo-900 border-indigo-300/70',
  },
  notIdeal: {
    text: 'Not Ideal Today ☀️',
    classes: 'bg-amber-100/80 text-amber-900 border-amber-300/70',
  },
}

function RecommendationBadge({ status }) {
  const config = RECOMMENDATION_STYLES[status] || RECOMMENDATION_STYLES.notIdeal

  return (
    <div className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold tracking-wide ${config.classes}`}>
      {config.text}
    </div>
  )
}

export default RecommendationBadge
