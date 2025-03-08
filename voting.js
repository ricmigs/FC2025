import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

const songs = [
  "Bombazine – Apago Tudo",
  "Margarida Campelo – Eu sei que o amor",
  "HENKA – I Wanna Destroy U",
  "Bluay – Ninguém",
  "Jéssica Pina – Calafrio",
  "Marco Rodrigues – A minha casa",
  "NAPA – Deslocado",
  "Peculiar – Adamastor",
  "Fernando Daniel – Medo",
  "Emmy Curl – Rapsódia da Paz",
  "JOSH – Tristeza",
  "Diana Vilarinho – Cotovia"
];

export default function VotingApp() {
  const [name, setName] = useState("");
  const [votes, setVotes] = useState(Array(12).fill(0));
  const [timer, setTimer] = useState(300); // 5-minute countdown
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleVoteChange = (index, value) => {
    if (votes.includes(value)) return; // Prevent duplicate votes
    let newVotes = [...votes];
    newVotes[index] = value;
    setVotes(newVotes);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const sortedVotes = votes
    .map((vote, index) => ({ vote, song: songs[index] }))
    .filter((entry) => entry.vote > 0)
    .sort((a, b) => b.vote - a.vote);
  
  return (
    <div className="p-6 max-w-xl mx-auto text-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-extrabold mb-4">Festival da Canção Voting</h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 w-full mb-4 text-black rounded-lg"
      />
      <div className="mb-4 text-lg font-bold">⏳ Time Left: {timer}s</div>
      {songs.map((song, index) => (
        <div key={index} className="mb-4 p-3 bg-white text-black rounded-lg shadow-md">
          <label className="block mb-2 font-semibold">🎶 {song}</label>
          <div className="grid grid-cols-6 gap-2">
            {[...Array(12)].map((_, value) => (
              <button
                key={value + 1}
                onClick={() => handleVoteChange(index, value + 1)}
                disabled={votes.includes(value + 1)}
                className={`p-2 rounded-lg text-white font-bold transition ${
                    votes[index] === value + 1 
                      ? "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                      : votes.includes(value + 1) 
                        ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                        : "bg-gray-300 text-black"
                }`}
              >
                {value + 1}
              </button>
            ))}
          </div>
        </div>
      ))}
      <Button
        onClick={handleSubmit}
        disabled={submitted || timer === 0}
        className="mt-4 px-6 py-3 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-300 transition"
      >
        Submit Votes
      </Button>
      {submitted && (
        <div className="mt-6 p-6 bg-gray-500 text-white rounded-lg shadow-lg text-xl font-bold">
          ✅ Your votes have been submitted! Please wait for the group results.
          <div className="mt-4 p-4 bg-white text-black rounded-lg">
            <h2 className="text-2xl font-bold mb-2">Your Final Ranking</h2>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">Vote</th>
                  <th className="border border-gray-300 px-4 py-2">Winning Song</th>
                </tr>
              </thead>
              <tbody>
                {sortedVotes.map((entry, index) => (
                  <tr key={index} className="border border-gray-300">
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">{entry.vote}</td>
                    <td className="border border-gray-300 px-4 py-2">{entry.song}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
