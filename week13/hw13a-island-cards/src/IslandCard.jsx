export default function IslandCard({ name, nickname, segment, avgStay, img }) {
  return (
    <article className="island-card">
      <img src={img} alt={`${name} — ${nickname} island photo`} />
      <div className="card-content">
        <div className="card-header">
          <h2>{name}</h2>
          <span className="segment-badge">{segment}</span>
        </div>
        <p className="nickname">{nickname}</p>
        <p className="stay-stat">
          Average stay: <strong>{avgStay.toFixed(1)} days</strong>
        </p>
      </div>
    </article>
  )
}