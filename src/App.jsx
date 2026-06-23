import React, { useState, useEffect, useCallback, useRef } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import LogoHunt from "./assets/logohunt.png";

/* ============ Config ============ */
const TOTAL_PIECES = 16;
const GRID_COLS = 4;
const TIME_LIMIT = 50;
const TOTAL_LOGOS_TO_PLAY = 10;
const TOTAL_AVAILABLE_LOGOS = 20;

const buildLogo = (logoNum) => {
  const arr = [];
  for (let row = 0; row < GRID_COLS; row++) {
    for (let col = 0; col < GRID_COLS; col++) {
      arr.push({
        id: row * GRID_COLS + col,

        style: {
          backgroundImage: `url('/logos/logo${logoNum}.jpg')`,
          backgroundSize: `${GRID_COLS * 100}% ${GRID_COLS * 100}%`,
          backgroundPosition: `${(col / (GRID_COLS - 1)) * 100}% ${(row / (GRID_COLS - 1)) * 100}%`,
        },
      });
    }
  }
  return arr;
};

const shuffleArray = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/* ============ Drag piece component ============ */
const Piece = ({ piece, index, movePiece, disabled }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: "piece",
    item: { index },
    canDrag: !disabled,
    collect: (m) => ({
      isDragging: m.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: "piece",
    drop: (item) => {
      if (disabled) return;
      if (item.index === index) return;

      movePiece(item.index, index);
      item.index = index;
    },
  });

  return (
    <div
      ref={(node) => dragRef(dropRef(node))}
      style={{
        width: 96,
        height: 96,
        borderRadius: 8,
        overflow: "hidden",
        cursor: disabled ? "default" : "grab",
        boxShadow: isDragging
          ? "0 10px 30px rgba(0,0,0,0.5)"
          : "0 6px 16px rgba(0,0,0,0.4)",
        border: "1px solid rgba(255,255,255,0.02)",
        backgroundColor: "#111",

        ...piece.style,
      }}
    />
  );
};

/* ============ Small UI ============ */
const HomeTextButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="btn-olive"
    style={{ padding: "12px 28px", borderRadius: 8, fontFamily: "TT Travels, sans-serif" }}
  >
    START
  </button>
);

const TopLogo = ({ size = 86 }) => <img src={LogoHunt} alt="LogoHunt" style={{ height: size }} />;

const HomeNav = ({ onHome }) => (
  <button onClick={onHome} style={{ position: "fixed", right: 16, top: 16 }} className="btn-olive">
    Home
  </button>
);

/* ============ Pages ============ */

/* HOME page - landing with big marketing text + logo on right */
const HomePage = ({ onGoToStart }) => {
  return (
    <div style={{ minHeight: "100vh", background: "#000", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ maxWidth: 1100, width: "100%", display: "flex", gap: 40, alignItems: "center" }}>
        {/* left big text */}
        <div style={{ flex: 1, color: "#D8BFB3" }}>
          <h1 style={{ fontFamily: "TT Chocolates, serif", fontSize: "4rem", margin: 20, lineHeight: 1 }}>START SOLVING<br/>THE PUZZLE!<br/></h1>

          <div style={{ padding: 40 }}>
            <HomeTextButton onClick={onGoToStart} />
          </div>
        </div>

        {/* right logo */}
        <div style={{ width: 400, textAlign: "center" }}>
          <TopLogo size={320} />
        </div>
      </div>
    </div>
  );
};

/* START page - input name + start game + leaderboard button */
const StartPage = ({ playerName, setPlayerName, onStartGame, onViewLeaderboard }) => {
  const valid = playerName.trim().length > 0;

  return (
    <div style={{ minHeight: "100vh", background: "#000", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ textAlign: "center", width: "100%", maxWidth: 420 }}>
        <div style={{ marginBottom: 28, marginLeft: 110 }}>
          <TopLogo size={200} />
        </div>

        <input
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Enter Your Name"
          style={{
            width: "100%",
            padding: "14px 18px",
            borderRadius: 6,
            border: "none",
            background: "#3c3a30",
            color: "#e9d9d3",
            marginBottom: 18,
            fontFamily: "TT Chocolates, serif",
            fontSize: 16,
          }}
          required
        />

        <button
          onClick={onStartGame}
          disabled={!valid}
          style={{
            width: "100%",
            padding: "14px",
            marginBottom: 14,
            borderRadius: 6,
            background: "#3E78B2",
            color: "#e9d9d3",
            fontFamily: "TT Travels, sans-serif",
            fontWeight: 700,
            cursor: valid ? "pointer" : "not-allowed",
            border: "none",
          }}
        >
          START
        </button>

        <button
          onClick={onViewLeaderboard}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: 6,
            background: "#3E78B2",
            color: "#e9d9d3",
            fontFamily: "TT Travels, sans-serif",
            fontWeight: 700,
            border: "none",
          }}
        >
          LEADERBOARD
        </button>
      </div>
    </div>
  );
};

/* PUZZLE page */
const PuzzlePage = ({
  logoIndex,
  pieces,
  movePiece,
  timeLeft,
  playerName,
  progressPercent,
  message,
  timeoutOccurred,
  onShowAnswer,
  onNextAfterTimeout,
  disabledMoves,
  onGoHome,
}) => {
  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff", padding: 28 }}>
      {/* Home button top-right */}
      <div style={{ position: "fixed", right: 16, top: 16 }}>
        <button onClick={onGoHome} className="btn-olive">Home</button>
      </div>

      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ color: "#D8BFB3", fontFamily: "TT Chocolates, serif",fontSize: 20 }}>Player: {playerName}</div>
          </div>

          <div style={{ fontFamily: "TT Chocolates, serif", color: "#D8BFB3" }}>
            {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:{String(timeLeft % 60).padStart(2, "0")}
          </div>
        </div>

        {/* progress */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ height: 10, background: "#1f1f1f", borderRadius: 8, overflow: "hidden" }}>
            <div style={{ width: `${progressPercent}%`, height: "100%", background: "#6aa7ff", transition: "width 300ms ease" }} />
          </div>
          <div style={{ textAlign: "center", marginTop: 8, color: "#D8BFB3", fontFamily: "TT Chocolates, serif" }}>
            {logoIndex + 1} / {TOTAL_LOGOS_TO_PLAY}
          </div>
        </div>

        {/* puzzle panel */}
        <div style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))", borderRadius: 12, padding: 22, border: "1px solid rgba(255,255,255,0.03)" }}>
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${GRID_COLS}, 96px)`, gap: 1, justifyContent: "center" }}>
            {pieces.map((p, i) => <Piece key={i} piece={p} index={i} movePiece={movePiece} disabled={disabledMoves} />)}
          </div>
        </div>

        {/* message and bottom actions */}
        <div style={{ marginTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ color: "#D8BFB3", fontFamily: "TT Chocolates, serif", fontSize: 22 }}>{message}</div>

          {timeoutOccurred ? (
            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={onShowAnswer} className="btn-olive">SHOW ANSWER</button>
              <button onClick={onNextAfterTimeout} className="btn-olive">NEXT</button>
            </div>
          ) : (
            <div style={{ width: 0 }} />
          )}
        </div>
      </div>
    </div>
  );
};

/* COMPLETED page */
const CompletedPage = ({ playerName, solvedCount, onHome, onLeaderboard }) => (
  <div
    style={{
      minHeight: "100vh",
      background: "#000",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: 24
    }}
  >
    {/* Main Wrapper */}
    <div style={{ textAlign: "center", width: "100%", maxWidth: 480 }}>

      {/* Centered Logo */}
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <TopLogo size={150} />
      </div>

      {/* Title */}
      <h2
        style={{
          fontFamily: "TT Chocolates, serif",
          fontSize: 56,
          color: "#D8BFB3",
          marginTop: 24,
          letterSpacing: 1,
        }}
      >
        Game Completed!
      </h2>

      {/* Player Info */}
      <div
        style={{
          marginTop: 32,
          fontSize: 22,
          color: "#e9d9d3",
          fontFamily: "TT Chocolates",
        }}
      >
        Player: <strong>{playerName}</strong>
      </div>

      <div
        style={{
          marginTop: 10,
          fontSize: 22,
          color: "#e9d9d3",
          fontFamily: "TT Chocolates",
        }}
      >
        Solved: <strong>{solvedCount}/{TOTAL_LOGOS_TO_PLAY}</strong>
      </div>

      {/* Buttons */}
      <div style={{ marginTop: 40, width: "100%", maxWidth: 320, marginInline: "auto" }}>
        <button
          onClick={onHome}
          style={{
            width: "100%",
            background: "hsla(210, 48%, 47%, 1.00)",
            color: "#fff",
            padding: "14px 18px",
            borderRadius: 12,
            fontFamily: "TT Travels",
            fontSize: 20,
            marginBottom: 14,
            transition: "0.2s",
          }}
          className="hover-scale"
        >
          Home
        </button>

        <button
          onClick={onLeaderboard}
          style={{
            width: "100%",
            background: "#3E78B2",
            color: "#fff",
            padding: "14px 18px",
            borderRadius: 12,
            fontFamily: "TT Travels",
            fontSize: 20,
            transition: "0.2s",
          }}
          className="hover-scale"
        >
          Leaderboard
        </button>
      </div>

    </div>
  </div>
);

/* LEADERBOARD PAGE */
const LeaderboardPage = ({ board, onHome, onReset }) => {
  const [arrowVisible, setArrowVisible] = React.useState(false);
  const [arrowFaded, setArrowFaded] = React.useState(false);
  const listRef = React.useRef(null);

  // Show arrow only if content overflows; update on mount & resize/content changes
  React.useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const checkOverflow = () => {
      const isOverflowing = el.scrollHeight > el.clientHeight + 1;
      setArrowVisible(isOverflowing);
    };

    checkOverflow();

    // ResizeObserver to react to size/content changes
    let ro;
    if (window.ResizeObserver) {
      ro = new ResizeObserver(checkOverflow);
      ro.observe(el);
      // also observe document changes (helps when fonts load)
      ro.observe(document.documentElement);
    } else {
      window.addEventListener("resize", checkOverflow);
    }

    return () => {
      if (ro) ro.disconnect();
      else window.removeEventListener("resize", checkOverflow);
    };
  }, [board]);

  // When user scrolls, fade arrow out and keep it hidden
  const handleScroll = (e) => {
    if (!arrowVisible) return;
    if (e.target.scrollTop > 6) {
      // start fade out
      setArrowFaded(true);
      // after fade duration hide completely
      setTimeout(() => setArrowVisible(false), 400);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
        padding: 24,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "TT Chocolates, serif",
      }}
    >
      {/* Fixed Logo + Title */}
      <div style={{ marginBottom: 12 }}>
        <TopLogo size={100} />
      </div>

      <h3
        style={{
          color: "#D8BFB3",
          fontFamily: "TT Chocolates, serif",
          fontSize: 32,
          marginBottom: 8,
        }}
      >
        Leaderboard
      </h3>

      <div style={{ color: "#e9d9d3", marginBottom: 12 }}>Top Performers</div>

      {/* Scrollable list box */}
      <div
        ref={listRef}
        onScroll={handleScroll}
        className="leaderboard-scroll"
        style={{
          width: "100%",
          maxWidth: 520,
          maxHeight: "48vh",
          overflowY: "auto",
          paddingRight: 8,
          boxSizing: "border-box",
          marginBottom: 10,
        }}
      >
        {(!board || board.length === 0) ? (
          <div style={{ color: "#bdb0aa", padding: 18, textAlign: "center" }}>No records yet.</div>
        ) : (
          board.map((e, i) => (
            <div
              key={i}
              style={{
                padding: "14px 16px",
                background: "#111",
                marginBottom: 10,
                borderRadius: 12,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "#e8d7d0",
                fontSize: 18,
                border: "1px solid rgba(255,255,255,0.03)",
              }}
            >
              <div>{i + 1}. {e.name}</div>
              <div style={{ color: "#cbb9b0" }}>{e.solved}/10</div>
            </div>
          ))
        )}
      </div>
      
      {/* Buttons fixed under list */}
      <div style={{ marginTop: 20, width: "100%", maxWidth: 320 }}>
        <button
          onClick={onHome}
          style={{
            width: "100%",
            background: "#3E78B2",
            color: "#fff",
            padding: "14px 18px",
            borderRadius: 12,
            fontFamily: "TT Travels, sans-serif",
            fontSize: 18,
            marginBottom: 12,
            border: "none",
            cursor: "pointer",
          }}
        >
          Home
        </button>

        <button
          onClick={onReset}
          style={{
            width: "100%",
            background: "#3E78B2",
            color: "#fff",
            padding: "14px 18px",
            borderRadius: 12,
            fontFamily: "TT Travels, sans-serif",
            fontSize: 18,
            border: "none",
            cursor: "pointer",
          }}
        >
          Reset Leaderboard
        </button>
      </div>

      {/* Scoped style: custom thin blue scrollbar + arrow keyframes (WebKit + Firefox friendly settings) */}
      <style>{`
        .leaderboard-scroll {
          scrollbar-width: thin;
          scrollbar-color: #4ea3ff #000; /* firefox: thumb track */
        }

        /* WebKit browsers */
        .leaderboard-scroll::-webkit-scrollbar {
          width: 10px;
        }
        .leaderboard-scroll::-webkit-scrollbar-track {
          background: #000;
        }
        .leaderboard-scroll::-webkit-scrollbar-thumb {
          background: #4ea3ff;
          border-radius: 10px;
        }
        .leaderboard-scroll::-webkit-scrollbar-button {
          display: block;
          height: 10px;
          background: #4ea3ff;
        }
      `}</style>
    </div>
  );
};

/* ============ Main App ============ */
export default function App() {
  const [page, setPage] = useState("home"); // 'home' | 'start' | 'puzzle' | 'completed' | 'leaderboard'
  const [playerName, setPlayerName] = useState("");

  const [selectedLogos, setSelectedLogos] = useState([]);
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);

  const [original, setOriginal] = useState([]);
  const [pieces, setPieces] = useState([]);

  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [timerRunning, setTimerRunning] = useState(false);

  const [timeoutOccurred, setTimeoutOccurred] = useState(false);
  const [showAnswerFlag, setShowAnswerFlag] = useState(false);
  const [message, setMessage] = useState("");

  const [disableMoves, setDisableMoves] = useState(false);

  const [solvedCount, setSolvedCount] = useState(0);
  const [solvedTimeTotal, setSolvedTimeTotal] = useState(0);

  const solvedShowTimeoutRef = useRef(null);
  const autoSolvedRef = useRef(false);

  const [leaderboard, setLeaderboard] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("logo-hunt-board") || "[]");
    } catch {
      return [];
    }
  });

  /* timer effect */
  useEffect(() => {
    if (!timerRunning) return;
    const id = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(id);
          setTimerRunning(false);
          setTimeoutOccurred(true);
          setDisableMoves(true);
          setMessage("Time Out");
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [timerRunning]);

  /* load logo (orig array from buildLogo) */
  const loadLogo = (logoNum) => {
    if (solvedShowTimeoutRef.current) { clearTimeout(solvedShowTimeoutRef.current); solvedShowTimeoutRef.current = null; }
    const orig = buildLogo(logoNum);
    setOriginal(orig);
    setPieces(shuffleArray(orig));
    setTimeLeft(TIME_LIMIT);
    setTimerRunning(true);
    setTimeoutOccurred(false);
    setShowAnswerFlag(false);
    setMessage("");
    setDisableMoves(false);
    autoSolvedRef.current = false;
  };

  /* startGame called when clicking START in start page AFTER entering name */
  const startGame = () => {
    if (playerName.trim() === "") return;
    const pool = [...Array(TOTAL_AVAILABLE_LOGOS).keys()].map((n) => n + 1);
    const chosen = shuffleArray(pool).slice(0, TOTAL_LOGOS_TO_PLAY);
    setSelectedLogos(chosen);
    setCurrentLogoIndex(0);
    setSolvedCount(0);
    setSolvedTimeTotal(0);
    loadLogo(chosen[0]);
    setPage("puzzle");
  };

  const movePiece = useCallback((from, to) => {
    setPieces((prev) => {
      const a = [...prev];
      [a[from], a[to]] = [a[to], a[from]];
      return a;
    });
  }, []);

  /* auto-detect solved */
  useEffect(() => {
    if (!original.length || !pieces.length) return;
    if (autoSolvedRef.current) return;
    if (timeoutOccurred) return;
    if (showAnswerFlag) return;

    const solved = original.every((p, i) => p.id === pieces[i].id);
    if (solved) {
      autoSolvedRef.current = true;
      setTimerRunning(false);
      setDisableMoves(true);

      const used = TIME_LIMIT - timeLeft;
      const newSolvedCount = solvedCount + 1;
      const newSolvedTimeTotal = solvedTimeTotal + used;

      setShowAnswerFlag(true);
      setMessage("Solved!");

      solvedShowTimeoutRef.current = setTimeout(() => {
        setShowAnswerFlag(false);
        setMessage("");
        solvedShowTimeoutRef.current = null;

        setSolvedCount(newSolvedCount);
        setSolvedTimeTotal(newSolvedTimeTotal);

        if (currentLogoIndex + 1 >= TOTAL_LOGOS_TO_PLAY) {
          const entry = { name: playerName, solved: newSolvedCount, time: newSolvedTimeTotal };
          const updated = [...leaderboard, entry].sort((a, b) => {
            if (b.solved !== a.solved) return b.solved - a.solved;
            return a.time - b.time;
          });
          localStorage.setItem("logo-hunt-board", JSON.stringify(updated));
          setLeaderboard(updated);
          setPage("completed");
          return;
        }

        const nextIndex = currentLogoIndex + 1;
        setCurrentLogoIndex(nextIndex);
        loadLogo(selectedLogos[nextIndex]);
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pieces, original, timeLeft, timeoutOccurred, showAnswerFlag]);

  /* show answer and next-handling on timeout */
  const handleShowAnswer = () => {
    setPieces(original.slice());
    setShowAnswerFlag(true);
    setMessage("Time Out");
    setTimerRunning(false);
  };

  const handleNextAfterTimeout = () => {
    setShowAnswerFlag(false);
    setMessage("");
    setTimeoutOccurred(false);

    if (currentLogoIndex + 1 >= TOTAL_LOGOS_TO_PLAY) {
      const entry = { name: playerName, solved: solvedCount, time: solvedTimeTotal };
      const updated = [...leaderboard, entry].sort((a, b) => {
        if (b.solved !== a.solved) return b.solved - a.solved;
        return a.time - b.time;
      });
      localStorage.setItem("logo-hunt-board", JSON.stringify(updated));
      setLeaderboard(updated);
      setPage("completed");
      return;
    }

    const nextIndex = currentLogoIndex + 1;
    setCurrentLogoIndex(nextIndex);
    loadLogo(selectedLogos[nextIndex]);
  };

  /* back to home (confirm mid-game) */
  const handleBackToHome = () => {
    if (page === "puzzle" && timerRunning) {
      const ok = window.confirm("Leave mid-game? Your current progress will be lost.");
      if (!ok) return;
    }
    if (solvedShowTimeoutRef.current) { clearTimeout(solvedShowTimeoutRef.current); solvedShowTimeoutRef.current = null; }
    setPlayerName("");
    setPage("home");
  };

  const handleResetLeaderboard = () => {
    if (!window.confirm("Reset leaderboard?")) return;
    localStorage.removeItem("logo-hunt-board");
    setLeaderboard([]);
  };

  useEffect(() => {
    return () => {
      if (solvedShowTimeoutRef.current) clearTimeout(solvedShowTimeoutRef.current);
    };
  }, []);

  const progressPercent = ((currentLogoIndex + 1) / TOTAL_LOGOS_TO_PLAY) * 100;

  /* Render */
  return (
    <DndProvider backend={HTML5Backend}>
      {page === "home" && <HomePage onGoToStart={() => setPage("start")} />}

      {page === "start" && (
        <StartPage
          playerName={playerName}
          setPlayerName={setPlayerName}
          onStartGame={() => startGame()}
          onViewLeaderboard={() => { setPlayerName(""); setPage("leaderboard"); }}
        />
      )}

      {page === "puzzle" && (
        <PuzzlePage
          logoIndex={currentLogoIndex}
          pieces={pieces}
          movePiece={movePiece}
          timeLeft={timeLeft}
          playerName={playerName}
          progressPercent={progressPercent}
          message={message}
          timeoutOccurred={timeoutOccurred}
          onShowAnswer={handleShowAnswer}
          onNextAfterTimeout={handleNextAfterTimeout}
          disabledMoves={disableMoves}
          onGoHome={handleBackToHome}
        />
      )}

      {page === "completed" && (
        <CompletedPage
          playerName={playerName}
          solvedCount={solvedCount}
          onHome={() => { setPlayerName(""); setPage("home"); }}
          onLeaderboard={() => setPage("leaderboard")}
        />
      )}

      {page === "leaderboard" && (
        <LeaderboardPage
          board={leaderboard}
          onHome={() => { setPlayerName(""); setPage("home"); }}
          onReset={handleResetLeaderboard}
        />
      )}
    </DndProvider>
  );
}
