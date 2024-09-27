import React from "react";
import styles from "./Standings.module.scss";

const Team = ({ team }) => {
  return (
    <div className={styles.team}>
      <p>{team.position}</p>
      <img
        className={styles.logo}
        src={`https://api.sofascore.app/api/v1/team/${team.team.id}/image`}
        alt={team.team.nameCode}
      />
      <p className={styles.teamName}>{team.team.nameCode}</p>
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
          <p className={styles.teamName}>فريق</p>
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
