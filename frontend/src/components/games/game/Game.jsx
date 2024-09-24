import React from "react";
import styles from "./Game.module.scss";

export default function Game({ game }) {
  const {
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
    time,
    status,
    startTimestamp,
    tournament,
  } = game;

  const homeTeamLogo = `https://api.sofascore.app/api/v1/team/${homeTeam.id}/image`;
  const awayTeamLogo = `https://api.sofascore.app/api/v1/team/${awayTeam.id}/image`;
  const tournamentLogo = `https://api.sofascore.app/api/v1/unique-tournament/${tournament.uniqueTournament.id}/image/dark`;

  const convertTimestampToTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    date.setHours(date.getUTCHours() + 1);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const formattedTime = convertTimestampToTime(startTimestamp);

  return (
    <div className={styles.main}>
      <img src={homeTeamLogo} alt="" className={styles.logo} />
      <div className={styles.tournament}>
        <img src={tournamentLogo} alt="" className={styles.tournamentLogo} />
        <div className={styles.time}>{formattedTime}</div>
      </div>
      <img src={awayTeamLogo} alt="" className={styles.logo} />
    </div>
  );
}
