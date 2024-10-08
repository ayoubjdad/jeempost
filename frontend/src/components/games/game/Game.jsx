import React from "react";
import styles from "./Game.module.scss";
import { convertTimestampToTime } from "../../../helpers/global.helper";

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

  // status.description==="Ended"

  const homeTeamLogo = `https://api.sofascore.app/api/v1/team/${homeTeam.id}/image`;
  const awayTeamLogo = `https://api.sofascore.app/api/v1/team/${awayTeam.id}/image`;
  const tournamentLogo = `https://api.sofascore.app/api/v1/unique-tournament/${tournament.uniqueTournament.id}/image/dark`;

  const formattedTime = convertTimestampToTime(startTimestamp);

  let infos = formattedTime;
  if (status.description === "Ended") {
    infos = `${homeScore.display} - ${awayScore.display}`;
  }

  return (
    <div className={styles.main}>
      <img src={homeTeamLogo} alt="" className={styles.logo} />
      <div className={styles.tournament}>
        {/* <img src={tournamentLogo} alt="" className={styles.tournamentLogo} /> */}
        <div className={styles.time}>{infos}</div>
      </div>
      <img src={awayTeamLogo} alt="" className={styles.logo} />
    </div>
  );
}
