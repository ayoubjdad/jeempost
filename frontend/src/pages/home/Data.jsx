import React, { useMemo, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { gamesUrl } from "../../api/data";
import { gamesFormatDate } from "../../helpers/global.helper";
import { options } from "../../context/DataProvider";
import styles from "./Data.module.scss";
import { topTeams, tournamentsPriority } from "../../data/Tournaments";
import Loader from "../../layouts/loader/Loader";
import { Box } from "@mui/material";

const isToday = (date, timestamp) => {
  const startTime = new Date(timestamp * 1000);
  return startTime.toLocaleDateString() === date.toLocaleDateString();
};

// API Calls
const fetchGames = async (date) => {
  try {
    const url = gamesUrl + gamesFormatDate(date);
    const response = await axios.get(url);
    return response?.data?.events || [];
  } catch (error) {
    console.error("❌ Error fetching games:", error);
    return [];
  }
};

// const fetchSubscriptions = async () => {
//   try {
//     const response = await axios.get(
//       "https://www.sofascore.com/api/v1/user-account/5fa5714a4dd06b2ec8e118e1/subscriptions"
//     );
//     return response?.data?.subscriptions || {};
//   } catch (error) {
//     console.error("❌ Error fetching subscriptions:", error);
//     return [];
//   }
// };

const fetchTeamPlayers = async (teamId) => {
  try {
    const res = await axios.get(
      `https://www.sofascore.com/api/v1/team/${teamId}/players`
    );
    return res?.data || {};
  } catch (err) {
    console.error(`❌ Error fetching team ${teamId}:`, err);
    return {};
  }
};

// Helpers
const getMoroccanPlayers = (homePlayers, awayPlayers) => {
  const isMoroccan = (p) => p.player.country.name === "Morocco";
  return [...homePlayers.filter(isMoroccan), ...awayPlayers.filter(isMoroccan)];
};

const renderPlayerCard = ({ player }) => (
  <div key={player.id} className={styles.playerCard}>
    {player.jerseyNumber && (
      <p className={styles.jerseyNumber}>{player.jerseyNumber}</p>
    )}
    <img
      src={`https://img.sofascore.com/api/v1/player/${player.id}/image`}
      alt={player.name}
      className={styles.playerImage}
    />
    <p className={styles.playerName}>{player.name}</p>
  </div>
);

export default function Data() {
  const [date, setDate] = useState(new Date());

  const { data: games = [], isLoading: gamesLoading } = useQuery(
    ["games", date],
    () => fetchGames(date),
    options
  );

  // Derive highlighted games
  const highlightedGames = useMemo(() => {
    const filteredGames = games.filter(
      (game) =>
        tournamentsPriority.some(
          (t) => t.id === game.tournament.uniqueTournament.id
        ) && isToday(date, game.startTimestamp)
    );
    return filteredGames.sort(
      (a, b) =>
        a.tournament.uniqueTournament.id - b.tournament.uniqueTournament.id
    );
    //  filteredGames.filter((game) =>
    //   topTeams.some(
    //     (team) => team.id === game.awayTeam.id || team.id === game.homeTeam.id
    //   )
    // );
  }, [games]);

  console.log(
    ":::::: ~ id:",
    tournamentsPriority.map(({ id, name, fieldTranslations }) => ({
      id,
      name,
      fieldTranslations,
    }))
  );

  // Fetch player data only once for all games
  const { data: enrichedGames = [], isLoading: playersLoading } = useQuery(
    ["enrichedGames", games],
    async () => {
      return await Promise.all(
        games.map(async (game) => {
          const [home, away] = await Promise.all([
            fetchTeamPlayers(game.homeTeam.id),
            fetchTeamPlayers(game.awayTeam.id),
          ]);

          return {
            id: game.id,
            game,
            homeTeam: { team: game.homeTeam, ...home },
            awayTeam: { team: game.awayTeam, ...away },
          };
        })
      );
    },
    {
      enabled: games.length > 0,
    }
  );

  // Separate international and other Moroccan players
  const { internationalPlayers, moroccanPlayers } = useMemo(() => {
    const intl = [];
    const local = [];

    enrichedGames.forEach((enriched) => {
      if (!isToday(date, enriched.game.startTimestamp)) return;

      const intlPlayers = getMoroccanPlayers(
        enriched.homeTeam.nationalPlayers || [],
        enriched.awayTeam.nationalPlayers || []
      );

      const moroccanOnly = getMoroccanPlayers(
        enriched.homeTeam.players || [],
        enriched.awayTeam.players || []
      );

      const isIntl = intlPlayers.length > 0;

      if (isIntl) {
        intl.push({ ...enriched, moroccanPlayers: intlPlayers });
      } else if (moroccanOnly.length > 0) {
        local.push({ ...enriched, moroccanPlayers: moroccanOnly });
      }
    });

    return {
      internationalPlayers: intl,
      moroccanPlayers: local,
    };
  }, [enrichedGames]);

  const timeString = (timestamp) => {
    const startTime = new Date(timestamp * 1000);
    return startTime.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (gamesLoading || playersLoading) {
    return <Loader />;
  }

  return (
    <section className={styles.main}>
      <DatePicker date={date} setDate={setDate} />

      <h4>أهم مباريات اليوم</h4>
      <div className={styles.container}>
        {highlightedGames.map((game) => (
          <div
            key={game.id}
            className={styles.card}
            style={{ "justify-content": "center" }}
          >
            <div className={styles.matchHeader} style={{ padding: 0 }}>
              <Team team={game.homeTeam} fromGame />
              <div className={styles.time}>
                <img
                  src={`https://img.sofascore.com/api/v1/unique-tournament/${game?.tournament?.uniqueTournament?.id}/image`}
                  alt={game?.tournament?.uniqueTournament?.name}
                />
                <h5>{timeString(game.startTimestamp)}</h5>
              </div>
              <Team team={game.awayTeam} fromGame />
            </div>
          </div>
        ))}
      </div>

      <h4>اللاعبين الدوليين</h4>
      <div className={styles.container}>
        {internationalPlayers.map((game) => (
          <div key={game.id} className={styles.card}>
            <GameCard game={game.game} />

            <div className={styles.moroccanPlayers}>
              {game.moroccanPlayers.map(renderPlayerCard)}
            </div>
          </div>
        ))}
      </div>

      <h4>باقي اللاعبين المغاربة</h4>
      <div className={styles.container}>
        {moroccanPlayers.map((game) => (
          <div key={game.id} className={styles.card}>
            <GameCard game={game.game} />
            <div className={styles.moroccanPlayers}>
              {game.moroccanPlayers.map(renderPlayerCard)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Reuse existing components
const Team = ({ team, fromGame = false }) => (
  <div className={styles.team}>
    <img
      src={`https://img.sofascore.com/api/v1/team/${team?.id}/image`}
      alt={team?.name}
      className={styles.teamImage}
    />
    <p className={styles.teamName} style={{ height: fromGame && "auto" }}>
      {team?.name}
    </p>
  </div>
);

const GameCard = ({ game }) => {
  const timeString = (timestamp) => {
    const startTime = new Date(timestamp * 1000);
    return startTime.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const tournamentImage = `https://img.sofascore.com/api/v1/unique-tournament/${game?.tournament?.uniqueTournament?.id}/image`;
  const score =
    game.status.type === "finished"
      ? `${game.homeScore.display} - ${game.awayScore.display}`
      : timeString(game.startTimestamp);

  return (
    <div className={styles.matchHeader}>
      <Team team={game.homeTeam} />
      <div className={styles.time}>
        <img
          src={tournamentImage}
          alt={game?.tournament?.uniqueTournament?.name}
        />
        <h5>{score}</h5>
      </div>
      <Team team={game.awayTeam} />
    </div>
  );
};

const DatePicker = ({ date, setDate }) => {
  const dateString = gamesFormatDate(date).split("-");
  const month = dateString[1];
  const day = dateString[2];
  return (
    <div className={styles.datePicker}>
      <Box
        component="i"
        className={`fi fi-rr-angle-left ${styles.arrow}`}
        onClick={() => setDate(new Date(date.setDate(date.getDate() - 1)))}
      />
      <Box component="i" className="fi fi-rr-calendar-day" />
      <p>
        {day}/{month}
      </p>
      <Box
        component="i"
        className={`fi fi-rr-angle-right ${styles.arrow}`}
        onClick={() => setDate(new Date(date.setDate(date.getDate() + 1)))}
      />
    </div>
  );
};
