import { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, orderBy, query, limit } from 'firebase/firestore';
import { db } from './firebase'; // Import your Firestore instance

import Player from './components/Player.jsx';
import TimerChallange from './components/TimerChallange.jsx';
import Leaderboard from './components/Leaderboard.jsx';

function App() {
  const [playerName, setPlayerName] = useState('Anonymous');
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch the top 5 scores from Firestore in real-time
  useEffect(() => {
    const scoresCollection = collection(db, 'scores');
    // Query to order by score (time remaining) ascending (lower is better) and limit to 5
    const q = query(scoresCollection, orderBy('score', 'asc'), limit(5));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const scoresData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setLeaderboard(scoresData);
      setIsLoading(false);
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []);

  // This function adds a new winning score to the database
  async function handleAddScore({ score, targetTime }) {
    if (!playerName || playerName === 'Anonymous') {
      alert("Please set your name before submitting a score!");
      return;
    }
    try {
      // Add a new document for this winning game
      await addDoc(collection(db, 'scores'), {
        name: playerName,
        score: score, // Time remaining
        targetTime: targetTime,
        createdAt: new Date()
      });
    } catch (error) {
      console.error("Error adding score: ", error);
    }
  }

  return (
    <>
      <Player onNameChange={setPlayerName} />
      <Leaderboard
        scores={leaderboard}
        playerName={playerName}
        isLoading={isLoading}
      />
      <div id="challenges">
        <TimerChallange title="Easy" targetTime={1} onWin={handleAddScore} />
        <TimerChallange title="Not Easy" targetTime={5} onWin={handleAddScore} />
        <TimerChallange title="Getting tough" targetTime={10} onWin={handleAddScore} />
        <TimerChallange title="Pros only" targetTime={15} onWin={handleAddScore} />
      </div>
    </>
  );
}

export default App;
