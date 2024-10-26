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

  // const tournamentLogo = `https://api.sofascore.app/api/v1/unique-tournament/${tournament.uniqueTournament.id}/image/dark`;

  const formattedTime = convertTimestampToTime(startTimestamp);

  let infos = formattedTime;
  if (status.description === "Ended") {
    infos = `${homeScore.display} - ${awayScore.display}`;
  }

  return (
    <div className={styles.main}>
      <TeamLogo team={homeTeam} />
      <div className={styles.tournament}>
        <div className={styles.time}>{infos}</div>
      </div>
      <TeamLogo team={awayTeam} />
    </div>
  );
}

const TeamLogo = ({ team }) => {
  const logo = `https://api.sofascore.app/api/v1/team/${team.id}/image`;

  return (
    <img src={logo} alt={team.name} title={team.name} className={styles.logo} />
  );
};
