import React from "react";
import styles from "./Standings.module.scss";
import { Teams } from "../../../data/translations/Teams";

const Team = ({ team }) => {
  const nameTranslation = Teams.find((item) => item.id === team.team.id);

  return (
    <div className={styles.team}>
      <p>{team.position}</p>
      <img
        className={styles.logo}
        src={`https://api.sofascore.app/api/v1/team/${team.team.id}/image`}
        alt={nameTranslation.arabicName || team.team.nameCode}
      />
      <p className={styles.teamName}>
        {nameTranslation.arabicName || team.team.nameCode}
      </p>
      <p className={styles.played}>{team.matches}</p>
      <p>{team.points}</p>
    </div>
  );
};

export default function Standings({ standings }) {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p>الترتيب</p>
          <p></p>
          <p className={styles.teamNameHeader}>فريق</p>
          <p>لعب</p>
          <p>نقاط</p>
        </div>
        {standings?.[0]?.rows.map((team, index) => (
          <Team team={team} />
        ))}
      </div>
    </div>
  );
}
