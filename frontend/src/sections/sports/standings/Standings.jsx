import React, { useState } from "react";
import styles from "./Standings.module.scss";
import { Teams } from "../../../data/translations/Teams";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useQuery } from "react-query";
import axios from "axios";
import { standingsUrls } from "../../../api/data";
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const fetchStandings = async () => {
  try {
    const responses = await Promise.all(
      standingsUrls.map((url) => axios.get(url))
    );
    const standings = responses.map((response) => response?.data?.standings);
    return standings;
  } catch (error) {
    console.error("❌ Error fetching standings:", error);
    return [];
  }
};

export default function Standings() {
  const { data: standings } = useQuery("standings", fetchStandings, {
    refetchOnWindowFocus: false,
    retry: false,
  });

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label={<LeagueLogo tournamentId={937} />} {...a11yProps(0)} />
          <Tab label={<LeagueLogo tournamentId={17} />} {...a11yProps(1)} />
          <Tab label={<LeagueLogo tournamentId={8} />} {...a11yProps(2)} />
          <Tab label={<LeagueLogo tournamentId={34} />} {...a11yProps(3)} />
          <Tab label={<LeagueLogo tournamentId={23} />} {...a11yProps(4)} />
          <Tab label={<LeagueLogo tournamentId={35} />} {...a11yProps(5)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <StandingTable standings={standings?.[0]} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <StandingTable standings={standings?.[1]} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <StandingTable standings={standings?.[2]} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <StandingTable standings={standings?.[3]} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <StandingTable standings={standings?.[4]} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5}>
        <StandingTable standings={standings?.[5]} />
      </CustomTabPanel>
    </>
  );
}

const LeagueLogo = ({ tournamentId }) => (
  <img
    className={styles.leagueLogo}
    src={`https://api.sofascore.app/api/v1/unique-tournament/${tournamentId}/image/${
      tournamentId === 34 ? "light" : "dark"
    }`}
    alt=""
  />
);

const StandingTable = ({ standings = [] }) => {
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
          <Team team={team} key={index} />
        ))}
      </div>
    </div>
  );
};

const Team = ({ team }) => {
  const teamName =
    Teams.find((item) => item.id === team.team.id)?.arabicName ||
    team?.team?.fieldTranslations?.nameTranslation?.ar ||
    team.team.nameCode;

  return (
    <div className={styles.team}>
      <p>{team.position}</p>
      <img
        className={styles.logo}
        src={`https://api.sofascore.app/api/v1/team/${team.team.id}/image`}
        alt={teamName}
      />
      <p className={styles.teamName}>{teamName}</p>
      <p className={styles.played}>{team.matches}</p>
      <p>{team.points}</p>
    </div>
  );
};
