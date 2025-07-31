export default function Leaderboard({ scores, playerName, isLoading }) {
  return (
    <section id="leaderboard">
      <h2>Leaderboard</h2>
      <p>
        Current Player: <strong>{playerName || 'Anonymous'}</strong>
      </p>
      {isLoading && <p>Loading scores...</p>}
      {!isLoading && (
        <ol>
          {scores.map((entry, index) => (
            <li key={entry.id}>
              <span className="rank">#{index + 1}</span>
              <span className="name">{entry.name}</span>
              <span className="score">
                {(entry.score / 1000).toFixed(3)}s
              </span>
              <span className="target">(Target: {entry.targetTime}s)</span>
            </li>
          ))}
        </ol>
      )}
      {!isLoading && scores.length === 0 && (
        <p>No scores yet. Be the first!</p>
      )}
    </section>
  );
}
