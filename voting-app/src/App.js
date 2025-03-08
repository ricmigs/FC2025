import React, { useState, useEffect } from "react";
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

const styles = {
  votingApp: {
    maxWidth: "800px",
    width: "100%",
    padding: "20px",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    margin: "20px auto", /* Center the app */
  },
  h1: {
    fontSize: "2em",
    marginBottom: "20px",
    color: "#ffcc00",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    color: "#333",
    fontSize: "1em",
  },
  timer: {
    fontSize: "1.2em",
    fontWeight: "bold",
    marginBottom: "20px",
    padding: "10px",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderRadius: "5px",
  },
  songSection: {
    marginBottom: "20px",
    padding: "15px",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: "8px",
  },
  songLabel: {
    display: "block",
    fontSize: "1.1em",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  voteButtons: {
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gap: "5px",
  },
  voteButton: {
    padding: "8px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#333",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  voteButtonHover: {
    // Use a linear gradient for hover effect
    background: "linear-gradient(to right, #8B5CF6, #D946EF)", // Purple to Pink
  },
  voteButtonSelected: { // Style for the selected button
    background: "linear-gradient(to right, #8B5CF6, #D946EF)", // Purple to Pink
    cursor: "default", // No cursor change on selected
  },
  voteButtonBlocked: {
     backgroundColor: "#777",
     cursor: "not-allowed",
     color: "#aaa",
  },
  submitButton: {
    padding: "12px 25px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#ffcc00",
    color: "black",
    fontWeight: "bold",
    fontSize: "1.1em",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  submitButtonHover: {
    backgroundColor: "#ffda4d",
  },
  submitButtonDisabled: {
    backgroundColor: "#aaa",
    cursor: "not-allowed",
  },
  results: {
    marginTop: "30px",
    padding: "20px",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderRadius: "10px",
  },
  resultsH2: {
    fontSize: "1.5em",
    marginBottom: "15px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    border: "1px solid #666",
    padding: "8px",
    textAlign: "left",
    backgroundColor: "#444",
  },
  td: {
    border: "1px solid #666",
    padding: "8px",
    textAlign: "left",
  },
  // Responsive adjustments
  '@media (max-width: 600px)': {
    votingApp: {
      padding: "15px",
    },
    h1: {
      fontSize: "1.75em",
    },
    voteButtons: {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
  },
};

function VotingApp() {
  const [name, setName] = useState("");
  const [votes, setVotes] = useState(Array(12).fill(0));
  const [timer, setTimer] = useState(300);
  const [submitted, setSubmitted] = useState(false);
  // Store all user votes in an array
  const [allVotes, setAllVotes] = useState([]);


  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleVoteChange = (index, value) => {
    if (votes.includes(value)) return;
    let newVotes = [...votes];
    newVotes[index] = value;
    setVotes(newVotes);
  };

   const handleSubmit = () => {
    setSubmitted(true);

    // Add the current user's votes to the allVotes array
    setAllVotes(prevAllVotes => [...prevAllVotes, votes]);
  };

  // Calculate the group results
  const calculateGroupResults = () => {
    const songVotes = {};

    // Initialize vote count for each song
    songs.forEach(song => (songVotes[song] = 0));

    // Sum up the votes for each song across all users
    allVotes.forEach(userVotes => {
      userVotes.forEach((vote, index) => {
        if (vote > 0) {
          songVotes[songs[index]] += vote; // Add the points of each user
        }
      });
    });

    // Convert the songVotes object to an array of [song, totalVotes] pairs
    const songVotesArray = Object.entries(songVotes);

    // Sort the songs by total votes in descending order
    songVotesArray.sort(([, votesA], [, votesB]) => votesB - votesA);

    return songVotesArray;
  };

  // Group results
  const groupResults = submitted ? calculateGroupResults() : [];


  // Personal sorted Votes
  const sortedVotes = votes
    .map((vote, index) => ({ vote, song: songs[index] }))
    .filter((entry) => entry.vote > 0)
    .sort((a, b) => b.vote - a.vote);


    // Define responsive styles within the component
  const responsiveVoteButtons = {
    ...styles.voteButtons,
    ...(window.innerWidth <= 600 ? styles['@media (max-width: 600px)'].voteButtons : {}),
  };

  return (
    <div style={{
        fontFamily: "sans-serif",
        // Purple-Pink Gradient for background
        background: "linear-gradient(to bottom right, #8B5CF6, #D946EF)",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        margin: 0,
        padding: "20px",
      }}>
    <div style={styles.votingApp}>
      <h1 style={styles.h1}>Festival da Canção Voting</h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={styles.input}
      />
      <div style={styles.timer}>Time Left: {timer}s</div>

      {songs.map((song, index) => (
        <div key={index} style={styles.songSection}>
          <label style={styles.songLabel}>{song}</label>
          <div style={responsiveVoteButtons}>
            {[...Array(12)].map((_, value) => {
              const isSelected = votes[index] === value + 1;
              const isBlocked = votes.includes(value + 1) && !isSelected;
              return (
                <button
                  key={value + 1}
                  style={{
                    ...styles.voteButton,
                    ...(isSelected ? styles.voteButtonSelected : {}),
                    ...(isBlocked ? styles.voteButtonBlocked : {}),
                    ...(!isSelected && !isBlocked ? styles.voteButton : {}) // Default styling
                  }}
                  onClick={() => handleVoteChange(index, value + 1)}
                  disabled={votes.includes(value + 1)}
                  onMouseOver={(e) => {
                    if (!votes.includes(value + 1) && !isSelected) {
                      e.target.style.background = styles.voteButtonHover.background;
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!votes.includes(value + 1) && !isSelected) {
                      e.target.style.background = styles.voteButton.backgroundColor;
                    }
                  }}
                >
                  {value + 1}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <button
        style={{
          ...styles.submitButton,
          ...(submitted || timer === 0 ? styles.submitButtonDisabled : {}),
        }}
        onClick={handleSubmit}
        disabled={submitted || timer === 0}
        onMouseOver={(e) => {if (!(submitted || timer === 0)) {e.target.style.backgroundColor = styles.submitButtonHover.backgroundColor}}}
        onMouseOut={(e) => {if (!(submitted || timer === 0)) {e.target.style.backgroundColor = styles.submitButton.backgroundColor}}}
      >
        Submit Votes
      </button>

      {submitted && (
        <div style={styles.results}>
          <h2 style={styles.resultsH2}>Your Final Ranking</h2>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Vote</th>
                <th style={styles.th}>Winning Song</th>
              </tr>
            </thead>
            <tbody>
              {sortedVotes.map((entry, index) => (
                <tr key={index}>
                  <td style={styles.td}>{entry.vote}</td>
                  <td style={styles.td}>{entry.song}</td>
                </tr>
              ))}
            </tbody>
          </table>
            <h2 style={styles.resultsH2}>Group Ranking</h2>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Rank</th>
                  <th style={styles.th}>Song</th>
                  <th style={styles.th}>Total Votes</th>
                </tr>
              </thead>
              <tbody>
                {groupResults.map(([song, totalVotes], index) => (
                  <tr key={index}>
                    <td style={styles.td}>{index + 1}</td>
                    <td style={styles.td}>{song}</td>
                    <td style={styles.td}>{totalVotes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      )}
    </div>
    </div>
  );
}

export default VotingApp;